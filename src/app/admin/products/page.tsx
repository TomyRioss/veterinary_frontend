import { DataTable } from '../_components/Datatable';
import { AdminIndexPage } from '../_components/Index';
import { columns } from './columns';

import db from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatters';

async function getData() {
  const data = await db.product.findMany({
    select: {
      id: true,
      priceInCents: true,
      stock: true,
      isAvailableForPurchase: true,
      Subcategory: {
        select: {
          name: true,
        },
      },
      Brand: {
        select: {
          name: true,
        },
      },
      Images: {
        select: {
          url: true,
        },
      },
      VariationValues: {
        include: {
          attributeValue: {
            select: {
              value: true,
              attribute: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  // Transform the data to match the expected format
  const parsedData = data.map((product) => {
    // Extract subcategory name
    const subcategoryName = product.Subcategory?.name ?? '';

    // Extract and concatenate attribute values
    const attributeValues = product.VariationValues.map(
      (variation) => variation.attributeValue.value,
    ).join(' ');

    // Construct the name field
    const name = `${subcategoryName} ${attributeValues}`.trim();

    return {
      id: product.id,
      name, // Dynamic name with subcategory and attributes
      price: formatCurrency(product.priceInCents / 100),
      stock: formatNumber(product.stock),
      isAvailable: product.isAvailableForPurchase,
      brand: product.Brand?.name ?? '',
      images: product.Images?.map((img) => img.url) ?? [],
      attributes: product.VariationValues.reduce(
        (acc, variation) => {
          const attributeName = variation.attributeValue.attribute.name;
          const attributeValue = variation.attributeValue.value;
          acc[attributeName] = attributeValue;
          return acc;
        },
        {} as Record<string, string>,
      ), // Creates the object with attribute names as keys
    };
  });

  return parsedData;
}

export default async function AdminProductsIndex() {
  const products = await getData();

  return (
    <AdminIndexPage
      title="Products"
      newItemHref="/admin/products/details"
      newItemLabel="New Product"
      DataTableComponent={<DataTable columns={columns} data={products} />}
    />
  );
}
