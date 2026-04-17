import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { Pagination } from '../../related_components/Pagination';
import { BasePage } from '../../BasePage';

export class APMsListPage extends BasePage
{
    public readonly filterBar: FilterBar;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/cards-and-accounts\/apms/);
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }
}