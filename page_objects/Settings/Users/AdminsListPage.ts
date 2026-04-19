import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type AdminsListPageTabName = 
    | 'ID'
    | 'Email'
    | 'Partner'
    | 'First name'
    | 'Last name'
    | 'Phone'
    | 'Role'
    | 'Status'
    | 'Last login'
    | 'Created'

export class AdminsListPage extends BasePage
{
    public readonly filterBar: FilterBar<AdminsListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/users\/list\/admins/)
        this.filterBar = new FilterBar<AdminsListPageTabName>(page);
        this.table = new Table(page);
    }
    public async addNewAdmin(): Promise<void>
    {
        await this.filterBar.clickPrimaryButton();
        await this.page.waitForURL(/\/users\/list\/admins\/add/);
    }

    public async openAdminDetails(adminEmail: string): Promise<void>
    {
        await this.table.clickOnCellValueByUniqueValue('Email', adminEmail, 'Email');
        await this.page.waitForURL(new RegExp('/users/list/admins/[a-f0-9]+/details', 'i'));
    }

    public async getAllAdminsEmails(): Promise<string[]>
    {
        const adminEmails = this.table.getAllValuesFromColumn('Email');
        return adminEmails;
    }
}