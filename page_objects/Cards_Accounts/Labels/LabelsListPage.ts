import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { Pagination } from '../../related_components/Pagination';

export class LabelsListPage 
{

    public readonly page: Page;

    public readonly filterBar: FilterBar;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        this.page = page;
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }

    public async addNewLabel()
    {
        await this.filterBar.clickPrimaryButton();
    }
}