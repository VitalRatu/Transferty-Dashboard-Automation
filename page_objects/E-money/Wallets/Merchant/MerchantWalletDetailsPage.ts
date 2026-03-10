import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage'; // Твой путь к BasePage
import { DetailsPageReader } from '../../../related_components/DetailsPageReader';
import { EMoneyMerchantWallet } from '../../../../test_data/EMoneyWalletsData';
import { CreationForm } from '../../../related_components/CreationForm';

/**
 * Represents the detailed view and management page for a Merchant Wallet
 * Provides advanced functionality for verifying wallet data, navigating to linked entities 
 * like Projects or Internal MIDs, and executing update flows with strict field immutability checks
 */
export class MerchantWalletDetailsPage extends BasePage 
{
    /** The reader component used to extract data and interact with links on the details view */
    public readonly view: DetailsPageReader;
    
    /** The form component used to handle validation and input during the wallet editing process */
    public readonly form: CreationForm;

    /**
     * Initializes a new instance of the MerchantWalletDetailsPage class
     * Sets up the data reader and form handlers for managing merchant wallet records
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page);
        this.view = new DetailsPageReader(page);
        this.form = new CreationForm(page)
    }

    /**
     * Navigates to the linked Project details page by clicking the project name link
     * Captures the current project name to verify the header on the destination page
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
     * Navigates to the linked Internal MID details page by clicking the MID link
     * Performs a specific header verification that includes the provider name and MID identifier
     * @returns A promise that resolves when the MID details page header is confirmed
     */
    public async openInternalMIDDetails(): Promise<void>
    {
        const internalMIDName = await this.view.getValue('Internal MID');
        await this.view.clickValueLink('Internal MID');
        const expectedHeading = new RegExp(`MID DETAILS\\s*-\\s*TRANSFERTY\\s*-\\s*${internalMIDName}`, 'i');
        const internalMIDPageHeader = this.page.getByRole('heading', {name: expectedHeading});
        await expect(internalMIDPageHeader).toBeVisible();
    }

    /**
     * Performs a comprehensive verification of the merchant wallet's data
     * Validates project association, wallet type, and currency, while using regular expressions
     * to enforce strict format checks for the Merchant Wallet ID and the monetary balance string
     * @param expectedData - The data object containing the expected merchant wallet values
     * @returns A promise that resolves when all UI assertions pass successfully
     */
    public async verifyDetails(expectedData: EMoneyMerchantWallet): Promise<void> 
    {
        const expectedHeading = new RegExp(`MERCHANT WALLET DETAILS`)
        const detailsPageHeader = this.page.getByRole('heading', {name: expectedHeading })
        await expect(detailsPageHeader).toBeVisible()

        expect(await this.view.getValue('Project')).toBe(expectedData.project);
        const walletId = await this.view.getValue('Wallet ID');
        expect(walletId).toMatch(/^WM-\d+$/); // expected format "WC-100000000000"
        expect(await this.view.getValue('Type')).toBe(expectedData.type);
        expect(await this.view.getValue('Internal MID')).not.toBe('')
        const balance = await this.view.getValue('Balance')
        expect(balance).toMatch(/^-?\d{1,3}(,\d{3})*\.\d{2}$/);
        expect(await this.view.getValue('Currency')).toBe(expectedData.currency);
        expect(await this.view.getValue('Description')).toBe(expectedData.description)
        const createdDate = await this.view.getValue('Created');
        expect(createdDate).not.toBe('');
    }

    /**
     * Executes the update flow for an existing merchant wallet
     * Triggers the 'Edit' action, verifies that core attributes (Project, ID, Type, Currency) 
     * are read-only, and updates the description or Internal MID based on provided data
     * Includes an automatic post-save verification step to confirm changes
     * @param data - The data object containing fields to be updated (description, internalMID)
     * @returns A promise that resolves when the form is submitted and updates are verified
     */
    public async editMerchantWallet(data: Partial<EMoneyMerchantWallet>): Promise<void>
    {
        await this.view.clickActionButton('Edit');
        
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

        await this.checkMerchantWalletUpdate(data)
    }

    /**
     * Internal helper to verify only the fields that were targeted during an update flow
     * Minimizes assertion noise by skipping fields that weren't part of the change request
     * @param expectedData - The updated data to validate against the current UI state
     * @returns A promise that resolves after the targeted field checks
     */
    private async checkMerchantWalletUpdate(expectedData: Partial<EMoneyMerchantWallet>): Promise<void>
    {
        if (expectedData.description)
        {
            const actualDescription = await this.view.getValue('Description');
            expect(actualDescription).toBe(expectedData.description);
        }
        
        if (expectedData.internalMID)
        {
            const actualInternalMID = await this.view.getValue('Internal MID');
            expect(actualInternalMID).toBe(expectedData.internalMID);
        }
    }
}