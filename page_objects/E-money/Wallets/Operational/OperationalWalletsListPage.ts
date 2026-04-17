import { Page, Locator, expect } from '@playwright/test';
import { Table } from '../../../related_components/Table';
import { FilterBar } from '../../../related_components/FilterBar';
import { EMoneyOperationalWallet } from '../../../../test_data/EMoneyWalletsData';
import { BasePage } from '../../../BasePage';

/**
 * Represents the Operational Wallets page within the E-money section
 * Provides functionality to manage internal system wallets, including navigation to the 
 * creation form and verification of operational wallet data within the records table
 */
export class OperationalWalletsListPage extends BasePage
{
    /** The FilterBar component used for searching records and initiating the creation of new wallets */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and interact with the list of operational wallets */
    public readonly table: Table;

    /**
     * Initializes a new instance of the OperationalPage class
     * Sets up the tab navigation, filter bar, and data table components for operational wallet management
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/wallets\/operational/);
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }

    /**
     * Initiates the process of adding a new operational wallet by clicking the primary action button
     * Waits for the application to navigate to the operational wallet addition URL
     * @returns A promise that resolves when the navigation is complete
     */
    public async addNewOperationalWallet(): Promise<void>
    {
        await this.filter.clickPrimaryButton();
        await this.page.waitForURL(/\/emoney\/wallets\/operational\/add/);
    }

    /**
     * Verifies that the values in a specific table row match the expected operational wallet data
     * Ensures the current URL is correct, extracts row values by index, and asserts that fields like 
     * Project, Type, Currency, and Description match the expected test data while validating 
     * that a Wallet ID is generated and the initial Balance is zero
     * @param rowIndex - The zero-based index of the row to be verified in the table
     * @param expectedData - The data object containing expected values for the operational wallet
     * @returns A promise that resolves when all row data assertions pass successfully
     */
    public async verifyRowMatchesData(rowIndex: number, expectedData: EMoneyOperationalWallet): Promise<void>
    {
        await expect(this.page).toHaveURL(/emoney\/wallets\/operational/);
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['Project']).toBe(expectedData.project);
        expect(rowValues['Type']).toBe(expectedData.type);
        expect(rowValues['Currency']).toBe(expectedData.currency)
        expect(rowValues['Description']).toBe(expectedData.description);
        expect(rowValues['Wallet ID']).not.toBe(' ')
        expect(rowValues['Balance']).toBe('0.00')
    }
}