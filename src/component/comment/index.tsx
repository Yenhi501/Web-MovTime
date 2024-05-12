import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import { WriteComment } from './write-cmt';
import { ListComment } from './list-cmt';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { request } from '../../utils/request';
import { useToken } from '../../hooks/useToken';
import { CurrentUser, UserProps, defaultCurrentUser } from '../../model/user';

import { useAppSelector } from '../../redux/hook';

export interface listCommentsProps {
    id: number;
    avatar: string;
    username: string;
    createdAt: string;
    updatedAt?: string;
    content: string;
    numLike: number;
    user?: UserProps;
}

export const listComment = [
    {
        id: 0,
        avatar: '',
        username: '',
        createdAt: '',
        content: '',
        numLike: 0,
        subcomments: [],
    },
];

interface CommentProps {
    title: string;
    placeholder: string;
}

export const Comment: React.FC<CommentProps> = ({ title, placeholder }) => {
    const [refreshData, setRefreshData] = useState(false);
    const [listComments, setListComments] = useState<Array<listCommentsProps>>(listComment);
    const { episodeId } = useParams();
    const { accessToken } = useToken();
    const isLogin = useAppSelector((state) => state.user.isLogin);

    const fetchData = async () => {
        try {
            const response = await request.get(`episode/${episodeId}/comments`);
            const data = response.data.comments;
            setListComments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultCurrentUser);
    const getCurrentUser = () => {
        request
            .get('user/get-self-information', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                setCurrentUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    useEffect(() => {
        fetchData();
        setRefreshData(false);
    }, [episodeId, refreshData]);
    const postData = async (content: string) => {
        try {
            await request.post(
                'comments/create',
                {
                    episodeId: `${episodeId}`,
                    content: content,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            setRefreshData(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCommentSubmit = async (content: string) => {
        await postData(content);
    };

    return (
        <div className="comment-content">
            <hr className="my-6 border-neutral-800" />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl lg:text-2xl font-bold dark:text-white">{title}</h2>
            </div>

            {isLogin ? (
                <WriteComment onSubmitComment={handleCommentSubmit} placeholder={placeholder} />
            ) : (
                <div className="login-btn">
                    <Link to="/login">
                        <Button size="large">Đăng nhập để có thể bình luận.</Button>
                    </Link>
                </div>
            )}

            <ListComment
                listComment={listComments}
                setListComment={setListComments}
                currentUser={currentUser}
            />
        </div>
    );
};
