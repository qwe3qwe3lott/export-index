import React from 'react';

import styles from './TechnologiesTableHeader.module.scss';
import {ColumnSetup} from '../../types/ColumnSetup';
import notSorted from '../../assets/not-sorted.svg';
import sorted from '../../assets/sorted.svg';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {Technology} from '../../types/Technology';
import {setSortSetup} from '../../store/slices/technologies';
import {useGetColumnWidth} from '../../hooks/tableHooks';

type Props = {
	columnSetups: ColumnSetup<Technology>[]
}

const TechnologiesTableHeader: React.FC<Props> = ({columnSetups}) => {
	const sortSetup = useAppSelector(state => state.technologies.sortSetup);
	const dispatch = useAppDispatch();

	const getColumnWidth = useGetColumnWidth<Technology>();

	return(<div className={styles.container}>
		{columnSetups.map(columnSetup => <button
			className={styles.column}
			key={columnSetup.title}
			style={getColumnWidth(columnSetup)}
			onClick={() =>
				dispatch(setSortSetup({ property: columnSetup.property, sortAtoZ: (sortSetup.property === columnSetup.property ? !sortSetup.sortAtoZ : false)}))}
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

export default TechnologiesTableHeader;
