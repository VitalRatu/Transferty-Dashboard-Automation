import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CreationForm } from '../../../related_components/CreationForm';
import { CreateAdminData } from '../../../../test_data/AdminsData';

export class NewAdminPage extends BasePage 
{
    private readonly form: CreationForm;

    constructor(page: Page) 
    {
        super(page, '/users/list/admins/add'); 
        this.form = new CreationForm(page);
    }

    public async createNewAdmin(data: CreateAdminData): Promise<void> 
    {
        const header = this.page.getByRole('heading', { name: 'CREATE ADMIN', exact: true });
        await expect(header).toBeVisible();

        await this.form.fillInputField('Email', data.email);
        await this.form.fillInputField('Password', data.password);
        await this.form.fillInputField('Confirm Password', data.password);
        await this.form.selectDropDown('Role', data.role);

        await this.form.save();
    }

    public async cancelAdminCreation(): Promise<void>
    {
        await this.form.cancel();
        await this.page.waitForURL(/\/users\/list\/admins/);
    }
}