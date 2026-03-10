import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { DetailsPageReader } from '../../../related_components/DetailsPageReader';
import { EMoneyFeeWallelObject, EMoneyOperationalWallet } from '../../../../test_data/EMoneyWalletsData'; // 
import { Table } from '../../../related_components/Table';

/**
 * Represents the detailed view page for an Operational Wallet
 * Provides methods to verify wallet metadata (ID, Balance, Type) and manage associated 
 * Fee entities through the integrated table and action buttons
 */
export class OperationalWalletDetailsPage extends BasePage 
{
    /** The reader component used to extract field values from the details container */
    public readonly view: DetailsPageReader;
    
    /** The table component used to display and interact with the fee history records */
    public readonly table: Table;

    /**
     * Initializes a new instance of the OperationalWalletDetailsPage class
     * Sets up the view reader and data table for managing operational wallet details
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page);
        this.view = new DetailsPageReader(page);
        this.table = new Table(page)
    }

    /**
     * Verifies the core details of the operational wallet against expected data
     * Performs strict assertions on project, type, and currency, while using regular expressions 
     * to validate the Wallet ID format and the monetary balance structure
     * @param expectedData - The data object containing the expected operational wallet attributes
     * @returns A promise that resolves when all detail assertions pass successfully
     */
    public async verifyWalletDetails(expectedData: EMoneyOperationalWallet): Promise<void> 
    {
        const expectedHeading = new RegExp(`OPERATIONAL WALLET DETAILS`, 'i');
        const detailsPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(detailsPageHeader).toBeVisible();

        expect(await this.view.getValue('Project')).toBe(expectedData.project);
        const walletId = await this.view.getValue('Wallet ID');
        expect(walletId).toMatch(/^W[FAI]-\d{12}$/); 
        expect(await this.view.getValue('Type')).toBe(expectedData.type);
        const balanceUI = await this.view.getValue('Balance');
        expect(balanceUI).toMatch(/^-?\d{1,3}(,\d{3})*\.\d{2}$/);
        expect(await this.view.getValue('Currency')).toBe(expectedData.currency);
        expect(await this.view.getValue('Description')).toBe(expectedData.description);
        const createdDate = await this.view.getValue('Created');
        expect(createdDate).not.toBe('');
    }

    /**
     * Retrieves the complete data for a specific Fee entity from the history table
     * Supports identification of the fee row either by its numerical index or by a unique fee percentage value
     * @param identifier - Object containing either the 'index' (number) OR the 'uniqueValue' (string) of the Fee, % column 
     * @returns A promise that resolves to the row data as a key-value record
     */
    public async getFeeData(identifier: { index: number } | { uniqueValue: string }): Promise<Record<string, string>>
    {
        const expectedHeading = new RegExp(`OPERATIONAL WALLET DETAILS`, 'i');
        const detailsPageHeader = this.page.getByRole('heading', { name: expectedHeading });
        await expect(detailsPageHeader).toBeVisible();

        if ('index' in identifier)
        {
            return await this.table.getAllValuesFromRowByIndex(identifier.index);
        }
        else 
        {
            return await this.table.getAllValuesFromRowByColumnValue('Fee, %', identifier.uniqueValue);
        }
    }

    /**
     * Validates that a fee object in the table correctly reflects the provided configuration data
     * Handles specific cases like "Permanent" expiration (empty UI value) and partial date matching 
     * to account for timezone indicators
     * Supports partial data objects allowing verification of individual fields without passing the entire object
     * @param expectedData - The expected fee attributes to validate against the primary table record
     * @param identifier - Optional locator strategy to find the specific fee row, defaults to the first row
     * @returns A promise that resolves when the fee data verification is complete
     */
    public async verifyFeeInTable(
        expectedData: Partial<EMoneyFeeWallelObject>, 
        identifier: { index: number } | { uniqueValue: string } = { index: 0 }
    ): Promise<void> 
    {
        const resultedFee = await this.getFeeData(identifier); 

        if (expectedData.fee !== undefined)
        {
            expect(resultedFee['Fee, %']).toBe(expectedData.fee);
        }
        
        if (expectedData.activation_date !== undefined)
        {
            expect(resultedFee['Activation date']).toContain(expectedData.activation_date);
        }

        if (expectedData.expirationDate !== undefined)
        {
            if (expectedData.expirationDate === 'Permanent' || expectedData.expirationDate === '') 
            {
                expect(resultedFee['Expiration date']).toBe(''); 
            }
            else 
            {
                expect(resultedFee['Expiration date']).toContain(expectedData.expirationDate);
            }
        }

        if (expectedData.timezone !== undefined)
        {
            expect(resultedFee['Timezone']).toContain(expectedData.timezone);
        }
        
        expect(resultedFee['Status']).toBe('Active');
    }

    /**
     * Triggers the wallet editing flow by clicking the 'Edit' button in the action section
     * @returns A promise that resolves when the edit action is initiated
     */
    public async clickEditWalletButton(): Promise<void> 
    {
        await this.view.clickActionButton('Edit');
    }

    /**
     * Opens the form to add a new fee entity by clicking the 'Add Fee' action button
     * @returns A promise that resolves when the add fee flow is initiated
     */
    public async clickAddFeeObjectButton(): Promise<void> 
    {
        await this.view.clickActionButton('Add Fee');
    }

    /**
     * Initiates the editing of an existing fee entry by locating it via its unique percentage value
     * and clicking the corresponding link in the 'Action' column
     * @param percent - The unique fee percentage string to identify the target row
     * @returns A promise that resolves when the fee edit action is triggered
     */
    public async clickEditFeeObjectButton(percent: string): Promise<void>
    {
        await this.table.clickOnCellValueByUniqueValue('Fee, %', percent, 'Action');
    }

}