import { getData } from '../../categories/page';
import { SubcategoriesForm } from '../_components/Form';

export default async function Details() {
  const data = (await getData()) || [];
  const categories = data.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }));
  return <SubcategoriesForm categories={categories} />;
}
