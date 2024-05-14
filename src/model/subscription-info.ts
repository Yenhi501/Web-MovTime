export interface SubscriptionInfo {
    subscription_info_id: number;
    discount: number;
    subscriptionType: SubscriptionType;
    duration: DurationSubscription;
}

export interface SubscriptionType {
    subscriptionTypeId: number;
    name: string;
    price: number;
}

export interface DurationSubscription {
    durationId: number;
    time: number;
}

export interface Subscription {
    closeAt: string;
    subscriptionType: string;
    updatedAt: string;
}

export const defaultSubscription = {
    closeAt: '',
    subscriptionType: '',
    updatedAt: '',
};
