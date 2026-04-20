import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { Pagination } from '../../related_components/Pagination';
import { BasePage } from '../../BasePage';

export type CardsListPageTabName = 
{
    'BIN': string
    'Card token': string
    'Project': string
    'Last four': string
    'Exp. month': '01 - January' | '02 - February' | '03 - March' | '04 - April' | '05 - May' | '06 - June' | '07 - July' | '08 - August' | '09 - September' | '10 - October' | '11 - November' | '12 - December'
    'Exp. year': string
    'Brand': string
    'Type': 'Debit' | 'Credit'
    'Issuing country': string
    'Card issuer': string
    'Status': 'Active' | 'Blocked' | 'Expired'
}
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