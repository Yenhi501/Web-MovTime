import { ReactNode } from "react";
import { t } from "../../utils/i18n";

export type Genre = {
    genre_id: number;
    name: string;
};

export interface ChildrenCategoriesHeader {
    id: number | string;
    value: string;
}

export interface CategoriesHeader {
    title?: ReactNode | string;
    children?: ChildrenCategoriesHeader[];
    queryParam?: string;
}

const queryParamMap: Record<string, string> = {
    nations: 'nation',
    releasedYears: 'year',
    genres: 'genre',
};

export type DataHeader = {
    genres: Genre[];
    nations: string[];
    releasedYears: string[];
};

export const handleDataHomeHeader = (data: DataHeader) => {
    const listKey = Object.keys(data);
    const nations: ChildrenCategoriesHeader[] = data.nations.map((nation: string) => {
        return { id: nation, value: nation };
    });
    const releasedYears: ChildrenCategoriesHeader[] = data.releasedYears.map((year: string) => {
        return { id: year, value: year };
    });
    const genres: ChildrenCategoriesHeader[] = data.genres.map((genre: Genre) => {
        return { id: genre.genre_id, value: genre.name };
    });
    const itemsHeader: CategoriesHeader[] = [
        {
            title: t('Category'),
            children: genres,
            queryParam: queryParamMap[listKey[2]],
        },
        { title: t('Country'), children: nations, queryParam: queryParamMap[listKey[0]] },
        {
            title: t('YearOfManufacture'),
            children: releasedYears,
            queryParam: queryParamMap[listKey[1]],
        },
    ];

    return itemsHeader;
};
