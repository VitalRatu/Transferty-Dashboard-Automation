import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../page_objects/BasePage';
import { DetailsPageReader } from '../../related_components/DetailsPageReader';
import { EMoneyLimitsData } from '../../../test_data/EMoneyLimitsData';

/**
 * Represents the detailed view page for E-money transaction and wallet limits
 * Provides functionality to verify specific financial constraints and initiate 
 * the modification process for existing limit configurations
 */
export class LimitDetailsPage extends BasePage 
{
    /** The reader component used to extract and validate field values from the details container */
    public readonly view: DetailsPageReader;

    /**
     * Initializes a new instance of the LimitDetailsPage class
     * Sets up the view reader for inspecting limit configurations
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page);
        this.view = new DetailsPageReader(page);
    }

    /**
     * Navigates to the limit editing interface by clicking the 'Edit' action button
     * @returns A promise that resolves when the edit flow is initiated
     */
    public async editLimit(): Promise<void> 
    {
        await this.view.clickActionButton('Edit');
    }

    /**
     * Performs a comprehensive verification of the displayed limit details
     * Validates the currency type and uses regular expressions to check the format of 
     * monetary values (e.g., handling thousands separators and two decimal places) 
     * before performing a numeric comparison for daily limits and maximum transaction amounts
     * @param expectedData - The data object containing expected limit values defined in EMoneyLimitsData
     * @returns A promise that resolves when all financial data assertions pass successfully
     */
    public async verifyDetails(expectedData: EMoneyLimitsData): Promise<void> 
    {
        const expectedHeading = new RegExp(`LIMIT DETAILS`)
        const detailsPageHeader = this.page.getByRole('heading', {name: expectedHeading })
        await expect(detailsPageHeader).toBeVisible()
        
        expect(await this.view.getValue('Currency')).toBe(expectedData.currency);

        const dailyLimitUI = await this.view.getValue('Customer wallet daily limit');
        expect(dailyLimitUI).toMatch(/^-?\d{1,3}(,\d{3})*\.\d{2}$/);
        expect(Number(dailyLimitUI.replace(/,/g, ''))).toBe(Number(expectedData.customer_wallet_daily_limit));

        const maxAmountUI = await this.view.getValue('Tx max amount');
        expect(maxAmountUI).toMatch(/^-?\d{1,3}(,\d{3})*\.\d{2}$/);
        expect(Number(maxAmountUI.replace(/,/g, ''))).toBe(Number(expectedData.tx_max_amount));
    }
}