export type LedgerOperationsType = 
{
    project: string,
    action: string,
    wallet_from?: string,
    wallet_to?: string,
    amount: string,
    description: string
}