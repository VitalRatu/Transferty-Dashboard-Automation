import { Page, Locator, expect } from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { Pagination } from '../../related_components/Pagination';

export class EndpointsListPage 
{
    private readonly page: Page;
    
    public readonly tab: Tab;
    
    public readonly filter: FilterBar;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        this.page = page;
        this.tab = new Tab(page);
        this.filter = new FilterBar(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }

    public async addNewEndpoint()
    {
        await this.filter.clickPrimaryButton();
        await this.page.waitForURL(new RegExp('/monitoring/endpoints/add', 'i'));
    }
}