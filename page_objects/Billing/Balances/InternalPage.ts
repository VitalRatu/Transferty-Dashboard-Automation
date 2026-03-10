import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';

/**
 * Represents the Internal Balances page within the billing module
 * This class provides a structured interface for managing system-level accounts, 
 * auditing internal fund movements, and monitoring operational balances that 
 * are not directly tied to external merchant or customer wallets
 */
export class InternalPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The navigation tab component used for internal routing within the internal balances section */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching internal records and system accounts by currency or date */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit internal ledger balances and transaction flows */
    public readonly table: Table;

    /**
     * Initializes a new instance of the InternalPage class
     * Sets up the core UI components required for managing and auditing internal system balances
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