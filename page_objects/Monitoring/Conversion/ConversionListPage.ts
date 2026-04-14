import { BasePage } from '../../BasePage';
import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 



export class ConversionListPage extends BasePage 
{
    public readonly filter: FilterBar;

    constructor(page: Page) 
    {
        super(page); 

        this.filter = new FilterBar(page);
    }

    //TODO: Implement unique table logic for Conversion page

    public async addNewConversionRule()
    {
        await this.filter.clickPrimaryButton();
        await this.page.waitForURL(new RegExp('/monitoring/conversion/add', 'i'));
    }
}