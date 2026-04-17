import { Page, expect } from '@playwright/test';
import { EMoneyFeeWallelObject, EMoneyOperationalWallet } from '../../../../test_data/EMoneyWalletsData'; // 
import { CreationForm } from '../../../related_components/CreationForm';
import { BasePage } from '../../../BasePage';

/**
 * Represents the page for managing Fee entities within an Operational Wallet
 * This class provides methods to edit existing fee configurations, ensuring data integrity 
 * by validating that core financial parameters like the fee percentage and activation date 
 * remain locked once established
 */
export class EditFeeObjectPage extends BasePage
{
    /** The shared form component used for field validation, checkbox toggling, and data entry */
    public readonly form: CreationForm;

    /**
     * Initializes a new instance of the AddFeeEntityPage class
     * Sets up the form handler used for interacting with the fee configuration interface
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/wallets\/operational\/\d+\/\d+\/edit/);
        this.form = new CreationForm(page);
    }

    /**
     * Updates an existing Fee entity's expiration settings while verifying field constraints
     * Asserts that the fee percentage, activation date, and timezone are disabled for modification
     * Allows switching between a 'Permanent' status and a specific expiration date based on the provided test data
     * @param expectedData - The data object containing the target fee attributes defined in EMoneyFeeWallelObject
     * @returns A promise that resolves when the fee entity is successfully updated and saved
     */
    public async editFeeObject(expectedData: Partial<EMoneyFeeWallelObject>): Promise<void>
    {
        const expectedHeading = new RegExp(`EDIT FEE`, 'i');
        const detailsPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(detailsPageHeader).toBeVisible();

        await this.form.checkIsDisabled('Fee, %');
        await this.form.checkIsDisabled('Activation date');
        
        if (expectedData.expirationDate === 'Permanent')
        {
            await this.form.setCheckbox('Permanent', true)
        }
        else
        {
            await this.form.setCheckbox('Permanent', false);
            await this.form.fillDateInput('Expiration date', expectedData.expirationDate!)
        }
        
        await this.form.checkIsDisabled('Timezone');
        await this.form.save();
    }
}