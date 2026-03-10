import { Page, expect } from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';

/**
 * Represents the Review page within the application's transaction management section
 * Serves as a container for components used to manage and evaluate transactions that require manual review
 */
export class ReviewPage 
{
    /** The Playwright Page instance used to interact with the browser context */
    private readonly page: Page;
    
    /** The FilterBar component used to search and apply specific criteria to the review list */
    public readonly filter: FilterBar;
    
    /** The Table component used to view and interact with the grid of transactions pending review */
    public readonly table: Table;

    /**
     * Initializes a new instance of the ReviewPage class
     * Sets up the necessary sub-components like the filter bar and the data table for the review interface
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }

}