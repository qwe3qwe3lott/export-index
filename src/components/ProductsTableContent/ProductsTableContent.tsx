import React from 'react';

import styles from './ProductsTableContent.module.scss';
import {ColumnSetup} from '../../types/ColumnSetup';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import {Product} from '../../types/Product';
import {useCurrentValues, useGetColumnWidth, useListRef} from '../../hooks/tableHooks';

type Props = {
	columnSetups: ColumnSetup<Product>[]
}

const ProductsTableContent: React.FC<Props> = ({columnSetups}) => {
	const products = useAppSelector(state => (state.products.chosenTechnology ? state.products.chosenTechnology.products : []));
	const currentPage = useAppSelector(state => state.products.currentPage);
	const rowsPerPage = useAppSelector(state => state.products.rowsPerPage);

	const getColumnWidth = useGetColumnWidth<Product>();

	const currentProducts = useCurrentValues<Product>(currentPage, rowsPerPage, products);

	const listRef = useListRef(currentPage);

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
