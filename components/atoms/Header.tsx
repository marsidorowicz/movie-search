/** @format */

import LiveTv from '@mui/icons-material/LiveTv'
import { useEffect, useState } from 'react'
import ServerSideModal from '../organisms/ServerSideModal'
import { useRouter } from 'next/router'
import HomeIcon from '@mui/icons-material/Home'

function Header(props: { genre: any[]}) {
	const [scrolled, setScrolled] = useState(false)
	const router = useRouter()

	if (typeof window !== 'undefined') {
		// browser code
		useEffect(() => {
			const handleScroll = () => {
				if (window.scrollY > 0) {
					setScrolled(true)
				} else {
					setScrolled(false)
				}
			}
			window.addEventListener('scroll', handleScroll)
			return () => {
				window.removeEventListener('scroll', handleScroll)
			}
		}, [])

		return (
			<header className={` ${scrolled && 'bg-black w-full '} p-0.1 max-h-[1rem] sm:max-h-[2rem] md:max-h-[3rem] lg:max-h-[3rem]`}>
				<div className='flex items-center space-x-3 md:space-x-5 float-left m-1 '>
					<LiveTv className=' text-[7px] sm:text-[12px] md:text-[15px] lg:text-[25px]' sx={{ color: 'red' }} />
					<HomeIcon
						className='flex sm:hidden text-[7px] sm:text-[12px] md:text-[15px] lg:text-[25px] cursor-pointer'
						sx={{ color: 'red' }}
						onClick={() => router.push('/')}
					/>
					<ServerSideModal genre={props?.genre}} />
					<ul className='hidden space-x-4 sm:flex text-[7px] sm:text-[12px] md:text-[15px] lg:text-[35px] xl:text-[55px]'>
						<li className='hLink' onClick={() => router.push('/')}>
							Home
						</li>
						<li className='hLink' onClick={() => router.push('/play?abc=123')}>
							About Us
						</li>
						<li className='hLink'>About Us</li>
						<li className='hLink'>About Us</li>
					</ul>
				</div>
				<div className='flex float-right ml-1'></div>
			</header>
		)
	}
}

export default Header
