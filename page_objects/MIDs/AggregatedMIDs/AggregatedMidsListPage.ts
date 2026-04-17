import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { AggregatedMidData } from '../../../test_data/MIDsData';
import { BasePage } from '../../BasePage';

/**
 * Represents the Aggregated MIDs management page within the MIDs section
 * Provides functionality to navigate to the aggregated MID creation form and verify 
 * existing aggregated records within the data table against expected test data
 */
export class AggregatedMidsListPage extends BasePage
{
    /** The FilterBar component used for searching and initiating the creation of new aggregated MIDs */
    public readonly filterBar: FilterBar;
    
    /** The Table component used to display and interact with the list of aggregated MID records */
    public readonly table: Table;

    /**
     * Initializes a new instance of the AggregatedMidPage class
     * Sets up the filter bar and the data table for managing aggregated merchant identities
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/mids\/aggregated/);
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
    }

    /**
     * Initiates the process of adding a new Aggregated MID by clicking the primary action button
     * Waits for the browser to navigate to the specific aggregated MID addition route
     * @returns A promise that resolves when the navigation is complete
     */
    public async addNewAggregatedMid(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/mids\/aggregated\/add/);
    }

    public async openAggregatedMidDetails({ description, aggregatedMID, internalMID }: { description?: string, aggregatedMID?: string, internalMID?: string }): Promise<void> 
    {
        if (description) 
        {
            await this.table.clickOnCellValueByUniqueValue('Description', description, 'Aggregated MID');
            await this.page.waitForURL(new RegExp(`/mids/aggregated/AG-\\d{10}`));
        } 
        else if (aggregatedMID) 
        {
            await this.table.clickOnCellValueByUniqueValue('Aggregated MID', aggregatedMID, 'Aggregated MID');
            await this.page.waitForURL(new RegExp(`/mids/aggregated/${aggregatedMID}`));
        } 
        else if (internalMID)         
        {
            await this.table.clickOnCellValueByUniqueValue('Internal MIDs / Secure Deposits', internalMID, 'Aggregated MID');
            await this.page.waitForURL(new RegExp(`/mids/aggregated/AG-\\d{10}`));
        }
        else 
        {
            throw new Error('No parameters provided!');
        }
    }

    /**
     * Verifies that the values in a specific table row match the expected aggregated MID data
     * Checks the current URL, extracts row data by index, and asserts that fields like Project,
     * Type, Currency, and Description match the expected values from the data object
     * @param rowIndex - The zero-based index of the row to be verified in the table
     * @param expectedData - The data object containing the expected aggregated MID values
     * @returns A promise that resolves when all row data assertions pass successfully
     */
    public async verifyRowMatchesData(rowIndex: number, expectedData: AggregatedMidData): Promise<void>
    {
        await expect(this.page).toHaveURL(/mids\/aggregated/);
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['Project']).toBe(expectedData.project);
        expect(rowValues['Aggregated MID']).toMatch(/^AG-\d{10}$/);
        expect(rowValues['Internal MIDs / Secure Deposits']).not.toBe('');
        expect(rowValues['Type']).toBe(expectedData.type);
        expect(rowValues['Currency']).toBe(expectedData.currency);
        expect(rowValues['Description']).toBe(expectedData.description || '');
    }
}