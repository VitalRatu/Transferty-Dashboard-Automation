import { expect, test } from '../../../../fixtures/fixtures';         
import { adminForPermissionsData } from '../../../../test_data/userCredentials';

test.describe.serial('Permissions: project_list_view', () => 
{
    test('Positive: SuperAdmin "project_list_view" permission', async ({ adminUser, newAdminSession, projectsListPage, usersPage, editRolePage, roleDetailsPage }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await projectsListPage.sidebar.openSidebarTab('Users');
            await usersPage.openTab('Roles');
            await usersPage.rolesAdminListPage.openRoleDetails('For automation [dont touch pls]');
            await roleDetailsPage.clickOnEditbutton();
            await editRolePage.editRole(
                {
                    permissions: ['projects_list_view']
                }
            );
        });

        await test.step('Test user logs in from a clean session and verifies access', async() =>
        {
            const projectsListPageNew = await newAdminSession
            (
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS, 
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS_PASSWORD
            );

            const currentUser = await projectsListPageNew.header.getCurrentUserEmail();
            expect(currentUser).toBe(adminForPermissionsData.ADMIN_FOR_PERMISSIONS);

            const tabs = await projectsListPageNew.sidebar.getAvailableSidebarTabs();
            expect(tabs).toContain('Projects');

            await projectsListPageNew.sidebar.openSidebarTab('Projects');
            await expect(projectsListPageNew.page.getByRole('heading', {name: 'Projects'})).toBeVisible();
        });
    });

    test('Negative: SuperAdmin "project_list_view" permission', async ({ adminUser, newAdminSession, projectsListPage, usersPage, editRolePage, roleDetailsPage }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await projectsListPage.sidebar.openSidebarTab('Users');
            await usersPage.openTab('Roles');
            await usersPage.rolesAdminListPage.openRoleDetails('For automation [dont touch pls]');
            await roleDetailsPage.clickOnEditbutton();
            await editRolePage.editRole(
                {
                    permissions: ['admin_create']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const projectsListPageNew = await newAdminSession
            (
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS, 
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS_PASSWORD
            );

            const currentUser = await projectsListPageNew.header.getCurrentUserEmail();
            expect(currentUser).toBe(adminForPermissionsData.ADMIN_FOR_PERMISSIONS);

            const tabs = await projectsListPageNew.sidebar.getAvailableSidebarTabs();
            expect(tabs).not.toContain('Projects');

            await projectsListPageNew.goTo();
            await expect(projectsListPageNew.page.getByText('Error 404', { exact: true })).toBeVisible();
            await expect(projectsListPageNew.page.getByText('page not found', { exact: true })).toBeVisible();
            await expect(projectsListPageNew.page.getByRole('button', { name: 'Go to home page' })).toBeVisible();
        });
    });
});


test.describe.serial('Permissions: projects_list_export', () => 
{
    test('Positive: SuperAdmin "projects_list_export" permission', async ({ adminUser, newAdminSession, projectsListPage, usersPage, editRolePage, roleDetailsPage }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await projectsListPage.sidebar.openSidebarTab('Users');
            await usersPage.openTab('Roles');
            await usersPage.rolesAdminListPage.openRoleDetails('For automation [dont touch pls]');
            await roleDetailsPage.clickOnEditbutton();
            await editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export']
                }
            );
        });

        await test.step('Test user logs in from a clean session and verifies access', async() =>
        {
            const projectsListPageNew = await newAdminSession
            (
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS, 
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS_PASSWORD
            );

            const currentUser = await projectsListPageNew.header.getCurrentUserEmail();
            expect(currentUser).toBe(adminForPermissionsData.ADMIN_FOR_PERMISSIONS);

            const tabs = await projectsListPageNew.sidebar.getAvailableSidebarTabs();
            expect(tabs).toContain('Projects');

            await projectsListPageNew.sidebar.openSidebarTab('Projects');
            await expect(projectsListPageNew.page.getByRole('heading', {name: 'Projects'})).toBeVisible();

            await projectsListPageNew.exportProjectsCsv()
            
        });
    });

    test('Negative: SuperAdmin "projects_list_export" permission', async ({ adminUser, newAdminSession, projectsListPage, usersPage, editRolePage, roleDetailsPage }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await projectsListPage.sidebar.openSidebarTab('Users');
            await usersPage.openTab('Roles');
            await usersPage.rolesAdminListPage.openRoleDetails('For automation [dont touch pls]');
            await roleDetailsPage.clickOnEditbutton();
            await editRolePage.editRole(
                {
                    permissions: ['projects_list_view']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const projectsListPageNew = await newAdminSession
            (
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS, 
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS_PASSWORD
            );

            const currentUser = await projectsListPageNew.header.getCurrentUserEmail();
            expect(currentUser).toBe(adminForPermissionsData.ADMIN_FOR_PERMISSIONS);

            await projectsListPageNew.goTo(); 
            await expect(projectsListPageNew.page.getByRole('button', { name: 'Export to csv' })).toBeHidden();
        });
    });
});


test.describe.serial('Permissions: project_view', () => 
{ 
    test('Positive: SuperAdmin "project_view" permission', async ({ adminUser, newAdminSession, projectsListPage, usersPage, editRolePage, roleDetailsPage }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await projectsListPage.sidebar.openSidebarTab('Users');
            await usersPage.openTab('Roles');
            await usersPage.rolesAdminListPage.openRoleDetails('For automation [dont touch pls]');
            await roleDetailsPage.clickOnEditbutton();
            await editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'project_view']
                }
            );
        });

        await test.step('Test user logs in from a clean session and verifies access', async() =>
        {
            const projectsListPageNew = await newAdminSession
            (
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS, 
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS_PASSWORD
            );

            const currentUser = await projectsListPageNew.header.getCurrentUserEmail();
            expect(currentUser).toBe(adminForPermissionsData.ADMIN_FOR_PERMISSIONS);

            const tabs = await projectsListPageNew.sidebar.getAvailableSidebarTabs();
            expect(tabs).toContain('Projects');

            await projectsListPageNew.filters.filterByText('Project', 'automationStuff')
            await projectsListPageNew.table.clickOnColumnValue('Project', 'automationStuff') 

            await expect(projectsListPageNew.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();
        });
    });

    test('Negative: SuperAdmin "project_view" permission', async ({ adminUser, newAdminSession, projectsListPage, usersPage, editRolePage, roleDetailsPage }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await projectsListPage.sidebar.openSidebarTab('Users');
            await usersPage.openTab('Roles');
            await usersPage.rolesAdminListPage.openRoleDetails('For automation [dont touch pls]');
            await roleDetailsPage.clickOnEditbutton();
            await editRolePage.editRole(
                {
                    permissions: ['projects_list_view']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const projectsListPageNew = await newAdminSession
            (
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS, 
                adminForPermissionsData.ADMIN_FOR_PERMISSIONS_PASSWORD
            );

            const currentUser = await projectsListPageNew.header.getCurrentUserEmail();
            expect(currentUser).toBe(adminForPermissionsData.ADMIN_FOR_PERMISSIONS);

            await projectsListPageNew.filters.filterByText('Project', 'automationStuff')
            await projectsListPageNew.table.clickOnColumnValue('Project', 'automationStuff')

            await expect(projectsListPageNew.page.getByText('Error 404', { exact: true })).toBeVisible();
            await expect(projectsListPageNew.page.getByText('page not found', { exact: true })).toBeVisible();
            await expect(projectsListPageNew.page.getByRole('button', { name: 'Go to home page' })).toBeVisible();
        });
    });
});