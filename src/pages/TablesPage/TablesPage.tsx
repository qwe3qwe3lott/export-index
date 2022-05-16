import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import TechnologiesTableFilter from '../../components/TechnologiesTableFilter';
import TechnologiesTable from '../../components/TechnologiesTable';

const TablesPage: React.FC = () => {
	const chosenTechnology = useAppSelector(state => state.tables.chosenTechnology);
	return (<section>
		{!chosenTechnology ? <>
			<TechnologiesTableFilter/>
			<TechnologiesTable/>
		</> :
			<>
				ProductsTable
			</>}
	</section>);
};

export default TablesPage;
