import {expect, test, } from '../../../fixtures/fixtures';         
import {SideBarMenuButtons} from '../../../page_data/SideBarMenuButtons';
import { UsersTabs } from '../../../page_data/TabNames';
import {adminData } from '../../../test_data/userCredentials';
import {adminDataForCreation} from '../../../test_data/AdminsData';

test('Create new admin', async ({ adminUser, dashboardPage, usersPage, newAdminPage, adminDetailsPage}) =>
{
    await test.step('User clicks on "Users" tab on the sidebar', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.USERS);
    });

    await test.step('User clicks on "Roles" tab', async() => 
    {
        await usersPage.tab.open(UsersTabs.Admins);
    });

    await test.step('User clicks on "Create admin" button', async() => 
    {
        await usersPage.adminsListPage.addNewAdmin();
    });

    await test.step('User fill admin details and click on "Save" button', async() => 
    {
        await newAdminPage.createNewAdmin(
            {
                email: adminDataForCreation.email,
                password: adminDataForCreation.password,
                role: adminDataForCreation.role
            }
        );
    });

    await test.step('User checks if new admin appeared on the list', async() => 
    {
        await usersPage.adminsListPage.openAdminDetails(adminDataForCreation.email);
    });

    await test.step('User deletes created admin', async() => 
    {
        await adminDetailsPage.clickOnDeleteButton();
    });

    await test.step('User checks if admin was deleted', async() => 
    {
        const allAdminsEmails = await usersPage.adminsListPage.getAllAdminsEmails();
        expect(allAdminsEmails).not.toContain(adminDataForCreation.email);
    });
});

test('Check if admin can login into the system', async ({ adminUser, loginPage, dashboardPage, usersPage, newAdminPage, adminDetailsPage}) =>
{
    await test.step('User clicks on "Users" tab on the sidebar', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.USERS);
    });

    await test.step('User clicks on "Roles" tab', async() => 
    {
        await usersPage.tab.open(UsersTabs.Admins);
    });

    await test.step('User clicks on "Create admin" button', async() => 
    {
        await usersPage.adminsListPage.addNewAdmin();
    });

    await test.step('User fill admin details and click on "Save" button', async() => 
    {
        await newAdminPage.createNewAdmin(
            {
                email: adminDataForCreation.email,
                password: adminDataForCreation.password,
                role: adminDataForCreation.role
            }
        );
    });

    await test.step('User checks if new admin appeared on the list', async() => 
    {
        await usersPage.adminsListPage.openAdminDetails(adminDataForCreation.email);
    });  

    await test.step('User logs out from the system', async() =>
    {
        await dashboardPage.header.logout();
    });

    await test.step('User tries to login with created admin email and password', async() =>
    {
        await loginPage.signIn(adminDataForCreation.email, adminDataForCreation.password);
    });

    await test.step('User checks if login was successful', async() =>
    {
        await dashboardPage.waitTillURL();
        const currentUser = await dashboardPage.header.getCurrentUserEmail();
        expect(currentUser).toBe(adminDataForCreation.email);
    });

    await test.step('User logs out from the system', async() =>
    {
        await dashboardPage.header.logout();
    });

    await test.step('User logs in with original admin email and password', async() =>
    {
        await loginPage.signIn(adminData.ADMIN_EMAIL, adminData.ADMIN_PASSWORD);
    });

    await test.step('User checks if login was successful', async() =>
    {
        await dashboardPage.waitTillURL();
        const currentUser = await dashboardPage.header.getCurrentUserEmail();
        expect(currentUser).toBe(adminData.ADMIN_EMAIL);
    });

    await test.step('User deletes created admin', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.USERS);
        await usersPage.tab.open(UsersTabs.Admins);
        await usersPage.adminsListPage.openAdminDetails(adminDataForCreation.email);
        await adminDetailsPage.clickOnDeleteButton();
    }); 

    await test.step('User checks if admin was deleted', async() => 
    {
        const allAdminsEmails = await usersPage.adminsListPage.getAllAdminsEmails();
        expect(allAdminsEmails).not.toContain(adminDataForCreation.email);
    });

});