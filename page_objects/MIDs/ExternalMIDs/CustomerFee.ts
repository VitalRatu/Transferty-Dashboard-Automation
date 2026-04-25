import { Locator, Page, expect } from '@playwright/test';
import { CustomerFeeType } from '../../../types/MIDs'; 
import { Table } from '../../related_components/Table';

/**
 * Represents the Customer Fee widget component.
 * Provides methods to dynamically interact with the customer fees table, 
 * including enabling fee types and populating specific fee inputs (Fixed, %, Min) based on column names.
 */
export class CustomerFee 
{
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
        this.container = page.locator('.Table-container.customer-fees-table');
        this.table = new Table(page)
    }

    /**
     * Fills the fee data for a specific fee type.
     * Checks if the row, toggle, and inputs are accessible before interacting.
     * @param data - The data object containing fee configuration
     * @returns Promise<boolean> - true if successfully filled, false if missing or disabled due to permissions
     */
    public async fillFeeData(data: CustomerFeeType): Promise<boolean> 
    {
        const row = await this.table.getRowLocatorByColumnValue('Fee type', data.feeType);
        try 
        {
            await row.waitFor({ state: 'visible', timeout: 3000 });
        } 
        catch (error) 
        {
            return false;
        }

        const toggle = row.locator('.ui.toggle.checkbox');
        const classAttr = await toggle.getAttribute('class') || '';
        const isNativeDisabled = await toggle.isDisabled();
        const isDisabled = classAttr.includes('disabled') || isNativeDisabled;
        
        const isChecked = classAttr.includes('checked');
        const shouldBeActive = data.isActive !== false; 

        if (shouldBeActive !== isChecked) 
        {
            if (isDisabled) 
            {
                return false;
            }

            await toggle.click();
            
            if (shouldBeActive) 
            {
                await expect(toggle).toHaveClass(/checked/);
            } 
            else 
            {
                await expect(toggle).not.toHaveClass(/checked/);
            }
        }
        
        if (!shouldBeActive)
        {
            return true; 
        }
        
        if (data.fixed) 
        {
            const isFilled = await this.fillInput(row, 'Fixed', data.fixed);
            if (!isFilled) return false;
        }
        if (data.percentage) 
        {
            const isFilled = await this.fillInput(row, '%', data.percentage);
            if (!isFilled) return false;
        }
        if (data.min) 
        {
            const isFilled = await this.fillInput(row, 'Min', data.min);
            if (!isFilled) return false;
        }

        return true;
    }
    
    /**
     * Internal helper to dynamically find an input within a specific column of a given row and fill it.
     * Waits for the input's parent container to be enabled before interacting.
     * @param row - The Locator representing the specific table row
     * @param columnName - The exact header name of the column where the input is located
     * @param value - The value to fill into the input field
     * @returns A promise that resolves when the input is successfully filled
     */
    private async fillInput(row: Locator, columnName: string, value: string | number): Promise<boolean> 
    {
        const columnIndex = await this.table.getColumnIndex(columnName);
        const cell = row.getByRole('cell').nth(columnIndex);
        const input = cell.locator('input');

        const isDisabled = await input.isDisabled() || await input.getAttribute('readonly') !== null;
        if (isDisabled) 
        {
            return false;
        }

        await input.fill(String(value));
        return true;
    }
}
