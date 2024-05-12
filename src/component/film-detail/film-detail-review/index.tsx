import { HeartOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { request } from '../../../utils/request';
import { listCommentsProps } from '../../comment';
import './index.scss';
const IconText = ({ icon, text }: { icon: React.FC; text?: number; date?: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const FilmDetailReview: React.FC = () => {
    const { episodeId } = useParams();

    const [refreshData, setRefreshData] = useState(false);
    const [listComments, setListComments] = useState<Array<listCommentsProps>>([]);

    const fetchData = async () => {
        try {
            const randomEpisodeNumber = Math.floor(Math.random() * 10) + 1;

            const response = await request.get(`episode/${randomEpisodeNumber}/comments`);
            const data = response.data.comments;
            setListComments(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        setRefreshData(false);
    }, [episodeId, refreshData]);

    return (
        <List
            className="cmt-list-detail ml-[-20px]"
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 3,
            }}
            dataSource={listComments}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText
                            icon={LikeOutlined}
                            text={item.numLike}
                            key="list-vertical-like-o"
                        />,
                        <IconText
                            icon={MessageOutlined}
                            text={item.numLike}
                            key="list-vertical-message"
                        />,
                        <IconText
                            icon={HeartOutlined}
                            text={item.numLike}
                            key="list-vertical-message"
                        />,
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar size={40} src={item.user?.avatar_url} />}
                        title={<p className="!text-white text-[14px] mt-3">{item.user?.email}</p>}
                        description={item.username}
                    />
                    <p style={{ color: '#fff' }}>{item.content}</p>
                </List.Item>
            )}
        />
    );
};

export default FilmDetailReview;
