import { expect, Locator, Page } from '@playwright/test';
import { CreationForm } from '../../../related_components/CreationForm';
import { EMoneyMerchantWallet} from '../../../../test_data/EMoneyWalletsData';
import { BasePage } from '../../../BasePage';

/**
 * Represents the page for creating a new Merchant Wallet within the E-money system
 * Provides methods to configure wallet parameters specifically for merchant entities,
 * including project association, currency settings, and linking to an Internal MID
 */
export class NewMerchantWalletPage extends BasePage
{
    /** The shared form component used to interact with dropdowns and input fields */
    public readonly form: CreationForm;
    
    /** Locator for the page's loading overlay to ensure synchronization before automation steps */
    private readonly pageLoaded: Locator;

    /**
     * Initializes a new instance of the NewMerchantWalletPage class
     * Sets up the form handler and the global loader indicator
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/wallets\/merchant\/add/)
        this.form = new CreationForm(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
    }

    /**
     * Creates a new Merchant wallet by filling out the form with the provided data and saving it
     * Handles the selection of the associated Project, Wallet Type, Currency, and the required 
     * Internal MID link before submitting the form
     * @param data - The data object containing merchant wallet details defined in EMoneyMerchantWallet
     * @returns A promise that resolves when the form is populated and the save action is triggered
     */
    public async createMerchantlWallet(data: EMoneyMerchantWallet): Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        await this.form.selectDropDown('Project', data.project);
        await this.form.selectDropDown('Type', data.type);
        await this.form.selectDropDown('Currency', data.currency); 
        await this.form.selectDropDown('Internal MID')
        await this.form.fillInputField('Description', data.description!);
        await this.form.save();
    }
}