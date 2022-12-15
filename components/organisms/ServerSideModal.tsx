/** @format */

import * as React from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useEffect, useRef, useState } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import SearchIcon from '@mui/icons-material/Search'
import CheckboxesFilters from '../atoms/CheckboxesFilters'
import { UseLocalStorage } from '../../utilities/UseLocalStorage'
import SimpleNotification from '../../utilities/SimpleNotifications'
import req, { searchMovie } from '../../utilities/apiReqs'
import { useDispatch, useSelector } from 'react-redux'
import { setDataAction, setTitleAction, setYearAction } from '../../state/action-creators'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function ServerSideModal(props: { genre: any }) {
	const dispatch = useDispatch()
	const [showChild, setShowChild] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [title, setTitle] = UseLocalStorage('title', null)
	const [year, setYear] = UseLocalStorage('year', '')
	const [isValidYear, setIsValidYEar] = useState('')
	const [open, setOpen] = useState<boolean>(false)
	const [severity, setSeverity] = useState<string>('error')
	const [msg, setMsg] = useState<string>('error')
	const [dataFromFilters, setDataFromFilters] = UseLocalStorage('dataFromFilters', '')

	const [selectedFilters, setSelectedFilters] = UseLocalStorage('selectedFilters', '')
	const state = useSelector((state: any) => state.root)
	const router = useRouter()
	let ids: string = ''
	useEffect(() => {
		setYear('')
		setShowChild(true)
	}, [])
	console.log(state)

	useEffect(() => {
		if (!state) return
		if (state?.root?.filtersSelected?.length) {
			setSelectedFilters(state?.root?.filtersSelected)
		}
		return () => {}
	}, [state?.root?.filtersSelected])

	// useEffect(() => {
	// 	if (!dataFromFilters) return
	// 	props?.sendData(dataFromFilters)
	// 	return () => {}
	// }, [dataFromFilters])

	if (!state) return

	const searchMovieFunction = async () => {
		let idPref = '&with_genres='
		ids = ''

		const idsFiltering = state?.root.filtersSelected?.length
			? state?.root.filtersSelected?.map((filter: any) => {
					return filter?.id
			  })
			: selectedFilters?.length > 0
			? selectedFilters?.map((filter: any) => {
					return filter?.id
			  })
			: []

		if (idsFiltering?.length > 0) {
			for (let item in idsFiltering) {
				ids += idsFiltering[item] + ','
			}
		}
		if (!title && year) {
			try {
				const res = await fetch(req.year + '&year=' + year + idPref + ids).then((res) => res.json())
				console.log('res*****************************************')
				console.log(res)

				setDataFromFilters(res)
				dispatch(setDataAction(res))
				onClose()
				if (!year && !title) return
				// router.push(`/${year ? '?year=' + year : '?'} ${title ? '&title=' + title : ''} ${ids ? '&genres=' + ids : ''}`)
				return
			} catch (error) {
				console.log(error)
			}
		}
		console.log('here')
		try {
			const res = await axios.post(
				'/api/fetchSearchMovieHttps',
				JSON.stringify({
					year: year,
					title: title,
					genre: selectedFilters?.length > 0 ? selectedFilters : [],
				}),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: false,
				}
			)
			console.log('res1111111111111111111111111111111111')
			console.log(res)
			console.log(selectedFilters)

			if (!res) {
				setMsg('no response')
				setSeverity('error')
				setOpen(true)
				return
			}

			setDataFromFilters(res?.data)
			dispatch(setDataAction(res?.data))

			onClose()
			if (!year && !title) return
			// router.push(`/${year ? '?year=' + year : '?'} ${title ? '&title=' + title : ''} ${ids ? '&genres=' + ids : ''}`)
		} catch (error) {
			console.log(error)
		}
	}

	function search() {
		if ((year && year < 4) || (year && parseInt(year) < 1900)) {
			setMsg('wrong year')
			setSeverity('error')
			setOpen(true)
			return
		}

		// router.push(`?year=${year}`)
		dispatch(setYearAction(year))
		if (!title && year) {
			searchMovieFunction()
		} else if (!title && !year) {
			setMsg('title or year is required required')
			setSeverity('error')
			setOpen(true)
			router.push(`/`)

			return
		}
		searchMovieFunction()
	}

	if (!showChild) {
		return null
	}

	return (
		<Box>
			<SimpleNotification open={open} setOpen={setOpen} message={msg} severity={severity} time={10000} />
			<Button onClick={onOpen}>
				<div className='text-[#ff0000] pb-1'>
					<SearchIcon className='text-[7px] sm:text-[15px] md:text-[20px] lg:text-[25px]' />
				</div>
			</Button>
			<Box ref={rootRef} className='text-[7px] sm:text-[15px] md:text-[20px] lg:text-[25px] w-full'>
				<Modal
					disablePortal
					disableEnforceFocus
					disableAutoFocus
					open={isOpen}
					onClose={onClose}
					aria-labelledby='server-modal-title'
					aria-describedby='server-modal-description'
					sx={{
						display: 'flex',
						p: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					container={() => rootRef.current}>
					<Box
						className='w-[80%] sm:w-[60&] md:w-[70%] lg:w-[50%]'
						sx={{
							position: 'relative',
							color: 'black',
							bgcolor: 'black',
							border: '1px solid red',
							boxShadow: (theme) => theme.shadows[5],
							p: 1,
						}}>
						<Typography id='server-modal-title' variant='h6' component='h2' className='text-white text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>
							Search a Movie
						</Typography>
						{props?.genre ? (
							<div className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>
								<CheckboxesFilters genre={props?.genre} />
							</div>
						) : (
							''
						)}

						<Typography sx={{ pt: 2, pl: 1 }} className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>
							<input
								className='p-1'
								placeholder='Title'
								value={title}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									e.preventDefault()
									const newValue = e.target.value
									setTitle(newValue)
									dispatch(setTitleAction(newValue))
								}}></input>
						</Typography>
						<Typography sx={{ pt: 2 }} className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-2'>
							<input
								id='yearInput'
								className='p-1'
								placeholder='Year after 1900'
								type={'number'}
								value={year}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									e.preventDefault()
									const newValue = e.target.value
									if (newValue?.length > 4) return
									setYear(newValue)
									dispatch(setYearAction(newValue))
								}}></input>
						</Typography>

						<Button onClick={search} className='p-1 float-left text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] bg-black text-white'>
							SEARCH
						</Button>
						<Button onClick={onClose} className='p-1 float-right text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px]  bg-black text-white'>
							CLOSE
						</Button>
					</Box>
				</Modal>
			</Box>
		</Box>
	)
}
