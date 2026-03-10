import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';

/**
 * Represents the Exchange Rates management page within the application
 * This class provides access to currency conversion data, allowing users to track 
 * fluctuations, filter by specific currency pairs, and audit the rate history 
 * used for cross-currency transactions
 */
export class ExchangeRatesPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The FilterBar component used for searching specific currency codes, providers, or date ranges */
    public readonly filter: FilterBar;
    
    /** The Table component used to display the current and historical exchange rate data */
    public readonly table: Table; 

    /**
     * Initializes a new instance of the ExchangeRatesPage class
     * Sets up the filtering system and the data grid for currency rate management
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }
}