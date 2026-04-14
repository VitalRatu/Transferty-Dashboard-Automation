import { BasePage } from '../BasePage';
import { Page } from '@playwright/test';
import { Routes } from '../../page_data/routes';
import { Tab } from '../related_components/Tab';
import { TokensListPage } from './Tokens/TokensListPage';
import { LabelsListPage } from './Labels/LabelsListPage';

export class CustomersPage extends BasePage 
{
    public readonly tab: Tab;

    public readonly tokensListPage: TokensListPage;
    public readonly labelsListPage: LabelsListPage;
    
    constructor(page: Page) 
    {
        super(page, Routes.CUSTOMERS); 
        this.tab = new Tab(page);

        this.tokensListPage = new TokensListPage(page);
        this.labelsListPage = new LabelsListPage(page);

    }

}