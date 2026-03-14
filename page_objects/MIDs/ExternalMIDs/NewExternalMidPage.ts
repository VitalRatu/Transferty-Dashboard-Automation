import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { CreationForm } from '../../related_components/CreationForm';
import { ExternalMidData } from '../../../test_data/MIDsData';
import { CustomerFee } from './CustomerFee';

/**
 * Represents the page for configuring and adding a new External Merchant Identifier (MID)
 * Provides a complex interface for mapping external payment providers, intermediaries, and PSPs,
 * as well as managing provider-specific credentials and API support settings
 */
export class NewExternalMidPage
{
    /** The relative URL path for the external MID creation page */
    public readonly url: string = '/mids/external/add';
    
    /** The shared form component used to interact with inputs, dropdowns, and dynamic credential fields */
    public readonly form: CreationForm;
    
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** Locator for the page's loading overlay to ensure all dynamic fields are ready for interaction */
    private readonly pageLoaded: Locator;
    private readonly customerFee: CustomerFee;

    /**
     * Initializes a new instance of the NewExternalMidPage class
     * Sets up the form handler and the global loading indicator
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.form = new CreationForm(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
        this.customerFee = new CustomerFee(page)
    }

    /**
     * Executes the external MID creation flow by populating the form with technical provider details
     * Dynamically iterates through provider credentials, configures API support levels,
     * and handles optional settings like customer data randomization and static URLs
     * @param data - The data object containing external MID configurations defined in ExternalMidData
     * @returns A promise that resolves when the configuration is fully entered and the save action is triggered
     */
    public async createExternalMID(data: ExternalMidData): Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        await this.form.selectDropDown('Project', data.project);
        await this.form.selectDropDown('Account management API support', data.account_management_api_support || 'No');
        await this.form.selectDropDown('Provider', data.provider);
        await this.form.selectDropDown('Intermediary', data.intermediary);
        await this.form.selectDropDown('PSP', data.psp);
        await this.form.fillInputField('External MID', data.externalMid);
        await this.form.fillInputField('Provider\'s MID', data.providersMid);
        await this.form.fillInputField('API endpoint', data.api_endpoint);
        if (data.providers_credential) 
        {
            for (const [labelName, credentialValue] of Object.entries(data.providers_credential)) 
            {
                await this.form.fillInputField(labelName, credentialValue);
            }
        }
        if (data.description) 
        {
            await this.form.fillInputField('Description', data.description);
        }
        if (data.timezone) 
        {
            await this.form.selectDropDown('Timezone', data.timezone);
        }
        if (data.balance_api_support) 
        {
            await this.form.selectDropDown('Balance API support', data.balance_api_support || 'No');
        }
        if (data.static_result_url) 
        {
            await this.form.fillInputField('Static result URL', data.static_result_url);
        }
        if (data.customer_data_randomization) 
        {
            await this.form.selectDropDown('Enable customer data randomization', data.customer_data_randomization);
        }

        if (data.customerFees && data.customerFees.length > 0) 
        {
            for (const fee of data.customerFees) 
            {
                await this.customerFee.fillFeeData(fee);
            }
        }
        await this.form.save();
    }
}