import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';

/**
 * Represents the Secure Deposits management page within the Balances section
 * This class provides a structured interface for monitoring collateral funds, 
 * verifying security deposits, and auditing held assets across different projects 
 * and merchant accounts
 */
export class SecureDepositsPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The navigation tab component used for internal routing within the Secure Deposits section */
    public readonly tab: Tab;
    
    /** The FilterBar component used for searching through deposit records by project, status, or date */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit secure deposit records and their current balances */
    public readonly table: Table;

    /**
     * Initializes a new instance of the SecureDepositsPage class
     * Sets up the core UI components required for managing and auditing secure deposits
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