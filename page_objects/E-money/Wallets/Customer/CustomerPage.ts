import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../../related_components/Tab';
import { Table } from '../../../related_components/Table';
import { FilterBar } from '../../../related_components/FilterBar';

/**
 * Represents the Customer Wallets listing page within the E-money section
 * Provides access to customer-specific digital wallet records, allowing for data filtering 
 * and table interactions via specialized sub-components
 */
export class CustomerPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The Tab component used for navigation between different wallet modules */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching and filtering customer wallet records */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and interact with the list of customer wallets */
    public readonly table: Table;

    /**
     * Initializes a new instance of the CustomerPage class
     * Sets up the core components including navigation tabs, filter bars, and data tables
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