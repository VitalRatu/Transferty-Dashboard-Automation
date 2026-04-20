import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type OneclicksListPageTabName = 
{
    'Oneclick token': string 
    'Project': string 
    'Card mask': string
    'Created': string
    'Status': 'Active' | 'Inactive'
}
export class OneclicksListPage extends BasePage
{
    public readonly filterBar: FilterBar<OneclicksListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/subscriptions\/oneclicks/)
        this.filterBar = new FilterBar<OneclicksListPageTabName>(page);
        this.table = new Table(page);
    }

    // TODO - implement the method to deactivate a oneclick 
    public async deactivateOneclickToken() 
    {

    }
}