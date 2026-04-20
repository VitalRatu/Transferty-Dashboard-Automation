import { Page, Locator, expect } from '@playwright/test';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { BasePage } from '../../BasePage';

export type IntermediaryPageTabName = 
{
    'Name': string
    'Created': string
    'Updated': string
}
/**
 * Represents the Intermediary management page within the PSP section
 * This class provides a structured interface for managing financial intermediaries, 
 * allowing users to search through records and audit middle-man entities within 
 * the payment processing pipeline
 */
export class IntermediaryPage extends BasePage
{

    /** The FilterBar component used for searching through intermediary records by name, status, or type */
    public readonly filter: FilterBar<IntermediaryPageTabName>;
    
    /** The Table component used to display and audit intermediary configuration records and their current states */
    public readonly table: Table;

    /**
     * Initializes a new instance of the IntermediatyPage class
     * Sets up the core UI components required for managing the intermediary list
     * @param page - The Playwright Page instance
     */
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, /\/billing\/psp\/intermediary/);
        this.filter = new FilterBar<IntermediaryPageTabName>(page);
        this.table = new Table(page);
    }

    public async createNewIntermediary(): Promise<void>
    {
        await this.filter.clickPrimaryButton('Create');
        await this.page.waitForURL(/\/billing\/psp\/intermediary\/add/);
    }
}