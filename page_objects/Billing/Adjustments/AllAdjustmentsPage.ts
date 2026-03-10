import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';

/**
 * Represents the comprehensive Adjustments log page within the billing module
 * This class provides a centralized interface for viewing, filtering, and auditing 
 * all manual balance corrections and transaction adjustments across the system
 */
export class AllAdjustmentsPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The navigation tab component used for internal routing within the adjustments sub-section */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching through adjustment records by project, currency, or adjustment type */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit the history of manual balance corrections and their current statuses */
    public readonly table: Table;

    /**
     * Initializes a new instance of the AllAdjustmentsPage class
     * Sets up the core UI components required for managing and auditing the adjustments log
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