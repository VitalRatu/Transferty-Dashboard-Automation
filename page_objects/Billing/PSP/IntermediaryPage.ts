import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';

/**
 * Represents the Intermediary management page within the PSP section
 * This class provides a structured interface for managing financial intermediaries, 
 * allowing users to search through records and audit middle-man entities within 
 * the payment processing pipeline
 */
export class IntermediaryPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The navigation tab component used for internal routing within the Intermediary section */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching through intermediary records by name, status, or type */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit intermediary configuration records and their current states */
    public readonly table: Table;

    /**
     * Initializes a new instance of the IntermediatyPage class
     * Sets up the core UI components required for managing the intermediary list
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