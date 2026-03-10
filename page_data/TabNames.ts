//Tabs for Transactions page
export enum TransactionTabs 
{
    Transactions = 'Transactions',
    Review = 'Review',
    Blocked = 'Blocked',
    TxAttempts = 'Tx attempts',
    Disputes = 'Disputes'
}

//Tabs for Reports page
export enum ReportsTabs
{
    Financial = 'Financial',
    Transactions = 'Transactions',
    Conversion = 'Conversion',
    Reconciliation = 'Reconciliation'
}

        //Subtabs for ReportsTabs.Financial
        export enum ReportsFinancialSubTabs 
        {
            General = 'General',
            Methods = 'Methods',
            Countries = 'Countries',
            Providers = 'Providers'
        }


//Tabs for Billing page
export enum BillingTabs
{
    Balances = 'Balances',
    Adjustments = 'Adjustments',
    Fees = 'Fees',
    Reserve = 'Reserve',
    ExchangeRates = 'Exchange rates'
}

        //Subtabs for BillingTabs.Adjustments
        export enum BillingAdjustmentsSubTabs
        {
            All_Adjustments = 'All adjustments',
            AutoTransfersbyPercent = 'Auto-transfer by %',
        }

        //Subtabs for BillingTabs.Balances
        export enum BillingBalancesSubTabs
        {
            Acquiring = 'Acquiring',
            Distribution = 'Distribution',
            Secure_Deposit = 'Secure Deposits',
            Internal = 'Internal',
            Aggregated = 'Aggregated',
            Currency = 'Currency',
            Channel = 'Channel',
        }

export enum MIDsTabs
{
    Internal_MIDs = 'Internal MIDs',
    Aggregated_MIDs = 'Aggregated MIDs',
    Secure_Deposits = 'Secure Deposits',
    External_MIDs = 'External MIDs'
}

//Tabs for E-money section
export enum EMoneyTabs
{
    Wallets = 'Wallets',
    Ledger = 'Ledger',
    Settings = 'Settings'
}
    //Subtabs for EMoneyTabs.Wallets
    export enum EMoneyWalletsTabs
    {
        Operational = 'Operational',
        Merchant = 'Merchant',
        Customer = 'Customer'
    }

export type AllTabs = TransactionTabs | ReportsTabs | ReportsFinancialSubTabs | BillingTabs | BillingAdjustmentsSubTabs | BillingBalancesSubTabs | MIDsTabs | EMoneyTabs | EMoneyWalletsTabs;
