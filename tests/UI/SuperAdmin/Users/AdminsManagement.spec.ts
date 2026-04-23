import { expect, test } from '../../../../fixtures/fixtures';
import process from 'node:process';
import 'dotenv/config'

test('Create new admin', async ({ adminUser }) =>
{
    await test.step('User clicks on "Users" tab on the sidebar', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
    });

    await test.step('User clicks on "Admins" tab', async() => 
    {
        await adminUser.usersPage.openTab('Admins');
    });

    await test.step('User clicks on "Create admin" button', async() => 
    {
        await adminUser.usersPage.adminsListPage.addNewAdmin();
    });

    await test.step('User fill admin details and click on "Save" button', async() => 
    {
        await adminUser.newAdminPage.createNewAdmin(
        {
            email: process.env.ADMIN_FOR_CREATION_EMAIL,
            password: process.env.ADMIN_FOR_CREATION_PASSWORD,
            role: process.env.ADMIN_FOR_CREATION_ROLE
        });
    });

    await test.step('User checks if new admin appeared on the list', async() => 
    {
        await adminUser.usersPage.adminsListPage.openAdminDetails(process.env.ADMIN_FOR_CREATION_EMAIL);
    });

    await test.step('User deletes created admin', async() => 
    {
        await adminUser.adminDetailsPage.clickOnDeleteButton();
    });

    await test.step('User checks if admin was deleted', async() => 
    {
        const allAdminsEmails = await adminUser.usersPage.adminsListPage.getAllAdminsEmails();
        expect(allAdminsEmails).not.toContain(process.env.ADMIN_FOR_CREATION_EMAIL);
    });
});

test('Check if admin can login into the system', async ({ adminUser, newAdminSession }) =>
{
    await test.step('User clicks on "Users" tab on the sidebar', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
    });

    await test.step('User clicks on "Admins" tab', async() => 
    {
        await adminUser.usersPage.openTab('Admins');
    });

    await test.step('User clicks on "Create admin" button', async() => 
    {
        await adminUser.usersPage.adminsListPage.addNewAdmin();
    });

    await test.step('User fill admin details and click on "Save" button', async() => 
    {
        await adminUser.newAdminPage.createNewAdmin(
        {
            email: process.env.ADMIN_FOR_CREATION_EMAIL,
            password: process.env.ADMIN_FOR_CREATION_PASSWORD,
            role: process.env.ADMIN_FOR_CREATION_ROLE
        });
    });

    await test.step('User checks if new admin appeared on the list', async() => 
    {
        await adminUser.usersPage.adminsListPage.openAdminDetails(process.env.ADMIN_FOR_CREATION_EMAIL);
    });  

    await test.step('Test user logs in from a clean session and verifies access', async() =>
    {
        const newSessionAdmin = await newAdminSession
        (
            process.env.ADMIN_FOR_CREATION_EMAIL!, 
            process.env.ADMIN_FOR_CREATION_PASSWORD!
        );

        const currentUser = await newSessionAdmin.projectsListPage.header.getCurrentUserEmail();
        expect(currentUser).toBe(process.env.ADMIN_FOR_CREATION_EMAIL);
    });

    await test.step('Original admin deletes created admin', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('Users');
        await adminUser.usersPage.openTab('Admins');
        await adminUser.usersPage.adminsListPage.openAdminDetails(process.env.ADMIN_FOR_CREATION_EMAIL);
        await adminUser.adminDetailsPage.clickOnDeleteButton();
    }); 

    await test.step('User checks if admin was deleted', async() => 
    {
        const allAdminsEmails = await adminUser.usersPage.adminsListPage.getAllAdminsEmails();
        expect(allAdminsEmails).not.toContain(process.env.ADMIN_FOR_CREATION_EMAIL);
    });
});