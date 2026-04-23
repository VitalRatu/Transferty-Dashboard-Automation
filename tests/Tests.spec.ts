import { test } from '../fixtures/fixtures';         
import { TransactionsPageFilters } from '../test_data/filtersData';
import { EMoneyOperationalWallet, EMoneyMerchantWallets, EMoneyCustomerWallets } from '../test_data/EMoneyWalletsData';
import { LedgerOperations } from '../test_data/LedgerOperationsData';
import { EMoneyLimits } from '../test_data/EMoneyLimitsData';

test('Get Filters', async ({ adminUser }) =>
{
    await adminUser.transactionsPage.transactionsListPage.filter.reset();
    await adminUser.transactionsPage.transactionsListPage.filter.openMoreOptionFilter();
    await adminUser.transactionsPage.transactionsListPage.filter.getAllAvailableFilterNames();
    await adminUser.transactionsPage.transactionsListPage.filter.disableFilter(TransactionsPageFilters.TxID);
    await adminUser.transactionsPage.transactionsListPage.filter.isFilterEnabled(TransactionsPageFilters.TxID);
});

test('Create operational Wallet', async ({ adminUser }) =>
{
    await adminUser.dashboardPage.sidebar.openSidebarTab('E-money');
    await adminUser.emoneyPage.openTab('Wallets');
    await adminUser.emoneyPage.walletsPage.operationalPage.addNewOperationalWallet();
    await adminUser.newOperationalWalletPage.createOperationalWallet(EMoneyOperationalWallet[0]);
});

test('Create Merchant Wallet', async ({ adminUser }) =>
{
    await adminUser.dashboardPage.sidebar.openSidebarTab('E-money');
    await adminUser.emoneyPage.openTab('Wallets');
    await adminUser.emoneyPage.walletsPage.openTab('Merchant');
    await adminUser.emoneyPage.walletsPage.merchantPage.addNewMerchantWallet();
    await adminUser.newMerchantWalletPage.createMerchantlWallet(EMoneyMerchantWallets[0]);
});

test('Create Ledger Issuance', async ({ adminUser }) =>
{
    await adminUser.dashboardPage.sidebar.openSidebarTab('E-money');
    await adminUser.emoneyPage.openTab('Ledger');
    await adminUser.emoneyPage.ledgerPage.addNewLedgerOperation();
    await adminUser.ledgerAddOperationPage.createLedgerOperation(LedgerOperations[0]);
    await adminUser.emoneyPage.ledgerPage.verifyRowMatchesData(0, LedgerOperations[0]);
    await adminUser.emoneyPage.ledgerPage.verifyRowMatchesData(1, LedgerOperations[0]);
});

test('Create Limit', async ({ adminUser }) =>
{
    await adminUser.dashboardPage.page.pause();
    await adminUser.dashboardPage.sidebar.openSidebarTab('E-money');
    await adminUser.emoneyPage.openTab('Settings');
    await adminUser.emoneyPage.settingsPage.addNewLimit();
    await adminUser.addLimitPage.createNewLimit(EMoneyLimits[0]);
    await adminUser.emoneyPage.settingsPage.verifyRowMatchesData(0, EMoneyLimits[0]);
});

test('Check Customer Wallets Details', async ({ adminUser }) =>
{
    await adminUser.dashboardPage.sidebar.openSidebarTab('E-money');
    await adminUser.emoneyPage.openTab('Wallets');
    await adminUser.emoneyPage.walletsPage.openTab('Customer');
    await adminUser.emoneyPage.walletsPage.customerPage.table.clickOnCellValueByUniqueValue('Wallet ID', 'WC-100000000219', 'Wallet ID');
    await adminUser.customerWalletDetailsPage.verifyDetails(EMoneyCustomerWallets[0]);
    await adminUser.customerWalletDetailsPage.openProjectDetails();
});

test('Check Limit Details', async ({ adminUser }) =>
{
    await adminUser.dashboardPage.sidebar.openSidebarTab('E-money');
    await adminUser.emoneyPage.openTab('Settings');
    await adminUser.emoneyPage.settingsPage.table.clickOnCellValueByUniqueValue('Currency', 'KZT', 'Currency');
    await adminUser.limitDetailsPage.verifyDetails(EMoneyLimits[0]);
});

test('Edit Fee Object to Permanent EXP date', async ({ adminUser }) =>
{
    await adminUser.dashboardPage.sidebar.openSidebarTab('E-money');
    await adminUser.emoneyPage.openTab('Wallets');
    await adminUser.emoneyPage.walletsPage.openTab('Operational');
    await adminUser.emoneyPage.walletsPage.operationalPage.table.clickOnCellValueByUniqueValue('Wallet ID', 'WF-100000000222', 'Wallet ID');
    const feeBefore = await adminUser.operationalWalletDetailsPage.getFeeData({ uniqueValue: '10' });
    
    await adminUser.operationalWalletDetailsPage.clickEditFeeObjectButton('10');
    await adminUser.editFeeObjectPage.editFeeObject({ expirationDate: 'Permanent' });
    await adminUser.operationalWalletDetailsPage.verifyFeeInTable({ 
        fee: feeBefore['Fee, %'],
        activation_date: feeBefore['Activation date'],
        timezone: feeBefore['Timezone'],
        expirationDate: 'Permanent' 
    }, { uniqueValue: '10' });
});

test('Edit Fee Object to existing EXP date', async ({ adminUser }) =>
{
    await adminUser.dashboardPage.sidebar.openSidebarTab('E-money');
    await adminUser.emoneyPage.openTab('Wallets');
    await adminUser.emoneyPage.walletsPage.openTab('Operational');
    await adminUser.emoneyPage.walletsPage.operationalPage.table.clickOnCellValueByUniqueValue('Wallet ID', 'WF-100000000222', 'Wallet ID');
    const feeBefore = await adminUser.operationalWalletDetailsPage.getFeeData({ uniqueValue: '10' });
    
    await adminUser.operationalWalletDetailsPage.clickEditFeeObjectButton('10');
    await adminUser.editFeeObjectPage.editFeeObject({ expirationDate: '2026-03-26 14:54:00' });
    await adminUser.operationalWalletDetailsPage.verifyFeeInTable({expirationDate: '2026-03-26 14:54:00'}, { uniqueValue: '10' });
});

test('Edit Merchant Wallet', async ({ adminUser }) =>
{
    await adminUser.dashboardPage.sidebar.openSidebarTab('E-money');
    await adminUser.emoneyPage.openTab('Wallets');
    await adminUser.emoneyPage.walletsPage.openTab('Merchant');
    await adminUser.emoneyPage.walletsPage.operationalPage.table.clickOnCellValueByUniqueValue('Internal MID', 'MI-1373691975', 'Wallet ID');
    await adminUser.merchantWalletDetailsPage.clickEditButton();
    await adminUser.editMerchantWalletPage.editWallet({description: 'Some new desription'});
});

test.only('Edit Limit Details', async ({ adminUser }) =>
{
    await adminUser.projectsListPage.page.pause();
});