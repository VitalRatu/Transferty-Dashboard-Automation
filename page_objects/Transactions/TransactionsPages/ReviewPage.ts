import { Page, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar';
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type ReviewPageTabName = 
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
 * Represents the Review page within the application's transaction management section
 * Serves as a container for components used to manage and evaluate transactions that require manual review
 */
export class ReviewPage extends BasePage
{
    /** The FilterBar component used to search and apply specific criteria to the review list */
    public readonly filter: FilterBar<ReviewPageTabName>;
    
    /** The Table component used to view and interact with the grid of transactions pending review */
    public readonly table: Table;

    /**
     * Initializes a new instance of the ReviewPage class
     * Sets up the necessary sub-components like the filter bar and the data table for the review interface
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/transactions\/review/)
        this.filter = new FilterBar<ReviewPageTabName>(page);
        this.table = new Table(page);
    }

}