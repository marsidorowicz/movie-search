/** @format */

import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { UseLocalStorage } from '../../utilities/UseLocalStorage'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function CheckboxesTags(props: { genre: any }) {
	const [selectedFilters, setSelectedFilters] = UseLocalStorage('selectedFilters', null)

	if (!props?.genre) return null

	return (
		<Autocomplete
			multiple
			id='checkboxes'
			options={props?.genre?.genres}
			disableCloseOnSelect
			// filterSelectedOptions
			value={selectedFilters}
			isOptionEqualToValue={(option, value) => option.name === value.name}
			getOptionLabel={(option: any) => option.name}
			onChange={(event: any, newValue: any | null) => {
				if (event.key === 'Enter') {
					// Prevent's default 'Enter' behavior.
					event.defaultMuiPrevented = true
					// your handler code
				}

				setSelectedFilters(newValue)
			}}
			renderOption={(props, option, { selected }) => {
				selectedFilters.filter((filter: any) => {
					filter?.name === option?.name
				})

				const checkedConfirmed = selectedFilters.filter((filter: any) => {
					return filter?.name === option?.name
				})

				return (
					<li {...props}>
						<Checkbox
							className='text-blue-500 bg-white'
							icon={icon}
							checkedIcon={checkedIcon}
							style={{ marginRight: 8 }}
							checked={checkedConfirmed.length ? true : false}
						/>
						{option.name}
					</li>
				)
			}}
			style={{ backgroundColor: 'white' }}
			renderInput={(params) => <TextField className='text-black' {...params} label='Filters' placeholder='Choose all you need' />}
		/>
	)
}
