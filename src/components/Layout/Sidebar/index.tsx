import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Item = ({ href, text }: { href: string; text: string }) => {
  const { pathname } = useRouter();

  return (
    <Link
      href={href}
      className={`text-2lg capitalize text-lg transition-all ease-in hover:bg-primary hover:scale-105  p-2 rounded-md ${
        pathname === href && "bg-primary"
      }`}
    >
      {text}
    </Link>
  );
};
const links = [
  { href: "/", text: "dashboard" },
  { href: "/products", text: "products" },
  { href: "/users", text: "users" },
  { href: "/stats", text: "statistics" },
  { href: "/settings", text: "settings" },
];
const SideBar = () => {
  return (
    <div className="w-[250px] fixed left-0 px-5 h-screen border-r border-gray-200">
      <div className="my-[3rem]">
        <h1 className="text-2xl absolute top-5 font-bold">
          <span className="text-red-600">Smart</span>POS
        </h1>

        <div className="flex flex-col gap-4 pt-5">
          {links.map((link) => (
            <Item href={link.href} text={link.text} key={link.href} />
          ))}
        </div>
      </div>
      <footer className="absolute bottom-5 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Dishplug POS</p>
      </footer>
    </div>
  );
};

export default SideBar;
