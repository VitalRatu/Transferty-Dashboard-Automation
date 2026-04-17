import { Page } from '@playwright/test';
import { Tab } from '../related_components/Tab';
import { TokensListPage } from './Tokens/TokensListPage';
import { LabelsListPage } from './Labels/LabelsListPage';

export class CustomersPage
{
    public readonly tab: Tab;
    public readonly tokensListPage: TokensListPage;
    public readonly labelsListPage: LabelsListPage;
    
    constructor(page: Page) 
    {
        this.tab = new Tab(page);

        this.tokensListPage = new TokensListPage(page);
        this.labelsListPage = new LabelsListPage(page);

    }
}