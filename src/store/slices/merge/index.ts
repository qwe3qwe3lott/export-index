import {MergeState} from './types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../index';
import {Country} from '../../../types/Country';

const initialState: MergeState = {
	countries: [],
	years: []
};

const mergeSlice = createSlice({
	name: 'merge',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchYears.fulfilled, ((state, action) => {
				state.years = action.payload;
			}))
			.addCase(fetchCountries.fulfilled, ((state, action) => {
				state.countries = action.payload;
			}));
	}
});

export const fetchYears = createAsyncThunk<number[], undefined, {state: RootState}>(
	'merge/fetchYears',
	async function () {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getYears`);
		if (!response.ok) return [];
		return await response.json() as number[];
	},
	{
		condition: (_, {getState}): boolean => getState().merge.years.length === 0
	}
);

export const fetchCountries = createAsyncThunk<Country[], undefined, {state: RootState}>(
	'merge/fetchCountries',
	async function () {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getCountries`);
		if (!response.ok) return [];
		return await response.json() as Country[];
	},
	{
		condition: (_, {getState}): boolean => getState().merge.countries.length === 0
	}
);

export default mergeSlice.reducer;