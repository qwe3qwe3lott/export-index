export enum ColumnWidthMetrics {
    EM = 'EM',
    PX = 'PX'
}

export enum ColumnModes {
    SCORE = 'score'
}

export type ColumnSetup<T> = {
    title: string
    property: keyof T,
    width?: {
        value: number,
        metric: ColumnWidthMetrics
    },
    mode?: ColumnModes
}