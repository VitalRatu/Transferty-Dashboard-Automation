import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { CreationForm } from '../../related_components/CreationForm';
import { AggregatedMidData } from '../../../test_data/MIDsData';

/**
 * Represents the page for configuring and adding a new Aggregated Merchant Identifier (MID)
 * Provides an interface to group multiple Internal MIDs or Secure Deposits into a single 
 * aggregated entity for simplified financial tracking and management
 */
export class NewAggregatedMidPage extends BasePage
{
    /** The relative URL path for the aggregated MID creation page */
    public readonly url: string = '/mids/aggregated/add';
    
    /** The shared form component used to interact with the input fields and selection menus */
    public readonly form: CreationForm;
    
    /** Locator for the page's loading overlay to ensure the interface is ready before interaction */
    private readonly pageLoaded: Locator;

    /**
     * Initializes a new instance of the NewAggregatedMidPage class
     * Sets up the form handler and the global loading indicator
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, '/mids/aggregated/add');
        this.form = new CreationForm(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
    }

    /**
     * Executes the aggregated MID creation flow by populating the form with the provided data
     * Handles selection of the project, type, and currency, and uses a regular expression 
     * to dynamically target the correct source dropdown (Internal MIDs or Secure Deposits)
     * @param data - The data object containing aggregated MID configurations defined in AggregatedMidData
     * @returns A promise that resolves when the form is populated and the save action is triggered
     */
    public async createAggregatedMID(data: AggregatedMidData): Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        await this.form.selectDropDown('Project', data.project);
        await this.form.selectDropDown('Type', data.type);
        await this.form.selectDropDown('Currency', data.currency); 
        await this.form.selectDropDown(/Internal MIDs|Secure Deposits/);
        if (data.description) 
        {
            await this.form.fillInputField('Description', data.description);
        }
        await this.form.save();
    }
}