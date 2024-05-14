import { Subscription, defaultSubscription } from './subscription-info';

export const defaultUser = {
    username: '',
    avatarURL: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    role: 0,
    subscription: defaultSubscription,
};

export const defaultCurrentUser = {
    dateOfBirth: '',
    gender: '',
    username: '',
    email: '',
    avatarURL: '',
    role: 0,
    subscription: defaultSubscription,
    userId: 0,
};

export interface CurrentUser {
    dateOfBirth: string;
    gender: string;
    username: string;
    email: string;
    avatarURL: string;
    role: number;
    subscription: Subscription;
    userId: number;
    active?:boolean;
}

export interface UserProps {
    user_id: number;
    gender: string;
    avatar_url: string;
    email: string;
}
