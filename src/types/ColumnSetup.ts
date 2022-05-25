import {ColumnModes} from '../enums/ColumnModes';
import {ColumnWidthMetrics} from '../enums/ColumnWidthMetrics';

export type ColumnSetup<T> = {
    title: string
    property: keyof T,
    width?: {
        value: number,
        metric: ColumnWidthMetrics
    },
    mode?: ColumnModes
}