export interface PaypalReturn {
    createdAt: string;
    deletedAt: string | null;
    isPayment: boolean;
    orderInfo: string;
    paymentId: number;
    price: number;
    status: string;
    subscriptionInfoId: number;
    transactionId: string;
    type: string;
    updatedAt: string;
    userId: number;
    subscriptionInfo: {
        subscriptionInfoId: number;
        discount: number;
        subscriptionTypeId: number;
        durationId: number;
        subscriptionType: {
            subscriptionTypeId: number;
            name: string;
            price: number;
        };
        duration: {
            durationId: number;
            time: number;
        };
    };
}

export const defaultPaypalReturn = {
    createdAt: '2023-12-23T12:15:58.752Z',
    deletedAt: null,
    isPayment: true,
    orderInfo:
        '{"id":"48785751AN9981935","status":"COMPLETED","payment_source":{"paypal":{"email_address":"testex@example.com","account_id":"JFLLB3SMQRV2W","account_status":"VERIFIED","name":{"given_name":"Vinh","surname":"Trinh"},"address":{"country_code":"US"}}},"purchase_units":[{"reference_id":"default","shipping":{"name":{"full_name":"Vinh Trinh"},"address":{"address_line_1":"1 Main St","admin_area_2":"San Jose","admin_area_1":"CA","postal_code":"95131","country_code":"US"}},"payments":{"captures":[{"id":"6WG86487LB0310329","status":"COMPLETED","amount":{"currency_code":"USD","value":"1.72"},"final_capture":true,"seller_protection":{"status":"ELIGIBLE","dispute_categories":["ITEM_NOT_RECEIVED","UNAUTHORIZED_TRANSACTION"]},"seller_receivable_breakdown":{"gross_amount":{"currency_code":"USD","value":"1.72"},"paypal_fee":{"currency_code":"USD","value":"0.55"},"net_amount":{"currency_code":"USD","value":"1.17"}},"links":[{"href":"https://api.sandbox.paypal.com/v2/payments/captures/6WG86487LB0310329","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v2/payments/captures/6WG86487LB0310329/refund","rel":"refund","method":"POST"},{"href":"https://api.sandbox.paypal.com/v2/checkout/orders/48785751AN9981935","rel":"up","method":"GET"}],"create_time":"2023-12-23T12:16:27Z","update_time":"2023-12-23T12:16:27Z"}]}}],"payer":{"name":{"given_name":"Vinh","surname":"Trinh"},"email_address":"testex@example.com","payer_id":"JFLLB3SMQRV2W","address":{"country_code":"US"}},"links":[{"href":"https://api.sandbox.paypal.com/v2/checkout/orders/48785751AN9981935","rel":"self","method":"GET"}]}',
    paymentId: 0,
    price: 0,
    status: '',
    subscriptionInfoId: 0,
    transactionId: '',
    type: 'paypal',
    updatedAt: '2023-12-23T12:16:15.382Z',
    userId: 0,
    subscriptionInfo: {
        subscriptionInfoId: 0,
        discount: 0,
        subscriptionTypeId: 0,
        durationId: 0,
        subscriptionType: {
            subscriptionTypeId: 0,
            name: '',
            price: 0,
        },
        duration: {
            durationId: 0,
            time: 0,
        },
    },
};
