import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';
import { BasePage } from '../BasePage';

export type FeesPageFilters = 
    | 'ID' 
    | 'Project' 
    | 'Provider' 
    | 'Currency' 
    | 'Tx type' 
    | 'Internal MID' 
    | 'Status' 
    | 'Category' 

/**
 * Represents the Fees management page within the application
 * Provides functionality to configure, monitor, and audit various fee structures, 
 * commissions, and service charges across different payment routes and projects
 */
export class FeesPage extends BasePage
{

    /** The FilterBar component used for searching through fee records and applying specific criteria filters */
    public readonly filter: FilterBar<FeesPageFilters>;
    
    /** The Table component used to display and interact with the list of fee configurations */
    public readonly table: Table; 

    /**
     * Initializes a new instance of the FeesPage class
     * Sets up the filtering system and the data grid for fee management
     * @param page - The Playwright Page instance
     * @param tabDepth - The depth of the tab navigation
     */
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, /\/billing\/fees/);
        this.filter = new FilterBar<FeesPageFilters>(page);
        this.table = new Table(page);
    }

    public async addNewFee(): Promise<void>
    {
        await this.filter.clickPrimaryButton('Add Fee');
        await this.page.waitForURL(/\/billing\/fees\/add/);
    }

    public async exportFeeToCsv(): Promise<void>
    {
        await this.filter.exportCsv();
    }
}