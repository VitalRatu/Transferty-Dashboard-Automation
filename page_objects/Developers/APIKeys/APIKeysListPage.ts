import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type APIKeysListPageFilters = 
{
    'Public key': string
    'Project': string
    'Website': string
    'Created': string
    'Status': 'Active' | 'Blocked'
}
export class APIKeysListPage extends BasePage
{
    public readonly filterBar: FilterBar<APIKeysListPageFilters>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/apikeys/)
        this.filterBar = new FilterBar<APIKeysListPageFilters>(page);
        this.table = new Table(page);
    }

    public async addNewAPIKey(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/apikeys\/add/);
    }
}