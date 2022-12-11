/** @format */

import * as React from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useRef, useState } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import SearchIcon from '@mui/icons-material/Search'
import CheckboxesFilters from '../atoms/CheckboxesFilters'
import { UseLocalStorage } from '../../utilities/UseLocalStorage'

export default function ServerSideModal(props: { genre: any }) {
	const rootRef = useRef<HTMLDivElement>(null)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [title, setTitle] = UseLocalStorage('title', null)
	const [year, setYear] = UseLocalStorage('year', '2022')
	const [isValidYear, setIsValidYEar] = useState('')
	console.log('title')
	console.log(year)

	function search() {
		if (!year || year.length < 4 || parseInt(year) < 1900) {
			console.log('wrong year')
			setIsValidYEar('wrong year')
		}
	}

	return (
		<Box>
			<Button onClick={onOpen}>
				<div className='text-[#ff0000] pb-1'>
					<SearchIcon className='text-[7px] sm:text-[15px] md:text-[20px] lg:text-[25px]' />
				</div>
			</Button>
			<Box ref={rootRef}>
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
						sx={{
							position: 'relative',
							width: 400,
							color: 'black',
							bgcolor: 'white',
							border: '2px solid red',
							boxShadow: (theme) => theme.shadows[5],
							p: 4,
						}}>
						<Typography id='server-modal-title' variant='h6' component='h2' className='text-black'>
							Search a Movie
						</Typography>
						<CheckboxesFilters genre={props?.genre} />
						{/* {props?.genre?.genres?.length
							? props?.genre?.genres?.map((genre: any) => {
									console.log(genre)
							  })
							: ''} */}
						<Typography sx={{ pt: 2 }}>
							<input
								placeholder='Title'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									e.preventDefault()
									const newValue = e.target.value
									setTitle(newValue)
								}}></input>
						</Typography>
						<Typography sx={{ pt: 2 }}>
							<input
								placeholder='Year after 1900'
								type={'number'}
								value={year}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									e.preventDefault()
									const newValue = e.target.value
									console.log(newValue.length)
									if (newValue.length > 4) return
									setYear(newValue)
								}}></input>
						</Typography>

						<Button onClick={search} className='p-3 float-left'>
							SEARCH
						</Button>
						<Button onClick={onClose} className='p-3 float-right'>
							CLOSE
						</Button>
						<div className='text-red'>{isValidYear}</div>
					</Box>
				</Modal>
			</Box>
		</Box>
	)
}
