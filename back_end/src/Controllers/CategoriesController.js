import Categories from "../Models/CategoriesModel.js";
import asyncHandler from "express-async-handler";

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error, message });
  }
});

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    const category = new Categories({
      title,
    });
    const createCategory = await category.save();
    res.status(201).json(createCategory);
  } catch (error) {
    res.status(400).json({ message: error, message });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (category) {
      category.title = req.body.title || category.title;
      const updateCategory = await category.save();
      res.json(updateCategory);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error, message });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (category) {
      await category.deleteOne();
      res.json({ message: "Xoa thanh cong" });
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error, message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
