import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { DetailsPageReader } from '../../../related_components/DetailsPageReader';

export class AdminDetailsPage extends BasePage 
{
    private readonly view: DetailsPageReader;

    private readonly deleteModal: Locator;
    private readonly confirmDeleteButton: Locator;

    constructor(page: Page) 
    {
        super(page, /\/users\/list\/admins\/\d+\/details\/?$/);
        this.view = new DetailsPageReader(page);
        
        this.deleteModal = this.page.locator('.ui.small.modal.transition.visible.active.Modal.live');
        this.confirmDeleteButton = this.deleteModal.getByRole('button', { name: 'Permanently delete', exact: true });
    }

    public async clickOnEditbutton(): Promise<void>
    {
        await this.view.clickActionButton('Edit');
    }

    public async clickOnDeleteButton(): Promise<void>
    {
        await this.view.clickActionButton('Permanently delete');

        await expect(this.deleteModal).toBeVisible();
        await this.confirmDeleteButton.click();
        await expect(this.deleteModal).toBeHidden();
        
        await this.page.waitForURL(/\/users\/list\/admins/);
    }

    public async getAdminDetails(): Promise<Record<string, string>>
    {
        await this.page.waitForLoadState('networkidle');
        return await this.view.getAllFieldsAndValues();
    }
}