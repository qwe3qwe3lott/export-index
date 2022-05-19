import {Country} from '../../../types/Country';
import {Technology} from '../../../types/Technology';

export type MergeState = {
    countries: Country[]
    years: number[]

    technologiesThrowYearsAndCountries: {
        [key: number]: {
            [key: number]: Technology[]
        }
    }
}