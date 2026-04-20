import { Page} from '@playwright/test';
import { FilterBar } from '../../../related_components/FilterBar'; 
import { Table } from '../../../related_components/Table';
import { BasePage } from '../../../BasePage';

export type ChangelogListPageTabName = 
{
    'Period': string;
    'Actor': string;

    'Section': 
        | 'Project' 
        | 'MIDs' 
        | 'Currencies' 
        | 'API-keys' 
        | 'Routing rules' 
        | 'Antifraud rules' 
        | 'Checkout (HPP)' 
        | 'Receipt' 
        | 'Recurring' 
        | 'Fallback domains';

    'Object type': 
        | 'Project ID' 
        | 'External MID'
        | 'Internal MID'

        | 'Currency country' 
        | 'API-key ID' 
        
        | 'Routing rule ID' 
        | 'Routing rule order' 
        | 'Antifraud rule ID' 
        | 'Antifraud rule order' 
        
        | 'Checkout (HPP) payment methods' 
        | 'Checkout (HPP) configuration' 
        | 'Checkout (HPP) settings'

        | 'Receipt settings'
        | 'E-Money Receipt settings'
        
        | 'Recurring plan'
        | 'Subscription'
        
        | 'Fallback domain settings'
        | 'Fallback domain countries'
        | 'Fallback domain domains'
        | 'Fallback domain domains order';

    'Action': 
        | 'Create' 
        | 'Update' 
        | 'Delete';
}
export class ChangelogListPage extends BasePage
{
    public readonly filterBar: FilterBar<ChangelogListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/changelog/)
        this.filterBar = new FilterBar<ChangelogListPageTabName>(page);
        this.table = new Table(page);
    }
}