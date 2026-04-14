import { BasePage } from '../../BasePage';
import { Page } from '@playwright/test';
import { Routes } from '../../../page_data/routes';
import { Tab } from '../../related_components/Tab';

export class RulesListPage extends BasePage 
{
    public readonly tab: Tab;

    constructor(page: Page) 
    {
        super(page); 
        this.tab = new Tab(page, 1);
    }
}