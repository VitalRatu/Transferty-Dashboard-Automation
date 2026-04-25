import { EMoneyCustomerWalletType, EMoneyMerchantWalletType, EMoneyOperationalWalletType } from "../types/EMoneyWallets"

export const EMoneyOperationalWalletData: EMoneyOperationalWalletType[] =
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
export const EMoneyMerchantWalletsData: EMoneyMerchantWalletType[] = 
[
    {
        project: 'Vitaliy_SuperPay_Project',
        type: 'Merchant',
        currency: 'KZT',
        description: 'OnePay'
    }
]
export const EMoneyCustomerWalletsData: EMoneyCustomerWalletType[] = 
[
    {
        project: 'Vitaliy_SuperPay_Project',
        wallet_id: 'WC-100000000219',
        type: 'Customer',
        account_id: '+77555555575',
        currency: 'KZT',
    }
]
