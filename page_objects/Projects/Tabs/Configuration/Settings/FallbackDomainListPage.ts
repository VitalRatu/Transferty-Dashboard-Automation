import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import { DetailsPageReader } from '../../../../related_components/DetailsPageReader';

export class FallbackDomainListPage extends BasePage 
{
    public readonly view: DetailsPageReader
    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/settings\/fallback-domains/); 
        this.view = new DetailsPageReader(page);
    }

    public async setFallbackDomainsStatus(status: boolean): Promise<boolean> 
    {
        return await this.view.setToggleState('Fallback domain enabled', status);
    }
}