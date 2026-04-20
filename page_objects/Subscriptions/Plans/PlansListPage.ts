import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type PlansListPageTabName = 
{
    'Plan ID': string 
    'Project': string
    'Name': string
    'Default currency': string
    'Trial': 'Yes' | 'No'
    'Created': string
    'Status': 'New' | 'Active' | 'Deactivated'
}
export class PlansListPage extends BasePage
{
    public readonly filterBar: FilterBar<PlansListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/subscriptions\/plans/)
        this.filterBar = new FilterBar<PlansListPageTabName>(page);
        this.table = new Table(page);
    }

    // TODO - implement the method to create a new subscription plan
    public async addNewPlan() 
    {

    }
}