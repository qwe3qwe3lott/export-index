import React from 'react';

import styles from './ProductsTable.module.scss';
import {ColumnSetup} from '../../types/ColumnSetup';
import ProductsTableHeader from '../ProductsTableHeader';
import ProductsTableContent from '../ProductsTableContent';
import ProductsTableFooter from '../ProductsTableFooter';
import {Product} from '../../types/Product';

const ProductsTable: React.FC = () => {
	const columnSetups: ColumnSetup<Product>[] = [
		{ title: 'title', property: 'title'}
	];

	return(<div className={styles.container}>
		<ProductsTableHeader columnSetups={columnSetups}/>
		<ProductsTableContent columnSetups={columnSetups}/>
		<ProductsTableFooter/>
	</div>);
};

export default ProductsTable;
