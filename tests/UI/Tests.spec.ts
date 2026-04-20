import {test} from '../../fixtures/fixtures';         
import {TransactionsPageFilters} from '../../test_data/filtersData';
import { EMoneyOperationalWallet, EMoneyMerchantWallets, EMoneyCustomerWallets } from '../../test_data/EMoneyWalletsData';
import {LedgerOperations} from '../../test_data/LedgerOperationsData';
import { EMoneyLimits } from '../../test_data/EMoneyLimitsData';

test('Get Filters', async ({ adminUser, transactionsPage }) =>
{
    await transactionsPage.transactionsListPage.filter.reset();
    await transactionsPage.transactionsListPage.filter.openMoreOptionFilter();
    await transactionsPage.transactionsListPage.filter.getAllAvailableFilterNames();
    await transactionsPage.transactionsListPage.filter.disableFilter(TransactionsPageFilters.TxID);
    await transactionsPage.transactionsListPage.filter.isFilterEnabled(TransactionsPageFilters.TxID);
});

test('Create operational Wallet', async ({ adminUser, dashboardPage, emoneyPage, newOperationalWalletPage }) =>
{
    await dashboardPage.sidebar.openSidebarTab('E-money');
    await emoneyPage.openTab('Wallets')
    await emoneyPage.walletsPage.operationalPage.addNewOperationalWallet()
    await newOperationalWalletPage.createOperationalWallet(EMoneyOperationalWallet[0])
});

test('Create Merchant Wallet', async ({ adminUser, dashboardPage, emoneyPage, newMerchantWalletPage }) =>
{
    await dashboardPage.sidebar.openSidebarTab('E-money');
    await emoneyPage.openTab('Wallets')
    await emoneyPage.walletsPage.openTab('Merchant')
    await emoneyPage.walletsPage.merchantPage.addNewMerchantWallet()
    await newMerchantWalletPage.createMerchantlWallet(EMoneyMerchantWallets[0])
});

test('Create Ledger Issuance', async ({ adminUser, dashboardPage, emoneyPage, ledgerAddOperationPage }) =>
{
    await dashboardPage.sidebar.openSidebarTab('E-money');
    await emoneyPage.openTab('Ledger')
    await emoneyPage.ledgerPage.addNewLedgerOperation()
    await ledgerAddOperationPage.createLedgerOperation(LedgerOperations[0])
    await emoneyPage.ledgerPage.verifyRowMatchesData(0,LedgerOperations[0])
    await emoneyPage.ledgerPage.verifyRowMatchesData(1,LedgerOperations[0])
});

test('Create Limit', async ({ adminUser, dashboardPage, emoneyPage, addLimitPage }) =>
{
    await dashboardPage.page.pause()
    await dashboardPage.sidebar.openSidebarTab('E-money');
    await emoneyPage.openTab('Settings')
    await emoneyPage.settingsPage.addNewLimit();
    await addLimitPage.createNewLimit(EMoneyLimits[0])
    await emoneyPage.settingsPage.verifyRowMatchesData(0, EMoneyLimits[0])
});

test('Check Customer Wallets Details', async ({ adminUser, dashboardPage, emoneyPage, customerWalletDetailsPage }) =>
{
    await dashboardPage.sidebar.openSidebarTab('E-money');
    await emoneyPage.openTab('Wallets')
    await emoneyPage.walletsPage.openTab('Customer')
    await emoneyPage.walletsPage.customerPage.table.clickOnCellValueByUniqueValue('Wallet ID', 'WC-100000000219', 'Wallet ID' )
    await customerWalletDetailsPage.verifyDetails(EMoneyCustomerWallets[0])
    await customerWalletDetailsPage.openProjectDetails()
});

test('Check Limit Details', async ({ adminUser, dashboardPage, emoneyPage, limitDetailsPage }) =>
{
    await dashboardPage.sidebar.openSidebarTab('E-money');
    await emoneyPage.openTab('Settings')
    await emoneyPage.settingsPage.table.clickOnCellValueByUniqueValue('Currency', 'KZT', 'Currency' )
    await limitDetailsPage.verifyDetails(EMoneyLimits[0])
});

test('Edit Fee Object to Permanent EXP date', async ({ adminUser, dashboardPage, emoneyPage, operationalWalletDetailsPage, editFeeObjectPage }) =>
{
    await dashboardPage.sidebar.openSidebarTab('E-money');
    await emoneyPage.openTab('Wallets')
    await emoneyPage.walletsPage.openTab('Operational')
    await emoneyPage.walletsPage.operationalPage.table.clickOnCellValueByUniqueValue('Wallet ID', 'WF-100000000222', 'Wallet ID');
    const feeBefore = await operationalWalletDetailsPage.getFeeData({ uniqueValue: '10' });
    await operationalWalletDetailsPage.clickEditFeeObjectButton('10');
    await editFeeObjectPage.editFeeObject({ expirationDate: 'Permanent' });
    await operationalWalletDetailsPage.verifyFeeInTable({ 
        fee: feeBefore['Fee, %'],
        activation_date: feeBefore['Activation date'],
        timezone: feeBefore['Timezone'],
        expirationDate: 'Permanent' 
    }, { uniqueValue: '10' });
});

test('Edit Fee Object to existing EXP date', async ({ adminUser, dashboardPage, emoneyPage, operationalWalletDetailsPage, editFeeObjectPage }) =>
{
    await dashboardPage.sidebar.openSidebarTab('E-money');
    await emoneyPage.openTab('Wallets')
    await emoneyPage.walletsPage.openTab('Operational')
    await emoneyPage.walletsPage.operationalPage.table.clickOnCellValueByUniqueValue('Wallet ID', 'WF-100000000222', 'Wallet ID');
    const feeBefore = await operationalWalletDetailsPage.getFeeData({ uniqueValue: '10' });
    await operationalWalletDetailsPage.clickEditFeeObjectButton('10');
    await editFeeObjectPage.editFeeObject({ expirationDate: '2026-03-26 14:54:00' });
    await operationalWalletDetailsPage.verifyFeeInTable({expirationDate: '2026-03-26 14:54:00'}, { uniqueValue: '10' });
});

test('Edit Merchant Wallet', async ({ adminUser, dashboardPage, emoneyPage, merchantWalletDetailsPage, editMerchantWalletPage }) =>
{
    await dashboardPage.sidebar.openSidebarTab('E-money');
    await emoneyPage.openTab('Wallets');
    await emoneyPage.walletsPage.openTab('Merchant')
    await emoneyPage.walletsPage.operationalPage.table.clickOnCellValueByUniqueValue('Internal MID', 'MI-1373691975', 'Wallet ID')
    await merchantWalletDetailsPage.clickEditButton()
    await editMerchantWalletPage.editWallet({description: 'Some new desription'})
});

test.only('Edit Limit Details', async ({ adminUser, projectsListPage, reportsPage, dashboardPage}) =>
{
    await projectsListPage.page.pause()
    await projectsListPage.sidebar.openSidebarTab('Reports')
    await reportsPage.openTab('Reconciliation')
    await reportsPage.reconciliationReportPage.openTab('Tx status mismatch')
    await reportsPage.reconciliationReportPage.recTxStatusMismatchReportPage.createNewReport(
    {
        Project: 'automationStuff',
        TimeFrom: '2026-04-01 00:00:00',
        TimeTo: 'MI-2026-04-20 00:00:00',
        TransactionStatus: 'Declined'
    })
    await reportsPage.reconciliationReportPage.recTxStatusMismatchReportPage.downloadReport()
});
