import { Page, expect } from '@playwright/test';
import { BasePage } from '../../../BasePage';
import { CreationForm } from '../../../related_components/CreationForm';
import { PermissionsTable } from '../../../related_components/PermissionsTable'; // Наш новый класс
import { RoleData } from '../../../../test_data/RolesData';

export class NewRolePage extends BasePage 
{
    private readonly form: CreationForm;
    private readonly permissions: PermissionsTable;

    constructor(page: Page) 
    {
        super(page, '/users/list/roles/add'); 
        this.form = new CreationForm(page);
        this.permissions = new PermissionsTable(page);
    }

    public async fillRoleData(data: RoleData): Promise<void> 
    {
        const header = this.page.getByRole('heading', { name: 'CREATE ROLE', exact: true });
        await expect(header).toBeVisible();

        await this.form.fillInputField('Role', data.name);
        await this.form.fillInputField('Description', data.description);

        await this.permissions.enablePermissions(data.permissions);

        await this.form.save();
    }
}