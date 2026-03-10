import {test} from '../../fixtures/fixtures';
import {SideBarMenuButtons} from '../../page_data/SideBarMenuButtons';
import {testCards} from '../../test_data/testCards';

test('Visa 4012888888881881 Payment', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    await transactionsMainPage.transactionsPage.AddNewTransaction();
    await transactionAddPage.createTransaction(testCards[0]);
    await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[0]);
});

test('MasterCard 5413330300003002 Payment', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    await transactionsMainPage.transactionsPage.AddNewTransaction();
    await transactionAddPage.createTransaction(testCards[2]);
    await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[2]);
});

test('MasterCard 5555555555554444 Payment', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    await transactionsMainPage.transactionsPage.AddNewTransaction();
    await transactionAddPage.createTransaction(testCards[4]);
    await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[4]);
});

test('Amex 371449635398431 Payment', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    await transactionsMainPage.transactionsPage.AddNewTransaction();
    await transactionAddPage.createTransaction(testCards[6]);
    await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[6]);
});

test('Unionpay 6212345678901232 Payment', async ({ merchantUser, transactionsMainPage, dashboardPage, transactionAddPage }) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.TRANSACTIONS);
    await transactionsMainPage.transactionsPage.AddNewTransaction();
    await transactionAddPage.createTransaction(testCards[8]);
    await transactionsMainPage.transactionsPage.CheckRowData(0, testCards[8]);
});
