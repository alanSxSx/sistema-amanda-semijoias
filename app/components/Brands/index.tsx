import Image from 'next/image'
import React from 'react'
import logo from '../../src/img/Amanda-removebg-preview.png'

export function Brands() {
	return (
		<div className='flex pt-10 justify-center items-center'>
		<Image src={logo} width={500} height={500} alt='logo'/>
		</div>
	)
}
