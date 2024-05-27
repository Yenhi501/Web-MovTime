import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import './index.scss';
import { t } from '../../../utils/i18n';
import {  notification } from 'antd';
import { FilmItem } from '../../film-item';
import axios from 'axios';
import { endpoint } from '../../../utils/baseUrl';
import { useDebounced } from '../../../hooks/debounce';
import useDevice from '../../../hooks/useDevice';

export const Search = () => {
    const [open, setOpen] = useState(false);

    const [searchResults, setSearchResults] = useState<FilmItem[]>([]);

    const [searchValue, setSearchValue] = useState<string>('');
    const navigate = useNavigate();
    const valueRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
        setOpen(true);
    };

    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            navigate({
                pathname: '/search',
                search: `search=${encodeURIComponent(searchValue)}`,
            });
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        setOpen(false);
        if (valueRef.current) {
            valueRef.current.focus();
        }
    };
    //search
    const debounce = useDebounced(searchValue, 200);

    const getDataBySearchValue = async (searchValue: string) => {
        await axios
            .get(`${endpoint}/api/movies?search=${searchValue}&page=1&pageSize=12`)
            .then((res) => {
                setSearchResults(res.data.movies);
                console.log(searchResults);
            })
            .catch((err) => {
                console.log(err);
                notification.error({
                    message: 'Lọc phim thất bại',
                    description: 'Vui lòng kiểm tra lại các trường và thử lại!',
                    placement: 'bottomRight',
                });
            });
    };
    

    useEffect(() => {
        if (searchValue.trim() !== '') {
            getDataBySearchValue(debounce);
        }
    }, [debounce]);

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.search')) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const device= useDevice();

    return (
        <div className="search pl-8" >
            {(device.isTablet || device.isDesktop) && <input
                ref={valueRef}
                value={searchValue}
                spellCheck={false}
                placeholder={t('Search')}
                onChange={handleChange}
                onKeyDown={(event) => (event.key === 'Enter' ? handleSearch() : undefined)}
            />}
            
            {open && (
                <div className="results" >
                    <div className="font-medium text-[1rem] text-[#9ca3af] p-3">
                        Kết quả tìm kiếm
                    </div>
                    <div className="p-5 pt-0 text-[13px]">
                        {searchResults.length > 0 ? (
                            searchResults.map((item) => (
                                <Link to={`/movie/${item.movieId}`} target="_parent">
                                        <p className="name-title py-[6px]">{item.title}</p>
                                    </Link>
                              
                            ))
                        ) : (
                            <div>Không tìm thấy kết quả</div>
                        )}
                    </div>
                </div>
            )}

            {!!searchValue && <CloseOutlined className="clear-search" onClick={handleClear} />}
            {(device.isTablet || device.isDesktop) && <button className="search-btn" onClick={handleSearch} >
                <SearchOutlined />
            </button>}
        </div>
    );
};
