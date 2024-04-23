"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import server from "../env";

export default function Home() {
  const [allrecipes, setAllRecipes] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const getAllRecipes = async (q) => {
    try {
      const response = await axios.get(`${server}/all/${q}`);
      setAllRecipes(response.data.message);
      localStorage.setItem("lastSearchQuery", q);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddOneRecipe = async (id) => {
    try {
      await axios.post(`${server}/favorites/${id}`, undefined, {
        withCredentials: true,
      });
      alert("Added");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const lastSearchQuery = localStorage.getItem("lastSearchQuery");
    if (lastSearchQuery) {
      setSearchQuery(lastSearchQuery);
      getAllRecipes(lastSearchQuery);
    }
    getAllRecipes();
  }, []);

  return (
    <>
      <main>
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-2xl font-bold">Find Gluten Free Meals</h1>
          <div className="flex items-center gap-5 w-full justify-center">
            <input
              type="text"
              name="city"
              className="block w-1/2 bg-gray-100 rounded-full py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 outline-orange-400"
              placeholder="Search"
              onChange={onChangeSearchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getAllRecipes(searchQuery);
                }
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              className="w-6 h-6 object-contain"
              viewBox="0 0 50 50"
              onClick={() => {
                getAllRecipes(searchQuery);
              }}
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
          </div>
          <p className="text-xl font-bold mt-10 mb-10">Your search results: </p>
        </div>
        <div className="flex flex-wrap gap-5 justify-center text-center">
          {allrecipes &&
            allrecipes.map((recipe, index) => {
              return (
                <div
                  key={index}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col gap-5 py-5 justify-center items-center"
                >
                  <p className="text-xl font-bold">{recipe.title}</p>
                  <img src={recipe.image} alt="recipe image" />
                  <p
                    className="cursor-pointer hover:font-bold bg-orange-400 w-1/2 rounded-full py-2 text-white"
                    onClick={() => {
                      handleAddOneRecipe(recipe.id);
                    }}
                  >
                    Add
                  </p>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}
