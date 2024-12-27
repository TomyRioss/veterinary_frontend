import React from 'react';
import { FaPaw } from 'react-icons/fa';

import { useTranslations } from 'next-intl';

import NavLink from './nav-link';

import { menusList } from '@/config/menu';
import { Link } from '@/i18n/routing';

function NavBar() {
  const t = useTranslations('Navigation');
  const menus = menusList.map(({ name, path }) => (
    <NavLink href={path} key={path}>
      {t(name)}
    </NavLink>
  ));

  return (
    <header className="flex justify-between items-center w-full h-16 text-white text-lightGreen bg-darkGreen  px-10  py-4">
      <Link href={'/'} className="flex gap-5">
        <FaPaw className="w-8 h-8 " />
        <h2 className="text-2xl"> AnimalCare </h2>
      </Link>

      {/* Mapeo de menu para el navbar*/}
      <div className="flex gap-8">
        <nav className="flex gap-4">{menus}</nav>
        <div> login area </div>
      </div>
    </header>
  );
}

export default NavBar;
