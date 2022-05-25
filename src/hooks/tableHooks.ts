import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ColumnSetup} from '../types/ColumnSetup';
import scssVariables from '../index.scss';
import {RowsPerPage} from '../enums/RowsPerPage';
import {ColumnWidthMetrics} from '../enums/ColumnWidthMetrics';
import {ColumnModes} from '../enums/ColumnModes';

// Calculates count of table pages
export const useTotalPages = (totalRows: number, rowsPerPage: RowsPerPage): number => {
	return useMemo(() => {
		const value = Math.ceil(totalRows / rowsPerPage);
		// Table heeds to has at less one page
		return value < 1 ? 1 : value;
	}, [totalRows, rowsPerPage]);
};

// Checks if user is on first table page
export const useFirstPageFlag = (currentPage: number): boolean => {
	return useMemo(() => 1 === currentPage, [currentPage]);
};

// Checks if user is on last table page
export const useLastPageFlag = (currentPage: number, totalPages: number): boolean => {
	return useMemo(() => totalPages === currentPage, [totalPages, currentPage]);
};

// Calculates table info about which rows are displaying now
export const usePageInfo = (currentPage: number, totalRows: number, rowsPerPage: RowsPerPage, isThisLastPage: boolean): string => {
	return useMemo(() => {
		if (totalRows === 0) return '';
		let lastPageRows: number = totalRows % rowsPerPage;
		if (lastPageRows === 0) lastPageRows = rowsPerPage;

		const lastRowOnCurrentPage: number = isThisLastPage ? totalRows : currentPage * rowsPerPage;
		const firstRowOnCurrentPage: number = lastRowOnCurrentPage - (isThisLastPage ? lastPageRows : rowsPerPage) + 1;
		return `${firstRowOnCurrentPage}-${lastRowOnCurrentPage} of ${totalRows}`;
	}, [totalRows, currentPage, rowsPerPage]);
};

// Transforms enum "RowsPerPage" to array of it`s values
export const useRowsPerPageList = (): number[] => {
	return useMemo(() => {
		let array: [string | RowsPerPage, string | RowsPerPage][] = Object.entries(RowsPerPage);
		// First part of array contains duplicates
		array = array.splice(0, array.length/2);
		// There is necessity to get only enum values which are numbers
		return array.map(el => el[0] as number);
	}, []);
};

// Util hook for support to render page select
export const useTotalPagesArray = (totalPages: number): number[] => {
	return useMemo(() => Array.from({length: totalPages}, (_, i) => i + 1), [totalPages]);
};

// Returns function for calculating table column width
export const useGetColumnWidth = <T>(): (setup: ColumnSetup<T>) => object => {
	return useCallback((setup: ColumnSetup<T>) => {
		return setup.width ? { 'minWidth': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' };
	}, []);
};

// Returns array of table rows for current table page
export const useCurrentValues = <T>(currentPage: number, rowsPerPage: RowsPerPage, rows: T[]): T[] => {
	return useMemo(() => {
		const endIndex: number = currentPage * rowsPerPage;
		return rows.slice(endIndex - rowsPerPage, endIndex);
	}, [currentPage, rowsPerPage, rows]);
};

// Returns ref to table list of rows
export const useListRef = (currentPage: number): React.RefObject<HTMLUListElement> => {
	const listRef = useRef<HTMLUListElement>(null);
	useEffect(() => {
		if (!listRef.current) return;
		listRef.current.scrollTo(0, 0);
	}, [currentPage]);
	return listRef;
};

// Returns function for applying special styles for table cell if needed
export const useGetModifiedStyles = <T>(): (value: T[keyof T], mode: (ColumnModes | undefined)) => object => {
	return useCallback((value: T[keyof T], mode: ColumnModes | undefined) : object => {
		if (value === null) return {};
		switch (mode) {
		case ColumnModes.SCORE:
			if (!Array.isArray(value)) return {};
			if (value.length > 0) return { color: scssVariables.seconradyColor };
			return { color: scssVariables.secondaryOppositeColor };
		default:
			return {};
		}
	}, []);
};

// Returns function for modifying value in table cell if needed
export const useModifyValue = <T, K extends keyof T>(): (value: T[keyof T] | number, mode: ColumnModes | undefined) => T[keyof Omit<T, K>] | number => {
	return useCallback((value: T[keyof T] | number, mode: ColumnModes | undefined) : T[keyof Omit<T, K>] | number => {
		switch (mode) {
		case ColumnModes.SCORE:
			if (!Array.isArray(value)) return value as T[keyof Omit<T, K>];
			return value.length;
		default:
			if (Array.isArray(value)) return value.length;
			return value as T[keyof Omit<T, K>];
		}
	}, []);
};