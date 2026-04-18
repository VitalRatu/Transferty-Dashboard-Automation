import { Page } from '@playwright/test';
import { Tab } from '../related_components/Tab';
import { TokensListPage } from './Tokens/TokensListPage';
import { LabelsListPage } from './Labels/LabelsListPage';
import { Orchestrator } from '../Orchestrator';

export type CustomersTabName = 
    | 'Tokens' 
    | 'Labels' 

export class CustomersPage extends Orchestrator<CustomersTabName>
{
    public readonly tokensListPage: TokensListPage;
    public readonly labelsListPage: LabelsListPage;
    
    constructor(page: Page, tabDepth = 0) 
    {
        super(page, tabDepth)
        this.tokensListPage = new TokensListPage(page);
        this.labelsListPage = new LabelsListPage(page);

    }
}