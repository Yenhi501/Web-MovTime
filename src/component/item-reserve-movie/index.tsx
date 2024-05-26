import React, { useEffect, useState } from 'react';
import { CaretRightOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Badge, Button, Modal, Skeleton } from 'antd';
import Cookies from 'js-cookie';
import { request } from '../../utils/request';
import { FilmItem } from '../film-item';
import './index.scss';
import { t } from '../../utils/i18n';
interface Reservation {
    movieId?: number;
}

export const ItemReserveMovie = ({ title, posterURL, level, releaseDate, movieId }: FilmItem) => {
    const [isLoadingImg, setIsLoadingImg] = useState(true);
    const [isReserved, setIsReserved] = useState(false);
    const [initialButtonText, setInitialButtonText] = useState(t('Reserve'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkReservationStatus = async () => {
            try {
                const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
                const response = await request.get('user/reserves', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const responseData = response.data;

                    if (responseData && responseData.data && Array.isArray(responseData.data)) {
                        const reservations: Reservation[] = responseData.data;

                        const matchingReservation = reservations.find(
                            (reservation: Reservation) => reservation.movieId === movieId,
                        );

                        if (matchingReservation) {
                            setIsReserved(true);
                            setInitialButtonText(t('Cancel'));
                        } else {
                            setIsReserved(false);
                            setInitialButtonText(t('Reserve'));
                        }
                    } else {
                        console.error('Unexpected format for reservations data:', responseData);
                    }
                } else {
                    console.error(`Failed to fetch reservations. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        checkReservationStatus();
    }, [movieId]);

    const handleReserveClick = async () => {
        try {
            const currentDate = new Date();
            const formattedReleaseDate = releaseDate ? new Date(releaseDate) : null;
            const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
            if (!accessToken) {
                await Modal.info({
                    title: 'Thông báo',
                    content: 'Vui lòng đăng nhập để đặt phim.',
                });
                return;
            }

            if (!formattedReleaseDate) {
                console.error('Release date is not available');
                return;
            }

            const isReleaseDateToday =
                currentDate.toDateString() === formattedReleaseDate.toDateString();

            if (isReleaseDateToday) {
                await Modal.success({
                    title: 'Thông báo',
                    content: 'Hôm nay có phim ra mắt!',
                });
                return;
            }

            setLoading(true);

            if (isReserved) {
                const response = await request.delete(`user/reserves/${movieId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response?.status === 200) {
                    Modal.success({
                        title: 'Thông báo',
                        content: 'Bạn đã hủy đặt lịch!',
                        onOk: () => {
                            setInitialButtonText('Đặt lịch');
                            setIsReserved(false);
                        },
                    });
                } else {
                    console.error(`Failed to cancel the reservation. Status: ${response?.status}`);
                    Modal.error({
                        title: 'Lỗi',
                        content: 'Đã xảy ra lỗi khi hủy đặt lịch. Vui lòng thử lại sau.',
                    });
                }
            } else {
                const response = await request.post(
                    'user/reserves',
                    { movieId: movieId },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );

                if (response?.status === 200) {
                    Modal.success({
                        title: 'Thông báo',
                        content:
                            'Đặt lịch thành công! Chúc bạn có những trải nghiệm tuyệt vời tại MovTime ❤',
                        onOk: () => {
                            setInitialButtonText('Hủy');
                            setIsReserved(true);
                        },
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Modal.error({
                title: 'Lỗi',
                content: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div key={movieId}>
            <Badge.Ribbon
                text={level === 1 ? 'VIP' : ''}
                color={level === 1 ? 'red' : '#111111'}
                className={`${isLoadingImg === true ? 'hidden' : ''}`}
            >
                <div className="film-item-container relative">
                    <Skeleton.Image
                        active
                        className={`absolute z-10 h-full w-full ${
                            isLoadingImg === false ? 'hidden' : ''
                        }`}
                    />
                    <img
                        src={posterURL}
                        alt=""
                        className="film-item-image"
                        onLoad={() => setIsLoadingImg(false)}
                    />

                    <div className="btn-play z-10">
                        <CaretRightOutlined className="text-white" />
                    </div>
                </div>

                <h1 className="film-item-title max-w-[204px] ">{title}</h1>
                <Button
                    className={`film-button-reserve flex items-center justify-center text-center !mt-10 ${
                        isReserved ? 'reserved' : ''
                    }`}
                    icon={<FieldTimeOutlined />}
                    onClick={() => handleReserveClick()}
                    style={{
                        color: isReserved ? 'red' : 'white',
                        boxShadow:
                            'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                    }}
                    loading={loading}
                >
                    {initialButtonText}
                </Button>
            </Badge.Ribbon>
        </div>
    );
};
