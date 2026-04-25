import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import { DetailsPageReader } from '../../../../related_components/DetailsPageReader';

export class ReconciliationSettings extends BasePage 
{
    public readonly view: DetailsPageReader
    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/settings\/reconciliation-settings/); 

        this.view = new DetailsPageReader(page)
    }

    public async editReconciliationParameters(): Promise<boolean>
    {
        return this.view.clickActionButton('Edit')
    }
}
