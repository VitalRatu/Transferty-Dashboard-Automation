import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';

/**
 * Represents the Acquiring balances page within the billing module
 * This class provides a specialized interface for monitoring incoming payment flows, 
 * tracking merchant processing volumes, and auditing funds collected through 
 * various acquiring routes and payment methods
 */
export class AcquiringPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The navigation tab component used for internal routing within the acquiring section */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching through acquiring records by project, terminal, or date */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit transaction-level balances and processing totals */
    public readonly table: Table;

    /**
     * Initializes a new instance of the AcquiringPage class
     * Sets up the core UI components required for managing and auditing merchant acquiring balances
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