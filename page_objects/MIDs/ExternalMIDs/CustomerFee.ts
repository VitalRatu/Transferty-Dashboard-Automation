import { Locator, Page, expect } from '@playwright/test';
import { CustomerFeeData } from '../../../test_data/MIDsData';
import { Table } from '../../related_components/Table';

/**
 * Represents the Customer Fee widget component.
 * Provides methods to dynamically interact with the customer fees table, 
 * including enabling fee types and populating specific fee inputs (Fixed, %, Min) based on column names.
 */
export class CustomerFee 
{
    /** The Playwright Page instance */
    public readonly page: Page;
    
    /** The main container locator specifically for the customer fees table */
    private readonly container: Locator;
    
    /** Instance of the generic Table component scoped to this widget */
    public readonly table: Table;

    /**
     * Initializes a new instance of the CustomerFee component.
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.container = page.locator('.Table-container.customer-fees-table');
        this.table = new Table(page)
    }

    /**
     * Populates the fee data for a specific fee type.
     * Automatically locates the correct row, toggles it to active if necessary,
     * and fills in the provided values (fixed, percentage, min).
     * @param data - The data object containing fee configuration defined in CustomerFeeData
     * @returns A promise that resolves when all specified inputs for the fee type are filled
     */
    public async fillFeeData(data: CustomerFeeData): Promise<void> 
    {
        const row = await this.table.getRowLocatorByColumnValue('Fee type', data.feeType);
        const toggle = row.locator('.ui.toggle.checkbox');
        const isChecked = await toggle.getAttribute('class').then(c => c?.includes('checked'));

        const shouldBeActive = data.isActive !== false; 

        if (shouldBeActive && !isChecked) 
        {
            await toggle.click();
            await expect(toggle).toHaveClass(/checked/);
        }
        else if (!shouldBeActive && isChecked)
        {
            await toggle.click();
            await expect(toggle).not.toHaveClass(/checked/);
            
            return; 
        }
        
        if (shouldBeActive) 
        {
            if (data.fixed) 
            {
                await this.fillInput(row, 'Fixed', data.fixed);
            }
            if (data.percentage) 
            {
                await this.fillInput(row, '%', data.percentage);
            }
            if (data.min) 
            {
                await this.fillInput(row, 'Min', data.min);
            }
        }
    }
    
    /**
     * Internal helper to dynamically find an input within a specific column of a given row and fill it.
     * Waits for the input's parent container to be enabled before interacting.
     * @param row - The Locator representing the specific table row
     * @param columnName - The exact header name of the column where the input is located
     * @param value - The value to fill into the input field
     * @returns A promise that resolves when the input is successfully filled
     */
    private async fillInput(row: Locator, columnName: string, value: string): Promise<void> 
    {
        const colIndex = await this.table.getColumnIndex(columnName);
        
        const cell = row.getByRole('cell').nth(colIndex);
        
        const input = cell.locator('input').first();

        await expect(input.locator('..')).not.toHaveClass(/is-disabled/);

        await input.fill(value);
    }
}
