import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type UsersListPageTabName = 
    | 'ID'
    | 'Email'
    | 'Partner'
    | 'First name'
    | 'Last name'
    | 'Phone'
    | 'Status'
    | 'Last login'
    | 'Created'

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