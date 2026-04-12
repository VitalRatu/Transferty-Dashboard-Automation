import {expect, test, } from '../../fixtures/fixtures';         
import {pomTest} from '../../fixtures/pomFixtures' 
import {SideBarMenuButtons} from '../../page_data/SideBarMenuButtons';
import {TransactionsPageFilters} from '../../test_data/filtersData';
import {BillingAdjustmentsSubTabs, BillingBalancesSubTabs, BillingTabs, EMoneyTabs, EMoneyWalletsTabs, MIDsTabs } from '../../page_data/TabNames';
import { EMoneyOperationalWallet, EMoneyMerchantWallets, EMoneyCustomerWallets } from '../../test_data/EMoneyWalletsData';
import {LedgerOperations} from '../../test_data/LedgerOperationsData';
import { EMoneyLimits } from '../../test_data/EMoneyLimitsData';

test('Get Filtesrs', async ({ adminUser, transactionsMainPage }) =>
{
    await transactionsMainPage.transactionsPage.filter.reset();
    await transactionsMainPage.transactionsPage.filter.openMoreOptionFilter();
    await transactionsMainPage.transactionsPage.filter.getAllAvailableFilterNames();
    await transactionsMainPage.transactionsPage.filter.disableFilter(TransactionsPageFilters.TxID);
    await transactionsMainPage.transactionsPage.filter.isFilterEnabled(TransactionsPageFilters.TxID);
});

test('Create operational Wallet', async ({ adminUser, dashboardPage, emoneyPage, newOperationalWalletPage }) =>
{
    await emoneyPage.page.pause();
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Wallets);
    await emoneyPage.walletsPage.operationalPage.addNewOperationalWallet()
    await newOperationalWalletPage.createOperationalWallet(EMoneyOperationalWallet[0])
});

test('Create Merchant Wallet', async ({ adminUser, dashboardPage, emoneyPage, newMerchantWalletPage }) =>
{
    await emoneyPage.page.pause();
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Wallets);
    await emoneyPage.walletsPage.tab.open(EMoneyWalletsTabs.Merchant)
    await emoneyPage.walletsPage.merchantPage.addNewMerchantWallet()
    await newMerchantWalletPage.createMerchantlWallet(EMoneyMerchantWallets[0])
});

test('Create Ledger Issuance', async ({ adminUser, dashboardPage, emoneyPage, ledgerAddOperationPage }) =>
{
    await emoneyPage.page.pause();
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Ledger);
    await emoneyPage.ledgerPage.addNewLedgerOperation()
    await ledgerAddOperationPage.createLedgerOperation(LedgerOperations[0])
    await emoneyPage.ledgerPage.verifyRowMatchesData(0,LedgerOperations[0])
    await emoneyPage.ledgerPage.verifyRowMatchesData(1,LedgerOperations[0])
});

test('Create Limit', async ({ adminUser, dashboardPage, emoneyPage, addLimitPage }) =>
{
    await dashboardPage.page.pause()
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Settings);
    await emoneyPage.settingsPage.addNewLimit();
    await addLimitPage.createNewLimit(EMoneyLimits[0])
    await emoneyPage.settingsPage.verifyRowMatchesData(0, EMoneyLimits[0])
});

test('Check Customer Wallets Details', async ({ adminUser, dashboardPage, emoneyPage, customerWalletDetailsPage }) =>
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Wallets);
    await emoneyPage.walletsPage.tab.open(EMoneyWalletsTabs.Customer)
    await emoneyPage.walletsPage.customerPage.table.clickOnCellValueByUniqueValue('Wallet ID', 'WC-100000000219', 'Wallet ID' )
    await customerWalletDetailsPage.verifyDetails(EMoneyCustomerWallets[0])
    await customerWalletDetailsPage.openProjectDetails()
});

test('Check Limit Details', async ({ adminUser, dashboardPage, emoneyPage, limitDetailsPage }) =>
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Settings);
    await emoneyPage.settingsPage.table.clickOnCellValueByUniqueValue('Currency', 'KZT', 'Currency' )
    await limitDetailsPage.verifyDetails(EMoneyLimits[0])
});

test('Edit Fee Object to Permanent EXP date', async ({ adminUser, dashboardPage, emoneyPage, operationalWalletDetailsPage, editFeeObjectPage }) =>
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Wallets);
    await emoneyPage.walletsPage.tab.open(EMoneyWalletsTabs.Operational);
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
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Wallets);
    await emoneyPage.walletsPage.tab.open(EMoneyWalletsTabs.Operational);
    await emoneyPage.walletsPage.operationalPage.table.clickOnCellValueByUniqueValue('Wallet ID', 'WF-100000000222', 'Wallet ID');
    const feeBefore = await operationalWalletDetailsPage.getFeeData({ uniqueValue: '10' });
    await operationalWalletDetailsPage.clickEditFeeObjectButton('10');
    await editFeeObjectPage.editFeeObject({ expirationDate: '2026-03-26 14:54:00' });
    await operationalWalletDetailsPage.verifyFeeInTable({expirationDate: '2026-03-26 14:54:00'}, { uniqueValue: '10' });
});

test('Edit Merchant Wallet', async ({ adminUser, dashboardPage, emoneyPage, merchantWalletDetailsPage, editMerchantWalletPage }) =>
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Wallets);
    await emoneyPage.walletsPage.tab.open(EMoneyWalletsTabs.Merchant)
    await emoneyPage.walletsPage.operationalPage.table.clickOnCellValueByUniqueValue('Internal MID', 'MI-1373691975', 'Wallet ID')
    await merchantWalletDetailsPage.clickEditButton()
    await editMerchantWalletPage.editWallet({description: 'Some new desription'})
});

test('Edit Limit Details', async ({ adminUser, dashboardPage, emoneyPage, limitDetailsPage, editLimitPage }) =>
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.E_MONEY);
    await emoneyPage.tab.open(EMoneyTabs.Settings);
    await emoneyPage.settingsPage.table.clickOnCellValueByUniqueValue('Currency', 'KZT', 'Currency' )
    await limitDetailsPage.verifyDetails(EMoneyLimits[0])
    await limitDetailsPage.editLimit()
    await editLimitPage.editLimit({currency: 'USD'})
});

test.only('Get all roles details', async ({ adminUser, dashboardPage, editRolePage }) =>
{
    await dashboardPage.goTo('https://dashboard.dev.transferty.com/users/list/roles/fcba3b69b5e3ef6ae9c200de3fe2ae9c/edit');
});