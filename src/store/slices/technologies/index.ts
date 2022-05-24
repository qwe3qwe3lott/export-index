import {TechnologiesState} from './types';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Technology} from '../../../types/Technology';
import {RootState} from '../../index';
import {SortSetup} from '../../../types/SortSetup';
import {Country} from '../../../types/Country';
import {RowsPerPage} from '../../../enums/RowsPerPage';
import {setTechnologies} from '../merge';

const initialState: TechnologiesState = {
	chosenCountry: -1,
	chosenYear: 0,

	isLoading: false,

	technologies: [],
	currentPage: 1,
	rowsPerPage: RowsPerPage.FEW,
	sortSetup: { property: 'index', sortAtoZ: false }
};

const tablesSlice = createSlice({
	name: 'technologies',
	initialState,
	reducers: {
		setChosenYear(state, action: PayloadAction<number>) {
			state.chosenYear = action.payload;
		},
		setChosenCountry(state, action: PayloadAction<Country | 0>) {
			if (!action.payload) return;
			state.chosenCountry = action.payload;
		},
		setRowsPerPage(state, action: PayloadAction<RowsPerPage>) {
			state.rowsPerPage = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSortSetup(state, action: PayloadAction<SortSetup<Technology>>) {
			state.sortSetup = action.payload;
			switch (action.payload.property) {
			case 'title':
				state.technologies = state.technologies.sort((a, b) => {
					if (a.title < b.title) return action.payload.sortAtoZ ? -1 : 1;
					if (a.title > b.title) return action.payload.sortAtoZ ? 1 : -1;
					return 0;
				});
				break;
			case 'index':
				state.technologies = state.technologies.sort((a, b) => action.payload.sortAtoZ ? a.index - b.index : b.index - a.index);
				break;
			case 'products':
				state.technologies = state.technologies.sort((a, b) => action.payload.sortAtoZ ? a.products.length - b.products.length : b.products.length - a.products.length);
				break;
			}
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchTechnologies.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchTechnologies.fulfilled, ((state, action) => {
				state.technologies = action.payload;
				state.currentPage = 1;
				state.sortSetup = { property: 'index', sortAtoZ: false };
				state.isLoading = false;
			}))
			.addCase(fetchTechnologies.rejected, (state) => {
				state.isLoading = false;
			});
	}
});


export const fetchTechnologies = createAsyncThunk<Technology[], undefined, {state: RootState, rejectValue: undefined }>(
	'technologies/fetchTechnologies',
	async function (_, {getState, dispatch, rejectWithValue }) {
		const year: number = getState().technologies.chosenYear;
		const country: Country | -1 = getState().technologies.chosenCountry;
		if (!year || country === -1) return rejectWithValue(undefined);
		const technologiesThrowYears = getState().merge.technologiesThrowYearsAndCountries[country.id];
		console.log(technologiesThrowYears);
		if (technologiesThrowYears) {
			const technologies = technologiesThrowYears[year];
			console.log(technologies);
			if (technologies) return technologies;
		}
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getITSIndexes?countryId=${country.id}&year=${year}`);
		if (!response.ok) return rejectWithValue(undefined);
		const technologies = await response.json() as Technology[];
		dispatch(setTechnologies({year, countryId: country.id, technologies}));
		console.log(technologies);
		return technologies;
	},
	{
		condition: (_, {getState}): boolean => !!getState().technologies.chosenCountry && !!getState().technologies.chosenYear
	}
);

export const {setRowsPerPage, setCurrentPage, setSortSetup, setChosenCountry, setChosenYear} = tablesSlice.actions;
export default tablesSlice.reducer;