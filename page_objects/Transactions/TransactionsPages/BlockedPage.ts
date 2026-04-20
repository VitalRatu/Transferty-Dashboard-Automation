import { Page, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar';
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type BlockedPageTabName = 
{
    'Tx ID': string
    'Order ID': string
    'Aggregated MIDs': string 
    'External ID': string 
    'Subscription': 'Yes' | 'No' 
    'Customer token': string 
    'Provider': string 
    'Intermediary': string 
    'PSP': string 
    'Internal MID': string 
    'RRN': string 
    'Project': string 
    'Method': string 
    'Status': string 
    'Type': 'payment' | 'payout' | 'refund' 
    'Currency': string 
    'Order currency': string 
    'BIN': string 
    'Last four': string 
    'Country': string 
    'Customer IP': string 
    'Created': string
}
/**
 * Represents the Blocked transactions page within the application
 * Provides a specialized interface for viewing and managing transactions that have been restricted or blocked by the system
 */
export class BlockedPage extends BasePage
{
    /** The FilterBar component used to search through and narrow down the list of blocked transactions */
    public readonly filter: FilterBar<BlockedPageTabName>;
    
    /** The Table component used to display and interact with the data grid of blocked transaction records */
    public readonly table: Table;

    /**
     * Initializes a new instance of the BlockedPage class
     * Sets up the core sub-components, including the filter bar and the data table, for the blocked transactions view
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/transactions\/blocked/)
        this.filter = new FilterBar<BlockedPageTabName>(page);
        this.table = new Table(page);
    }

}