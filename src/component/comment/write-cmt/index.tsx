import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button } from 'antd';
import { CurrentUser } from '../type';
import { request } from '../../../utils/request';
import { defaultCurrentUser } from '../../../model/user';
import { useToken } from '../../../hooks/useToken';
import { t } from '../../../utils/i18n';

interface WriteCommentProps {
    placeholder: string;
    onSubmitComment?: (comment: string) => void;
    onCancel?: () => void;
}

export const WriteComment: React.FC<WriteCommentProps> = ({
    placeholder,
    onSubmitComment,
    onCancel,
}) => {
    const [comment, setComment] = useState<string>('');
    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };
    const handleCancel = () => {
        setComment('');
        if (onCancel) {
            onCancel();
        }
    };
    const handleSub = () => {
        if (onSubmitComment && comment.trim() !== '') {
            onSubmitComment(comment);
            setComment('');
        }
    };

    const { accessToken } = useToken();

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

    return (
        <div className="writecmt-container">
            <img
                className="avatar"
                src={currentUser.avatarURL}
                alt={`avatar for ${currentUser.username}`}
            />
            <div className="writecmt-box">
                <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg border textarea">
                    <textarea
                        id="comment"
                        value={comment}
                        rows={6}
                        className="px-0 w-full  border-0 focus:ring-0 focus:outline-none bg-transparent scroll"
                        style={{
                            fontSize: '1rem',
                            height: '60px',
                        }}
                        required
                        spellCheck={false}
                        onChange={handleChangeComment}
                        placeholder={placeholder}
                    ></textarea>
                </div>
                <div className="btn-action">
                    <Button className="btn-cancel" onClick={handleCancel}>

                    {t('Cancel')} 
                    </Button>
                    <Button className="btn-sub" onClick={handleSub}>
                    {t('Comment')} 

                    </Button>
                </div>
            </div>
        </div>
    );
};
