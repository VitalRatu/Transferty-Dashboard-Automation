import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type SubscriptionsListPageTabName = 
    | 'Subscription ID' 
    | 'Project' 
    | 'Plan'
    | 'Customer token'
    | 'BIN'
    | 'Last four'
    | 'Method'
    | 'Created'
    | 'Status'

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