import { Page, Locator, expect } from '@playwright/test';
import { Table } from '../../../related_components/Table';
import { FilterBar } from '../../../related_components/FilterBar';
import { BasePage } from '../../../BasePage';

export type CustomerWalletsListFilter = 
{
    'Project': string
    'Wallet ID': string
    'Account ID': string 
    'Currency': string
    'Created': string
}
export class CustomerWalletsListPage extends BasePage
{
    /** The FilterBar component used for searching and filtering customer wallet records */
    public readonly filter: FilterBar<CustomerWalletsListFilter>;
    
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
        this.filter = new FilterBar<CustomerWalletsListFilter>(page);
        this.table = new Table(page);
    }
}