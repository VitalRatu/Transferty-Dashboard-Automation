import { Page} from '@playwright/test';
import { FilterBar } from '../../../../related_components/FilterBar'; 
import { Table } from '../../../../related_components/Table';
import { BasePage } from '../../../../BasePage';

export type FxSpreadListPageTabName =
{
    'Currency from': string
    'Currency to': string
    'Status': 'Active' | 'Inactive'
}

export class FxSpreadListPage extends BasePage
{
    public readonly filterBar: FilterBar<FxSpreadListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/fxspread/ )
        this.filterBar = new FilterBar<FxSpreadListPageTabName>(page);
        this.table = new Table(page);
    }

    public async addNewFxSpread(): Promise<boolean>
    {
        const isClicked = await this.filterBar.clickPrimaryButton();
        if (!isClicked)
        {
            return isClicked
        }
        await this.page.waitForURL(/\/projects\/\d+\/configurations\/fxspread\/add\/?$/);
        return isClicked
    }

    public async openFxSpreadDetails(id: string): Promise<boolean>
    {
        const isClicked = await this.table.clickOnColumnValue('ID', id)

        if(!isClicked)
        {
            return isClicked
        }
        await this.page.waitForURL(/\/projects\/\d+\/configurations\/fxspread\/\d+\/?$/);
        return isClicked
    }
}