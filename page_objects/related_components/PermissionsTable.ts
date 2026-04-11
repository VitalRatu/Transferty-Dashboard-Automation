import { Page, Locator, expect } from '@playwright/test';

/**
 * Represents the Permissions Table component used across Role Add, Edit, and Details pages.
 * Handles both reading states and syncing checkboxes.
 */
export class PermissionsTable 
{
    private readonly page: Page;

    private readonly tableLocator: Locator;
    private readonly dataRows: Locator; 

    constructor(page: Page) 
    {
        this.page = page;

        this.tableLocator = page.locator('.permissions-view-table');
        this.dataRows = this.tableLocator.locator('tbody tr:not(.section-name)');
    }

    public async enablePermissions(permissionsNames: string[]): Promise<void> 
    {
        await expect(this.tableLocator).toBeVisible();

        const count = await this.dataRows.count();

        for (let i = 0; i < count; i++) 
        {
            const row = this.dataRows.nth(i);
            const nameCellText = await row.locator('td').nth(1).innerText();
            const permissionName = nameCellText.trim();

            const shouldBeChecked = permissionsNames.includes(permissionName);
            const rowClass = await row.getAttribute('class');
            const isCurrentlyChecked = rowClass?.includes('permission-active-row') ?? false;

            if (isCurrentlyChecked !== shouldBeChecked) 
            {
                const cell = row.locator('td').nth(0);
                
                await cell.click({ force: true });
                
                if (shouldBeChecked) 
                {
                    await expect(row).toHaveClass(/permission-active-row/);
                } 
                else 
                {
                    await expect(row).not.toHaveClass(/permission-active-row/);
                }
            }
        }
    }

}