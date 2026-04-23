import process from 'node:process';
import { expect, test } from '../../../../fixtures/fixtures';         
import 'dotenv/config'

test.describe.serial('Permission: project_list_view', () => 
{
    test('Positive: SuperAdmin "project_list_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view']
                }
            );
        });

        await test.step('Test user logs in from a clean session and verifies access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL!);

            const tabs = await newSessionAdmin.projectsListPage.sidebar.getAvailableSidebarTabs();
            expect(tabs).toContain('Projects');

            await newSessionAdmin.projectsListPage.sidebar.openSidebarTab('Projects');
            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', {name: 'Projects'})).toBeVisible();
        });
    });

    test('Negative: SuperAdmin "project_list_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['admin_create']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL!);

            const tabs = await newSessionAdmin.projectsListPage.sidebar.getAvailableSidebarTabs();
            expect(tabs).not.toContain('Projects');

            await newSessionAdmin.projectsListPage.goTo();
            await expect(newSessionAdmin.projectsListPage.page.getByText('Error 404', { exact: true })).toBeVisible();
            await expect(newSessionAdmin.projectsListPage.page.getByText('page not found', { exact: true })).toBeVisible();
            await expect(newSessionAdmin.projectsListPage.page.getByRole('button', { name: 'Go to home page' })).toBeVisible();
        });
    });
});


test.describe.serial('Permission: projects_list_export', () => 
{
    test('Positive: SuperAdmin "projects_list_export" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export']
                }
            );
        });

        await test.step('Test user logs in from a clean session and verifies access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, );

            const tabs = await newSessionAdmin.projectsListPage.sidebar.getAvailableSidebarTabs();
            expect(tabs).toContain('Projects');

            await newSessionAdmin.projectsListPage.sidebar.openSidebarTab('Projects');
            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', {name: 'Projects'})).toBeVisible();

            await newSessionAdmin.projectsListPage.exportProjectsCsv();
        });
    });

    test('Negative: SuperAdmin "projects_list_export" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL!,);

            await newSessionAdmin.projectsListPage.goTo(); 
            await expect(newSessionAdmin.projectsListPage.page.getByRole('button', { name: 'Export to csv' })).toBeHidden();
        });
    });
});


test.describe.serial('Permission: project_view', () => 
{ 
    test('Positive: SuperAdmin "project_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'project_view']
                }
            );
        });

        await test.step('Test user logs in from a clean session and verifies access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL!);

            const tabs = await newSessionAdmin.projectsListPage.sidebar.getAvailableSidebarTabs();
            expect(tabs).toContain('Projects');

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string); 

            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();
        });
    });

    test('Negative: SuperAdmin "project_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL!);

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string);

            await expect(newSessionAdmin.projectsListPage.page.getByText('Error 404', { exact: true })).toBeVisible();
            await expect(newSessionAdmin.projectsListPage.page.getByText('page not found', { exact: true })).toBeVisible();
            await expect(newSessionAdmin.projectsListPage.page.getByRole('button', { name: 'Go to home page' })).toBeVisible();
        });
    });
});


test.describe.serial('Permission: project_update', () => 
{ 
    test('Positive: SuperAdmin "project_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update']
                }
            );
        });

        await test.step('Test user logs in from a clean session and verifies access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL!,);

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string); 

            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();

            await newSessionAdmin.projectPage.configuration.openTab('Project details');
            
            await expect(newSessionAdmin.projectPage.configuration.projectDetails.page.getByRole('button', {name: 'Edit'})).toBeVisible();
            await newSessionAdmin.projectPage.configuration.projectDetails.clickEditButton();
        });
    });

    test('Negative: SuperAdmin "project_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'project_view']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL!,);

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string);

            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();
            await expect(newSessionAdmin.projectPage.configuration.projectDetails.page.getByRole('button', {name: 'Edit'})).toBeHidden();
        });
    });
});


