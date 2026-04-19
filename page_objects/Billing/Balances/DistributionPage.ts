import { Page } from '@playwright/test';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { BasePage } from '../../BasePage';


export type DistributionPageFilters = 
    | 'Project' 
    | 'Provider' 
    | 'PSP' 
    | 'External MID' 
    | 'Currency' 
    | 'Labels' 

/**
 * Represents the Distribution balances page within the billing module
 * This class provides a specialized interface for monitoring how funds are allocated, 
 * split, and distributed across various accounts and financial entities in the system
 */
export class DistributionPage extends BasePage
{
    /** The FilterBar component used for searching distribution records by project, status, or entity */
    public readonly filter: FilterBar<DistributionPageFilters>;
    
    /** The Table component used to display and audit distribution flows and allocation balances */
    public readonly table: Table;

    /**
     * Initializes a new instance of the DistributionPage class
     * Sets up the core UI components required for managing and auditing fund distributions
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/billing\/balances\/distribution/);
        this.filter = new FilterBar<DistributionPageFilters>(page);
        this.table = new Table(page);
    }
}