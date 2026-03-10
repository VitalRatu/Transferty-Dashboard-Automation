import {test} from '../../fixtures/fixtures';      
import {SideBarMenuButtons} from '../../page_data/SideBarMenuButtons';
import {testCards} from '../../test_data/testCards';

test('Visa 4012888888881881 Payout', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsMainPage.transactionsPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[1]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() =>
    {
        await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[1]);
    });
});

test('MasterCard 5413330300003002 Payout', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsMainPage.transactionsPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[3]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[3]);
    });
});

test('MasterCard 5555555555554444 Payout', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsMainPage.transactionsPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[5]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[5]);
    });
});

test('Amex 371449635398431 Payout', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsMainPage.transactionsPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[7]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[7]);
    });
});

test('Unionpay 6212345678901232 Payout', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsMainPage.transactionsPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[9]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[9]);
    });
});