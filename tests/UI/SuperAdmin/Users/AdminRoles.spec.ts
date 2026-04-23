import { expect, test } from '../../../../fixtures/fixtures';         

test('Create new admin role', async ({ adminUser }) =>
{
    await test.step('User clicks on "Users" tab on the sidebar', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
    });

    await test.step('User clicks on "Roles" tab', async() => 
    {
        await adminUser.usersPage.openTab('Roles');
    });

    await test.step('User clicks on "Add" button', async() => 
    {
        await adminUser.usersPage.rolesAdminListPage.addNewRole();
    });

    await test.step('User creates new role with permissions', async() => 
    {
        await adminUser.newRolePage.createNewRole({
            name: 'Role from automation',
            description: 'This is a test role from autotest',
            permissions: ['project_member_invite', 'project_member_remove', 'project_member_view', 'project_status_update', 'project_update', 'project_view', 'projects_list_view'],
        });
    });

    await test.step('User checks if new role appeared on the list', async() => 
    {
        await adminUser.usersPage.rolesAdminListPage.openRoleDetails('Role from automation');
    });

    await test.step('User checks if role contains correct description and permissions', async() => 
    {
        const roleDetails = await adminUser.roleDetailsPage.getRoleDetails();
        expect(roleDetails.Role).toBe('Role from automation');
        expect(roleDetails.Description).toBe('This is a test role from autotest');

        const rolePermissions = await adminUser.roleDetailsPage.getAllActivePermissions();
        expect(rolePermissions.sort()).toEqual(['project_member_invite', 'project_member_remove', 'project_member_view', 'project_status_update', 'project_update', 'project_view', 'projects_list_view'].sort());
    });

    await test.step('User deletes created role', async() => 
    {
        await adminUser.roleDetailsPage.clickOnDeleteButton();
    });

    await test.step('User checks if role was deleted', async() => 
    {
        const allRolesNames = await adminUser.usersPage.rolesAdminListPage.getAllRolesName();
        expect(allRolesNames).not.toContain('Role from automation');
    });
});

test('Edit existing role', async ({ adminUser }) =>
{
    await test.step('User clicks on "Users" tab on the sidebar', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
    });

    await test.step('User clicks on "Roles" tab', async() => 
    {
        await adminUser.usersPage.openTab('Roles');
    });

    await test.step('User clicks on "Add" button', async() => 
    {
        await adminUser.usersPage.rolesAdminListPage.addNewRole();
    });

    await test.step('User creates new role with permissions', async() => 
    {
        await adminUser.newRolePage.createNewRole({
            name: 'Role from automation',
            description: 'This is a test role from autotest',
            permissions: ['project_member_invite', 'project_member_remove', 'project_member_view', 'project_status_update', 'project_update', 'project_view', 'projects_list_view'],
        });
    });

    await test.step('User checks if new role appeared on the list', async() => 
    {
        await adminUser.usersPage.rolesAdminListPage.openRoleDetails('Role from automation');
    });

    await test.step('User checks if role contains correct description and permissions', async() => 
    {
        const roleDetails = await adminUser.roleDetailsPage.getRoleDetails();
        expect(roleDetails.Role).toBe('Role from automation');
        expect(roleDetails.Description).toBe('This is a test role from autotest');

        const rolePermissions = await adminUser.roleDetailsPage.getAllActivePermissions();
        expect(rolePermissions.sort()).toEqual(['project_member_invite', 'project_member_remove', 'project_member_view', 'project_status_update', 'project_update', 'project_view', 'projects_list_view'].sort());
    });

    await test.step('User clicks on "Edit" button', async() => 
    {
        await adminUser.roleDetailsPage.clickOnEditbutton();
    });

    await test.step('User edits role description and permissions', async() => 
    {
        await adminUser.editRolePage.editRole({
            name: 'Edited Role name from automation',
            description: 'Edited description from autotest',
            permissions: ['external_mid_create','external_mid_update','external_mid_delete', 'external_mid_view', 'external_mid_secret_view', 'external_mid_secret_update', 'internal_mid_create', 'internal_mid_update', 'internal_mid_view'],
        });
    });

    await test.step('User checks if role contains new details and permissions', async() => 
    {
        const roleDetails = await adminUser.roleDetailsPage.getRoleDetails();
        expect(roleDetails.Role).toBe('Edited Role name from automation');
        expect(roleDetails.Description).toBe('Edited description from autotest');

        const rolePermissions = await adminUser.roleDetailsPage.getAllActivePermissions();
        expect(rolePermissions.sort()).toEqual(['external_mid_create','external_mid_update','external_mid_delete', 'external_mid_view', 'external_mid_secret_view', 'external_mid_secret_update', 'internal_mid_create', 'internal_mid_update', 'internal_mid_view'].sort());
    });
    
    await test.step('User deletes created role', async() => 
    {
        await adminUser.roleDetailsPage.clickOnDeleteButton();
    });

    await test.step('User checks if role was deleted', async() => 
    {
        const allRolesNames = await adminUser.usersPage.rolesAdminListPage.getAllRolesName();
        expect(allRolesNames).not.toContain('Edited Role name from automation');
    });
});