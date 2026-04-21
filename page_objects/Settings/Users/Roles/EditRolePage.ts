import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage'; 
import { CreationForm } from '../../../related_components/CreationForm';
import { PermissionsTable } from '../../../related_components/PermissionsTable';
import { RoleData } from '../../../../test_data/RolesData';


export class EditRolePage extends BasePage 
{
    private readonly form: CreationForm;
    private readonly permissions: PermissionsTable; 

    constructor(page: Page) 
    {
        super(page, /\/users\/list\/roles\/[a-zA-Z0-9]+\/edit/);
        this.form = new CreationForm(page);
        this.permissions = new PermissionsTable(page);
    }

    public async editRole(data: Partial<RoleData>): Promise<void>
    {
        const header = this.page.getByRole('heading', { name: 'EDIT ROLE', exact: true });
        await expect(header).toBeVisible();

        if (data.name !== undefined) 
        {
            await this.form.fillInputField('Role', data.name);
        }

        if (data.description !== undefined) 
        {
            await this.form.fillInputField('Description', data.description);
        }

        if (data.permissions !== undefined) 
        {
            await this.permissions.enablePermissions(data.permissions);
        }

        await this.form.save();
    }
}