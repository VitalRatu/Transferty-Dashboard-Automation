import { Page, expect } from '@playwright/test';
import { DetailsPageReader } from '../../../related_components/DetailsPageReader';
import { Table } from '../../../related_components/Table';
import { CreationForm } from '../../../related_components/CreationForm';

/**
 * Represents the page for editing an existing Operational Wallet
 * This class provides methods to modify wallet metadata while ensuring that 
 * critical, immutable fields (e.g., Project, Wallet ID, Currency) remain read-only
 */
export class EditOperationalWalletPage
{
    /** The Playwright Page instance */
    public readonly page: Page;
    
    /** The reader component used to verify field values after saving changes */
    public readonly view: DetailsPageReader;
    
    /** The table component used if there are nested records to manage during editing */
    public readonly table: Table;
    
    /** The form component used to interact with input fields and perform validation checks */
    public readonly form: CreationForm;

    /**
     * Initializes a new instance of the EditOperationalWalletPage class
     * Sets up the necessary sub-components for reading data, checking form states, and submitting updates
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.view = new DetailsPageReader(page);
        this.table = new Table(page)
        this.form = new CreationForm(page)
    }

    /**
     * Updates the wallet details, specifically focusing on the description field
     * Before applying changes, it performs a strict validation check to ensure that 
     * key identifying fields like Project, Wallet ID, Type, and Currency are disabled for editing
     * After saving, it automatically verifies that the new description is correctly reflected on the view page
     * @param newDescription - The updated description text to be applied to the wallet
     * @returns A promise that resolves when the update is saved and the new value is verified
     */
    public async editWalletDetails(newDescription: string): Promise<void> 
    {
        const expectedHeading = new RegExp(`EDIT OPERATIONAL WALLET`, 'i')
        const editPageHeader = this.page.getByRole('heading', {name: expectedHeading})
        await expect(editPageHeader).toBeVisible()

        // Verify that immutable fields are not editable
        await this.form.checkIsDisabled('Project');
        await this.form.checkIsDisabled('Wallet ID')
        await this.form.checkIsDisabled('Type');
        await this.form.checkIsDisabled('Currency');
        
        await this.form.fillInputField('Description', newDescription);
        await this.form.save();

        const actualDescription = await this.view.getValue('Description')

        expect(actualDescription).toBe(newDescription)
    }
}