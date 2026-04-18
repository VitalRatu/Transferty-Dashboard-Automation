import { Page} from '@playwright/test';
import { FilterBar } from '../../../related_components/FilterBar'; 
import { Table } from '../../../related_components/Table';
import { BasePage } from '../../../BasePage';

export class RoutingRulesListPage extends BasePage
{
    public readonly filterBar: FilterBar;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/routing-rules\/all-rules/)
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
    }

    public async addNewRoutingRule(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/projects\/\d+\/configurations\/routing-rules\/all-rules\/add/);
    }
}