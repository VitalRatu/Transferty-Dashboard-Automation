import { Page } from '@playwright/test';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { BasePage } from '../../BasePage';

export type SecureDepositsPageFilters = 
{
    'Secure Deposit': string
    'Project': string
    'Amount': string
    'Currency': string
    'Created Date': string
    'Income Date': string
}

/**
 * Represents the Secure Deposits management page within the Balances section
 * This class provides a structured interface for monitoring collateral funds, 
 * verifying security deposits, and auditing held assets across different projects 
 * and merchant accounts
 */
export class SecureDepositsPage extends BasePage
{
    /** The FilterBar component used for searching through deposit records by project, status, or date */
    public readonly filter: FilterBar<SecureDepositsPageFilters>;
    
    /** The Table component used to display and audit secure deposit records and their current balances */
    public readonly table: Table;

    /**
     * Initializes a new instance of the SecureDepositsPage class
     * Sets up the core UI components required for managing and auditing secure deposits
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/billing\/balances\/secure-deposits/);
        this.filter = new FilterBar<SecureDepositsPageFilters>(page);
        this.table = new Table(page);
    }
}