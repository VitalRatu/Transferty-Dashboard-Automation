import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { Pagination } from '../../related_components/Pagination';
import { BasePage } from '../../BasePage';

export type BINsListPageTabName =
    | 'BIN'
    | 'Brand'
    | 'Type'
    | 'Issuing country'
    | 'Issuing bank'
    | 'Autoupdate'
    | 'Created'

export class BINsListPage extends BasePage
{
    public readonly filterBar: FilterBar<BINsListPageTabName>;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/cards-and-accounts\/bins/);
        this.filterBar = new FilterBar<BINsListPageTabName>(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }

    public async addNewBIN()
    {
        await this.filterBar.clickPrimaryButton();
    }
}