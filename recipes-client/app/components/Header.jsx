import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex items-center px-6 md:px-16 py-6 justify-between bg-center sticky top-0 z-10   bg-white border-b border-gray-200">
    <Link href="/" className="flex flex-grow-0 flex-shrink-0 flex-basis-auto">
      <h1 className="text-2xl font-bold duration-200 ease-linear text-black ">
        GF Recipes
      </h1>
    </Link>

    <nav
      className="hidden md:flex md:items-center space-x-8 text-lg "
      aria-label="main"
    >
      <Link
        href="/favorites"
        className=" duration-200 ease-linear hover:scale-105 text-black  "
      >
        Favorite recipes
      </Link>
     <Link href="/login">Log in</Link>

      <Link href="/signup" className="bg-orange-400 rounded-full p-1 text-white">
    Sign up
      </Link>
    </nav>
  </header>
  )
}

export default Header