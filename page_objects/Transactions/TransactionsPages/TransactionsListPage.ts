import { Page, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar';
import { Table } from '../../related_components/Table';
import { CardData } from '../../../test_data/testCards';
import { BasePage } from '../../BasePage';

/**
 * Represents the main Transactions page in the application
 * Provides access to the filter bar and the data table for managing and verifying transaction records
 */
export class TransactionsListPage extends BasePage
{
    /** The FilterBar component used for searching and initiating new transaction creation */
    public readonly filter: FilterBar;
    
    /** The Table component used to read and interact with transaction data grids */
    public readonly table: Table;

    /**
     * Initializes a new instance of the TransactionsPage class
     * Sets up the necessary sub-components like the filter bar and the data table
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/transactions\/all/)
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }

    /**
     * Opens the transaction creation page by clicking the primary button in the filter bar
     * Asserts that the browser URL changes to the expected transaction addition route
     * @returns A promise that resolves when the navigation and URL assertion are complete
     */
    public async AddNewTransaction(): Promise<void>
    {
        await this.filter.clickPrimaryButton();
        await expect(this.page).toHaveURL(/\/transactions\/add/); 
    }

    /**
     * Verifies the data of a specific transaction row against the expected card data
     * Extracts row values by index, formats the card string to remove spaces, and uses a regular expression
     * to assert that the first four (BIN) and last four digits of the card number match exactly
     * @param rowIndex - The zero-based index of the row to check in the transactions table
     * @param expectedData - The expected CardData object containing amount, currency, transaction type, and card number
     * @returns A promise that resolves when all assertions for the row data pass successfully
     */
    public async CheckRowData(rowIndex: number, expectedData: CardData): Promise<void>
    {
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['Amount']).toContain(expectedData.amount);
        expect(rowValues['Type']).toBe(expectedData.transaction_type.toLowerCase());
        expect(rowValues['Amount']).toContain(expectedData.currency);
        const rawCardString = rowValues['Cards & APM IDs'];
        const stringWithoutSpaces = rawCardString.replace(/\s+/g, '');
        const BIN = expectedData.card_number.slice(0, 4);
        const lastFourDigits = expectedData.card_number.slice(-4);
        const cardNumberToCheck = new RegExp(`^${BIN}.*${lastFourDigits}`);
        expect(stringWithoutSpaces).toMatch(cardNumberToCheck);
        expect(rowValues['Status']).toBe('Success');
    }

}