import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../../related_components/Tab';
import { Table } from '../../../related_components/Table';
import { FilterBar } from '../../../related_components/FilterBar';
import { Pagination } from '../../../related_components/Pagination';
import { BasePage } from '../../../BasePage';

export type BasicRulesListPageTabName =
{
    'Rule ID': string
    'Project': string
    'Rule name': string
    'Status': 'Active' | 'Deactivated'
    'Created': string
}
export class BasicRulesListPage extends BasePage
{
    public readonly tab: Tab;
    
    public readonly filter: FilterBar<BasicRulesListPageTabName>;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/monitoring\/rules\/basic/);
        this.tab = new Tab(page);
        this.filter = new FilterBar<BasicRulesListPageTabName>(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }

    public async addNewBasicRule()
    {
        await this.filter.clickPrimaryButton();
        await this.page.waitForURL(new RegExp('/monitoring/rules/basic/add', 'i'));
    }
}