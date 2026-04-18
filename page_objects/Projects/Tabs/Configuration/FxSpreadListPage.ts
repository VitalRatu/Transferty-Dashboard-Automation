import { Page} from '@playwright/test';
import { FilterBar } from '../../../related_components/FilterBar'; 
import { Table } from '../../../related_components/Table';
import { BasePage } from '../../../BasePage';

export class FxSpreadListPage extends BasePage
{

    public readonly filterBar: FilterBar;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/fxspread/ )
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
    }

    public async addNewFxSpread(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/projects\/\d+\/configurations\/fxspread\/add/);
    }
}