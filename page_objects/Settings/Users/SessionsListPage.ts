import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type SessionsListPageTabName = 
{
    'Login': string
    'IP address': string
    'Created': string
    'Status': 'Active' | 'Closed'
}
export class SessionsListPage extends BasePage
{
    public readonly filterBar: FilterBar<SessionsListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/users\/list\/sessions/)
        this.filterBar = new FilterBar<SessionsListPageTabName>(page);
        this.table = new Table(page);
    }
}