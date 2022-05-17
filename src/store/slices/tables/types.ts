import {Technology} from '../../../types/Technology';
import {Country} from '../../../types/Country';
import {SortSetup} from '../../../types/SortSetup';
import {Product} from '../../../types/Product';

export enum RowsPerPage {
    FEW = 25,
    SOME = 50,
    SEVERAL = 75,
    MANY = 100
}

export type TablesState = {
    countries: Country[]
    chosenCountry: Country | null
    years: number[]
    chosenYear: number

    technologies: Technology[]
    currentTechnologiesPage: number
    rowsPerTechnologiesPage: RowsPerPage,
    technologiesSortSetup: SortSetup<Technology>

    chosenTechnology: Technology | null
    currentProductsPage: number
    rowsPerProductsPage: RowsPerPage,
    productsSortSetup: SortSetup<Product>
}