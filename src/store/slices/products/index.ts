import {ProductsState} from './types';
import {RowsPerPage} from '../../../enums/RowsPerPage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Technology} from '../../../types/Technology';
import {SortSetup} from '../../../types/SortSetup';
import {Product} from '../../../types/Product';

const initialState: ProductsState = {
	chosenTechnology: null,
	currentPage: 1,
	rowsPerPage: RowsPerPage.FEW,
	sortSetup: { property: 'id', sortAtoZ: true}
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setChosenTechnology(state, action: PayloadAction<Technology | null>) {
			if (!action.payload) {
				state.chosenTechnology = null;
				return;
			}
			if (action.payload.products.length === 0) return;
			state.chosenTechnology = action.payload;
			state.currentPage = 1;
			state.sortSetup = { property: 'id', sortAtoZ: true };
		},
		setRowsPerPage(state, action: PayloadAction<RowsPerPage>) {
			state.rowsPerPage = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSortSetup(state, action: PayloadAction<SortSetup<Product>>) {
			if (!state.chosenTechnology) return;
			state.sortSetup = action.payload;
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
	}
});

export const {setChosenTechnology, setSortSetup, setCurrentPage, setRowsPerPage} = productsSlice.actions;
export default productsSlice.reducer;