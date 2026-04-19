import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { Pagination } from '../../related_components/Pagination';
import { BasePage } from '../../BasePage';

export type CardsListPageTabName =
    | 'BIN'
    | 'Card token'
    | 'Project'
    | 'Last four'
    | 'Exp. month'
    | 'Exp. year'
    | 'Brand'
    | 'Type'
    | 'Issuing country'
    | 'Card issuer'
    | 'Status'

export class CardsListPage extends BasePage
{
    public readonly filterBar: FilterBar<CardsListPageTabName>;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/cards-and-accounts\/cards/);
        this.filterBar = new FilterBar<CardsListPageTabName>(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }
}