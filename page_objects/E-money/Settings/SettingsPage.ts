import { Page, Locator, expect } from '@playwright/test';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { EMoneyLimitsData } from '../../../test_data/EMoneyLimitsData';
import { BasePage } from '../../BasePage';

export type SettingsPageFilters = 
    | '' 

/**
 * Represents the Settings page within the E-money section
 * Provides an interface to manage global transaction constraints, customer wallet limits, 
 * and currency-specific configurations through the integrated FilterBar and Table components
 */
export class SettingsPage extends BasePage
{
    /** The FilterBar component used for searching settings and initiating the creation of new limits */
    public readonly filter: FilterBar<SettingsPageFilters>;
    
    /** The Table component used to display and interact with the list of configured limits */
    public readonly table: Table;

    /**
     * Initializes a new instance of the SettingsPage class
     * Sets up the filter bar and data table specifically for managing system-wide E-money settings
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/settings/);
        this.filter = new FilterBar<SettingsPageFilters>(page);
        this.table = new Table(page);
    }

    /**
     * Navigates to the limit creation page by clicking the primary action button in the filter bar
     * Waits for the application to reach the specific addition route for E-money settings
     * @returns A promise that resolves when the navigation to the add form is complete
     */
    public async addNewLimit(): Promise<void>
    {
        await this.filter.clickPrimaryButton();
        await this.page.waitForURL(/\/emoney\/settings\/add/);
    }
    
    /**
     * Verifies that the configuration data in a specific table row matches the expected limits
     * Ensures the current URL is correct and validates critical financial fields including 
     * currency type, daily customer wallet limits, and maximum transaction amounts
     * @param rowIndex - The zero-based index of the row to be verified in the table
     * @param expectedData - The data object containing expected limit values defined in EMoneyLimitsData
     * @returns A promise that resolves when all settings assertions pass successfully
     */
    public async verifyRowMatchesData(rowIndex: number, expectedData: EMoneyLimitsData): Promise<void>
    {
        await expect(this.page).toHaveURL(/emoney\/settings/);
        const rowValues = await this.table.getAllValuesFromRowByIndex(rowIndex);
        expect(rowValues['Currency']).toBe(expectedData.currency);
        expect(rowValues['Customer wallet daily limit']).toBe(expectedData.customer_wallet_daily_limit)
        expect(rowValues['Tx max amount']).toBe(expectedData.tx_max_amount)
    }
    
}