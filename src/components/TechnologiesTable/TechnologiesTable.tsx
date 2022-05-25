import React from 'react';

import styles from './TechnologiesTable.module.scss';
import TechnologiesTableHeader from '../TechnologiesTableHeader';
import TechnologiesTableContent from '../TechnologiesTableContent';
import TechnologiesTableFooter from '../TechnologiesTableFooter';
import {ColumnSetup} from '../../types/ColumnSetup';
import {Technology} from '../../types/Technology';
import {ColumnWidthMetrics} from '../../enums/ColumnWidthMetrics';
import {ColumnModes} from '../../enums/ColumnModes';

const TechnologiesTable: React.FC = () => {
	const columnSetups: ColumnSetup<Technology>[] = [
		{ title: 'title', property: 'title'},
		{ title: 'index', property: 'index', width: {value: 6, metric: ColumnWidthMetrics.EM} },
		{ title: 'products', property: 'products', width: {value: 7, metric: ColumnWidthMetrics.EM}, mode: ColumnModes.SCORE }
	];

	return(<div className={styles.container}>
		<TechnologiesTableHeader columnSetups={columnSetups}/>
		<TechnologiesTableContent columnSetups={columnSetups}/>
		<TechnologiesTableFooter/>
	</div>);
};

export default TechnologiesTable;
