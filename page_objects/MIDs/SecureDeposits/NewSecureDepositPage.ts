import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { CreationForm } from '../../related_components/CreationForm';
import { SecureDepositType } from '../../../types/MIDs'; 

/**
 * Represents the page for creating a new Secure Deposit entity
 * Provides a structured interface to fill out financial details such as project, amount, and income date
 * utilizing the shared CreationForm component
 */
export class NewSecureDepositPage extends BasePage
{
    /** The shared form component used to interact with input fields and dropdowns */
    public readonly form: CreationForm;
 
    /** Locator for the page's loading overlay to ensure synchronization before interaction */
    private readonly pageLoaded: Locator;

    /**
     * Initializes a new instance of the NewSecureDepositPage class
     * Sets up the form handler and the global loading indicator locator
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/mids\/secure-deposits\/add\/?$/)
        this.form = new CreationForm(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
    }

    /**
     * Executes the secure deposit creation flow by populating the form with the provided data
     * Handles mandatory fields like Project, Amount, and Currency, while conditionally filling
     * optional fields such as Income Date and Description if they are present in the data object
     * @param data - The data object containing secure deposit details defined in SecureDepositData
     * @returns A promise that resolves when the form is populated and the save action is triggered
     */
    public async createSecureDeposit(data:SecureDepositType): Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        await this.form.selectDropDown('Project', data.project);
        await this.form.fillInputField('Amount', data.amount);
        await this.form.selectDropDown('Currency', data.currency);
        if (data.date) 
        {
            await this.form.fillDateInput('Income Date', data.date);
        }
        if (data.description) 
        {
            await this.form.fillInputField('Description', data.description);
        }
        expect(await this.form.save()).toBeTruthy()
    }
}