import React from 'react'
import { Doughnut } from './Charts'

export function Dashboard() {
	return (
		<div className='flex gap-10 pt-10 flex-wrap items-center justify-center'>
				<Doughnut name={['Category A', 'Category B', 'Category C']} title='Produtos'/>
				<Doughnut name={['Category A', 'Category B', 'Category C']} title='Clientes'/>
				<Doughnut name={['Category A', 'Category B', 'Category C']} title='Vendas'/>
		</div>
	)
}
