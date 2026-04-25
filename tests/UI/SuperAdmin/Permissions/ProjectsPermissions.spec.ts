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

            expect(await newSessionAdmin.projectsListPage.sidebar.openSidebarTab('Projects')).toBeTruthy()
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

            expect(await newSessionAdmin.projectsListPage.sidebar.openSidebarTab('Projects')).toBeFalsy()
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

            expect(await newSessionAdmin.projectsListPage.exportProjectsCsv()).toBeTruthy()
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

            const tabs = await newSessionAdmin.projectsListPage.sidebar.getAvailableSidebarTabs();
            expect(tabs).toContain('Projects');

            await newSessionAdmin.projectsListPage.sidebar.openSidebarTab('Projects');
            expect(await newSessionAdmin.projectsListPage.exportProjectsCsv()).toBeFalsy()
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
            expect(await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string)).toBeTruthy() 
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
            expect(await newSessionAdmin.projectsListPage.table.clickOnColumnValue('Project', process.env.PROJECT_NAME as string)).toBeTruthy()

            await expect(newSessionAdmin.projectsListPage.page.getByText('Error 404', { exact: true })).toBeVisible();
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            const availableTabs = await newSessionAdmin.projectPage.configuration.getAllTabNames()
            expect(availableTabs).toContain('Checkout (HPP)')

            await newSessionAdmin.projectPage.configuration.openTab('Checkout (HPP)')
            await newSessionAdmin.projectPage.configuration.checkout.openTab('Payment methods')

            expect(await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.setMethodState('Cards', false))
            await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.applyChanges()

            await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.setMethodState('Cards', true)
            await newSessionAdmin.projectPage.configuration.checkout.paymentMethodsPage.applyChanges()

            await newSessionAdmin.projectPage.configuration.checkout.openTab('Settings')
            expect(await newSessionAdmin.projectPage.configuration.checkout.checkoutSettingsPage.changeCheckoutSettings
            (
                {
                    allow_cascading: 'Yes'
                }
            )).toBeTruthy()

            expect(await newSessionAdmin.projectPage.configuration.checkout.checkoutSettingsPage.changeCheckoutSettings
            (
                {
                    allow_cascading: 'No'
                }
            )).toBeTruthy()

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

            await newSessionAdmin.projectPage.configuration.checkout.openTab('Settings')
            expect(await newSessionAdmin.projectPage.configuration.checkout.checkoutSettingsPage.changeCheckoutSettings
            (
                {
                    allow_cascading: 'Yes'
                }
            )).toBeFalsy()
        });
    });
});


//TODO Recheck posibility to implement
test.describe.serial('Permission: projects_emoney_receipt_update', () => 
{ 
    test('Positive: SuperAdmin "projects_emoney_receipt_update" permission', async ({ adminUser, newAdminSession }) => 
    {

    });

    test('Negative: SuperAdmin "projects_emoney_receipt_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        
    });
});


test.describe.serial('Permission: configuration_changelog_view', () => 
{ 
    test('Positive: SuperAdmin "configuration_changelog_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view', 'configuration_changelog_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            const availableTabs = await newSessionAdmin.projectPage.configuration.getAllTabNames()
            expect(availableTabs).toContain('Changelog')

        });
    });

    test('Negative: SuperAdmin "configuration_changelog_view" permission', async ({ adminUser, newAdminSession }) => 
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
            expect(availableTabs).not.toContain('Changelog')
        });
    });
});


test.describe.serial('Permission: assignment_rule_view', () => 
{ 
    test('Positive: SuperAdmin "assignment_rule_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view', 'configuration_changelog_view', 'assignment_rule_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()
            expect(availableTabs).toContain('Assigment rules')

        });
    });

    test('Negative: SuperAdmin "assignment_rule_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view', 'configuration_changelog_view']
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

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()
            expect(availableTabs).not.toContain('Assigment rules')
        });
    });
});


test.describe.serial('Permission: assignment_rule_update', () => 
{ 
    test('Positive: SuperAdmin "assignment_rule_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view', 'configuration_changelog_view', 'assignment_rule_view', 'assignment_rule_update']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).toContain('Assigment rules')

            await newSessionAdmin.projectPage.configuration.settings.openTab('Assigment rules')
            expect(await newSessionAdmin.projectPage.configuration.settings.assigmentRulesListPage.addAssigmentRule()).toBeTruthy()

        });
    });

    test('Negative: SuperAdmin "assignment_rule_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view', 'configuration_changelog_view', 'assignment_rule_view']
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

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).toContain('Assigment rules')

            await newSessionAdmin.projectPage.configuration.settings.openTab('Assigment rules')
            expect(await newSessionAdmin.projectPage.configuration.settings.assigmentRulesListPage.addAssigmentRule()).toBeFalsy()
        });
    });
});


