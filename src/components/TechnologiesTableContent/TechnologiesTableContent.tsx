import React from 'react';

import styles from './TechnologiesTableContent.module.scss';
import {ColumnSetup} from '../../types/ColumnSetup';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import loading from '../../assets/loading.svg';

import {Technology} from '../../types/Technology';
import {setChosenTechnology} from '../../store/slices/products';
import {
	useCurrentValues,
	useGetColumnWidth,
	useGetModifiedStyles,
	useListRef,
	useModifyValue
} from '../../hooks/tableHooks';

type Props = {
	columnSetups: ColumnSetup<Technology>[]
}

const TechnologiesTableContent: React.FC<Props> = ({columnSetups}) => {
	const technologies = useAppSelector(state => state.technologies.technologies);
	const currentPage = useAppSelector(state => state.technologies.currentPage);
	const rowsPerPage = useAppSelector(state => state.technologies.rowsPerPage);
	const isLoading = useAppSelector(state => state.technologies.isLoading);

	const dispatch = useAppDispatch();

	const getColumnWidth = useGetColumnWidth<Technology>();

	const currentTechnologies = useCurrentValues<Technology>(currentPage, rowsPerPage, technologies);

	const listRef = useListRef(currentPage);

	const modifyValue = useModifyValue<Technology, 'products'>();

	const getModifiedStyles = useGetModifiedStyles<Technology>();

	return(<ul className={[styles.container, (isLoading ? styles.loadingContainer : '')].join(' ')} ref={listRef}>
		{isLoading ? <img className={styles.loading} alt={'loading ring'} src={loading}/> :
			<>
				{currentTechnologies.map(technology => <li
					key={technology.id}
					className={[styles.element, (technology.products.length > 0 ? styles.clickableElement : undefined)].join(' ')}
					onClick={() => dispatch(setChosenTechnology(technology))}
				>
					{columnSetups.map(columnSetup => <span
						key={columnSetup.title}
						className={styles.span}
						style={{...getColumnWidth(columnSetup), ...getModifiedStyles(technology[columnSetup.property as keyof Technology], columnSetup.mode)}}
					>
						{modifyValue(technology[columnSetup.property as keyof Technology], columnSetup.mode)}
					</span>)}
				</li>)}
			</>
		}
	</ul>);
};

export default TechnologiesTableContent;
