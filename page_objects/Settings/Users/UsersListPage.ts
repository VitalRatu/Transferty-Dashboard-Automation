import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type UsersListPageTabName = 
{
    'ID': string
    'Email': string
    'Partner': string
    'First name': string
    'Last name': string
    'Phone': string
    'Status': 'Active' | 'Blocked' | 'Invited'
    'Last login': string
    'Created': string
}
export class UsersListPage extends BasePage
{
    public readonly filterBar: FilterBar<UsersListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/users\/list\/users/)
        this.filterBar = new FilterBar<UsersListPageTabName>(page);
        this.table = new Table(page);
    }
}