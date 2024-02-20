import React from 'react'

export async function GET() {

    const response = await fetch('http://localhost:8080/products')
    const data = await response.json();

  return Response.json({data})
}
