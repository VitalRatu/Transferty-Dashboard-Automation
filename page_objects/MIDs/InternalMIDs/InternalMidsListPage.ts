import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { InternalMidType } from '../../../types/MIDs'; 
import { BasePage } from '../../BasePage';

export type InternalMidsListPageTabName = 
{
    'Internal MID': string
    'Project': string
    'Provider': string
    'PSP': string
    'Currency': string
    'Method': string
    'Labels': string
    'Status': 'Active' | 'Blocked'
    'Created': string
}

/**
 * Represents the Internal MIDs management page within the MIDs section
 * Provides functionality to navigate to the creation form and verify existing Internal MID
 * records within the data table against expected test data
 */
export class InternalMidsListPage extends BasePage
{
    /** The FilterBar component used for searching and initiating new MID creation */
    public readonly filterBar: FilterBar<InternalMidsListPageTabName>;
    
    /** The Table component used to display and interact with Internal MID records */
    public readonly table: Table;

    /**
     * Initializes a new instance of the InternalMidPage class
     * Sets up the filter bar and the data table components
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/mids\/internal\/?$/);
        this.filterBar = new FilterBar<InternalMidsListPageTabName>(page);
        this.table = new Table(page);
    }

    /**
     * Initiates the process of adding a new Internal MID by clicking the primary button in the filter bar
     * Waits for the browser to navigate to the Internal MID addition URL
     * @returns A promise that resolves when the navigation is complete
     */
    public async addNewInternalMid(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/mids\/internal\/add\/?$/);
    }

    public async exportInternalMidsToCSV(): Promise<void>
    {
        await this.filterBar.exportCsv();
        await this.page.waitForLoadState('networkidle');
    }

    public async openInternalMidDetails({ description, internalMID }: { description?: string, internalMID?: string }): Promise<void> 
    {
        const detailsUrlPattern = /(?:\/projects\/\d+\/configurations)?\/mids\/internal\/MI-\d+/;

        if (description) 
        {
            await this.table.clickOnColumnValue('Description', description, 'Internal MID');
            await this.page.waitForURL(detailsUrlPattern);
        } 
        else if (internalMID) 
        {
            await this.table.clickOnColumnValue('Internal MID', internalMID, 'Internal MID');
            await this.page.waitForURL(detailsUrlPattern);
        } 
        else 
        {
            throw new Error('No parameters provided!');
        }
    }

    /**
     * Verifies that the values in a specific table row match the provided internal MID data
     * Checks the current URL, extracts row data by index, and asserts that fields like Project,
     * Provider, Currency, Payment methods, and Status match the expected values
     * @param rowIndex - The zero-based index of the row to be verified in the table
     * @param expectedData - The data object containing expected values for comparison
     * @returns A promise that resolves when all row data assertions pass
     */
    public async verifyRowMatchesData(rowIndex: number, expectedData: InternalMidType): Promise<void>
    {
        await expect(this.page).toHaveURL(/mids\/internal/);
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['Internal MID']).toMatch(/^MI-\d{10}$/);
        expect(rowValues['Project']).toBe(expectedData.project);
        expect(rowValues['Provider']).toBe(expectedData.provider);
        expect(rowValues['Currency']).toBe(expectedData.currency);
        expect(rowValues['Available payment methods']).toBe(expectedData.paymentMethod);
        expect(rowValues['Description']).toBe(expectedData.description || '');
        expect(rowValues['Status']).toBe(expectedData.status);
    }
}