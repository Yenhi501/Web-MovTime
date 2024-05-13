export type Option = {
    label: string;
    value: any;
};

export type QueryFilter = 'sort' | 'nation' | 'year' | 'genre' | 'isSeries';

export type FilterItem = {
    placeholder?: string;
    query?: QueryFilter;
    options: Option[];
};
