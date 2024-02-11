import Link from 'next/link'
import React from 'react'

export function Header() {
	return (
		<div className=' bg-red-900 rounded-md h-20 flex flex-row items-center justify-center gap-16'>
		<Link href="/home" className=' text-white rounded-md p-3 font-semibold hover:text-gray-300'>HOME</Link>
		<Link href="/produtos" className=' text-white rounded-md p-3 font-semibold hover:text-gray-300'>PRODUTOS</Link>
		<Link href="/clientes" className=' text-white rounded-md p-3 font-semibold hover:text-gray-300'>CLIENTES</Link>
		<Link href="/revendedor" className=' text-white rounded-md p-3 font-semibold hover:text-gray-300'>REVENDEDOR</Link>
		<Link href="/vendas" className=' text-white rounded-md p-3 font-semibold hover:text-gray-300'>VENDAS</Link>
		<Link href="/estoque" className=' text-white rounded-md p-3 font-semibold hover:text-gray-300'>ESTOQUE</Link>
		<Link href="/montagem" className=' text-white rounded-md p-3 font-semibold hover:text-gray-300'>MONTAGEM KIT</Link>
		<Link href="/acerto" className=' text-white rounded-md p-3 font-semibold hover:text-gray-300'>ACERTO</Link>
		</div>
	)
}
