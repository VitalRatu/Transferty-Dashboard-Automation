import { Page, Locator, expect } from '@playwright/test';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { LedgerOperationsData } from '../../../test_data/LedgerOperationsData';

/**
 * Represents the Ledger page within the E-money section
 * Provides functionality to audit financial operations, search through transaction history 
 * using filters, and initiate manual ledger entries
 */
export class LedgerPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The FilterBar component used for searching and navigating to the operation creation form */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and audit transaction records */
    public readonly table: Table;

    /**
     * Initializes a new instance of the LedgerPage class
     * Sets up the filtering and data table components for financial auditing
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }
    
    /**
     * Navigates to the manual ledger operation creation page by clicking the primary action button
     * Waits for the browser to reach the specific ledger addition route
     * @returns A promise that resolves when the navigation is complete
     */
    public async addNewLedgerOperation(): Promise<void>
    {
        await this.filter.clickPrimaryButton();
        await this.page.waitForURL(/\/emoney\/ledger\/add/);
    }

    /**
     * Verifies that the data in a specific ledger row matches the expected operation details
     * Supports bidirectional transaction verification by checking if the row's Wallet ID and 
     * Amount (positive or negative) exist within the expected source and destination data
     * @param rowIndex - The zero-based index of the row to be verified in the table
     * @param expectedData - The data object containing expected transaction details defined in LedgerOperationsData
     * @returns A promise that resolves when all ledger assertions pass successfully
     */
    public async verifyRowMatchesData(rowIndex: number, expectedData: LedgerOperationsData): Promise<void>
    {
        await expect(this.page).toHaveURL(/emoney\/ledger/);
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['Project']).toBe(expectedData.project);
        expect([expectedData.wallet_from, expectedData.wallet_to]).toContain(rowValues['Wallet ID']);
        expect([`+${expectedData.amount}.00`, `-${expectedData.amount}.00`]).toContain(rowValues['Amount']);
        expect(rowValues['Type']).toBe(expectedData.action);
        expect(rowValues['EM receipt']).toBe('');
        expect(rowValues['Related tx ID']).toBe('');
        expect(rowValues['Description']).toBe(expectedData.description);
    }
}