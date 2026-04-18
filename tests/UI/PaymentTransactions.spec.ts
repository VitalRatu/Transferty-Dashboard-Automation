import {test} from '../../fixtures/fixtures';
import {testCards} from '../../test_data/testCards';

test('Visa 4012888888881881 Payment', async ({ merchantUser, transactionsPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[0]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await transactionsPage.transactionsListPage.CheckRowData(0, testCards[0]);
    });
});

test('MasterCard 5413330300003002 Payment', async ({ merchantUser, transactionsPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() =>
    {
        await dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[2]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await transactionsPage.transactionsListPage.CheckRowData(0, testCards[2]);
    });
});

test('MasterCard 5555555555554444 Payment', async ({ merchantUser, transactionsPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[4]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await transactionsPage.transactionsListPage.CheckRowData(0, testCards[4]);
    });
});

test('Amex 371449635398431 Payment', async ({ merchantUser, transactionsPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[6]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await transactionsPage.transactionsListPage.CheckRowData(0, testCards[6]);
    });
});

test('Unionpay 6212345678901232 Payment', async ({ merchantUser, transactionsPage, dashboardPage, transactionAddPage }) => 
{
    await test.step('User clicks on "Transactions" tab', async() => 
    {
        await dashboardPage.sidebar.openSidebarTab('Transactions');
    });
    await test.step('User clicks on "Create payment" button', async() => 
    {
        await transactionsPage.transactionsListPage.AddNewTransaction();
    });
    await test.step('User fills up required data for Transaction', async() => 
    {
        await transactionAddPage.createTransaction(testCards[8]);
    });
    await test.step('User checks if transaction appeared on transaction list page', async() => 
    {
        await transactionsPage.transactionsListPage.CheckRowData(0, testCards[8]);
    });
});
