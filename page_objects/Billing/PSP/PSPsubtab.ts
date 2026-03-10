import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';

/**
 * Represents the specialized sub-tab for Payment Service Provider (PSP) management
 * This class provides a structured interface for listing, filtering, and interacting 
 * with various payment providers integrated into the system
 */
export class PSPsubtab 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The navigation tab component used for internal routing within the PSP section */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching through the list of providers by name, status, or type */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit PSP configuration records and their current states */
    public readonly table: Table;

    /**
     * Initializes a new instance of the PSPsubtab class
     * Sets up the core UI components required for managing the payment provider list
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