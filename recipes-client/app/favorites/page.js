"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Send from "../../public/send.svg";
const FavoriteRecipes = () => {
  const [favRecipes, setFavRecipes] = useState([]);
  const [newComment, setComment] = useState({});
  const [changedComment, setChangedComment] = useState({});

  const getFavRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/favorites", {
        withCredentials: true,
      });
      setFavRecipes(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${id}`);
      alert("Deleted");
      getFavRecipes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e, id) => {
    setComment({ ...newComment, [id]: e.target.value });
  };

  const handleAddComment = async (e, id) => {
    try {
      e.preventDefault();
      await axios.post(`http://localhost:3001/favorites/${id}/comments`, {
        text: newComment[id],
      });
      getFavRecipes();
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeComment = (e, id) => {
    setChangedComment({ ...changedComment, [id]: e.target.textContent });
  };
  const handleOnChangeComment = async (e, recipeId, commentId) => {
    if (!(commentId in changedComment)) {
      return;
    }
    try {
      await axios.put(
        `http://localhost:3001/favorites/${recipeId}/comments/${commentId}`,
        {
          text: changedComment[commentId],
        }
      );
      getFavRecipes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (recipeId, commentId) => {
    try {
      await axios.delete(
        `http://localhost:3001/favorites/${recipeId}/comments/${commentId}`
      );
      alert("Deleted");
      getFavRecipes();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFavRecipes();
  }, []);
  return (
    <main>
      <div className="flex flex-col items-center gap-5">
        {favRecipes.map((recipe, index) => {
          return (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col gap-5 py-3 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                className="cursor-pointer hover:font-bold w-5 h-5 self-end mr-5"
                onClick={() => {
                  handleDeleteFavorite(recipe._id);
                }}
              >
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
              </svg>
              <p className="text-xl font-bold self-center">{recipe.title}</p>
              <img src={recipe.image} alt="recipe image" className="m-auto" />
              {/* <p>{recipe.instructions}</p> */}
              <div className="px-3 flex flex-col gap-3">
                <p>Comments:</p>
                <ul className="flex flex-col gap-3">
                  {recipe.comments.map((comment, index) => {
                    return (
                      <li
                        key={index}
                        className="flex flex-col justify-between bg-slate-200 w-full rounded-lg p-2 text-sm"
                      >
                        <span className="text-xs font-bold">User</span>

                        <div className="flex justify-between">
                          <span
                            contentEditable="true"
                            suppressContentEditableWarning={true}
                            onInput={(e) => {
                              onChangeComment(e, comment._id);
                            }}
                          >
                            {comment.text}
                          </span>
                          <svg
                            onClick={(e) => {
                              handleOnChangeComment(e, recipe._id, comment._id);
                            }}
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                              stroke="#000000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 21H12"
                              stroke="#000000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </li>
                    );
                  })}
                </ul>{" "}
                <form
                  className="relative"
                  onSubmit={(e) => {
                    handleAddComment(e, recipe._id);
                  }}
                >
                  <label className="font-bold">
                    <input
                      onChange={(e) => {
                        handleInput(e, recipe._id);
                      }}
                      placeholder="Add comment"
                      type="text"
                      name="text"
                      className="block border-0 outline-none  py-1.5 pl-1  text-xs bg-slate-200 rounded-lg w-full"
                    />
                  </label>
                  <button type="submit" className="absolute top-1.5 right-3">
                    <svg
                      fill="#000000"
                      className="w-5 h-5"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 491.022 491.022"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M490.916,13.991c-0.213-1.173-0.64-2.347-1.28-3.307c-0.107-0.213-0.213-0.533-0.32-0.747
                        c-0.107-0.213-0.32-0.32-0.533-0.533c-0.427-0.533-0.96-1.067-1.493-1.493c-0.427-0.32-0.853-0.64-1.28-0.96
                        c-0.213-0.107-0.32-0.32-0.533-0.427c-0.32-0.107-0.747-0.32-1.173-0.427c-0.533-0.213-1.067-0.427-1.6-0.533
                        c-0.64-0.107-1.28-0.213-1.92-0.213c-0.533,0-1.067,0-1.6,0c-0.747,0.107-1.493,0.32-2.133,0.533
                        c-0.32,0.107-0.747,0.107-1.067,0.213L6.436,209.085c-5.44,2.347-7.893,8.64-5.547,14.08c1.067,2.347,2.88,4.373,5.227,5.44
                        l175.36,82.453v163.947c0,5.867,4.8,10.667,10.667,10.667c3.733,0,7.147-1.92,9.067-5.12l74.133-120.533l114.56,60.373
                        c5.227,2.773,11.627,0.747,14.4-4.48c0.427-0.853,0.747-1.813,0.96-2.667l85.547-394.987c0-0.213,0-0.427,0-0.64
                        c0.107-0.64,0.107-1.173,0.213-1.707C491.022,15.271,491.022,14.631,490.916,13.991z M190.009,291.324L36.836,219.218
                        L433.209,48.124L190.009,291.324z M202.809,437.138V321.831l53.653,28.267L202.809,437.138z M387.449,394.898l-100.8-53.013
                        l-18.133-11.2l-0.747,1.28l-57.707-30.4L462.116,49.298L387.449,394.898z"
                          />
                        </g>
                      </g>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default FavoriteRecipes;
