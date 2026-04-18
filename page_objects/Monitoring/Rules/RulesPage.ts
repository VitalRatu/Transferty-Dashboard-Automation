import { Page } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Orchestrator } from '../../Orchestrator';

export type RulesPageTabName =
    | 'Basic'
    | 'Aggregated'

export class RulesPage extends Orchestrator<RulesPageTabName>
{
    public readonly tab: Tab;

    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth)
        this.tab = new Tab(page, tabDepth);
    }
}