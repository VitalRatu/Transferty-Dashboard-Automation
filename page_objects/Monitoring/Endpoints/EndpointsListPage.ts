import { Page} from '@playwright/test';
import { Tab } from '../../related_components/Tab';
import { Table } from '../../related_components/Table';
import { FilterBar } from '../../related_components/FilterBar';
import { Pagination } from '../../related_components/Pagination';
import { BasePage } from '../../BasePage';

export class EndpointsListPage extends BasePage
{
    public readonly tab: Tab;
    
    public readonly filter: FilterBar;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/monitoring\/endpoints/);
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