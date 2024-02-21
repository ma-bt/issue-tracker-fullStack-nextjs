import Link from "next/link";
import React from "react";
import { GiLadybug } from "react-icons/gi";

const NavBar = () => {
  const navList = [
    {
      label: "DashBoard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="flex justify-between border-b py-5 px-6 items-center">
      <Link href={"/"}>
        <GiLadybug className="text-4xl" />
      </Link>
      <ul className="flex justify-center gap-3">
        {navList.map((e, index) => {
          return (
            <li key={index}>
              <Link
                href={e.href}
                className="text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                {e.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
