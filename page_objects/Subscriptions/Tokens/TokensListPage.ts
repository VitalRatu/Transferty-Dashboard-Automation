import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';

export class TokensListPage 
{

    private readonly page: Page;

    private readonly filterBar: FilterBar;
    
    private readonly table: Table;

    constructor(page: Page) 
    {
        this.page = page;
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
    }

    // TODO - implement the method to deactivate a token
    public async deactivateToken() 
    {

    }
}