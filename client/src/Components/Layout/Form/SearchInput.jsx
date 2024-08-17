import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../../Context-API/SearchAuth";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [{ keyword }, setValues] = useSearch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/category/categories"
        );
        if (data.success) {
          setCategories(data.category);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/searchproduct/${keyword}?category=${selectedCategory}`
      );
      setValues((prevValues) => ({ ...prevValues, results: data }));
      navigate("/searchproduct");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={keyword}
          onChange={(e) =>
            setValues((prevValues) => ({
              ...prevValues,
              keyword: e.target.value,
            }))
          }
        />
        <select
          className="form-select me-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="btn btn-info" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
