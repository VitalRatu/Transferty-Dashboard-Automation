import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type SubscriptionsListPageTabName = 
{
    'Subscription ID': string 
    'Project': string
    'Plan': string
    'Customer token': string
    'BIN': string
    'Last four': string
    'Method': string
    'Created': string
    'Status': 'Initial' | 'Active' | 'Inactive' | 'Retry' | 'Suspended'
}
export class SubscriptionsListPage extends BasePage
{
    public readonly filterBar: FilterBar<SubscriptionsListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/subscriptions\/plans/)
        this.filterBar = new FilterBar<SubscriptionsListPageTabName>(page);
        this.table = new Table(page);
    }

    // TODO - implement the method to deactivate a subscription
    public async deactivateSubscription() 
    {

    }
}