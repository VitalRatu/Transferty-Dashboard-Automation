import { Page} from '@playwright/test';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { BasePage } from '../../BasePage';

/**
 * Represents the comprehensive Adjustments log page within the billing module
 * This class provides a centralized interface for viewing, filtering, and auditing 
 * all manual balance corrections and transaction adjustments across the system
 */
export class AllAdjustmentsPage extends BasePage
{
    /** The FilterBar component used for searching through adjustment records by project, currency, or adjustment type */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit the history of manual balance corrections and their current statuses */
    public readonly table: Table;

    /**
     * Initializes a new instance of the AllAdjustmentsPage class
     * Sets up the core UI components required for managing and auditing the adjustments log
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/billing\/adjustments\/without-rules/);
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }

    //TODO: implement 
    public async exportToCSV(): Promise<void>
    {
        this.filter.exportCsv();   
    }

    public async createAdjustment(): Promise<void>
    {
        await this.filter.clickPrimaryButton('Adjust balance');
        await this.page.waitForURL(/\/billing\/adjustments\/without-rules\/add/);
    }
}