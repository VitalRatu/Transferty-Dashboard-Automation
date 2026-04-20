import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';
import { BasePage } from '../BasePage';

export type SettlementsPageFilters = 
{
    'ID': string
    'Project': string
    'Provider': string
    'Intermediary': string
    'PSP': string
    'Internal MID': string
    'Currency': string
    'Created': string
    'Updated': string
} 
  
/**
 * Represents the Settlements page within the application
 * Provides a management interface for tracking fund distributions, performing 
 * financial reconciliation, and managing the final transfer of funds to merchants or providers
 */
export class SettlementsPage extends BasePage
{
    /** The FilterBar component used for searching through settlement batches and individual records */
    public readonly filter: FilterBar<SettlementsPageFilters>;
    
    /** The Table component used to display settlement statuses, amounts, and dates */
    public readonly table: Table; 

    /**
     * Initializes a new instance of the SettlementsPage class
     * Sets up the filtering and data grid sub-components for the settlements interface
     * @param page - The Playwright Page instance
     * @param tabDepth - The depth of the tab navigation
     */
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, /\/billing\/settlements/);
        this.filter = new FilterBar<SettlementsPageFilters>(page);
        this.table = new Table(page);
    }

    public async addNewSettlement(): Promise<void>
    {
        await this.filter.clickPrimaryButton('Create transfer');
        await this.page.waitForURL(/\/billing\/settlements\/add/);
    }
}