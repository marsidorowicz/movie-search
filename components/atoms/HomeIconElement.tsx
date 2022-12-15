/** @format */

import React from 'react'
import HomeIcon from '@mui/icons-material/Home'

function HomeIconElement(props: { router: any }) {
	return (
		<div>
			{' '}
			<HomeIcon
				className='flex sm:hidden text-[7px] sm:text-[12px] md:text-[15px] lg:text-[25px] cursor-pointer'
				sx={{ color: 'red' }}
				onClick={() => props?.router.push('/')}
			/>
		</div>
	)
}

export default HomeIconElement
