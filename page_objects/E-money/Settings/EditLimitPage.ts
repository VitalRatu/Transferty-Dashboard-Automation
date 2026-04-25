import { expect, Page } from '@playwright/test';
import { CreationForm } from '../../related_components/CreationForm';
import { BasePage } from '../../BasePage';

export type EMoneyLimitsData = 
{
    currency: string,
    customer_wallet_daily_limit: string,
    tx_max_amount: string
}

/**
 * Represents the page for editing existing E-money transaction and wallet limits
 * Provides functionality to update currency configurations, daily wallet caps, 
 * and maximum transaction amounts via a shared creation form component
 */
export class EditLimitPage extends BasePage 
{
    /** The shared form component used to interact with dropdowns and input fields during the edit process */
    public readonly form: CreationForm;

    /**
     * Initializes a new instance of the EditLimitPage class
     * Sets up the form handler for managing limit updates
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/settings\/\d+\/edit/);
        this.form = new CreationForm(page);
    }

    /**
     * Executes the limit update flow by verifying the page header and populating fields with new data
     * Dynamically checks which fields are provided in the data object before applying updates 
     * to Currency, Daily Limits, or Max Transaction amounts and submitting the form
     * @param data - The data object containing optional fields to update defined in EMoneyLimitsData
     * @returns A promise that resolves when the updates are applied and the form is saved
     */
    public async editLimit(data: Partial<EMoneyLimitsData>): Promise<void> 
    {
        const expectedHeading = new RegExp('EDIT LIMIT', 'i');
        const editPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(editPageHeader).toBeVisible();

        if (data.currency) 
        {
            await this.form.selectDropDown('Currency', data.currency);
        }

        if (data.customer_wallet_daily_limit) 
        {
            await this.form.fillInputField('Customer wallet daily limit', data.customer_wallet_daily_limit);
        }

        if (data.tx_max_amount) 
        {
            await this.form.fillInputField('Tx max amount', data.tx_max_amount);
        }

        await this.form.save();
    }
}