/** @format */

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useTranslation from 'next-translate/useTranslation'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { setTitleAction } from '../../state/action-creators'
import { UseLocalStorage } from '../../utilities/UseLocalStorage'

const Home = (props: { children: any }) => {
	const dispatch = useDispatch()
	const state = useSelector((state: any) => state.root)
	const { t } = useTranslation('home')
	const router = useRouter()
	const [title, setTitle] = UseLocalStorage('title', '')

	if (typeof window !== 'undefined') {
		let url = new URL(window.location.href)
		console.log(url.search)
	}

	useEffect(() => {
		if (!title) return
		dispatch(setTitleAction(title))
		return () => {}
	}, [])

	return <div>{props?.children}</div>
}

export default Home
