import React from 'react';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import TechnologiesTableFilter from '../../components/TechnologiesTableFilter';
import TechnologiesTable from '../../components/TechnologiesTable';
import ProductsTableFilter from '../../components/ProductsTableFilter';
import ProductsTable from '../../components/ProductsTable';

const TablesPage: React.FC = () => {
	const chosenTechnology = useAppSelector(state => state.products.chosenTechnology);
	return (<section>
		{!chosenTechnology ? <>
			<TechnologiesTableFilter/>
			<TechnologiesTable/>
		</> :
			<>
				<ProductsTableFilter/>
				<ProductsTable/>
			</>}
	</section>);
};

export default TablesPage;
