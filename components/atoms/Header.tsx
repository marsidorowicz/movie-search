/** @format */

import LiveTv from '@mui/icons-material/LiveTv'
import { useEffect, useState } from 'react'
import ServerSideModal from '../organisms/ServerSideModal'
import { useRouter } from 'next/router'

function Header(props: { genre: any[]; sendData: (data: any) => void }) {
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
			<header className={`${scrolled && 'bg-black  w-full'} p-1`}>
				<div className='flex items-center space-x-3 md:space-x-5 float-left m-1 '>
					<LiveTv className=' text-[7px] sm:text-[12px] md:text-[15px] lg:text-[25px]' sx={{ color: 'red' }} />
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
				<div className='flex float-right ml-1'>
					<ServerSideModal genre={props?.genre} sendData={(data: any) => props?.sendData(data)} />
				</div>
			</header>
		)
	}
}

export default Header
