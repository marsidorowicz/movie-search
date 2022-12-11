/** @format */

import * as React from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useRef, useState } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import SearchIcon from '@mui/icons-material/Search'

export default function ServerSideModal() {
	const rootRef = useRef<HTMLDivElement>(null)
	const { isOpen, onOpen, onClose } = useDisclosure()

	function search() {}

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
							bgcolor: 'black',
							border: '2px solid red',
							boxShadow: (theme) => theme.shadows[5],
							p: 4,
						}}>
						<Typography id='server-modal-title' variant='h6' component='h2' className='text-white'>
							Search a Movie
						</Typography>
						<Typography sx={{ pt: 2 }}>
							<input placeholder='Title'></input>
						</Typography>
						<Typography sx={{ pt: 2 }}>
							<input placeholder='Title'></input>
						</Typography>
						<Button onClick={search} className='text-white p-3 float-left'>
							SEARCH
						</Button>
						<Button onClick={onClose} className='text-white p-3 float-right'>
							CLOSE
						</Button>
					</Box>
				</Modal>
			</Box>
		</Box>
	)
}
