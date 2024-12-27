import { routing } from '@/i18n/routing';

export default function GlobalNotFound() {
  const locale = routing.defaultLocale;
  return (
    <html className="h-full" lang={locale}>
      <body>not founded</body>
    </html>
  );
}
