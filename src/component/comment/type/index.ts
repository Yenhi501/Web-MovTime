import { UserProps } from '../../../model/user';

export interface listComment {
    id: number;
    avatar: string;
    username: string;
    createdAt: string;
    updatedAt?: string;
    content: string;
    numLike: number;
    user?: UserProps;
    subcomments?: Array<listComment>;
}

export interface CurrentUser {
    username: string;
    email?: string;
    avatarURL: string;
}
