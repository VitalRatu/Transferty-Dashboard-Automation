import { Page                   } from '@playwright/test'                      ;
import { FilterBar              } from '../../../related_components/FilterBar'     ;
import { Table                  } from '../../../related_components/Table'         ;
import { BasePage } from '../../../BasePage';

export type TeamListPageTabName =
    | ''

export class TeamListPage extends BasePage
{
    public readonly filterBar: FilterBar<TeamListPageTabName>;
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/team\/team/);
        this.filterBar = new FilterBar<TeamListPageTabName>(page);
        this.table = new Table(page);
    }

    //TODO to implement
    public async migrateTeam(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton('Migrate');
    }

    //TODO to implement 
    public async inviteNewUser(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton('Invite new user');
        await this.page.waitForURL(/\/projects\/\d+\/team\/\/team\/add/);
    }
}