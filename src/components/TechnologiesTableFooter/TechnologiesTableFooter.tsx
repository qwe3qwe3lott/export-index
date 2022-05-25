import React from 'react';

import styles from './TechnologiesTableFooter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {setCurrentPage, setRowsPerPage} from '../../store/slices/technologies';
import {
	useFirstPageFlag,
	useLastPageFlag, usePageInfo,
	useRowsPerPageList,
	useTotalPages,
	useTotalPagesArray
} from '../../hooks/tableHooks';

const TechnologiesTableFooter: React.FC = () => {
	const totalRows = useAppSelector(state => state.technologies.technologies.length);
	const currentPage = useAppSelector(state => state.technologies.currentPage);
	const rowsPerPage = useAppSelector(state => state.technologies.rowsPerPage);
	const dispatch = useAppDispatch();

	const totalPages = useTotalPages(totalRows, rowsPerPage);

	const isThisFirstPage = useFirstPageFlag(currentPage);
	const isThisLastPage = useLastPageFlag(currentPage, totalPages);

	const pageInfo = usePageInfo(currentPage, totalRows, rowsPerPage, isThisLastPage);

	const rowsPerPageList = useRowsPerPageList();

	const totalPagesArray = useTotalPagesArray(totalPages);

	return(<div className={styles.container}>
		<p className={styles.pageInfo}>{pageInfo}</p>
		<div className={styles.tools}>
			<div className={styles.rowsPickerContainer}>
				<p className={styles.rowsPickerLabel}>Rows per page:</p>
				<select className={styles.rowsPicker} value={rowsPerPage} onChange={(event) => dispatch(setRowsPerPage(+event.target.value))}>
					{rowsPerPageList.map(value => <option key={value}>
						{value}
					</option>)}
				</select>
			</div>
			<div className={styles.pageChooserContainer}>
				<button
					className={[styles.pageChooserButton, styles.pageChooserPrevious].join(' ')}
					disabled={isThisFirstPage}
					onClick={() => dispatch(setCurrentPage(currentPage - 1))}
				/>
				<select
					className={styles.pageChooser}
					onChange={(event) => dispatch(setCurrentPage(+event.target.value))}
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
					onClick={() => dispatch(setCurrentPage(currentPage + 1))}
				/>
			</div>
		</div>
	</div>);
};

export default TechnologiesTableFooter;
