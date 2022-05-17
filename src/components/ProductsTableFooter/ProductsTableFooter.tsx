import React, {useMemo} from 'react';

import styles from './ProductsTableFooter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {RowsPerPage} from '../../store/slices/tables/types';
import {setProductsCurrentPage, setRowsPerProductsPage} from '../../store/slices/tables';

const ProductsTableFooter: React.FC = () => {
	const totalRows = useAppSelector(state => (state.tables.chosenTechnology ? state.tables.chosenTechnology.products.length : 0));
	const currentPage = useAppSelector(state => state.tables.currentProductsPage);
	const rowsPerPage = useAppSelector(state => state.tables.rowsPerProductsPage);
	const dispatch = useAppDispatch();

	const totalPages: number = useMemo(() => {
		const value = Math.ceil(totalRows / rowsPerPage);
		// ProductsTable heeds to has at less one page
		return value < 1 ? 1 : value;
	}, [totalRows, rowsPerPage]);

	const isThisFirstPage: boolean = useMemo(() => 1 === currentPage, [currentPage]);
	const isThisLastPage: boolean = useMemo(() => totalPages === currentPage, [totalPages, currentPage]);

	const pageInfo: string = useMemo(() => {
		if (totalRows === 0) return '';
		let lastPageRows: number = totalRows % rowsPerPage;
		if (lastPageRows === 0) lastPageRows = rowsPerPage;

		const lastRowOnCurrentPage: number = isThisLastPage ? totalRows : currentPage * rowsPerPage;
		const firstRowOnCurrentPage: number = lastRowOnCurrentPage - (isThisLastPage ? lastPageRows : rowsPerPage) + 1;
		return `${firstRowOnCurrentPage}-${lastRowOnCurrentPage} of ${totalRows}`;
	}, [totalRows, currentPage, rowsPerPage]);

	const rowsPerPageList: number[] = useMemo(() => {
		let array: [string | RowsPerPage, string | RowsPerPage][] = Object.entries(RowsPerPage);
		// First part of array contains duplicates
		array = array.splice(0, array.length/2);
		// There is necessity to get only enum values which are numbers
		return array.map(el => el[0] as number);
	}, []);

	const totalPagesArray: number[] = useMemo(() => Array.from({length: totalPages}, (_, i) => i + 1), [totalPages]);

	return(<div className={styles.container}>
		<p className={styles.pageInfo}>{pageInfo}</p>
		<div className={styles.tools}>
			<div className={styles.rowsPickerContainer}>
				<p className={styles.rowsPickerLabel}>Rows per page:</p>
				<select className={styles.rowsPicker} value={rowsPerPage} onChange={(event) => dispatch(setRowsPerProductsPage(+event.target.value))}>
					{rowsPerPageList.map(value => <option key={value}>
						{value}
					</option>)}
				</select>
			</div>
			<div className={styles.pageChooserContainer}>
				<button
					className={[styles.pageChooserButton, styles.pageChooserPrevious].join(' ')}
					disabled={isThisFirstPage}
					onClick={() => dispatch(setProductsCurrentPage(currentPage - 1))}
				/>
				<select
					className={styles.pageChooser}
					onChange={(event) => dispatch(setProductsCurrentPage(+event.target.value))}
					value={currentPage}
					disabled={isThisFirstPage && isThisLastPage}
				>
					{totalPagesArray.map(value => <option key={value} value={value} hidden>
						{`${value}/${totalPages}`}
					</option>)}
					{totalPagesArray.map(value => <option key={value}>
						{value}
					</option>)}
				</select>
				<button
					className={[styles.pageChooserButton, styles.pageChooserNext].join(' ')}
					disabled={isThisLastPage}
					onClick={() => dispatch(setProductsCurrentPage(currentPage + 1))}
				/>
			</div>
		</div>
	</div>);
};

export default ProductsTableFooter;
