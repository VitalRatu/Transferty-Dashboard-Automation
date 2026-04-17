import { Page, Locator, expect } from '@playwright/test';
import { Table } from '../../../related_components/Table';
import { FilterBar } from '../../../related_components/FilterBar';
import { BasePage } from '../../../BasePage';

/**
 * Represents the Customer Wallets listing page within the E-money section
 * Provides access to customer-specific digital wallet records, allowing for data filtering 
 * and table interactions via specialized sub-components
 */
export class CustomerWalletsListPage extends BasePage
{
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
        super(page, /\/emoney\/wallets\/customer/);
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }
}