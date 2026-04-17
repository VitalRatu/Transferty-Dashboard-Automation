import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { DetailsPageReader } from '../../../related_components/DetailsPageReader';
 
export class ProjectDetailsPage extends BasePage 
{
    public readonly view: DetailsPageReader;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/details/);
        this.view = new DetailsPageReader(page);
    }

    public async getProjectDetails(): Promise<Record<string, string>>  
    {
        return await this.view.getAllFieldsAndValues();
    }

    public async clickEditButton(): Promise<void> 
    {
        await this.view.clickActionButton('Edit');
        await this.page.waitForURL(/\/projects\/\d+\/edit/);
    }
}