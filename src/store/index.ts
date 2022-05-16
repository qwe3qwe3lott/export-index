import {configureStore} from '@reduxjs/toolkit';
import tablesReducer from './slices/tables';

const store = configureStore({
	reducer: {
		tables: tablesReducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch