import { BasePage } from '../../BasePage';
import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 

export type ConversionListPageTabName =
    | 'Project' 

export class ConversionListPage extends BasePage 
{
    public readonly filter: FilterBar<ConversionListPageTabName>;

    constructor(page: Page) 
    {
        super(page, /\/monitoring\/conversion/); 

        this.filter = new FilterBar<ConversionListPageTabName>(page);
    }

    //TODO: Implement unique table logic for Conversion page

    public async addNewConversionRule()
    {
        await this.filter.clickPrimaryButton();
        await this.page.waitForURL(new RegExp('/monitoring/conversion/add', 'i'));
    }
}