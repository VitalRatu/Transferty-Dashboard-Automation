import { AggregatedMidType, CustomerFeeType, ExternalMidType, InternalMidType, SecureDepositType } from "../types/MIDs"

export const internalMIDsData: InternalMidType[] = 
[
    {
        project: 'Vitaliy_QA Transferty',
        provider: 'Demo',
        paymentMethod: 'Cards',
        externalMid: 'Demo',
        currency: 'USD', 
        description: 'Internal MID from automation',
        status: 'Active'
    }
]

export const aggregatedMIDsData: AggregatedMidType[] =
[
    {
        project: 'Vitaliy_QA Transferty',
        type: 'Incoming',
        currency: 'USD',
        internalMid: '',
        description: 'Incoming Aggregated MID from automation'
    },

    {
        project: 'Vitaliy_QA Transferty',
        type: 'Outgoing',
        currency: 'USD',
        internalMid: '',
        description: 'Outgoing Aggregated MID from automation'
    },

    {
        project: 'Vitaliy_QA Transferty',
        type: 'Secure Deposit',
        currency: 'USD',
        internalMid: '',
        description: 'Secure Deposit Aggregated MID from automation'
    }
]

export const secureDepositsData: SecureDepositType[] =
[
    {
        project: 'Vitaliy_QA Transferty',
        amount: '91.00',
        currency: 'USD',
        date: '2026-02-20',
        description: 'Secure Deposit from automation'
    }
]

export const customerFeesData: CustomerFeeType[] = 
[
    {
        feeType: 'Payments',
        fixed: '1',
        percentage: '10',
        min: '5'
    },

    {
        feeType: 'Payouts',
        fixed: '1',
        percentage: '10',
        min: '5'
    }
]

export const externalMIDsData: ExternalMidType[] =
[
    {
        project: 'Vitaliy_QA Transferty',
        account_management_api_support: 'No',
        provider: 'SmilePayz',   
        intermediary: 'Sandbox Demo Intermediary',
        psp: 'Sandbox Demo PSP',
        externalMid: 'smilepayz',   
        providersMid: 'sandbox-21352',
        api_endpoint: 'https://sandbox-gateway.smilepayz.com/v2.0/transaction/pay-in',
        providers_credential: 
        {
            'Merchant ID': 'sandbox-21352',
            'Merchant Secret': 'c3346f9b4ade92690f1ae330c89572d9e4b67b2731445f46e6fae957c198b34e',
            'RSA Private Key (base64)': '', 
            'Platform Public Key (base64)': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvxhX5aHxC9QUN8ivqxPslUnbFsBy0dpWwalgSBlQ7gMdyA2lbMmP76TthIGIuWK3uO5h81c+cchGFaiOer5zGsdE7LMZPzFnDDvbMQRvKDDO7Lg3nGGodRoOLnvOeavhsYa7YORS/QC1h2aCYk24SCrNDjaG3YxDJavCCTZoYF12Hofg7dmGrtx7L+ky3+Gl5059gmz+dZsYBMJqq0VMtI28pIqZ9cHmnf9q0C6JEhfNKG2kRyfheLar12ZLSCbJfGI4hSNpX+oWMENZ11KSEWVzMl3WPiAK/zv9k+5wsYBiJ6rbLrXtm56OF+bHcp5hTkZHtA9Wzc2X3TbpHxqq6wIDAQAB',
        },
        description: 'External MID from automation',
        customer_data_randomization: 'Disable',
        customerFees: customerFeesData
    }
]