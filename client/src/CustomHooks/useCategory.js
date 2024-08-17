import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]); // Initialize as an empty array

  // get all Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/categories`
      );
      setCategories(data?.category); // Assuming data.category is an array
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return categories;
}
