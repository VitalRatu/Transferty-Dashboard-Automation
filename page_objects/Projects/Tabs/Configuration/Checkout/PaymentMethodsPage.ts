import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import { Table } from '../../../../related_components/Table';

export class PaymentMethodsPage extends BasePage 
{
    public readonly table: Table;

    private readonly applyChangesButton: Locator

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/checkout\/methods/); 
        this.table = new Table(page);
        this.applyChangesButton = page.locator('.ui.primary.button.mt-1').filter({hasText: /Apply changes/i});
    }

    private async getToggleLocator(methodName: string): Promise<Locator> 
    {
        const row = await this.table.getRowLocatorByColumnValue('Payment method', methodName);
    
        return row.locator('.ui.toggle.checkbox');
    }

    public async isDisabled(methodName: string): Promise<boolean> 
    {
        const toggle = await this.getToggleLocator(methodName);
        await expect(toggle).toBeVisible();
        
        const className = await toggle.getAttribute('class') || '';
        return className.includes('disabled');
    }

    public async isMethodActive(methodName: string): Promise<boolean> 
    {
        const toggle = await this.getToggleLocator(methodName);
        await expect(toggle).toBeVisible();
        
        const className = await toggle.getAttribute('class') || '';
        return className.includes('checked');
    }

    public async applyChanges(): Promise<boolean>
    {
        
        await expect(this.applyChangesButton).toBeVisible();

        const className = await this.applyChangesButton.getAttribute('class') || '';
        const isDisabled = className.includes('disabled');

        if (isDisabled) 
        {
            return false;
        }

        await this.applyChangesButton.click();
        
        await this.page.waitForLoadState('networkidle');

        await expect(this.applyChangesButton).toHaveClass(/disabled/, { timeout: 10000 });

        return true;
    }


    public async setMethodState(methodName: string, targetState: boolean): Promise<boolean> 
    {
        const toggle = await this.getToggleLocator(methodName);
        await expect(toggle).toBeVisible();

        const isDisabled = await this.isDisabled(methodName);
        if (isDisabled) 
        {
            console.log(`Cannot change state for '${methodName}'. The toggle is disabled for editing`);
            return false;
        }

        const isCurrentlyChecked = await this.isMethodActive(methodName);

        if (isCurrentlyChecked !== targetState) 
        {
            const label = toggle.locator('label');
            
            if (await label.count() > 0) 
            {
                await label.click({ force: true });
            } 
            else 
            {
                await toggle.click({ force: true });
            }

            if (targetState) 
            {
                await expect(toggle).toHaveClass(/checked/, { timeout: 10000 });
            } 
            else 
            {
                await expect(toggle).not.toHaveClass(/checked/, { timeout: 10000 });
            }
            
            await this.page.waitForLoadState('networkidle');
        }
        return true; 
    }
}