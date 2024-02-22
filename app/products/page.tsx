'use server'
import React from 'react'
import Products from '../components/TableData'
import { getProducts } from '../routes/products/route'


export default async function page() {
  const data = await getProducts();

  return (
    <>
    <Products productsData={data} />
    </>
  );
}