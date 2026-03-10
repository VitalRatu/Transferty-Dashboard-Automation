import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';

/**
 * Represents the Aggregated MIDs balances page within the billing module
 * This class provides a centralized interface for monitoring consolidated funds 
 * across multiple merchant identifiers, allowing for high-level financial oversight 
 * and reporting of grouped payment processing entities
 */
export class AggregatedPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The navigation tab component used for internal routing within the aggregated balances section */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching through aggregated groups by project, status, or MID details */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit consolidated balances and transaction summaries for grouped MIDs */
    public readonly table: Table;

    /**
     * Initializes a new instance of the AggregatedPage class
     * Sets up the core UI components required for managing and auditing aggregated merchant balances
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