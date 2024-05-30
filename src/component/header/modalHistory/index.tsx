import { RightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../../utils/request';
import { FilmItem } from '../../film-item';
import { t } from '../../../utils/i18n';

const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';

export const ContentModalHistory = () => {
    const [dataHistorymovies, setDataHistorymovies] = useState<FilmItem[]>([]);

    const fetchDataHistorymovies = async () => {
        try {
            const response = await request.get('user/get-movie-history-list?page=1&pageSize=1', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data.ListMovie;
            setDataHistorymovies(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataHistorymovies();
    }, []);

    return (
        <div>
            {dataHistorymovies.map((result, index) => (
                <div key={index}>
                    {result.id && result.movieId ? (
                        <Link to={`/movie/${result.movieId}/${result.id}`}>
                            <Row className=" hover:bg-[#e9e9e9] py-2 ">
                                <Col span={8}>
                                    <img
                                        src={result.backgroundMovieURL}
                                        alt=""
                                        className="w-36 h-16"
                                    />
                                </Col>
                                <Col span={11}>
                                    <h1 className="text-black !text-sm ml-1 hover:text-[#cc0e0e]">
                                        {result.movieTitle}
                                    </h1>
                                </Col>
                                <Col span={5}>
                                    <p className="text-black !text-sm hover:text-[#cc0e0e]">
                                        - {result.title}
                                    </p>
                                </Col>
                            </Row>
                        </Link>
                    ) : (
                        <Link to={`/movie/${result.id || result.movieId}`}>
                            <div className="flex gap-5 justify-center items-center mb-2">
                                <img src={result.backgroundMovieURL} alt="" className="w-10 h-8" />
                                <h1 className="text-black">{result.title}</h1>
                            </div>
                        </Link>
                    )}
                </div>
            ))}
            <Link
                to="/foryou/profile"
                className="text-[#989898] text-[13px] flex justify-center mt-5 hover:text-[red]"
            >
                <div className="mr-2">{t('Other')}</div>
                <RightOutlined style={{ fontSize: '10px' }} />
            </Link>
        </div>
    );
};
