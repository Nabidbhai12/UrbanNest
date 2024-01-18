import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./button";
import { Img } from "./image";
import { List } from "./list";
import { Text } from "./text";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-600">UrbanNest</span>
          </h1>
        </Link>

        <form className="vg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
          />
          <button type="submit" className="ml-2">
            <FaSearch className="text-gray-500" />
          </button>
        </form>

        <ul className="flex  gap-3">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home fuck it!
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/search">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Search
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
