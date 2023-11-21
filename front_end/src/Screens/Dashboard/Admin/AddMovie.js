import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UserInput";
import Uploder from "../../../Components/Uploder";
import { ImUpload } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import toast from "react-hot-toast";
import { InlineError } from "../../../Components/Notfications/Error";
import { Imagepreview } from "./../../../Components/Imagepreview";
import { createMovieAction } from "../../../Redux/Actions/MoviesActions";

function AddMovie() {
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUlr, setVideoUlr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get all category
  const { categories } = useSelector((state) => state.categoryGetAll);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovie
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  const onSubmit = (data) => {
    dispatch(
      createMovieAction({
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUlr,
      })
    );
  };

  //useEffect
  useEffect(() => {
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: 0,
        category: "",
        desc: "",
      });
      setImageTitle("");
      setImageWithoutTitle("");
      setVideoUlr("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      navigate("/addMovie");
    }

    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [isSuccess, isError, dispatch, reset, navigate]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6 ">
        <h2 className="text-xl font-bold">Create Movie</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* name */}
          <div className="w-full">
            <Input
              label="Movie Title"
              placeholder="Title"
              type="text"
              name="name"
              register={register("name")}
              bg={true}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          {/* time */}
          <div className="w-full">
            <Input
              label="Hours"
              placeholder="Minute"
              type="number"
              bg={true}
              name="time"
              register={register("time")}
            />
            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>
        {/* language */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Language"
              placeholder="English"
              type="text"
              bg={true}
              name="language"
              register={register("language")}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>
          {/* year */}
          <div className="w-full">
            <Input
              label="Year"
              placeholder="2023"
              type="number"
              bg={true}
              name="year"
              register={register("year")}
            />
            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>

        {/* IMAGES */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* img without title */}
          <div className="flex flex-col gap-2">
            <p className=" text-border font-semibold text-sm">
              Image with Title
            </p>
            <Uploder setImageUrl={setImageWithoutTitle} />
            <Imagepreview image={imageWithoutTitle} name="imageWithoutTitle" />
          </div>

          {/* image with title */}
          <div className="flex flex-col gap-2">
            <p className=" text-border font-semibold text-sm">Image</p>
            <Uploder setImageUrl={setImageTitle} />
            <Imagepreview image={imageTitle} name="imageTitle" />
          </div>
        </div>

        {/* DESC */}
        <div className="w-full">
          <Message
            label="Movie Description"
            placeholder="Make it short and sweet"
            name="desc"
            register={{ ...register("desc") }}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>
        {/* Category */}
        <div className="text-sm w-full">
          <Select
            label="Movie Category"
            options={categories?.length > 0 ? categories : []}
            name="category"
            register={{ ...register("category") }}
          />
          {errors.category && <InlineError text={errors.category.message} />}
        </div>

        {/* Video */}
        <div className="flex flex-col gap-2 w-full">
          <label className=" text-border font-semibold text-sm">
            Movie Video
          </label>
          <div className={`w-full grid ${videoUlr && "md:grid-cols-2"} gap-6`}>
            {videoUlr && (
              <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                Video Upload Success
              </div>
            )}
          </div>
          <Uploder setImageUrl={setVideoUlr} />
        </div>

        {/* Submit */}
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-main w-full flex-rows gap-6 font-medium transitions hover:bg-subMain border border-subMain text-white py-4 rounde"
        >
          {isLoading ? (
            "Please wait..."
          ) : (
            <>
              <ImUpload /> Publish Movie
            </>
          )}
        </button>
      </div>
    </SideBar>
  );
}

export default AddMovie;
