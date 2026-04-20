import { Page                   } from '@playwright/test'                      ;
import { FilterBar              } from '../../../related_components/FilterBar'     ;
import { Table                  } from '../../../related_components/Table'         ;
import { BasePage } from '../../../BasePage';

export type RolesListPageTabName =
{

}

export class RolesListPage extends BasePage
{
    public readonly filterBar: FilterBar<RolesListPageTabName>;
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/team\/roles/);
        this.filterBar = new FilterBar<RolesListPageTabName>(page);
        this.table = new Table(page);
    }

    //TODO to implement
    public async migrateRoles(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton('Migrate');
    }
    
    //TODO to implement 
    public async addNewRole(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton('Add');
        await this.page.waitForURL(/\/projects\/\d+\/team\/\/roles\/add/);
    }
}