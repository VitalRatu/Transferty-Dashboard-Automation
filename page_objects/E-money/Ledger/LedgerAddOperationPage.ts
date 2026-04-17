import { expect, Locator, Page } from '@playwright/test';
import { CreationForm } from '../../related_components/CreationForm';
import { LedgerOperationsData } from '../../../test_data/LedgerOperationsData';
import { BasePage } from '../../BasePage';

/**
 * Represents the page for creating manual ledger operations within the E-money system
 * This page allows for manual adjustment of balances by recording transfers 
 * between specified operational, merchant, or customer wallets
 */
export class LedgerAddOperationPage extends BasePage
{
    /** The shared form component used to interact with dropdowns, multi-selects, and text inputs */
    public readonly form: CreationForm;
    
    /** Locator for the page's loading overlay used to ensure the form is ready for data entry */
    private readonly pageLoaded: Locator;

    /**
     * Initializes a new instance of the LedgerAddOperationPage class
     * Sets up the form handler and the global loading indicator
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/ledger\/add/);
        this.form = new CreationForm(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
    }

    /**
     * Creates a new manual ledger operation by filling out the form with transaction details
     * Handles the selection of the project, the specific action type, and utilizes multi-select 
     * dropdowns to define both the source and destination wallets before saving the entry
     * @param data - The data object containing ledger operation details defined in LedgerOperationsData
     * @returns A promise that resolves when the form is populated and the save action is triggered
     */
    public async createLedgerOperation(data: LedgerOperationsData): Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        await this.form.selectDropDown('Project', data.project);
        await this.form.selectDropDown('Action', data.action);
        await this.form.selectMultiDropDown('Wallet from / to', 0, data.wallet_from);
        await this.form.selectMultiDropDown('Wallet from / to', 1, data.wallet_to);
        await this.form.fillInputField('Amount', data.amount)
        await this.form.fillInputField('Description', data.description);
        await this.form.save();
    }

}