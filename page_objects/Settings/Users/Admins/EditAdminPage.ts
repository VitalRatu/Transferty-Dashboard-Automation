import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage'; 
import { CreationForm } from '../../../related_components/CreationForm';

export type EditAdminData =
{
    status: 'Active' | 'Blocked';
    role: string;
    first_name: string;
    last_name: string;
    phone: string;
}

export class EditAdminPage extends BasePage 
{
    private readonly form: CreationForm;

    constructor(page: Page) 
    {
        super(page, /\/users\/list\/admins\/\d+\/edit\/?$/);
        this.form = new CreationForm(page);
    }

    public async editAdmin(data: Partial<EditAdminData>): Promise<void>
    {
        const expectedHeading = new RegExp(`EDIT ADMIN`, 'i')
        const editPageHeader = this.page.getByRole('heading', {name: expectedHeading})
        await expect(editPageHeader).toBeVisible()

        if (data.status !== undefined) 
        {
            await this.form.selectDropDown('Status', data.status);
        }

        if (data.role !== undefined) 
        {
            await this.form.selectDropDown('Role', data.role);
        }

        if (data.first_name !== undefined) 
        {
            await this.form.fillInputField('First Name', data.first_name);
        }

        if (data.last_name !== undefined) 
        {
            await this.form.fillInputField('Last Name', data.last_name);
        }

        if (data.phone !== undefined) 
        {
        
            await this.form.fillInputField('Description', data.phone);
        }
        await this.form.save();
    }
}