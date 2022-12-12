/** @format */

import React, { FunctionComponent } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

type SimpleNotificationProps = {
	message: string
	open: boolean
	setOpen: (open: boolean) => void
	vertical?: 'top' | 'bottom'
	horizontal?: 'right' | 'left' | 'center'
	severity: any
	time: number
}

const SimpleNotification: FunctionComponent<SimpleNotificationProps> = ({ message, open, setOpen, vertical, horizontal, severity, time }) => {
	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		setOpen(false)
	}

	return (
		<Snackbar
			anchorOrigin={{
				vertical: vertical || 'bottom',
				horizontal: horizontal || 'center',
			}}
			open={open}
			autoHideDuration={time}
			onClose={handleClose}>
			<Alert onClose={() => setOpen(false)} severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default SimpleNotification
