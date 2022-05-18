import {Technology} from '../../../types/Technology';
import {Country} from '../../../types/Country';
import {SortSetup} from '../../../types/SortSetup';
import {RowsPerPage} from '../../../enums/RowsPerPage';

export type TechnologiesState = {
    chosenCountry: Country | -1
    chosenYear: number

    isLoading: boolean

    technologies: Technology[]
    currentPage: number
    rowsPerPage: RowsPerPage
    sortSetup: SortSetup<Technology>
}