import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';

/**
 * Represents the Currency Balances page within the billing module
 * This class provides a specialized interface for monitoring total funds across the system, 
 * categorized and consolidated by specific currency codes
 */
export class CurrencyPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The navigation tab component used for internal routing within the currency section */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching currency records and applying date or status filters */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit the consolidated balances for each active currency */
    public readonly table: Table;

    /**
     * Initializes a new instance of the CurrencyPage class
     * Sets up the core UI components required for managing and auditing currency-specific balances
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