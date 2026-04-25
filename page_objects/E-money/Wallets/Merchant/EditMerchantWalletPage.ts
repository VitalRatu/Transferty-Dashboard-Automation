import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage'; 
import { CreationForm } from '../../../related_components/CreationForm';
import { EMoneyMerchantWalletType } from '../../../../types/EMoneyWallets';

/**
 * Represents the Edit page for a Merchant Wallet.
 * Strictly responsible for handling form inputs, validating read-only fields, and saving changes.
 */
export class EditMerchantWalletPage extends BasePage 
{
    /** The form component used to handle validation and input during the wallet editing process */
    public readonly form: CreationForm;

    /**
     * Initializes a new instance of the EditMerchantWalletPage class
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/wallets\/merchant\/\d+\/edit/);
        this.form = new CreationForm(page);
    }

    /**
     * Executes the update flow for an existing merchant wallet.
     * Verifies that core attributes are read-only, updates the allowed fields, and saves the form.
     * @param data - The data object containing fields to be updated
     * @returns A promise that resolves when the form is submitted
     */
    public async editWallet(data: Partial<EMoneyMerchantWalletType>): Promise<void>
    {
        const expectedHeading = new RegExp(`EDIT MERCHANT WALLET`, 'i');
        const editPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(editPageHeader).toBeVisible();

        // Ensure immutable fields are locked for editing
        await this.form.checkIsDisabled('Project');
        await this.form.checkIsDisabled('Wallet ID');
        await this.form.checkIsDisabled('Type');
        await this.form.checkIsDisabled('Currency');
        
        if (data.description)
        {
            await this.form.fillInputField('Description', data.description);
        }

        if (data.internalMID)
        {
            await this.form.selectDropDown('Internal MID', data.internalMID);
        }

        await this.form.save();
    }
}