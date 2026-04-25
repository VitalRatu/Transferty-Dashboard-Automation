import { LedgerOperationsType } from "../types/LedgerOperations"

export const LedgerOperationsData: LedgerOperationsType[] =
[
    {
        project: 'Vitaliy_SuperPay_Project',
        action: 'Issuance',
        wallet_from: 'WI-100000000123',
        wallet_to: 'WA-100000000124',
        amount: '1',
        description: 'Issuance'
    },

    {
        project: 'Vitaliy_SuperPay_Project',
        action: 'Settlement',
        wallet_from: 'WM-100000000146',
        wallet_to: 'WI-100000000123',
        amount: '1',
        description: 'Settlement from automation'
    },

    {
        project: 'Vitaliy_SuperPay_Project',
        action: 'Correction',
        wallet_from: 'WM-100000000126',
        wallet_to: 'WA-100000000124',
        amount: '1',
        description: 'Correction from automation'
    },
]
