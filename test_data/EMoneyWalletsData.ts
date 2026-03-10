export type EMoneyOperationalWallet = 
{
    project: string, 
    type: string,
    currency: string,
    fee?: string,
    activationDate?: string,
    expirationDate?: string | 'Permanent',
    timezone?: string,
    description: string,
}
export type EMoneyFeeWallelObject =
{
    fee: string, 
    activation_date: string, 
    expirationDate: string | 'Permanent', 
    timezone:string,
    status?: 'Active' | 'Expired'
}
export type EMoneyMerchantWallet = 
{
    project: string,
    type: string,
    currency: string,
    internalMID?: string,
    description: string
}
export type EMoneyCustomerWallet = 
{
    project: string,
    wallet_id: string,
    type: string,
    account_id: string,
    currency: string
}
export const EMoneyOperationalWallet: EMoneyOperationalWallet[] =
[
    //Fee Wallet
    {
        project: 'Vitaliy_SuperPay_Project',
        type: 'Fee',
        currency: 'KZT',
        fee: '2',
        activationDate: "2026-03-05 00:00:00",
        expirationDate: '2026-03-05 23:59:59', 
        description: 'Fee Wallet from automation'
    },

    // Issuer Wallet
    {
        project: 'Vitaliy_SuperPay_Project',
        type: 'Issuer',
        currency: 'KZT',
        description: 'Issuer Wallet from automation'
    },

    // Agent Wallet
    {
        project: 'Vitaliy_SuperPay_Project',
        type: 'Agent',
        currency: 'KZT',
        description: 'Agent Wallet from automation'
    }
]
export const EMoneyMerchantWallets: EMoneyMerchantWallet[] = 
[
    {
        project: 'Vitaliy_SuperPay_Project',
        type: 'Merchant',
        currency: 'KZT',
        description: 'OnePay'
    }
]
export const EMoneyCustomerWallets: EMoneyCustomerWallet[] = 
[
    {
        project: 'Vitaliy_SuperPay_Project',
        wallet_id: 'WC-100000000219',
        type: 'Customer',
        account_id: '+77555555575',
        currency: 'KZT',
    }
]
