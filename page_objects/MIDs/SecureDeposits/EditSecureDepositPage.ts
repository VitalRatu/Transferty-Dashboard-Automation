import { Page, expect } from '@playwright/test';
import { CreationForm } from '../../related_components/CreationForm';
import { BasePage } from '../../BasePage';
import { SecureDepositData } from '../../../test_data/MIDsData';

/**
 * Represents the page for editing an existing Aggregated MID.
 * This class provides methods to modify the Aggregated MID's configuration 
 * (such as Type, Currency, linked entities, and description) while ensuring 
 * that immutable fields like the Project remain read-only.
 */
export class EditSecureDepositPage extends BasePage
{
    /** The form component used to interact with input fields and dropdowns */
    public readonly form: CreationForm;

    /**
     * Initializes a new instance of the EditAggregatedMidPage class
     * Sets up the form handler for submitting updates.
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page);
        this.form = new CreationForm(page);
    }
    
    /**
     * Updates the Secure Deposit details based on the provided data object.
     * Validates that the Project, Currency and Income Date fields are disabled for editing before applying changes.
     * Iterates through the provided partial data to update Type, Currency, 
     * @param data - The partial data object containing the specific fields to be updated
     * @returns A promise that resolves when the form is submitted and saved
     */
    public async editDetails(data: Partial<SecureDepositData>): Promise<void> 
    {
        const expectedHeading = new RegExp(`EDIT SECURE DEPOSIT`, 'i');
        const editPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(editPageHeader).toBeVisible();

        await this.form.checkIsDisabled('Project');
        await this.form.checkIsDisabled('Currency')
        await this.form.checkIsDisabled('Income Date')

        if (data.amount !== undefined)
        {
            await this.form.selectDropDown('Type', data.amount);
        }

        if (data.currency !== undefined)
        {
            await this.form.selectDropDown('Currency', data.currency);
        }
        
        await this.form.save();
    }
}