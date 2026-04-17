import { BasePage } from '../../BasePage';
import { Page } from '@playwright/test';
import { Routes } from '../../../page_data/routes';
import { Tab } from '../../related_components/Tab';

export class RulesListPage
{
    public readonly tab: Tab;

    constructor(page: Page, tabDepth: number = 0) 
    {
        this.tab = new Tab(page, tabDepth);
    }
}