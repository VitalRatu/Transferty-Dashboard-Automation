import { Page                   } from '@playwright/test'                      ;
import { FilterBar              } from '../../../related_components/FilterBar'     ;
import { Table                  } from '../../../related_components/Table'         ;
import { BasePage } from '../../../BasePage';

export class IPWhiteListPage extends BasePage
{
    public readonly filterBar: FilterBar;
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/team\/whitelist/);

        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
    }

    //TODO to implement 
    public async addNewIP(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton('Add');
        await this.page.waitForURL(/\/projects\/\d+\/team\/\/whitelist\/add/);
    }
}