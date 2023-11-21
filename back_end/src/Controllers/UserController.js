import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken, protect } from "../Middlewares/authMiddleware.js";


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body
    try {
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400);
            throw new Error ("người dùng đã tồn tại");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await User.create ({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        if (user){
            res.status(201).json({
                _id : user._id,
                fullName : user.fullName,
                email : user.email,
                image : user.image,
                isAdmin : user.isAdmin,
                token : generateToken(user._id),
            });
        }
        else{
            res.status(400);
            throw new Error("Dữ liệu người dùng không hợp lệ")
        }
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id : user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token:  generateToken(user._id),         
        });
        }else{
            res.status(401);
            throw new Error ("Tài khoản hoặc mật khẩu không hợp lệ!")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const {fullName, email, image} = req.body
    try {
        const user = await User.findById(req.user._id);
        if(user){
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();

            res.json({
                _id : user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token:  generateToken(user._id), 
            })
        }else{
            res.status(401);
            throw new Error ("Không hợp lệ! ")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({message:"Đổi mật khẩu thành công !!!"});
        } else {
            res.status(401);
            throw new Error("Mật khẩu cũ không chính xác !!!")
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

const getLikeMovies = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("likedMovies");
        if (user) {
            res.json(user.likedMovies);
        } else {
            
            res.status(401);
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

const addLikeMovies = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            
            if (user.likedMovies.includes(movieId)){
                res.status(400);
                throw new Error ("Movie already like");
            }
            user.likedMovies.push(movieId);
            await user.save();
            res.json(user.likedMovies);
        } else {
            res.status(401);
            throw new Error("Movie not found")
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

const deleteLikeMovies = asyncHandler(async (req, res) => {
    
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            
            user.likedMovies = [];
            await user.save();
            res.json({message:"Xoa thanh cong"});
        } else {
            res.status(401);
            throw new Error("Movie not found")
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (error) {
        res.status(400).json({message:error.message});
    };
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        if (user.isAdmin) {
          res.status(400);
          throw new Error("Không thể xóa tài khoản admin");
        }
        await User.deleteOne({_id: user._id});
        res.json({ message: "Xóa thành công" });
      } else {
        res.status(400);
        throw new Error("Người dùng không tồn tại");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



export  {registerUser, loginUser, updateUser, changeUserPassword, getLikeMovies, addLikeMovies, deleteLikeMovies, getUser,  deleteUser};
