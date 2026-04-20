import { Page } from '@playwright/test';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { BasePage } from '../../BasePage';

export type AggregatedPageFilters = 
{
    'Project': string
    'Aggregated MIDs': string
    'Currency': string
}

/**
 * Represents the Aggregated MIDs balances page within the billing module
 * This class provides a centralized interface for monitoring consolidated funds 
 * across multiple merchant identifiers, allowing for high-level financial oversight 
 * and reporting of grouped payment processing entities
 */
export class AggregatedPage extends BasePage
{
    /** The FilterBar component used for searching through aggregated groups by project, status, or MID details */
    public readonly filter: FilterBar<AggregatedPageFilters>;
    
    /** The Table component used to display and audit consolidated balances and transaction summaries for grouped MIDs */
    public readonly table: Table;

    /**
     * Initializes a new instance of the AggregatedPage class
     * Sets up the core UI components required for managing and auditing aggregated merchant balances
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/billing\/balances\/aggregated/);
        this.filter = new FilterBar<AggregatedPageFilters>(page);
        this.table = new Table(page);
    }
}