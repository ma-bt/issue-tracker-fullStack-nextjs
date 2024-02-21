"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GiLadybug } from "react-icons/gi";
import classnames  from "classnames";

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

  const currentPath = usePathname();
  console.log(currentPath);
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
                className={classnames({
                    "text-zinc-800": e.href === currentPath ,
                    "text-zinc-500": e.href !== currentPath,
                    "hover:text-zinc-800 transition-colors font-semibold ": true ,
                })}
                    
                    // ` ${currentPath === e.href ? " text-zinc-800 " : " text-zinc-500 "}  `
                
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
