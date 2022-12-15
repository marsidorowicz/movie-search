/** @format */

import React from 'react'
import Image from 'next/image'

function MainPosterImage(props: { url: string; title: string }) {
	return (
		<div>
			{' '}
			<div className='absolute left-0 top-0 h-[80vh] w-screen -z-10 flex lg:justify-end'>
				<Image src={props?.url || ''} alt={props?.title || 'no title'} style={{ objectFit: 'cover' }} fill priority />
			</div>
		</div>
	)
}

export default MainPosterImage
