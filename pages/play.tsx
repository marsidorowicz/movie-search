/** @format */

import React from 'react'
import Layout from '../components/organisms/Layout'

function play() {
	if (typeof window !== 'undefined') {
		let arrOfObjects = {}
		let url = new URL(window.location.href)
		const searchParams: any = new URLSearchParams(url.search)
		for (const [key, value] of searchParams.entries()) {
			console.log(`${key}, ${value}`)
			arrOfObjects[key] = value
		}
		console.log('arrOfObjects')
		console.log(arrOfObjects)
	}
	return (
		<div>
			<Layout sendData={() => console.log()} genre={null}>
				<div>PLAY</div>
			</Layout>
		</div>
	)
}

export default play
