import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';

/**
 * Represents the Settlements page within the application
 * Provides a management interface for tracking fund distributions, performing 
 * financial reconciliation, and managing the final transfer of funds to merchants or providers
 */
export class SettlementsPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The FilterBar component used for searching through settlement batches and individual records */
    public readonly filter: FilterBar;
    
    /** The Table component used to display settlement statuses, amounts, and dates */
    public readonly table: Table; 

    /**
     * Initializes a new instance of the SettlementsPage class
     * Sets up the filtering and data grid sub-components for the settlements interface
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }
}