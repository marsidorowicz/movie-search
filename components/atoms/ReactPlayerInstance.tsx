/** @format */

import React from 'react'
import ReactPlayer from 'react-player'

function ReactPlayerInstance(props: { url: string }) {
	return (
		<div>
			{' '}
			<div className='flex flex-wrap justify-center'>
				<ReactPlayer url={props?.url} height={'90%'} width={'60%'} style={{ objectFit: 'cover', maxHeight: '80%' }} />
			</div>
		</div>
	)
}

export default ReactPlayerInstance
