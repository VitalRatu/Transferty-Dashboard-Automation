import { Page, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar';
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type TxAttemptsPageTabName = 
{
    'Tx ID': string 
    'Order ID': string 
    'Project': string
    'Provider': string 
    'PSP': string 
    'Internal MID': string 
    'Subscription': 'Yes' | 'No' 
    'Type': 'payment' | 'payout' | 'refund'
    'Currency': string 
    'Order currency': string 
    'Created': string
}
/**
 * Represents the Transaction Attempts (Tx Attempts) page in the application
 * Serves as a container for page-specific components, providing access to the 
 * filtering mechanism and the data table used to view and interact with transaction attempt records
 */
export class TxAttemptsPage extends BasePage
{
    /** The FilterBar component used to apply search criteria and filter the transaction attempts */
    public readonly filter: FilterBar<TxAttemptsPageTabName>;
    
    /** The Table component used to interact with the grid of transaction attempt records */
    public readonly table: Table;

    /**
     * Initializes a new instance of the TxAttemptsPage class
     * Instantiates the related sub-components (FilterBar and Table) required for this page
     * @param page - The Playwright Page instance.
     */
    constructor(page: Page) 
    {
        super(page, /\/transactions\/tx-attempts/)
        this.filter = new FilterBar<TxAttemptsPageTabName>(page);
        this.table = new Table(page);
    }
}