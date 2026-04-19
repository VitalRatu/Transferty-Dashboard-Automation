import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';
import { BasePage } from '../BasePage';

export type ExchangeRatesPageFilters = 
    | 'From' 
    | 'To'

/**
 * Represents the Exchange Rates management page within the application
 * This class provides access to currency conversion data, allowing users to track 
 * fluctuations, filter by specific currency pairs, and audit the rate history 
 * used for cross-currency transactions
 */
export class ExchangeRatesPage extends BasePage
{
    /** The FilterBar component used for searching specific currency codes, providers, or date ranges */
    public readonly filter: FilterBar<ExchangeRatesPageFilters>;
    
    /** The Table component used to display the current and historical exchange rate data */
    public readonly table: Table; 

    /**
     * Initializes a new instance of the ExchangeRatesPage class
     * Sets up the filtering system and the data grid for currency rate management
     * @param page - The Playwright Page instance
     * @param tabDepth - The depth of the tab navigation
     */
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, /\/billing\/rates/)
        this.filter = new FilterBar<ExchangeRatesPageFilters>(page);
        this.table = new Table(page);
    }
}