test.describe.serial('Permission: project_status_update', () => 
{ 
    test('Positive: SuperAdmin "project_status_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update']
                }
            );
        });

        await test.step('Test user logs in from a clean session and verifies access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL as string,);

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string); 

            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();

            await newSessionAdmin.projectPage.configuration.openTab('Project details');
            const projectDetailsBefore = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetailsBefore.Status).toBe('Active')
            await newSessionAdmin.projectPage.configuration.projectDetails.setProjectStatus('Deactivated');

            const projectDetailsAfter = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()
            expect(projectDetailsAfter.Status).toBe('Blocked')

            expect(await newSessionAdmin.projectPage.configuration.projectDetails.setProjectStatus('Activated')).toBeTruthy()
        });
    });

    test('Negative: SuperAdmin "project_status_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL as string,);

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string); 

            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();

            await newSessionAdmin.projectPage.configuration.openTab('Project details');
            const projectDetailsBefore = await newSessionAdmin.projectPage.configuration.projectDetails.getProjectDetails()

            expect(projectDetailsBefore.Status).toBe('Active')
            expect(await newSessionAdmin.projectPage.configuration.projectDetails.setProjectStatus('Deactivated')).toBeFalsy();

            const projectDetailsAfter = await newSessionAdmin.projectPage.configuration.projectDetails.getProjectDetails();
            expect(projectDetailsAfter.Status).toBe('Active');
        });
    });
});


test.describe.serial('Permission: project_checkout_settings_view', () => 
{ 
    test('Positive: SuperAdmin "project_checkout_settings_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view']
                }
            );
        });

        await test.step('Test user logs in from a clean session and verifies access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL as string,);

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string); 

            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();

            await newSessionAdmin.projectPage.configuration.openTab('Project details');
            const projectDetailsBefore = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetailsBefore.Status).toBe('Active')

            const availableTabs = await newSessionAdmin.projectPage.configuration.getAllTabNames()
            expect(availableTabs).toContain('Checkout (HPP)')

        });
    });

    test('Negative: SuperAdmin "project_checkout_settings_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL as string,);

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string); 

            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();

            await newSessionAdmin.projectPage.configuration.openTab('Project details');
            const projectDetailsBefore = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetailsBefore.Status).toBe('Active')

            const availableTabs = await newSessionAdmin.projectPage.configuration.getAllTabNames()
            expect(availableTabs).not.toContain('Checkout (HPP)')
        });
    });
});


test.describe.serial('Permission: project_checkout_settings_update', () => 
{ 
    test('Positive: SuperAdmin "project_checkout_settings_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view', 'project_checkout_settings_update']
                }
            );
        });

        await test.step('Test user logs in and checks if Payment methods are editable', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL as string,);

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string); 

            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();

            await newSessionAdmin.projectPage.configuration.openTab('Project details');
            const projectDetailsBefore = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetailsBefore.Status).toBe('Active')

            const availableTabs = await newSessionAdmin.projectPage.configuration.getAllTabNames()
            expect(availableTabs).toContain('Checkout (HPP)')

            await newSessionAdmin.projectPage.configuration.openTab('Checkout (HPP)')
            await newSessionAdmin.projectPage.configuration.checkout.openTab('Payment methods')

            await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.setMethodState('Cards', false)
            await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.applyChanges()

            expect(await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.isMethodActive('Cards')).toBeFalsy()
            await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.setMethodState('Cards', true)
            await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.applyChanges()

        });
    });

    test('Negative: SuperAdmin "project_checkout_settings_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view']
                }
            );
        });
        
        await test.step('Test user logs in from a clean session and verifies restricted access', async() =>
        {
            const newSessionAdmin = await newAdminSession
            (
                process.env.ADMIN_FOR_PERMISSIONS_EMAIL!, 
                process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
            );

            const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
            expect(currentUser).toBe(process.env.ADMIN_FOR_PERMISSIONS_EMAIL as string,);

            await newSessionAdmin.projectsListPage.filters.filterByText('Project', process.env.PROJECT_NAME as string);
            await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string); 

            await expect(newSessionAdmin.projectsListPage.page.getByRole('heading', { name: /^PROJECT DETAILS\s*-/i })).toBeVisible();

            await newSessionAdmin.projectPage.configuration.openTab('Project details');
            const projectDetailsBefore = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetailsBefore.Status).toBe('Active')

            const availableTabs = await newSessionAdmin.projectPage.configuration.getAllTabNames()
            expect(availableTabs).toContain('Checkout (HPP)')

            await newSessionAdmin.projectPage.configuration.openTab('Checkout (HPP)')
            await newSessionAdmin.projectPage.configuration.checkout.openTab('Payment methods')

            expect(await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.setMethodState('Cards', false)).toBeFalsy()
        });
    });
});

