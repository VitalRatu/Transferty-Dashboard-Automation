import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { DetailsPageReader } from '../../../related_components/DetailsPageReader';

export class RoleDetailsPage extends BasePage 
{
    public readonly view: DetailsPageReader;

    private readonly deleteModal: Locator;
    private readonly confirmDeleteButton: Locator;

    private readonly permissionsTable: Locator;
    private readonly permissionsDataRows: Locator;

    constructor(page: Page) 
    {
        super(page);
        this.view = new DetailsPageReader(page);
        
        this.deleteModal = this.page.locator('.ui.small.modal.transition.visible.active.Modal.live');
        this.confirmDeleteButton = this.deleteModal.getByRole('button', { name: 'Confirm', exact: true });

        this.permissionsTable = page.locator('.permissions-view-table');
        this.permissionsDataRows = this.permissionsTable.locator('tbody tr:not(.section-name)');
    }

    public async editRole(): Promise<void>
    {
        await this.view.clickActionButton('Edit');
        const expectedHeading = new RegExp(`EDIT ROLE`, 'i')
        const editPageHeader = this.page.getByRole('heading', {name: expectedHeading})
        await expect(editPageHeader).toBeVisible()
    }

    public async deleteRole(): Promise<void>
    {
        await this.view.clickActionButton('Remove');

        await expect(this.deleteModal).toBeVisible();
        await this.confirmDeleteButton.click();
        await expect(this.deleteModal).toBeHidden();
        
        await this.page.waitForURL(/\/users\/list\/roles/);
    }

    public async getRoleDetails(): Promise<Record<string, string>>
    {
       return await this.view.getAllFieldsAndValues();
    }

    public async getPermissions(): Promise<Record<string, string>>
    {
        const permissions: Record<string, string> = {};
        
        await expect(this.permissionsTable).toBeVisible();

        const count = await this.permissionsDataRows.count();
        for (let i = 0; i < count; i++) 
        {
            const row = this.permissionsDataRows.nth(i);
            
            const nameCellText = await row.locator('td').nth(0).innerText();
            const valueCellText = await row.locator('td').nth(1).innerText();
            
            const name = nameCellText.trim();
            const value = valueCellText.trim().toLowerCase();
            
            permissions[name] = value;
        }

        return permissions;
    }
}