export type InternalMidType = 
{
    project: string, 
    provider: string,
    paymentMethod: string,
    externalMid: string,
    currency: string, 
    orderExchangeCurrency?: string,
    description?: string,
    status?: string
}

export type AggregatedMidType =
{
    project: string, 
    type: 'Incoming' | 'Outgoing' | 'Secure Deposit',
    currency: string, 
    internalMid: string,
    description?: string
}

export type SecureDepositType =
{
    project: string,
    amount: string,
    currency: string,
    date: string
    description?: string
}

export type ExternalMidType =
{
    project: string, 
    account_management_api_support?: 'Yes' | 'No',
    provider: string,
    intermediary: string,
    psp: string,
    externalMid: string,   
    providersMid: string,
    api_endpoint: string, 
    providers_credential: {[key: string]: string},
    description?: string,
    timezone?: string,
    balance_api_support?: 'Yes' | 'No',
    static_result_url?: string,
    customer_data_randomization?: 'Enable' | 'Disable',
    customerFees?: CustomerFeeType[],
}

export type CustomerFeeType =
{
    feeType: 'Payments' | 'Payouts';
    isActive?: boolean,         
    fixed?: string;       
    percentage?: string;  
    min?: string;             
}