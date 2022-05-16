import React, {useEffect} from 'react';

import styles from './TechnologiesTableFilter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {
	fetchCountries,
	fetchTechnologies,
	fetchYears,
	setChosenCountry,
	setChosenYear
} from '../../store/slices/tables';

const TechnologiesTableFilter: React.FC = () => {
	const years = useAppSelector(state => state.tables.years);
	const chosenYear = useAppSelector(state => state.tables.chosenYear);
	const countries = useAppSelector(state => state.tables.countries);
	const chosenCountry = useAppSelector(state => state.tables.chosenCountry);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchYears());
		dispatch(fetchCountries());
	}, []);

	return(<div className={styles.container}>
		<h2 className={styles.title}>Technologies</h2>
		<div className={styles.filters}>
			<select className={styles.select} value={(chosenCountry ? chosenCountry.id : undefined)} onChange={(event) => dispatch(setChosenCountry(+event.target.value))}>
				<option selected disabled hidden>Choose country</option>
				{countries.map(country => <option key={country.id} value={country.id}>
					{country.title}
				</option>)}
			</select>
			<select className={styles.select} value={chosenYear} onChange={(event) => dispatch(setChosenYear(+event.target.value))}>
				<option value="0" disabled hidden>Choose year</option>
				{years.map(year => <option key={year}>
					{year}
				</option>)}
			</select>
			<button className={styles.search} onClick={() => dispatch(fetchTechnologies())} disabled={(!chosenCountry || !chosenYear)}/>
		</div>
	</div>);
};

export default TechnologiesTableFilter;
