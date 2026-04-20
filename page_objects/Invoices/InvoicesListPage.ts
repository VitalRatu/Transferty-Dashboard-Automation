import { Page} from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar'; 
import { Table } from '../related_components/Table';
import { Pagination } from '../related_components/Pagination';
import { BasePage } from '../BasePage';

export type InvoicesListPageTabName =
{
    'Invoice ID': string
    'Project': string
    'Subscription ID': string
    'Created': string
    'Status': 'Open' | 'Paid' | 'Unpaid' | 'Pending' | 'Retry'
}
export class InvoicesListPage extends BasePage
{
    public readonly filterBar: FilterBar<InvoicesListPageTabName>;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/invoices/);
        this.filterBar = new FilterBar<InvoicesListPageTabName>(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }
}