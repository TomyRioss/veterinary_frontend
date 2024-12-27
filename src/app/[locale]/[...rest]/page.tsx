import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  console.log('not found');
  notFound();
}
