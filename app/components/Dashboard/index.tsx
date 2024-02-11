import React from 'react'
import { Doughnut } from './Charts'

export function Dashboard() {
	return (
		<div className='flex flex-row justify-evenly items-center w-full'>
				<Doughnut name={['Category A', 'Category B', 'Category C']} title='Produtos'/>
				<Doughnut name={['Category A', 'Category B', 'Category C']} title='Clientes'/>
				<Doughnut name={['Category A', 'Category B', 'Category C']} title='Vendas'/>
		</div>
	)
}
