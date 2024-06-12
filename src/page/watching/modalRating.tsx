import { Rate, Space, notification } from 'antd';
import Cookies from 'js-cookie';
import { request } from '../../utils/request';
import './index.scss';
import { t } from '../../utils/i18n';
interface ratingProp {
    movieId: number;
    rating: number;
}
const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Hay', 'Rất hay'];
export const ModalRating = ({ movieId, rating }: ratingProp) => {
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const handleRating = async (newValue: number) => {
        try {
            await request.post(
                'ratings/create',
                {
                    movieId: movieId,
                    rating: newValue,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            notification.success({
                message: 'Thành công!',
                description: 'Bạn đã đánh giá thành công.',
            });
        } catch (error: any) {
            console.log(error);
            if (error.response?.status === 403) {
                notification.warning({
                    message: t('Notification'),
                    description: t('YouHaveRatedThisMovieBefore'),
                });
            }
        }
    };

    return (
        <Space>
            <Rate tooltips={desc} onChange={(e) => handleRating(e)} value={rating} />
        </Space>
    );
};
