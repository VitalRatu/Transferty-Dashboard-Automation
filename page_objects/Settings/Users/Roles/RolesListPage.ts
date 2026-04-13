import { Page} from '@playwright/test';
import { FilterBar } from '../../../related_components/FilterBar'; 
import { Table } from '../../../related_components/Table';

export class RolesListPage 
{
    private readonly page: Page;

    private readonly filterBar: FilterBar;
    
    private readonly table: Table;

    constructor(page: Page) 
    {
        this.page = page;
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
    }
    
    public async addNewRole(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/users\/list\/roles\/add/);
    }

    public async openRoleDetails(roleName: string): Promise<void>
    {
        await this.table.clickOnCellValueByUniqueValue('Role', roleName, 'Role');
        await this.page.waitForURL(new RegExp('/users/list/roles/[a-f0-9]+', 'i'));
    }

    public async getAllRolesName(): Promise<string[]>
    {
        const roleNames = this.table.getAllValuesFromColumn('Role');
        return roleNames;
    }
}   