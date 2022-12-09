/** @format */

import LiveTv from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useEffect, useState } from 'react';

function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header className={`${scrolled && 'bg-black'}`}>
			<div className='flex items-center space-x-2 md:space-x-10 float-left p-2'>
				<LiveTv sx={{ color: 'red' }} />
				<ul className='hidden space-x-5 md:flex'>
					<li className='hLink'>Home</li>
					<li className='hLink'>About Us</li>
					<li className='hLink'>About Us</li>
					<li className='hLink'>About Us</li>
				</ul>
			</div>
			<div className='flex float-right'>
				<SearchIcon className='m-2' sx={{ color: 'red' }} />
				<NotificationsActiveIcon className='m-2' sx={{ color: 'red' }} />
			</div>
		</header>
	);
}

export default Header;
