import { Page} from '@playwright/test';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { BasePage } from '../../BasePage';

export type AutoTransferPageFilters = 
{
    'Project': string
    'MID from': string
    'MID to': string
    'Created': string
    'Status': 'Inactive' | 'Active'
}

/**
 * Represents the Automated Transfers page within the adjustments module
 * This class provides a structured interface for configuring fund movement rules, 
 * monitoring automated transfer schedules, and auditing the execution history 
 * of system-driven account balancing
 */
export class AutoTransferPage extends BasePage
{
    /** The FilterBar component used for searching through transfer rules by status, project, or target wallet */
    public readonly filter: FilterBar<AutoTransferPageFilters>;
    
    /** The Table component used to display and audit active auto-transfer configurations and their execution logs */
    public readonly table: Table;

    /**
     * Initializes a new instance of the AutoTransferPage class
     * Sets up the core UI components required for managing and auditing automated fund transfers
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/billing\/adjustments\/auto-transfer-by-percent/);
        this.filter = new FilterBar<AutoTransferPageFilters>(page);
        this.table = new Table(page);
    }
}