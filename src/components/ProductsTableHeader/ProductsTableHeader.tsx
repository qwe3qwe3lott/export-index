import React, {useCallback} from 'react';

import styles from './ProductsTableHeader.module.scss';
import {ColumnSetup, ColumnWidthMetrics} from '../../types/ColumnSetup';
import notSorted from '../../assets/not-sorted.svg';
import sorted from '../../assets/sorted.svg';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {Product} from '../../types/Product';
import {setProductsSortSetup} from '../../store/slices/tables';

type Props = {
	columnSetups: ColumnSetup<Product>[]
}

const ProductsTableHeader: React.FC<Props> = ({columnSetups}) => {
	const sortSetup = useAppSelector(state => state.tables.productsSortSetup);
	const dispatch = useAppDispatch();

	const getColumnWidth = useCallback((setup: ColumnSetup<Product>) => {
		return setup.width ? { 'minWidth': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' };
	}, []);

	return(<div className={styles.container}>
		{columnSetups.map(columnSetup => <button
			className={styles.column}
			key={columnSetup.title}
			style={getColumnWidth(columnSetup)}
			onClick={() =>
				dispatch(setProductsSortSetup({ property: columnSetup.property, sortAtoZ: (sortSetup.property === columnSetup.property ? !sortSetup.sortAtoZ : false)}))}
		>
			<span className={styles.title}>{columnSetup.title}</span>
			{sortSetup.property === columnSetup.property ?
				<img
					alt="sort arrow"
					src={sorted}
					className={styles.sort}
					style={sortSetup.sortAtoZ ? { transform: 'rotate(180deg)' } : {}}
				/> :
				<img alt="sort mark" src={notSorted} className={styles.sort}/>}
		</button>)}
	</div>);
};

export default ProductsTableHeader;
