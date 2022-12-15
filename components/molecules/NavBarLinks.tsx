/** @format */

import React from 'react'
import HomeIconElement from '../atoms/HomeIconElement'
import LiveTv from '@mui/icons-material/LiveTv'
import ServerSideModal from '../organisms/ServerSideModal'
function NavBarLinks(props: { router: any; genre: any }) {
	return (
		<div className='flex items-center space-x-3 md:space-x-5 float-left m-1 p-2'>
			{' '}
			<ServerSideModal genre={props?.genre} />
			<LiveTv className=' text-[7px] sm:text-[12px] md:text-[15px] lg:text-[25px]' sx={{ color: 'red' }} />
			<HomeIconElement router={props?.router} />
			<ul className='hidden space-x-4 sm:flex text-[7px] sm:text-[12px] md:text-[15px] lg:text-[35px] xl:text-[55px]'>
				<li className='hLink' onClick={() => props?.router.push('/')}>
					Home
				</li>
				<li className='hLink' onClick={() => props?.router.push('/play?abc=123')}>
					About Us
				</li>
				<li className='hLink'>About Us</li>
				<li className='hLink'>About Us</li>
			</ul>
		</div>
	)
}

export default NavBarLinks
