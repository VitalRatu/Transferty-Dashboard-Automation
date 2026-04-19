import { Page, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar';
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type ReviewPageTabName = 
    | 'Tx ID' 
    | 'Order ID' 
    | 'Aggregated MIDs' 
    | 'External ID' 
    | 'Subscription' 
    | 'Customer token' 
    | 'Provider' 
    | 'Intermediary' 
    | 'PSP' 
    | 'Internal MID' 
    | 'RRN' 
    | 'Project' 
    | 'Method' 
    | 'Status' 
    | 'Type' 
    | 'Currency' 
    | 'Order currency' 
    | 'BIN' 
    | 'Last four' 
    | 'Country' 
    | 'Customer IP' 
    | 'Created';

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