import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { DetailsPageReader } from '../../related_components/DetailsPageReader';
 
export class ExternalMidDetailsPage extends BasePage 
{
    public readonly view: DetailsPageReader;
    private readonly deleteModal: Locator;
    private readonly confirmDeleteButton: Locator;

    constructor(page: Page) 
    {
        super(page, /\/mids\/external\/[^\/]+\/?$/);
        this.view = new DetailsPageReader(page);

        this.deleteModal = this.page.locator('.ui.small.modal.transition.visible.active.Modal.live');
        this.confirmDeleteButton = this.deleteModal.getByRole('button', { name: 'Confirm', exact: true });
    }

    public async getExternalMidDetails(): Promise<Record<string, string>>  
    {
        return await this.view.getAllFieldsAndValues();
    }

    public async clickEditButton(): Promise<boolean> 
    {
        const isClicked = await this.view.clickActionButton('Edit');

        if (!isClicked) 
        {
            return false;
        }
        
        await this.page.waitForURL(/\/projects\/\d+\/edit/);

        return isClicked
    }

    public async clickCloneButton(): Promise<boolean> 
    {
        const isClicked = await this.view.clickActionButton('Clone MID');

        if (!isClicked) 
        {
            return false;
        }
        
        await this.page.waitForURL(/\/mids\/external\/[^\/]+\/clone\/?$/);

        return isClicked
    }

    public async clickDeleteButton(): Promise<boolean> 
    {
        const isClicked = await this.view.clickActionButton('Delete MID');

        if (!isClicked) 
        {
            return false;
        }
    
        await expect(this.deleteModal).toBeVisible();
        await this.confirmDeleteButton.click();
        await expect(this.deleteModal).toBeHidden();

        return isClicked
    }
}