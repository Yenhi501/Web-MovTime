import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Select, Spin, notification } from 'antd';
import { FilmItem } from '../../component/film-item';
import './index.scss';
import { PaginationFilm } from '../../component/pagination-film';
import axios from 'axios';
import { FilterParams } from '../../model/filter-params';
import { handleSearchParams } from '../../utils/handle-search-params';
import { convertParams } from '../../utils/convert-prams';
import { LoadingOutlined } from '@ant-design/icons';
import { endpoint } from '../../utils/baseUrl';
import { FilterItem } from '../../model/filter';
import { Genre } from '../../component/header/handle-data-header';
import { QueryFilter, defaultFilterItems } from './filter-type';
import { t } from '../../utils/i18n';

export const SearchPage: React.FC = () => {
    const { search } = useLocation();
    const [searchResults, setSearchResults] = useState<FilmItem[]>([]);
    const [amountMovies, setAmountMovies] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [filterParamsState, setFilterParamsState] = useState<FilterParams>({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [filterItems, setFilterItems] = useState<FilterItem[]>(defaultFilterItems);
    const getFilterRef = useRef(0);

    const getDataBySearchParams = (searchParams: string) => {
        axios
            .get(`${endpoint}/api/movies?${searchParams}&page=${currPage}&pageSize=12`)
            .then((res) => {
                setSearchResults(res.data.movies);
                setAmountMovies(res.data.totalCount);
                setIsLoading(false);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                notification.error({
                    message: 'Lọc phim thất bại',
                    description: 'Vui lòng kiểm tra lại các trường và thử lại!',
                    placement: 'bottomRight',
                });
            });
    };

    const getFilterItems = async () => {
        try {
            const genresPromise = axios.get(`${endpoint}/api/genres`);
            const nationsPromise = axios.get(`${endpoint}/api/movies/get/nations`);
            const yearsPromise = axios.get(`${endpoint}/api/movies/get/years`);

            const [genresRes, nationsRes, yearsRes] = await Promise.all([
                genresPromise,
                nationsPromise,
                yearsPromise,
            ]);

            const genresData = genresRes.data;
            const nationsData = nationsRes.data;
            const yearsData = yearsRes.data.sort((a: number, b: number) => b - a);

            const genresHandledData: FilterItem = {
                placeholder: 'Thể loại',
                query: 'genre',
                options: genresData.map((genre: Genre) => ({
                    label: genre.name,
                    value: genre.genre_id,
                })),
            };

            const nationsHandledData: FilterItem = {
                placeholder: 'Quốc gia',
                query: 'nation',
                options: nationsData.map((nation: string) => ({
                    label: nation,
                    value: nation,
                })),
            };

            const yearsHandledData: FilterItem = {
                placeholder: 'Năm sản xuất',
                query: 'year',
                options: yearsData.map((year: string) => ({
                    label: year,
                    value: year,
                })),
            };

            setFilterItems([
                ...filterItems,
                genresHandledData,
                nationsHandledData,
                yearsHandledData,
            ]);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (getFilterRef.current === 0) {
            getFilterRef.current++;
            getFilterItems();
        }
    }, []);

    useEffect(() => {
        setIsLoading(true);

        getDataBySearchParams(window.location.search.split('?')[1]);
        const paramsObj = handleSearchParams(window.location.search);
        delete paramsObj['search'];

        setFilterParamsState(convertParams(paramsObj));
    }, [search, currPage]);

    const handleSetFilterParams = () => {
        let str = '';
        const arrValueFilterParams = Object.values(filterParamsState);

        let count = 0;
        for (let key in filterParamsState) {
            if (arrValueFilterParams[count] != null) {
                if (count != 0) {
                    str += '&';
                }
                str += key + '=' + encodeURIComponent(arrValueFilterParams[count]);
                console.log(str);
            }
            count++;
        }
        setIsLoading(true);
        getDataBySearchParams(str);

        navigate({
            pathname: '/search',
            search: ``,
        });

        const url = window.location.href?.split('?')[0];
        window.history.replaceState('', '', url + '?' + str);
    };

    return (
        <div className="wrapper-searchPage">
            <div className="searchPage-header"></div>
            <div className="header-filter">
                {filterItems.map((item, index) => (
                    <div className="menu-label">
                        <Select
                            className="select-menu w-full"
                            key={index}
                            value={filterParamsState[item.query as QueryFilter]}
                            options={item.options}
                            placeholder={item.placeholder}
                            onChange={(value) => {
                                const tempObj: any = { ...filterParamsState };
                                if (item.query != null) {
                                    tempObj[item.query] = value;
                                    setFilterParamsState(tempObj);
                                }
                            }}
                            allowClear
                        />
                    </div>
                ))}
                <Button className="btn-filter" type="primary" onClick={handleSetFilterParams}>
                    {t('FilmFilter')}
                </Button>
            </div>
            <hr className="my-6 border-neutral-800" />
            <div className="relative min-h-[30vh]">
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgContainer: '#111111',
                            colorLinkHover: 'rgb(209, 19, 19)',
                        },
                    }}
                >
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{ fontSize: 36 }}
                                spin
                                className="text-red-600"
                            />
                        }
                        spinning={isLoading}
                    >
                        <PaginationFilm
                            title={t('SearchResults')}
                            number={4}
                            listFilm={searchResults}
                            amountMovies={amountMovies}
                            currPage={currPage}
                            setCurrPage={setCurrPage}
                            hidden={searchResults.length === 0}
                        />
                    </Spin>
                </ConfigProvider>

                <p className="absolute top-0" hidden={searchResults.length !== 0}>
                    Không tìm thấy kết quả phù hợp.
                </p>
            </div>
        </div>
    );
};
