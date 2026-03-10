export type EMoneyLimitsData = 
{
    currency: string,
    customer_wallet_daily_limit: string,
    tx_max_amount: string
}

export const EMoneyLimits: EMoneyLimitsData[] = 
[
    {
        currency: 'KZT',
        customer_wallet_daily_limit: '100',
        tx_max_amount: '10'
    }
]