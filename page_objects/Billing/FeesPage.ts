import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';

/**
 * Represents the Fees management page within the application
 * Provides functionality to configure, monitor, and audit various fee structures, 
 * commissions, and service charges across different payment routes and projects
 */
export class FeesPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The FilterBar component used for searching through fee records and applying specific criteria filters */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and interact with the list of fee configurations */
    public readonly table: Table; 

    /**
     * Initializes a new instance of the FeesPage class
     * Sets up the filtering system and the data grid for fee management
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }
}