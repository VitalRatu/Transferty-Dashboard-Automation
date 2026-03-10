import { expect, Locator, Page } from '@playwright/test';
import { CreationForm } from '../../related_components/CreationForm';
import { EMoneyLimitsData } from '../../../test_data/EMoneyLimitsData';

/**
 * Represents the page for adding new financial limits within the E-money settings
 * This class handles the configuration of daily customer wallet limits and maximum 
 * transaction amounts while ensuring the UI is ready for interaction
 */
export class AddLimitPage 
{
    /** The relative URL path for the E-money limit addition page */
    public readonly url: string = '/emoney/settings/add'; 
    
    /** The Playwright Page instance */
    public readonly page: Page;
    
    /** The shared form component used to interact with input fields and validation checks */
    public readonly form: CreationForm;
    
    /** Locator for the page's loading overlay used to synchronize test execution with the UI state */
    private readonly pageLoaded: Locator;

    /**
     * Initializes a new instance of the AddLimitPage class
     * Sets up the form handler and the global loading indicator
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.form = new CreationForm(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
    }

    /**
     * Executes the flow for creating a new E-money limit configuration
     * Waits for the loading overlay to disappear, validates that the Currency field 
     * is pre-selected or disabled as per business logic, and populates daily limit 
     * and maximum transaction amount fields
     * @param data - The data object containing limit values defined in EMoneyLimitsData
     * @returns A promise that resolves when the form is populated and the save action is triggered
     */
    public async createNewLimit(data: EMoneyLimitsData): Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        /* await this.form.selectDropDown('Currency', data.currency); */
        await this.form.checkIsDisabled('Currency')
        await this.form.fillInputField('Customer wallet daily limit', data.customer_wallet_daily_limit!);
        await this.form.fillInputField('Tx max amount', data.tx_max_amount!)
        await this.form.save();
    }
}