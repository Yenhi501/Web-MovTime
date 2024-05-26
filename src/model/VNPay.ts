export interface VNPayReturnDataRaw {
    isSuccess: boolean;
    message: string;
    vnp_Amount: number;
    vnp_BankCode: string;
    vnp_BankTranNo: string;
    vnp_CardType: string;
    vnp_OrderInfo: string;
    vnp_PayDate: string;
    vnp_ResponseCode: string;
    vnp_SecureHash: string;
    vnp_SecureHashType: string;
    vnp_TmnCode: string;
    vnp_TransactionNo: number;
    vnp_TransactionStatus: string;
    vnp_TxnRef: string;
}

export const VNPayReturnDataRawDefault = {
    isSuccess: true,
    message: '',
    vnp_Amount: 0,
    vnp_BankCode: '',
    vnp_BankTranNo: '',
    vnp_CardType: '',
    vnp_OrderInfo: ' ',
    vnp_PayDate: '',
    vnp_ResponseCode: '',
    vnp_SecureHash: '',
    vnp_SecureHashType: '',
    vnp_TmnCode: '',
    vnp_TransactionNo: 0,
    vnp_TransactionStatus: '',
    vnp_TxnRef: '',
};