test.describe.serial('Permission: settings_reconciliation_view', () => 
{ 
    test('Positive: SuperAdmin "settings_reconciliation_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'settings_reconciliation_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).toContain('Reconciliation')

            expect(await newSessionAdmin.projectPage.configuration.settings.openTab('Reconciliation')).toBeTruthy()
        });
    });

    test('Negative: SuperAdmin "settings_reconciliation_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view', 'configuration_changelog_view', 'assignment_rule_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).not.toContain('Reconciliation')

            expect(await newSessionAdmin.projectPage.configuration.settings.openTab('Reconciliation')).toBeFalsy()
        });
    });
});


test.describe.serial('Permission: settings_reconciliation_update', () => 
{ 
    test('Positive: SuperAdmin "settings_reconciliation_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'settings_reconciliation_view', 'settings_reconciliation_update']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).toContain('Reconciliation')

            expect(await newSessionAdmin.projectPage.configuration.settings.openTab('Reconciliation')).toBeTruthy()

            expect(await newSessionAdmin.projectPage.configuration.settings.reconciliationSettings.editReconciliationParameters()).toBeTruthy() 
            
            expect(await newSessionAdmin.projectPage.configuration.openTab('Project details')).toBeTruthy()
        });
    });

    test('Negative: SuperAdmin "settings_reconciliation_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view', 'configuration_changelog_view', 'assignment_rule_view', 'settings_reconciliation_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).toContain('Reconciliation')

            expect(await newSessionAdmin.projectPage.configuration.settings.openTab('Reconciliation')).toBeTruthy()
            expect(await newSessionAdmin.projectPage.configuration.settings.reconciliationSettings.editReconciliationParameters()).toBeTruthy() 

            await expect(newSessionAdmin.projectsListPage.page.getByText('Error 404', { exact: true })).toBeVisible();
        });
    });
});


test.describe.serial('Permission: fallback_domain_view', () => 
{ 
    test('Positive: SuperAdmin "fallback_domain_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'settings_reconciliation_view', 'settings_reconciliation_update', 'fallback_domain_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).toContain('Fallback domains')

            expect(await newSessionAdmin.projectPage.configuration.settings.openTab('Fallback domains')).toBeTruthy()
        });
    });

    test('Negative: SuperAdmin "fallback_domain_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_checkout_settings_view', 'configuration_changelog_view', 'assignment_rule_view', 'settings_reconciliation_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).not.toContain('Fallback domains')

            expect(await newSessionAdmin.projectPage.configuration.settings.openTab('Fallback domains')).toBeFalsy()
        });
    });
});


test.describe.serial('Permission: fallback_domain_update', () => 
{ 
    test('Positive: SuperAdmin "fallback_domain_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'fallback_domain_view', 'fallback_domain_update']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).toContain('Fallback domains')

            expect(await newSessionAdmin.projectPage.configuration.settings.openTab('Fallback domains')).toBeTruthy()
            expect(await newSessionAdmin.projectPage.configuration.settings.fallbackDomainsListPage.setFallbackDomainsStatus(true)).toBeTruthy()

        });
    });

    test('Negative: SuperAdmin "fallback_domain_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'fallback_domain_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')

            await newSessionAdmin.projectPage.configuration.openTab('Settings')
            const availableTabs = await newSessionAdmin.projectPage.configuration.settings.getAllTabNames()

            expect(availableTabs).toContain('Fallback domains')

            expect(await newSessionAdmin.projectPage.configuration.settings.openTab('Fallback domains')).toBeTruthy()
            expect(await newSessionAdmin.projectPage.configuration.settings.fallbackDomainsListPage.setFallbackDomainsStatus(true)).toBeFalsy()
        });
    });
});


