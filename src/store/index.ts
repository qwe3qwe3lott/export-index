import {configureStore} from '@reduxjs/toolkit';
import technologiesReducer from './slices/technologies';
import mergeReducer from './slices/merge';
import productsReducer from './slices/products';

const store = configureStore({
	reducer: {
		technologies: technologiesReducer,
		products: productsReducer,
		merge: mergeReducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch