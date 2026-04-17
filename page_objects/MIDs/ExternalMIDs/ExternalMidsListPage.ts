import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { ExternalMidData } from '../../../test_data/MIDsData';  
import { BasePage } from '../../BasePage';

/**
 * Represents the External MIDs management page within the MIDs section
 * This class provides methods to navigate to the creation form and verify that the external merchant 
 * configuration data is correctly displayed in the application's data table
 */
export class ExternalMidsListPage extends BasePage
{
    /** The FilterBar component used for searching records and initiating the creation flow */
    public readonly filterBar: FilterBar;
    
    /** The Table component used to display and interact with the list of External MIDs */
    public readonly table: Table;

    /**
     * Initializes a new instance of the ExternalMidPage class
     * Sets up the filter bar and the data table for managing external provider connections
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/mids\/external/);
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
    }


    /**
     * Initiates the process of adding a new External MID by clicking the primary button in the filter bar
     * Waits for the browser to successfully navigate to the external MID creation route
     * @returns A promise that resolves when the navigation is complete
     */
    public async addNewExternalMid(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/mids\/external\/add/);
    }

    /**
     * Verifies that the values in a specific table row match the expected external MID configuration
     * Extracts all values from the specified row index and compares them against fields like 
     * External MID, Project, Provider, Intermediary, and PSP
     * @param rowIndex - The zero-based index of the row to be verified in the table
     * @param expectedData - The data object containing the expected external MID values
     * @returns A promise that resolves when all assertions for the row data pass successfully
     */
    public async verifyRowMatchesData(rowIndex: number, expectedData: ExternalMidData): Promise<void>
    {
        await expect(this.page).toHaveURL(/mids\/external/);
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['External MID']).toBe(expectedData.externalMid);
        expect(rowValues['Project']).toBe(expectedData.project);
        expect(rowValues['Provider']).toBe(expectedData.provider);
        expect(rowValues['Intermediary']).toBe(expectedData.intermediary);
        expect(rowValues['PSP']).toBe(expectedData.psp);
        expect(rowValues['Description']).toBe(expectedData.description || '');
    }
}