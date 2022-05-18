import React, {useCallback, useEffect} from 'react';

import styles from './TechnologiesTableFilter.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {fetchCountries, fetchYears} from '../../store/slices/merge';
import {fetchTechnologies, setChosenCountry, setChosenYear} from '../../store/slices/technologies';

const TechnologiesTableFilter: React.FC = () => {
	const years = useAppSelector(state => state.merge.years);
	const chosenYear = useAppSelector(state => state.technologies.chosenYear);
	const countries = useAppSelector(state => state.merge.countries);
	const chosenCountry = useAppSelector(state => state.technologies.chosenCountry);
	const isLoading = useAppSelector(state => state.technologies.isLoading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchYears());
		dispatch(fetchCountries());
	}, []);

	const getCountryById = useCallback((countryId: number) => {
		const country = countries.find(country => country.id === countryId);
		return country ? country : 0;
	}, [countries]);

	return(<div className={styles.container}>
		<h2 className={styles.title}>Technologies</h2>
		<div className={styles.filters}>
			<select
				className={styles.select}
				value={(chosenCountry !== -1 ? chosenCountry.id : -1)}
				onChange={(event) => {dispatch(setChosenCountry(getCountryById(+event.target.value)));}}
				disabled={isLoading}
			>
				<option value="-1" disabled hidden>Choose country</option>
				{countries.map(country => <option key={country.id} value={country.id}>
					{country.title}
				</option>)}
			</select>
			<select
				className={styles.select}
				value={chosenYear}
				onChange={(event) => dispatch(setChosenYear(+event.target.value))}
				disabled={isLoading}
			>
				<option value="0" disabled hidden>Choose year</option>
				{years.map(year => <option key={year}>
					{year}
				</option>)}
			</select>
			<button
				className={styles.search} onClick={() => dispatch(fetchTechnologies())}
				disabled={(!chosenCountry || !chosenYear || isLoading)}
			/>
		</div>
	</div>);
};

export default TechnologiesTableFilter;
