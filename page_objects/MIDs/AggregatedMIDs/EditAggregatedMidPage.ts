import { Page, expect } from '@playwright/test';
import { CreationForm } from '../../related_components/CreationForm';
import { BasePage } from '../../BasePage';
import { AggregatedMidData } from '../../../test_data/MIDsData';

/**
 * Represents the page for editing an existing Aggregated MID.
 * This class provides methods to modify the Aggregated MID's configuration 
 * (such as Type, Currency, linked entities, and description) while ensuring 
 * that immutable fields like the Project remain read-only.
 */
export class EditAggregatedMidPage extends BasePage
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
        super(page, /\/mids\/aggregated\/AG-\d{10}\/edit/);
        this.form = new CreationForm(page);
    }
    
    /**
     * Updates the Aggregated MID details based on the provided data object.
     * Validates that the Project field is disabled for editing before applying changes.
     * Iterates through the provided partial data to update Type, Currency, 
     * linked entities (Internal MIDs/Secure Deposits), and description.
     * @param data - The partial data object containing the specific fields to be updated
     * @returns A promise that resolves when the form is submitted and saved
     */
    public async editDetails(data: Partial<AggregatedMidData>): Promise<void> 
    {
        const expectedHeading = new RegExp(`EDIT AGGREGATED MID`, 'i');
        const editPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(editPageHeader).toBeVisible();

        // Ensure immutable fields are locked for editing
        await this.form.checkIsDisabled('Project');

        if (data.type !== undefined)
        {
            await this.form.selectDropDown('Type', data.type);
        }

        if (data.currency !== undefined)
        {
            await this.form.selectDropDown('Currency', data.currency);
        }

        if (data.internalMid !== undefined)
        {
            await this.form.selectDropDown(/Internal MIDs|Secure Deposits/, data.internalMid);
        }

        if (data.description !== undefined)
        {
            await this.form.fillInputField('Description', data.description);
        }
        
        await this.form.save();
    }
}