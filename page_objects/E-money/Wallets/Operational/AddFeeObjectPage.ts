import { Page, expect } from '@playwright/test';
import { EMoneyFeeWallelObjectType } from '../../../../types/EMoneyWallets'; 
import { CreationForm } from '../../../related_components/CreationForm';
import { BasePage } from '../../../BasePage';

/**
 * Represents the page for adding new Fee entities to an Operational Wallet
 * This class provides a structured way to interact with the 'Add Fee' modal, 
 * handling input validation, date selection, and timezone configurations
 */
export class AddFeeObjectPage extends BasePage
{
    /** The shared form component used for interacting with text inputs, dates, and dropdowns */
    public readonly form: CreationForm;

    /**
     * Initializes a new instance of the AddFeeEntityPage class
     * Sets up the form handler used to navigate the fee creation interface
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/wallets\/operational\/\d+\/add-fee/);
        this.form = new CreationForm(page);
    }

    /**
     * Opens the 'Add Fee' modal, fills out the entity details based on the provided data, and submits the form
     * Automatically handles the 'Permanent' checkbox state depending on whether a specific expiration date is provided
     * and ensures the timezone is correctly selected if available in the data set
     * @param expectedData - The data object containing fee details (percentage, dates, timezone)
     * @returns A promise that resolves when the new fee entity is successfully added and saved
     */
    public async addNewFeeObject(expectedData: Partial <EMoneyFeeWallelObjectType>): Promise<void> 
    {
        const expectedHeading = new RegExp('ADD FEE', 'i');
        const editPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(editPageHeader).toBeVisible();

        await this.form.fillInputField('Fee, %', expectedData.fee!);
        
        if (expectedData.activation_date) 
        {
            await this.form.fillDateInput('Activation date', expectedData.activation_date);
        }
        
        if (expectedData.expirationDate) 
        {
            if (expectedData.expirationDate === 'Permanent') 
            {
                await this.form.setCheckbox('Permanent', true);
            } 
            else 
            {
                await this.form.setCheckbox('Permanent', false);
                await this.form.fillDateInput('Expiration date', expectedData.expirationDate);
            }
        }
        
        if (expectedData.timezone) 
        {
            await this.form.selectDropDown('Timezone', expectedData.timezone);
        }

        await this.form.save();
    }
}