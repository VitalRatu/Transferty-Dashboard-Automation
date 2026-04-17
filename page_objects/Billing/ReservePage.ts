import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';
import { BasePage } from '../BasePage';

/**
 * Represents the Reserve management page within the application
 * This class provides functionality to monitor and manage rolling reserves, 
 * track funds held for risk mitigation, and audit the scheduled release of these funds
 */
export class ReservePage  extends BasePage      
{
    /** The FilterBar component used for searching through reserve records and filtering by project or date */
    public readonly filter: FilterBar;
    
    /** The Table component used to display reserve statuses, hold periods, and accumulated amounts */
    public readonly table: Table; 

    /**
     * Initializes a new instance of the ReservePage class
     * Sets up the filtering and data grid components for the reserve management interface
     * @param page - The Playwright Page instance
     * @param tabDepth - The depth of the tab navigation
     */
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, /\/billing\/reserves/);
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }

    public async addNewReserve(): Promise<void>
    {
        await this.filter.clickPrimaryButton('Add new');
        await this.page.waitForURL(/\/billing\/reserves\/add/);
    }
}