import { Page, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar';
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

/**
 * Represents the Blocked transactions page within the application
 * Provides a specialized interface for viewing and managing transactions that have been restricted or blocked by the system
 */
export class BlockedPage extends BasePage
{
    /** The FilterBar component used to search through and narrow down the list of blocked transactions */
    public readonly filter: FilterBar;
    
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
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }

}