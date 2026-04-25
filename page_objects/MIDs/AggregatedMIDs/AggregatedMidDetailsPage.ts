import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { DetailsPageReader } from '../../related_components/DetailsPageReader';
import { AggregatedMidType} from '../../../types/MIDs'; 


export class AggregatedMidDetailsPage extends BasePage 
{
    /** The reader component used to extract field values from the details container */
    public readonly view: DetailsPageReader;

    private readonly deleteModal:Locator;
    private readonly confirmDeleteButton:Locator;

    /**
     * Initializes a new instance of the OperationalWalletDetailsPage class
     * Sets up the view reader and data table for managing operational wallet details
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/mids\/aggregated\/AG-\d{10}\/?$/);
        this.view = new DetailsPageReader(page);
        this.deleteModal = this.page.locator('.ui.small.modal.transition.visible.active.Modal.live');
        this.confirmDeleteButton = this.deleteModal.getByRole('button', { name: 'Delete', exact: true });
    }

    /**
     * Verifies the core details of the Aggregated MID against the expected data.
     * Uses Partial<AggregatedMidData> to allow verifying only specific fields (e.g., after an update).
     * Performs strict assertions on linked entities, project, and currency, while using regular expressions 
     * to dynamically validate the Aggregated MID format and the page header.
     * @param expectedData - The data object containing the expected Aggregated MID attributes
     * @returns A promise that resolves when all provided detail assertions pass successfully
     */
    public async verifyDetails(expectedData: Partial<AggregatedMidType>): Promise<void> 
    {
        const aggregatedMid = await this.view.getValue('Aggregated MID');

        expect(aggregatedMid).toMatch(/^AG-\d{10}$/); 

        const expectedHeading = new RegExp(`MID DETAILS - ${aggregatedMid}`, 'i');

        const detailsPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(detailsPageHeader).toBeVisible();

        if (expectedData.project !== undefined) 
        {
            expect(await this.view.getValue('Project')).toBe(expectedData.project);
        }

        if (expectedData.currency !== undefined) 
        {
            expect(await this.view.getValue('Currency')).toBe(expectedData.currency);
        }

        const ReceivedMid = await this.view.getValue(/Internal MIDs|Secure Deposits/)
        expect(ReceivedMid).toMatch(/^(MI|SD)-\d+$/)
        
        if (expectedData.type !== undefined) 
        {
            expect(await this.view.getValue('Type')).toBe(expectedData.type);
        }
        
        if (expectedData.description !== undefined) 
        {
            expect(await this.view.getValue('Description')).toBe(expectedData.description);
        }

        const createdDate = await this.view.getValue('Created');
        expect(createdDate).not.toBe('');

        const updatedDate = await this.view.getValue('Updated');
        expect(updatedDate).not.toBe('');
    }

    /**
     * Triggers the Aggregated MID editing flow by clicking the 'Edit' button in the action section
     * @returns A promise that resolves when the edit action is initiated
     */
    public async clickEditButton(): Promise<void> 
    {
        await this.view.clickActionButton('Edit');
    }

    /**
     * Opens the form to delete a AG MID by clicking the 'Delete' action button
     * @returns A promise that resolves when the add fee flow is initiated
     */
    public async clickDeleteButton(): Promise<void> 
    {
        await this.view.clickActionButton('Delete');

        await expect(this.deleteModal).toBeVisible();
        await this.confirmDeleteButton.click();
        await expect(this.deleteModal).toBeHidden();
        
        await this.page.waitForURL(new RegExp(`/mids/aggregated`));
    }

}