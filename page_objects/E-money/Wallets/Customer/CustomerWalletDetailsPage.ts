import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage'; // Твой путь к BasePage
import { DetailsPageReader } from '../../../related_components/DetailsPageReader';
import { EMoneyCustomerWallet } from '../../../../test_data/EMoneyWalletsData';

/**
 * Represents the detailed view page for a Customer Wallet within the E-money section
 * Provides specialized functionality for verifying customer-specific wallet attributes, 
 * account identifiers, and navigation to linked project details
 */
export class CustomerWalletDetailsPage extends BasePage 
{
    /** The reader component used to extract and interact with field values on the details view */
    public readonly view: DetailsPageReader;

    /**
     * Initializes a new instance of the CustomerWalletDetailsPage class
     * Sets up the data reader for extracting customer wallet information
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page);
        this.view = new DetailsPageReader(page);
    }

    /**
     * Navigates to the linked Project details page by clicking the project name link
     * Performs a heading verification to ensure the correct project context is loaded
     * @returns A promise that resolves when the project details page is verified and visible
     */
    public async openProjectDetails(): Promise<void> 
    {
        const projectName = await this.view.getValue('Project');
        await this.view.clickValueLink('Project');
        const expectedHeading = new RegExp(`PROJECT DETAILS\\s*-\\s*${projectName}`, 'i');
        const projectPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(projectPageHeader).toBeVisible();
    }

    /**
     * Verifies that the displayed customer wallet details match the expected test data
     * Performs strict assertions on Project, Type, Account ID, and Currency, while utilizing 
     * a regular expression to validate the specific format of the Customer Wallet ID
     * @param expectedData - The data object containing the expected customer wallet attributes
     * @returns A promise that resolves when all detail assertions pass successfully
     */
    public async verifyDetails(expectedData: EMoneyCustomerWallet): Promise<void> 
    {
        const expectedHeading = new RegExp(`CUSTOMER WALLET DETAILS`)
        const detailsPageHeader = this.page.getByRole('heading', {name: expectedHeading })
        await expect(detailsPageHeader).toBeVisible()
        expect(await this.view.getValue('Project')).toBe(expectedData.project);
        expect(await this.view.getValue('Type')).toBe(expectedData.type);
        expect(await this.view.getValue('Account ID')).toBe(expectedData.account_id);
        expect(await this.view.getValue('Currency')).toBe(expectedData.currency);

        const walletId = await this.view.getValue('Wallet ID');
        expect(walletId).toMatch(/^WC-\d+$/); // expected format "WC-100000000000"
        
        const createdDate = await this.view.getValue('Created');
        expect(createdDate).not.toBe('');
    }
}