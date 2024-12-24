import React from 'react';
import { FaPaw, FaShoppingCart, FaUser } from 'react-icons/fa';

import Link from 'next/link';

import { menu } from './menu';

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-16 tet-wxhite text-lightGreen bg-darkGreen ">
      <div>
        <Link
          href={'/'}
          className="flex gap-5 ml-10 justify-center items-center text-lightGreen hover:text-green-300"
        >
          <FaPaw className="w-16 h-16 " />
          <div>
            <h2 className="text-2xl"> AnimalCare </h2>
            <h3 className="whitespace-nowrap">
              The Place for the Animal Care.
            </h3>
          </div>
        </Link>
      </div>

      {/* Mapeo de menu para el navbar*/}
      <ul className="flex gap-10 items-center mx-10">
        {menu.map((item, index) => (
          <li key={index} className="text-lightGreen hover:text-green-300">
            <Link href={item.path}>
              <h2>{item.name}</h2>
            </Link>
          </li>
        ))}
        {/* Iconos para el navbar, carrito y User*/}
        <li className="text-lightGreen hover:text-green-300">
          <Link href={'/home'}>
            <FaShoppingCart />
          </Link>
        </li>
        <li className="text-lightGreen hover:text-green-300">
          {/* Debe desplegar un modal para iniciar sesión y registrarse, aún por añadir.*/}
          <FaUser />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
