import {MergeState} from './types';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../index';
import {Country} from '../../../types/Country';
import {Technology} from '../../../types/Technology';

const initialState: MergeState = {
	countries: [],
	years: [],

	technologiesThrowYearsAndCountries: {}
};

const mergeSlice = createSlice({
	name: 'merge',
	initialState,
	reducers: {
		setTechnologies(state, action: PayloadAction<{ year: number, countryId: number, technologies: Technology[] }>) {
			let technologiesThrowYears = state.technologiesThrowYearsAndCountries[action.payload.countryId];
			if (!technologiesThrowYears) {
				state.technologiesThrowYearsAndCountries[action.payload.countryId] = {};
				technologiesThrowYears = state.technologiesThrowYearsAndCountries[action.payload.countryId];
			}
			technologiesThrowYears[action.payload.year] = action.payload.technologies;
		}
	},
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
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getITSYears`);
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
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getITSCountries`);
		if (!response.ok) return [];
		return await response.json() as Country[];
	},
	{
		condition: (_, {getState}): boolean => getState().merge.countries.length === 0
	}
);

export const {setTechnologies} = mergeSlice.actions;
export default mergeSlice.reducer;