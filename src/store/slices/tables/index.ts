import {RowsPerPage, TablesState} from './types';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Technology} from '../../../types/Technology';
import {RootState} from '../../index';
import {SortSetup} from '../../../types/SortSetup';
import {Country} from '../../../types/Country';
import {Product} from '../../../types/Product';

const initialState: TablesState = {
	countries: [],
	chosenCountry: null,
	years: [],
	chosenYear: 0,

	technologies: [],
	currentTechnologiesPage: 1,
	rowsPerTechnologiesPage: RowsPerPage.FEW,
	technologiesSortSetup: { property: 'index', sortAtoZ: false },

	chosenTechnology: null,
	currentProductsPage: 1,
	rowsPerProductsPage: RowsPerPage.FEW,
	productsSortSetup: { property: 'id', sortAtoZ: true }
};

const tablesSlice = createSlice({
	name: 'tables',
	initialState,
	reducers: {
		setChosenYear(state, action: PayloadAction<number>) {
			state.chosenYear = action.payload;
		},
		setChosenTechnology(state, action: PayloadAction<Technology | null>) {
			if (!action.payload) {
				state.chosenTechnology = null;
				return;
			}
			if (action.payload.products.length === 0) return;
			state.chosenTechnology = action.payload;
			state.currentProductsPage = 1;
			state.productsSortSetup = { property: 'id', sortAtoZ: true };
		},
		setChosenCountry(state, action: PayloadAction<number>) {
			const country = state.countries.find(country => country.id === action.payload);
			if (!country) return;
			state.chosenCountry = country;
		},
		setRowsPerTechnologiesPage(state, action: PayloadAction<RowsPerPage>) {
			state.rowsPerTechnologiesPage = action.payload;
			state.currentTechnologiesPage = 1;
		},
		setTechnologiesCurrentPage(state, action: PayloadAction<number>) {
			state.currentTechnologiesPage = action.payload;
		},
		setTechnologiesSortSetup(state, action: PayloadAction<SortSetup<Technology>>) {
			state.technologiesSortSetup = action.payload;
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
		},
		setRowsPerProductsPage(state, action: PayloadAction<RowsPerPage>) {
			state.rowsPerProductsPage = action.payload;
			state.currentProductsPage = 1;
		},
		setProductsCurrentPage(state, action: PayloadAction<number>) {
			state.currentProductsPage = action.payload;
		},
		setProductsSortSetup(state, action: PayloadAction<SortSetup<Product>>) {
			if (!state.chosenTechnology) return;
			state.productsSortSetup = action.payload;
			switch (action.payload.property) {
			case 'title':
				state.chosenTechnology.products = state.chosenTechnology.products.sort((a, b) => {
					if (a.title < b.title) return action.payload.sortAtoZ ? -1 : 1;
					if (a.title > b.title) return action.payload.sortAtoZ ? 1 : -1;
					return 0;
				});
				break;
			}
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchYears.fulfilled, ((state, action) => {
				state.years = action.payload;
			}))
			.addCase(fetchCountries.fulfilled, ((state, action) => {
				state.countries = action.payload;
			}))
			.addCase(fetchTechnologies.fulfilled, ((state, action) => {
				state.technologies = action.payload;
				state.currentTechnologiesPage = 1;
				state.technologiesSortSetup = { property: 'index', sortAtoZ: false };
			}));
	}
});

export const fetchYears = createAsyncThunk<number[], undefined, {state: RootState}>(
	'tables/fetchYears',
	async function () {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getYears`);
		if (!response.ok) return [];
		return await response.json() as number[];
	},
	{
		condition: (_, {getState}): boolean => getState().tables.years.length === 0
	}
);

export const fetchCountries = createAsyncThunk<Country[], undefined, {state: RootState}>(
	'tables/fetchCountries',
	async function () {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getCountries`);
		if (!response.ok) return [];
		return await response.json() as Country[];
	},
	{
		condition: (_, {getState}): boolean => getState().tables.countries.length === 0
	}
);

export const fetchTechnologies = createAsyncThunk<Technology[], undefined, {state: RootState, rejectValue: undefined }>(
	'tables/fetchTechnologies',
	async function (_, {getState, rejectWithValue }) {
		const year: number = getState().tables.chosenYear;
		const country: Country | null = getState().tables.chosenCountry;
		if (!year || !country) return rejectWithValue(undefined);
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}getExportIndexes?countryId=${country.id}&year=${year}`);
		if (!response.ok) return [];
		return await response.json() as Technology[];
	},
	{
		condition: (_, {getState}): boolean => !!getState().tables.chosenCountry && !!getState().tables.chosenYear
	}
);

export const {setChosenTechnology, setChosenCountry, setChosenYear, setRowsPerTechnologiesPage,
	setTechnologiesCurrentPage, setTechnologiesSortSetup, setRowsPerProductsPage, setProductsCurrentPage, setProductsSortSetup} = tablesSlice.actions;
export default tablesSlice.reducer;