import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { Pagination } from '../../related_components/Pagination';
import { BasePage } from '../../BasePage';

export type APMsListPageTabName =
    | 'Payment method'
    | 'Project'
    | 'APM ID type'
    | 'APM account ID'
    | 'Status'

export class APMsListPage extends BasePage
{
    public readonly filterBar: FilterBar<APMsListPageTabName>;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/cards-and-accounts\/apms/);
        this.filterBar = new FilterBar<APMsListPageTabName>(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }
}