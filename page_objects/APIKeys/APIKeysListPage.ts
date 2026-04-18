import { Page} from '@playwright/test';
import { FilterBar } from '../related_components/FilterBar'; 
import { Table } from '../related_components/Table';
import { BasePage } from '../BasePage';

export class APIKeysListPage extends BasePage
{
    public readonly filterBar: FilterBar;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/apikeys/)
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
    }

    public async addNewAPIKey(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/apikeys\/add/);
    }
}