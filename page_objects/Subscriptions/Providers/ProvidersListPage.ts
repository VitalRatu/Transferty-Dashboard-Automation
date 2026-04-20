import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type ProvidersListPageTabName = 
{
    'Period': string
    'Project': string 
    'Provider': string
    'PSP': string
    'Internal MID': string
    'Currency': string
}
export class ProvidersListPage extends BasePage
{
    public readonly filterBar: FilterBar<ProvidersListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/subscriptions\/token-providers/)
        this.filterBar = new FilterBar<ProvidersListPageTabName>(page);
        this.table = new Table(page);
    }

    // TODO - implement the method to deactivate a provider
    public async deactivateProvider() 
    {

    }
}