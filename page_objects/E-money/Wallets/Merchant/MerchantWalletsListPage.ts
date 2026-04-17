import { Page, Locator, expect } from '@playwright/test';
import { Table } from '../../../related_components/Table';
import { FilterBar } from '../../../related_components/FilterBar';
import { EMoneyMerchantWallet } from '../../../../test_data/EMoneyWalletsData';
import { BasePage } from '../../../BasePage';

/**
 * Represents the Merchant Wallets page within the E-money section
 * Provides a management interface for viewing merchant-specific digital wallets,
 * initiating new wallet creation, and verifying wallet record integrity in the data table
 */
export class MerchantWalletsListPage extends BasePage
{
    /** The FilterBar component used for searching and navigating to the creation form */
    public readonly filter: FilterBar;
    
    /** The Table component used to display and interact with merchant wallet records */
    public readonly table: Table;

    /**
     * Initializes a new instance of the MerchantPage class
     * Sets up the tab navigation, filters, and data grid for merchant wallet management
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/wallets\/merchant/);
        this.filter = new FilterBar(page);
        this.table = new Table(page);
    }

    /**
     * Navigates to the Merchant Wallet creation page by clicking the primary action button
     * Waits for the browser to reach the specific merchant wallet addition URL
     * @returns A promise that resolves when the navigation to the add form is complete
     */
    public async addNewMerchantWallet(): Promise<void>
    {
        await this.filter.clickPrimaryButton();
        await this.page.waitForURL(/\/emoney\/wallets\/merchant\/add/);
    }

    /**
     * Verifies that the values in a specific table row match the expected merchant wallet data
     * Validates project association, currency, and description while ensuring that 
     * a Wallet ID and Internal MID are present and the initial balance is set to zero
     * @param rowIndex - The zero-based index of the row to be verified in the table
     * @param expectedData - The data object containing expected merchant wallet values
     * @returns A promise that resolves when all row data assertions pass successfully
     */
    public async verifyRowMatchesData(rowIndex: number, expectedData: EMoneyMerchantWallet): Promise<void>
    {
        await expect(this.page).toHaveURL(/emoney\/wallets\/merchant/);
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['Project']).toBe(expectedData.project);
        expect(rowValues['Wallet ID']).not.toBe(' ')
        expect(rowValues['Internal MID']).not.toBe(' ')
        expect(rowValues['Currency']).toBe(expectedData.currency)
        expect(rowValues['Balance']).toBe('0.00')
        expect(rowValues['Description']).toBe(expectedData.description);
    }
}