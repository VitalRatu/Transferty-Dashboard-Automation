import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';

/**
 * Represents the Automated Transfers page within the adjustments module
 * This class provides a structured interface for configuring fund movement rules, 
 * monitoring automated transfer schedules, and auditing the execution history 
 * of system-driven account balancing
 */
export class AutoTransferPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The navigation tab component used for internal routing within the auto-transfer section */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching through transfer rules by status, project, or target wallet */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit active auto-transfer configurations and their execution logs */
    public readonly table: Table;

    /**
     * Initializes a new instance of the AutoTransferPage class
     * Sets up the core UI components required for managing and auditing automated fund transfers
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.tab = new Tab(page);
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }
}