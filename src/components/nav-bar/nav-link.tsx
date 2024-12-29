'use client';

import React from 'react';

import { Link, type Pathnames, usePathname } from '@/i18n/routing';

function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: Pathnames;
}) {
  const pathname = usePathname();
  const className =
    pathname.toString() === href.toString()
      ? 'text-white bg-darkGreen '
      : 'text-lightGreen ';
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default NavLink;
