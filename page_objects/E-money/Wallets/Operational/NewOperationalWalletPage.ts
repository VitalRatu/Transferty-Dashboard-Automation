import { expect, Locator, Page } from '@playwright/test';
import { CreationForm } from '../../../related_components/CreationForm';
import { EMoneyOperationalWallet } from '../../../../test_data/EMoneyWalletsData';

/**
 * Represents the page for adding a new Operational Wallet within the E-money system
 * Provides a specialized interface to configure different types of system wallets, 
 * including standard operational wallets and fee-collecting wallets with specific 
 * validity periods and tax/fee percentages
 */
export class NewOperationalWalletPage 
{
    /** The relative URL path for the operational wallet creation page */
    public readonly url: string = '/emoney/wallets/operational/add'; 
    
    /** The Playwright Page instance */
    public readonly page: Page;
    
    /** The shared form component used to interact with input fields, dropdowns, and checkboxes */
    public readonly form: CreationForm;
    
    /** Locator for the page's loading overlay used to ensure the UI is interactive before automation steps */
    private readonly pageLoaded: Locator;

    /**
     * Initializes a new instance of the NewOperationalWalletPage class
     * Sets up the form handler and the global loader indicator
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.form = new CreationForm(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
    }

    /**
     * Executes the operational wallet creation flow by populating the form with the provided data
     * This method handles common fields (Project, Type, Currency, Description) and contains 
     * specific logic for 'Fee' type wallets, managing fee percentages, activation/expiration dates, 
     * and the 'Permanent' validity checkbox
     * @param data - The data object containing operational wallet configurations defined in EMoneyOperationalWallet
     * @returns A promise that resolves when the form is fully populated and the save action is triggered
     */
    public async createOperationalWallet(data: EMoneyOperationalWallet): Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        await this.form.selectDropDown('Project', data.project);
        await this.form.selectDropDown('Type', data.type);
        await this.form.selectDropDown('Currency', data.currency); 
        await this.form.fillInputField('Description', data.description);
        
        if (data.type === 'Fee')
        {
            await this.form.fillInputField('Fee, %', data.fee!);
            await this.form.fillDateInput('Activation date', data.activationDate!);
            
            if (data.timezone)
            {
                await this.form.selectDropDown('Timezone', data.timezone);
            }
            
            if (data.expirationDate === 'Permanent')
            {
                await this.form.setCheckbox('Permanent', true)
            }
            else
            {
                await this.form.setCheckbox('Permanent', false)
                await this.form.fillDateInput('Expiration date', data.expirationDate!)
            }
        }
        await this.form.save();
    }
}