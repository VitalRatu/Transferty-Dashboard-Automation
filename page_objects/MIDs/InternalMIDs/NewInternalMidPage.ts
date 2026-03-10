import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { CreationForm } from '../../related_components/CreationForm';
import { InternalMidData } from '../../../test_data/MIDsData';

/**
 * Represents the page for adding a new Internal Merchant Identifier (MID) to the system
 * Extends the BasePage to handle specific routing and form interactions required for
 * configuring payment provider connections and currency settings
 */
export class NewInternalMidPage extends BasePage 
{
    /** The shared form component used to interact with various input fields and dropdowns */
    public readonly form: CreationForm;
    
    /** Locator for the page-level loading indicator to ensure synchronization before form interaction */
    private readonly pageLoaded: Locator;

    /**
     * Initializes a new instance of the NewInternalMidPage class
     * Sets the base route for adding internal MIDs and prepares the form and loader components
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, '/mids/internal/add');
        this.form = new CreationForm(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
    }

    /**
     * Executes the internal MID creation flow by populating the form with the provided data
     * Handles the selection of core entities like Project, Provider, and Payment methods,
     * while also managing optional configurations like exchange currencies, status, and descriptions
     * @param data - The data object containing internal MID configurations defined in InternalMidData
     * @returns A promise that resolves when all fields are populated and the form is successfully saved
     */
    public async createInternalMID(data:InternalMidData): Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        await this.form.selectDropDown('Project', data.project);
        await this.form.selectDropDown('Provider', data.provider);
        await this.form.selectDropDown('Payment methods', data.paymentMethod);
        await this.form.selectDropDown('External MID', data.externalMid);
        await this.form.selectDropDown('Currency', data.currency);
        if (data.orderExchangeCurrency) 
        {
            await this.form.selectDropDown('Order/exchange currency', data.orderExchangeCurrency);
        }
        if (data.description) 
        {
            await this.form.fillInputField('Description', data.description);
        }
        if (data.status) 
        {
            await this.form.selectDropDown('Status', data.status);
        }
        await this.form.save();
    }
}