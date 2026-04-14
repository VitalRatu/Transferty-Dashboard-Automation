import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { Pagination } from '../../related_components/Pagination';

export class TokensListPage 
{

    private readonly page: Page;

    private readonly filterBar: FilterBar;
    
    private readonly table: Table;

    private readonly pagination: Pagination;

    constructor(page: Page) 
    {
        this.page = page;
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }
}