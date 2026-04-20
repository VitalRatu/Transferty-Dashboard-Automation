import { Page } from '@playwright/test';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { BasePage } from '../../BasePage';

export type CurrencyPageFilters = 
{
    'Project': string
    'Currency': string
}

/**
 * Represents the Currency Balances page within the billing module
 * This class provides a specialized interface for monitoring total funds across the system, 
 * categorized and consolidated by specific currency codes
 */
export class CurrencyPage extends BasePage
{
    /** The FilterBar component used for searching currency records and applying date or status filters */
    public readonly filter: FilterBar<CurrencyPageFilters>;
    
    /** The Table component used to display and audit the consolidated balances for each active currency */
    public readonly table: Table;

    /**
     * Initializes a new instance of the CurrencyPage class
     * Sets up the core UI components required for managing and auditing currency-specific balances
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/billing\/balances\/currency/);
        this.filter = new FilterBar<CurrencyPageFilters>(page);
        this.table = new Table(page);
    }
}