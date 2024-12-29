import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'] as const,
  defaultLocale: 'es' as const,
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/contacto': {
      es: '/contacto',
      en: '/contact',
    },
    '/productos': {
      es: '/productos',
      en: '/products',
    },
    '/turnos': {
      es: '/turnos',
      en: '/shifts',
    },
    '/servicios': {
      es: '/servicios',
      en: '/services',
    },
    '/horarios': {
      es: '/horarios',
      en: '/schedules',
    },
    '/redirect': '/redirect',
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
