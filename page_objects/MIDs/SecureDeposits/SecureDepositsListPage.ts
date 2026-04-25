import { Page, Locator, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { SecureDepositType } from '../../../types/MIDs'; 
import { BasePage } from '../../BasePage';

export type SecureDepositsListPageTabName =
{
    'Secure Deposit': string
    'Project': string 
    'Amount': string 
    'Currency': string 
    'Created Date': string
    'Income Date': string  
    'Status': 'Blocked' | 'Active'
}
/**
 * Represents the Secure Deposits management page within the MIDs section
 * Provides functionality to initiate the creation of new secure deposits and verify existing 
 * deposit records within the data table against expected test data
 */
export class SecureDepositsListPage extends BasePage
{
    /** The FilterBar component used for searching and navigating to the creation form */
    private readonly filterBar: FilterBar<SecureDepositsListPageTabName>;
    
    /** The Table component used to display and interact with secure deposit records */
    private readonly table: Table;

    /**
     * Initializes a new instance of the SecureDepositsPage class
     * Sets up the core sub-components, including the filter bar and the data table
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/mids\/secure-deposits\/?$/);
        this.filterBar = new FilterBar<SecureDepositsListPageTabName>(page);
        this.table = new Table(page);
    }

    /**
     * Navigates to the secure deposit creation page by clicking the primary action button
     * Waits for the URL to change to the specific addition route for secure deposits
     * @returns A promise that resolves when the navigation is complete
     */
    public async addNewSecureDeposit() 
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/mids\/secure-deposits\/add\/?$/);
    }

    public async exportSecureDepositsToCSV(): Promise<void>
    {
        await this.filterBar.exportCsv();
        await this.page.waitForLoadState('networkidle');
    }

    public async openSecureDepositDetails({ description, secureDepositID }: { description?: string, secureDepositID?: string }): Promise<void> 
    {
        const detailsUrlPattern = /(?:\/projects\/\d+\/configurations)?\/mids\/secure-deposits\/SD-\d+/;

        if (description) 
        {
            await this.table.clickOnColumnValue('Description', description, 'Secure Deposit');
            await this.page.waitForURL(detailsUrlPattern);
        } 
        else if (secureDepositID) 
        {
            await this.table.clickOnColumnValue('Secure Deposit', secureDepositID, 'Secure Deposit');
            await this.page.waitForURL(detailsUrlPattern);
        } 
        else 
        {
            throw new Error('No parameters provided!');
        }
    }

    /**
     * Verifies that the data in a specific table row matches the provided secure deposit data
     * Ensures the current page is correct, extracts row values by index, and asserts equality 
     * for project, amount, currency, income date, and description fields
     * @param rowIndex - The zero-based index of the row to verify in the table
     * @param expectedData - The data object containing the expected values for the secure deposit
     * @returns A promise that resolves when all assertions for the row data pass successfully
     */
    public async verifyRowMatchesData(rowIndex: number, expectedData: SecureDepositType): Promise<void>
    {
        await expect(this.page).toHaveURL(/mids\/secure-deposits/);
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['Secure Deposit']).toMatch(/^SD-\d+$/);
        expect(rowValues['Project']).toBe(expectedData.project);
        expect(rowValues['Amount']).toBe(expectedData.amount);
        expect(rowValues['Currency']).toBe(expectedData.currency);
        expect(rowValues['Income Date']).toContain(expectedData.date);
        expect(rowValues['Description']).toBe(expectedData.description || '');
    }
}