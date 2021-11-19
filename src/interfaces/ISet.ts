export interface ISet {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
        unlimited: string;
        standard: string;
        expanded: string;
    };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
        symbol: string;
        logo: string;
    }
}

export interface ISetWChecked extends ISet {
    checked: boolean;
}