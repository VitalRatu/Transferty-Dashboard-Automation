import { Page } from '@playwright/test';
import { Tab } from './related_components/Tab';

export abstract class Orchestrator<T extends string> 
{
    protected readonly tab: Tab;

    constructor(page: Page, tabDepth: number = 0) 
    {
        this.tab = new Tab(page, tabDepth);
    }

    public async openTab(tabName: T): Promise<void>
    {
        await this.tab.open(tabName);
    }
}