import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type TokensListPageTabName = 
{
    'Card mask': string
    'Project': string
    'Subscription token': string
    'Provider': string
    'PSP': string
    'Created': string
    'Status': 'Active' | 'Inactive'
}
export class TokensListPage extends BasePage
{
    public readonly filterBar: FilterBar<TokensListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/subscriptions\/tokens/)
        this.filterBar = new FilterBar<TokensListPageTabName>(page);
        this.table = new Table(page);
    }

    // TODO - implement the method to deactivate a token
    public async deactivateToken() 
    {

    }
}