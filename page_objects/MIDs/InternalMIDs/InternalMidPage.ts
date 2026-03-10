import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { InternalMidData } from '../../../test_data/MIDsData';  

/**
 * Represents the Internal MIDs management page within the MIDs section
 * Provides functionality to navigate to the creation form and verify existing Internal MID
 * records within the data table against expected test data
 */
export class InternalMidPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The FilterBar component used for searching and initiating new MID creation */
    public readonly filterBar: FilterBar;
    
    /** The Table component used to display and interact with Internal MID records */
    public readonly table: Table;

    /**
     * Initializes a new instance of the InternalMidPage class
     * Sets up the filter bar and the data table components
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.filterBar = new FilterBar(page);
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
        await this.page.waitForURL(/\/mids\/internal\/add/);
    }

    /**
     * Verifies that the values in a specific table row match the provided internal MID data
     * Checks the current URL, extracts row data by index, and asserts that fields like Project,
     * Provider, Currency, Payment methods, and Status match the expected values
     * @param rowIndex - The zero-based index of the row to be verified in the table
     * @param expectedData - The data object containing expected values for comparison
     * @returns A promise that resolves when all row data assertions pass
     */
    public async verifyRowMatchesData(rowIndex: number, expectedData: InternalMidData): Promise<void>
    {
        await expect(this.page).toHaveURL(/mids\/internal/);
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['Project']).toBe(expectedData.project);
        expect(rowValues['Provider']).toBe(expectedData.provider);
        expect(rowValues['Currency']).toBe(expectedData.currency);
        expect(rowValues['Available payment methods']).toBe(expectedData.paymentMethod);
        expect(rowValues['Description']).toBe(expectedData.description || '');
        expect(rowValues['Status']).toBe(expectedData.status);
    }
}