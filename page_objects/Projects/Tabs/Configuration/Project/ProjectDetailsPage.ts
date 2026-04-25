import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import { DetailsPageReader } from '../../../../related_components/DetailsPageReader';
 
export class ProjectDetailsPage extends BasePage 
{
    public readonly view: DetailsPageReader;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/details\/?$/);
        this.view = new DetailsPageReader(page);
    }

    public async getProjectDetails(): Promise<Record<string, string>>  
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

    public async setProjectStatus(status: 'Activated' | 'Deactivated'): Promise<boolean> 
    {
        const targetState = status === 'Activated';
        return await this.view.setToggleState('Activated', targetState);
    }

    public getProjectStatusToggleLocator(): Locator 
    {
        return this.view.getToggleContainerLocator('Activated');
    }
}