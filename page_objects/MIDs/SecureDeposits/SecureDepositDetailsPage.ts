import { Page, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { DetailsPageReader } from '../../related_components/DetailsPageReader';
import { SecureDepositData} from '../../../test_data/MIDsData'; // 


export class SecureDepositDetailsPage extends BasePage 
{
    /** The reader component used to extract field values from the details container */
    public readonly view: DetailsPageReader;

    /**
     * Initializes a new instance of the OperationalWalletDetailsPage class
     * Sets up the view reader and data table for managing operational wallet details
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page);
        this.view = new DetailsPageReader(page);
    }

    /**
     * Verifies the core details of the Secure Deposit against the expected data.
     * Uses Partial<SecureDepositData> to allow verifying only specific fields (e.g., after an update).
     * Performs strict assertions on project, amount, currency, and dates, while dynamically 
     * validating the Secure Deposit ID format and the page header.
     * @param expectedData - The data object containing the expected Secure Deposit attributes
     * @returns A promise that resolves when all provided detail assertions pass successfully
     */
    public async verifyDetails(expectedData: Partial<SecureDepositData>): Promise<void> 
    {

        const expectedHeading = new RegExp(`SECURE DEPOSIT DETAILS`, 'i');
        const detailsPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(detailsPageHeader).toBeVisible();

        const idValue = await this.view.getValue('ID')
        expect(idValue).not.toBe('')

        const secureDeposit = await this.view.getValue('Secure Deposit')
        expect(secureDeposit).toMatch(/^SD-\d{4}$/)

        if (expectedData.project !== undefined) 
        {
            expect(await this.view.getValue('Project')).toBe(expectedData.project);
        }

        if (expectedData.amount !== undefined) 
        {
            expect(await this.view.getValue('Project')).toBe(expectedData.amount);
        }

        if (expectedData.currency !== undefined) 
        {
            expect(await this.view.getValue('Currency')).toBe(expectedData.currency);
        }

        if (expectedData.date !== undefined)
        {
            expect(await this.view.getValue('Income Date')).toBe(expectedData.date)
        }

        if (expectedData.description !== undefined) 
        {
            expect(await this.view.getValue('Description')).toBe(expectedData.description);
        }

        const status = await this.view.getValue('Status');
        expect(status).toBe('Active')

        const createdDate = await this.view.getValue('Created');
        expect(createdDate).not.toBe('');

        const updatedDate = await this.view.getValue('Updated');
        expect(updatedDate).not.toBe('');
    }

    /**
     * Triggers the SD editing flow by clicking the 'Edit' button in the action section
     * @returns A promise that resolves when the edit action is initiated
     */
    public async clickEditButton(): Promise<void> 
    {
        await this.view.clickActionButton('Edit');
    }

    /**
     * Opens the form to clone an existing SD by clicking the 'Clone' button
     * @returns A promise that resolves when the clone SD is initiated
     */
    public async clickCloneButton(): Promise<void> 
    {
        await this.view.clickActionButton('Clone');
    }

}