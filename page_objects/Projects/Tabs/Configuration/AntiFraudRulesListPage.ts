import { Page} from '@playwright/test';
import { FilterBar } from '../../../related_components/FilterBar'; 
import { Table } from '../../../related_components/Table';
import { BasePage } from '../../../BasePage';

export type AntifraudRulesListPageTabName =
    | ''

export class AntifraudRulesListPage extends BasePage
{
    public readonly filterBar: FilterBar<AntifraudRulesListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/antifraud-rules/)
        this.filterBar = new FilterBar<AntifraudRulesListPageTabName>(page);
        this.table = new Table(page);
    }

    public async addNewAntifraudRule(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/projects\/\d+\/configurations\/antifraud-rules\/add/);
    }
}