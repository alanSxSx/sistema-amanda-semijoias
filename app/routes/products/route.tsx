import { revalidatePath } from 'next/cache';
import React from 'react'
import { baseURL } from '../route';

export async function getProducts() {

    const response = await fetch(`${baseURL}/products`,{ next: { revalidate: 0 } })
    const data = await response.json();

  return data
}
