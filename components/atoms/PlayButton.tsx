/** @format */

import React from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

function PlayButton(props: { topRatedElement: string; router: any }) {
	return (
		<div>
			{' '}
			<div className='p-2 flex justify-center'>
				<button
					className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold flex shadow-white shadow align-middle'
					onClick={() => props?.router.push(`/play/?id=${props?.topRatedElement || 'noId'}`)}>
					<PlayCircleOutlineIcon className='text-1xl sm:text-2xl md:text-4xl lg:text-6xl font-bold flex' />
					PLAY
				</button>
			</div>
		</div>
	)
}

export default PlayButton
