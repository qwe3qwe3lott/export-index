import {Technology} from '../../../types/Technology';
import {SortSetup} from '../../../types/SortSetup';
import {Product} from '../../../types/Product';
import {RowsPerPage} from '../../../enums/RowsPerPage';

export type ProductsState = {
    chosenTechnology: Technology | null
    currentPage: number
    rowsPerPage: RowsPerPage,
    sortSetup: SortSetup<Product>
}