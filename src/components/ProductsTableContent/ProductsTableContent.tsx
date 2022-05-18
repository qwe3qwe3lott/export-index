import React, {useCallback, useEffect, useMemo, useRef} from 'react';

import styles from './ProductsTableContent.module.scss';
import {ColumnSetup, ColumnWidthMetrics} from '../../types/ColumnSetup';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import {Product} from '../../types/Product';

type Props = {
	columnSetups: ColumnSetup<Product>[]
}

const ProductsTableContent: React.FC<Props> = ({columnSetups}) => {
	const products = useAppSelector(state => (state.products.chosenTechnology ? state.products.chosenTechnology.products : []));
	const currentPage = useAppSelector(state => state.products.currentPage);
	const rowsPerPage = useAppSelector(state => state.products.rowsPerPage);

	const getColumnWidth = useCallback((setup: ColumnSetup<Product>) => {
		return setup.width ? { 'minWidth': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' };
	}, []);

	const currentProducts: Product[] = useMemo(() => {
		const endIndex: number = currentPage * rowsPerPage;
		return products.slice(endIndex - rowsPerPage, endIndex);
	}, [currentPage, rowsPerPage, products]);

	const listRef = useRef<HTMLUListElement>(null);
	useEffect(() => {
		if (!listRef.current) return;
		listRef.current.scrollTo(0, 0);
	}, [currentPage]);

	return(<ul className={styles.container} ref={listRef}>
		{currentProducts.map(technology => <li key={technology.id} className={styles.element}>
			{columnSetups.map(columnSetup => <span
				key={columnSetup.title}
				className={styles.span}
				style={getColumnWidth(columnSetup)}
			>
				{technology[columnSetup.property as keyof Product]}
			</span>)}
		</li>)}
	</ul>);
};

export default ProductsTableContent;
