/** @format */

import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { UseLocalStorage } from '../../utilities/UseLocalStorage'
import { useDispatch, useSelector } from 'react-redux'
import { setFiltersAction } from '../../state/action-creators'
import { useEffect, useState } from 'react'

const icon = <CheckBoxOutlineBlankIcon className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px]' />
const checkedIcon = <CheckBoxIcon className='text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px]' />

export default function CheckboxesTags(props: { genre: { genres: any } }) {
	const dispatch = useDispatch()
	const [selectedFilters, setSelectedFilters] = UseLocalStorage('selectedFilters', '')
	const state = useSelector((state: any) => state.root)
	console.log(state)
	const [showChild, setShowChild] = useState(false)
	const [options, setOptions] = useState<any>([])

	if (!props?.genre) return null

	console.log('options')
	console.log(options)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			document.body.style.overflow = 'hidden'
		}

		setOptions(props?.genre?.genres)

		return () => {
			if (typeof window !== 'undefined') {
				document.body.style.overflow = 'unset'
			}
		}
	}, [])

	useEffect(() => {
		setShowChild(true)
	}, [])

	if (!showChild || (!options && !selectedFilters)) {
		return null
	}

	return (
		<Autocomplete
			multiple
			ChipProps={{
				sx: {
					p: 0.1,
					m: 0.1,
				},
				size: 'small',
				className: 'text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px]',
			}}
			ListboxProps={{
				className: 'text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] p-0 m-0 max-h-3rem ',
			}}
			id='checkboxes'
			options={props?.genre?.genres}
			disableCloseOnSelect
			sx={{
				overflowY: 'scroll',
				display: 'flex',
				maxHeight: '20vh',
			}}
			// filterSelectedOptions
			value={selectedFilters?.length ? selectedFilters : []}
			isOptionEqualToValue={(option, value) => option.name === value.name}
			getOptionLabel={(option: any) => option.name}
			onChange={(event: any, newValue: any | null) => {
				if (event.key === 'Enter') {
					// Prevent's default 'Enter' behavior.
					event.defaultMuiPrevented = true
					// your handler code
				}

				setSelectedFilters(newValue)
				dispatch(setFiltersAction(newValue))
			}}
			renderOption={(props, option, { selected }) => {
				const checkedConfirmed = selectedFilters?.length
					? selectedFilters?.filter((filter: any) => {
							return filter?.name === option?.name
					  })
					: []

				if (checkedConfirmed === null) return

				return (
					<li {...props}>
						<Checkbox
							className=''
							icon={icon}
							checkedIcon={checkedIcon}
							style={{ marginRight: 8 }}
							checked={Array.isArray(checkedConfirmed) && checkedConfirmed?.length ? true : false}
						/>
						{option.name}
					</li>
				)
			}}
			style={{ backgroundColor: 'white' }}
			renderInput={(params) => (
				<TextField
					className='text-white text-[6px] sm:text-[10px] md:text-[15px] lg:text-[15px] z-50'
					{...params}
					label='Filters'
					placeholder='Choose all you need'
				/>
			)}
		/>
	)
}
