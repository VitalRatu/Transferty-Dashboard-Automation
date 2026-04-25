export type EMoneyOperationalWalletType = 
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
export type EMoneyFeeWallelObjectType =
{
    fee: string, 
    activation_date: string, 
    expirationDate: string | 'Permanent', 
    timezone:string,
    status?: 'Active' | 'Expired'
}
export type EMoneyMerchantWalletType = 
{
    project: string,
    type: string,
    currency: string,
    internalMID?: string,
    description: string
}
export type EMoneyCustomerWalletType = 
{
    project: string,
    wallet_id: string,
    type: string,
    account_id: string,
    currency: string
}
