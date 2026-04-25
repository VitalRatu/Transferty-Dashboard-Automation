import { test } from '../../../../fixtures/fixtures';      
import { testCardData } from '../../../../test_data/testCards';

test('Visa 4012888888881881 Payout', async ({ merchantUser }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await merchantUser.dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await merchantUser.transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await merchantUser.transactionAddPage.createTransaction(testCardData[1]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() =>
    {
        await merchantUser.transactionsPage.transactionsListPage.CheckRowData(0, testCardData[1]);
    });
});

test('MasterCard 5413330300003002 Payout', async ({ merchantUser }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await merchantUser.dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await merchantUser.transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await merchantUser.transactionAddPage.createTransaction(testCardData[3]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await merchantUser.transactionsPage.transactionsListPage.CheckRowData(0, testCardData[3]);
    });
});

test('MasterCard 5555555555554444 Payout', async ({ merchantUser }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await merchantUser.dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await merchantUser.transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await merchantUser.transactionAddPage.createTransaction(testCardData[5]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await merchantUser.transactionsPage.transactionsListPage.CheckRowData(0, testCardData[5]);
    });
});

test('Amex 371449635398431 Payout', async ({ merchantUser }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await merchantUser.dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await merchantUser.transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await merchantUser.transactionAddPage.createTransaction(testCardData[7]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await merchantUser.transactionsPage.transactionsListPage.CheckRowData(0, testCardData[7]);
    });
});

test('Unionpay 6212345678901232 Payout', async ({ merchantUser }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await merchantUser.dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await merchantUser.transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await merchantUser.transactionAddPage.createTransaction(testCardData[9]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await merchantUser.transactionsPage.transactionsListPage.CheckRowData(0, testCardData[9]);
    });
});