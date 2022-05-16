import React, {useCallback, useEffect, useMemo, useRef} from 'react';

import styles from './TechnologiesTableContent.module.scss';
import {ColumnModes, ColumnSetup, ColumnWidthMetrics} from '../../types/ColumnSetup';
import {useAppSelector} from '../../hooks/typedReduxHooks';

import scssVariables from '../../index.scss';
import {Technology} from '../../types/Technology';

type Props = {
	columnSetups: ColumnSetup<Technology>[]
}

const TechnologiesTableContent: React.FC<Props> = ({columnSetups}) => {
	const technologies = useAppSelector(state => state.tables.technologies);
	const currentPage = useAppSelector(state => state.tables.currentTechnologiesPage);
	const rowsPerPage = useAppSelector(state => state.tables.rowsPerTechnologiesPage);

	const getColumnWidth = useCallback((setup: ColumnSetup<Technology>) => {
		return setup.width ? { 'minWidth': `${setup.width.value}${ColumnWidthMetrics[setup.width.metric]}` } : { width: '100%' };
	}, []);

	const currentTechnologies: Technology[] = useMemo(() => {
		const endIndex: number = currentPage * rowsPerPage;
		return technologies.slice(endIndex - rowsPerPage, endIndex);
	}, [currentPage, rowsPerPage, technologies]);

	const listRef = useRef<HTMLUListElement>(null);
	useEffect(() => {
		if (!listRef.current) return;
		listRef.current.scrollTo(0, 0);
	}, [currentPage]);

	const modifyValue = useCallback((value: Technology[keyof Technology], mode: ColumnModes | undefined) : Technology[keyof Omit<Technology, 'products'>] => {
		switch (mode) {
		case ColumnModes.SCORE:
			if (!Array.isArray(value)) return value;
			return value.length;
		default:
			if (Array.isArray(value)) return value.length;
			return value;
		}
	}, []);

	const getModifyStyles = useCallback((value: Technology[keyof Technology], mode: ColumnModes | undefined) : object => {
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

	return(<ul className={styles.container} ref={listRef}>
		<li/>
		{currentTechnologies.map(technology => <li key={technology.id} className={styles.element}>
			{columnSetups.map(columnSetup => <span
				key={columnSetup.title}
				className={styles.span}
				style={{...getColumnWidth(columnSetup), ...getModifyStyles(technology[columnSetup.property as keyof Technology], columnSetup.mode)}}
			>
				{modifyValue(technology[columnSetup.property as keyof Technology], columnSetup.mode)}
			</span>)}
		</li>)}
	</ul>);
};

export default TechnologiesTableContent;
