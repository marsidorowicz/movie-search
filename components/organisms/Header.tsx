/** @format */

import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import NavBarLinks from '../molecules/NavBarLinks'

function Header(props: { genre: any[] }) {
	const [scrolled, setScrolled] = useState(false)
	const router = useRouter()

	if (typeof window !== 'undefined') {
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
				<NavBarLinks router={router} genre={props?.genre} />
			</header>
		)
	} else {
		return <div>Loading</div>
	}
}

export default Header