test.describe.serial('Permission: project_ems_update', () => 
{ 
    test('Positive: SuperAdmin "project_ems_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'project_ems_update']
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
            expect(projectDetailsBefore['EM scheme']).toBe('No');
            expect(await newSessionAdmin.projectPage.configuration.projectDetails.clickEditButton()).toBeTruthy()
            expect(await newSessionAdmin.editProjectDetailsPage.editProjectDetails
            (
                {
                    em_scheme: 'Yes',
                    emoney_operator_desc: 'Some Operator desc',
                    payment_organization_desc: 'Some organization desc'
                }
            )).toBeTruthy()
            const projectDetailsAfter = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()
            expect(projectDetailsAfter.Status).toBe('Active')
            expect(projectDetailsAfter['EM scheme']).toBe('Yes');
            expect(projectDetailsAfter['E-money Operator description']).not.toBeNull()
            expect(projectDetailsAfter['Payment organization description']).not.toBeNull()
            expect(await newSessionAdmin.projectPage.configuration.projectDetails.clickEditButton()).toBeTruthy()
            expect(await newSessionAdmin.editProjectDetailsPage.editProjectDetails
            (
                {
                    em_scheme: 'No',
                }
            )).toBeTruthy()
        });
    });

    test('Negative: SuperAdmin "project_ems_update" permission', async ({ adminUser, newAdminSession }) => 
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
            expect(projectDetailsBefore['EM scheme']).toBe('No');
            expect(await newSessionAdmin.projectPage.configuration.projectDetails.clickEditButton()).toBeTruthy()
            expect(await newSessionAdmin.editProjectDetailsPage.editProjectDetails
            (
                {
                    em_scheme: 'Yes'
                }
            )).toBeFalsy()
        });
    });
});


test.describe.serial('Permission: fx_spread_view', () => 
{ 
    test('Positive: SuperAdmin "fx_spread_view" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'fx_spread_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()
            expect(projectDetails.Status).toBe('Active')
            expect(await newSessionAdmin.projectPage.configuration.openTab('FX spread')).toBeTruthy()
        });
    });

    test('Negative: SuperAdmin "fx_spread_view" permission', async ({ adminUser, newAdminSession }) => 
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')
            expect(await newSessionAdmin.projectPage.configuration.openTab('FX spread')).toBeFalsy()
        });
    });
});


test.describe.serial('Permission: fx_spread_create', () => 
{ 
    test('Positive: SuperAdmin "fx_spread_create" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'fx_spread_view', 'fx_spread_create']
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

            expect(await newSessionAdmin.projectPage.configuration.openTab('FX spread')).toBeTruthy()
            expect(await newSessionAdmin.projectPage.configuration.fxSpreads.addNewFxSpread()).toBeTruthy()
        });
    });

    test('Negative: SuperAdmin "fx_spread_create" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'fx_spread_view']
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
            const projectDetails = await newSessionAdmin.projectPage.configuration.projectDetails.view.getAllFieldsAndValues()

            expect(projectDetails.Status).toBe('Active')
            expect(await newSessionAdmin.projectPage.configuration.openTab('FX spread')).toBeTruthy()
            expect(await newSessionAdmin.projectPage.configuration.fxSpreads.addNewFxSpread()).toBeFalsy()
        });
    });
});


test.describe.serial('Permission: fx_spread_update', () => 
{ 
    test('Positive: SuperAdmin "fx_spread_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'fx_spread_view', 'fx_spread_create', 'fx_spread_update']
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

            expect(await newSessionAdmin.projectPage.configuration.openTab('FX spread')).toBeTruthy()
            expect(await newSessionAdmin.projectPage.configuration.fxSpreads.openFxSpreadDetails(process.env.FX_SPREAD_ID as string)).toBeTruthy()
            expect(await newSessionAdmin.fxSpreadDetailsPage.clickEditButton()).toBeTruthy()
        });
    });

    test('Negative: SuperAdmin "fx_spread_update" permission', async ({ adminUser, newAdminSession }) => 
    {
        await test.step('Change admin user role to have needed permissions', async () => 
        {
            await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
            await adminUser.usersPage.openTab('Roles');
            await adminUser.usersPage.rolesAdminListPage.openRoleDetails(process.env.ROLE_FOR_PERMISSIONS as string);
            await adminUser.roleDetailsPage.clickOnEditbutton();
            await adminUser.editRolePage.editRole(
                {
                    permissions: ['projects_list_view', 'projects_list_export', 'project_view', 'project_update', 'project_status_update', 'fx_spread_view']
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

            expect(await newSessionAdmin.projectPage.configuration.openTab('FX spread')).toBeTruthy()
            expect(await newSessionAdmin.projectPage.configuration.fxSpreads.openFxSpreadDetails(process.env.FX_SPREAD_ID as string)).toBeTruthy()
            expect(await newSessionAdmin.fxSpreadDetailsPage.clickEditButton()).toBeFalsy()
        });
    });
});