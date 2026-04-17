import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { Pagination } from '../../related_components/Pagination';
import { BasePage } from '../../BasePage';

export class TokensListPage extends BasePage
{
    private readonly filterBar: FilterBar;
    
    private readonly table: Table;

    private readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/customers\/tokens/);
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }
}