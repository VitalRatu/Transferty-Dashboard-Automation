import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage'; 
import { DetailsPageReader } from '../../../related_components/DetailsPageReader';
import { EMoneyMerchantWalletType } from '../../../../types/EMoneyWallets';

/**
 * Represents the detailed view page for a Merchant Wallet.
 * Strictly responsible for reading data, verifying UI state, and navigating to linked entities.
 * Does NOT handle any data mutation or form submissions.
 */
export class MerchantWalletDetailsPage extends BasePage 
{
    /** The reader component used to extract data and interact with links on the details view */
    public readonly view: DetailsPageReader;

    /**
     * Initializes a new instance of the MerchantWalletDetailsPage class
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/emoney\/wallets\/merchant\/\d+/);
        this.view = new DetailsPageReader(page);
    }

    /**
     * Navigates to the linked Project details page by clicking the project name link
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
     * Performs a verification of the merchant wallet's data.
     * Uses Partial<EMoneyMerchantWallet> so it can be used for both full verifications 
     * and targeted post-update checks.
     * @param expectedData - The expected data to validate against the current UI state
     * @returns A promise that resolves when all provided UI assertions pass successfully
     */
    public async verifyDetails(expectedData: Partial<EMoneyMerchantWalletType>): Promise<void> 
    {
        const expectedHeading = new RegExp(`MERCHANT WALLET DETAILS`, 'i');
        await expect(this.page.getByRole('heading', {name: expectedHeading })).toBeVisible();

        if (expectedData.project) {
            expect(await this.view.getValue('Project')).toBe(expectedData.project);
        }
        if (expectedData.type) {
            expect(await this.view.getValue('Type')).toBe(expectedData.type);
        }
        if (expectedData.currency) {
            expect(await this.view.getValue('Currency')).toBe(expectedData.currency);
        }
        if (expectedData.description !== undefined) {
            expect(await this.view.getValue('Description')).toBe(expectedData.description);
        }
        if (expectedData.internalMID) {
            expect(await this.view.getValue('Internal MID')).toBe(expectedData.internalMID);
        }

        const walletId = await this.view.getValue('Wallet ID');
        expect(walletId).toMatch(/^WM-\d+$/); 
        
        const balance = await this.view.getValue('Balance');
        expect(balance).toMatch(/^-?\d{1,3}(,\d{3})*\.\d{2}$/);
        
        const createdDate = await this.view.getValue('Created');
        expect(createdDate).not.toBe('');
    }

    /**
     * Initiates the edit flow by clicking the 'Edit' action button.
     * @returns A promise that resolves when the edit button is clicked
     */
    public async clickEditButton(): Promise<void>
    {
        await this.view.clickActionButton('Edit');
    }
}