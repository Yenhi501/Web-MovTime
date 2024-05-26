import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { request } from '../../../utils/request';
import { Cmt } from '../cmt';
import { listComment } from '../type';
import './index.scss';
import { CurrentUser } from '../../../model/user';

interface ListCommentProps {
    listComment: Array<listComment>;
    setListComment: (listComment: Array<listComment>) => void;
    currentUser: CurrentUser;
}

export const ListComment: React.FC<ListCommentProps> = ({
    listComment,
    currentUser,
    setListComment,
}) => {
    const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
    //api subcomment
    const { episodeId } = useParams();
    const fetchUpdatedComments = async () => {
        try {
            const response = await request.get(`episode/${episodeId}/comments`);
            return response.data.comments;
        } catch (error) {
            console.error(error);
            return listComment;
        }
    };
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const handleReplySubmit = async (parentId: number, content: string) => {
        try {
            await request.post(
                'comments/sub-comments/create',
                {
                    parentId: `${parentId}`,
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
            const updatedComments = await fetchUpdatedComments();
            setListComment(updatedComments);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //api xóa cmt
    const deleteCommentById = async (idToDelete: number) => {
        try {
            await request.delete(`comments/delete/${idToDelete}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const updatedComments = await fetchUpdatedComments();
            setListComment(updatedComments);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteChildCmtById = async (replyIdToDelete: number) => {
        try {
            await request.delete(`comments/sub-comments/delete/${replyIdToDelete}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const updatedComments = await fetchUpdatedComments();
            setListComment(updatedComments);
        } catch (error) {
            console.error(error);
        }
    };

    const increaseLike = (commentId: number) => {
        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentId) {
                const updatedLikes = comment.numLike + 1;
                return {
                    ...comment,
                    numLike: updatedLikes,
                };
            }
            return comment;
        });

        setListComment(updatedComments);
    };

    const increaseLikeChilde = (commentId: number, replyId: number) => {
        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentId && comment.subcomments) {
                const updatedReplies = comment.subcomments.map((reply) => {
                    if (reply.id === replyId) {
                        return {
                            ...reply,
                            numLike: reply.numLike + 1,
                        };
                    }
                    return reply;
                });

                return {
                    ...comment,
                    subcomments: updatedReplies,
                };
            }
            return comment;
        });

        setListComment(updatedComments);
    };

    const decreaseLike = (commentId: number) => {
        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentId) {
                const updatedLikes = comment.numLike - 1;
                return {
                    ...comment,
                    numLike: updatedLikes,
                };
            }
            return comment;
        });

        setListComment(updatedComments);
    };

    const decreaseLikeChilde = (commentId: number, replyId: number) => {
        const updatedComments = listComment.map((comment) => {
            if (comment.id === commentId && comment.subcomments) {
                const updatedReplies = comment.subcomments.map((reply) => {
                    if (reply.id === replyId) {
                        return {
                            ...reply,
                            numLike: reply.numLike - 1,
                        };
                    }
                    return reply;
                });

                return {
                    ...comment,
                    subcomments: updatedReplies,
                };
            }
            return comment;
        });

        setListComment(updatedComments);
    };
    return (
        <div>
            {listComment.map((comment) => (
                <div key={comment.id}>
                    <hr className="my-6 border-neutral-800" />
                    <Cmt
                        comment={comment}
                        onReplySubmit={handleReplySubmit}
                        replyCommentId={replyCommentId}
                        setReplyCommentId={setReplyCommentId}
                        deleteCommentById={deleteCommentById}
                        increaseLike={() => increaseLike(comment.id)}
                        decreaseLike={() => decreaseLike(comment.id)}
                    />
                    {comment.subcomments && comment.subcomments.length > 0 && (
                        <div className="ml-16 pl-2">
                            {comment.subcomments.map((reply) => {
                                return (
                                    <Cmt
                                        key={reply.id}
                                        comment={reply}
                                        // onReplySubmit={handleReplySubmit}
                                        // replyCommentId={replyCommentId}
                                        // setReplyCommentId={setReplyCommentId}
                                        deleteCommentById={() => deleteChildCmtById(reply.id)}
                                        increaseLike={() =>
                                            increaseLikeChilde(comment.id, reply.id)
                                        }
                                        decreaseLike={() =>
                                            decreaseLikeChilde(comment.id, reply.id)
                                        }
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
