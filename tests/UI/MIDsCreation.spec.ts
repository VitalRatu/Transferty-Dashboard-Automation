import {test} from '../../fixtures/fixtures';
import { SideBarMenuButtons} from '../../page_data/SideBarMenuButtons';
import { MIDsTabs } from '../../page_data/TabNames';
import { aggregatedMIDs, externalMIDs, internalMIDs, secureDeposits } from '../../test_data/MIDsData';

test('Create Internal MID', async ({ adminUser, dashboardPage, MIDsPage, newInternalMidPage }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    });
    await test.step('User opens "Internal MIDs" tab', async() => 
    {
        await MIDsPage.tab.open(MIDsTabs.Internal_MIDs);
    });
    await test.step('User clicks on "Add new" button', async() => 
    {
        await MIDsPage.internalMids.addNewInternalMid();
    });
    await test.step('User fills up required data for Internal MID', async() => 
    {
        await newInternalMidPage.createInternalMID(internalMIDs[0]);
    });
    await test.step('User checks if Internal MID appeared on the list', async() => 
    {
        await MIDsPage.internalMids.verifyRowMatchesData(0, internalMIDs[0]);
    });
});

test('Create Incoming Aggregated MID', async ({ adminUser, dashboardPage, MIDsPage, newAggregatedMidPage }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    });
    await test.step('User opens "Aggregated MIDs" tab', async() => 
    {
        await MIDsPage.tab.open(MIDsTabs.Aggregated_MIDs);
    });
    await test.step('User clicks on "Add new" button', async() => 
    {
        await MIDsPage.aggregatedMids.addNewAggregatedMid();
    });
    await test.step('User fills up required data for Incoming Aggregated MID', async() => 
    {
        await newAggregatedMidPage.createAggregatedMID(aggregatedMIDs[0]);
    });
    await test.step('User checks if Aggregated MID appeared on the list', async() => 
    {
        await MIDsPage.aggregatedMids.verifyRowMatchesData(0, aggregatedMIDs[0]);
    });
});

test('Create Outgoing Aggregated MID', async ({ adminUser, dashboardPage, MIDsPage, newAggregatedMidPage }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    });
    await test.step('User opens "Aggregated MIDs" tab', async() => 
    {
        await MIDsPage.tab.open(MIDsTabs.Aggregated_MIDs);
    });
    await test.step('User clicks on "Add new" button', async() => 
    {
        await MIDsPage.aggregatedMids.addNewAggregatedMid();
    });
    await test.step('User fills up required data for Outgoing Aggregated MID', async() => 
    {
        await newAggregatedMidPage.createAggregatedMID(aggregatedMIDs[1]);
    });
    await test.step('User checks if Aggregated MID appeared on the list', async() => 
    {
        await MIDsPage.aggregatedMids.verifyRowMatchesData(0, aggregatedMIDs[1]);
    });
});

test('Create Secure Deposit Aggregated MID', async ({ adminUser, dashboardPage, MIDsPage, newAggregatedMidPage }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    });
    await test.step('User opens "Aggregated MIDs" tab', async() => 
    {
        await MIDsPage.tab.open(MIDsTabs.Aggregated_MIDs);
    });
    await test.step('User clicks on "Add new" button', async() => 
    {
        await MIDsPage.aggregatedMids.addNewAggregatedMid();
    });
    await test.step('User fills up required data for Secure Deposit Aggregated MID', async() => 
    {
        await newAggregatedMidPage.createAggregatedMID(aggregatedMIDs[2]);
    });
    await test.step('User checks if Aggregated MID appeared on the list', async() => 
    {
        await MIDsPage.aggregatedMids.verifyRowMatchesData(0, aggregatedMIDs[2]);
    });
});

test('Create Secure Deposit', async ({ adminUser, dashboardPage, MIDsPage, newSecureDepositPage}) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    });
    await test.step('User opens "Secure Deposits" tab', async() => 
    {
        await MIDsPage.tab.open(MIDsTabs.Secure_Deposits);
    });
    await test.step('User clicks on "Add Secure Deposit" button', async() => 
    {
        await MIDsPage.secureDeposits.addNewSecureDeposit();
    });
    await test.step('User fills up required data for Secure Deposit', async() => 
    {
        await newSecureDepositPage.createSecureDeposit(secureDeposits[0]);
    });
    await test.step('User checks if Secure Deposit appeared on the list', async() => 
    {
        await MIDsPage.secureDeposits.verifyRowMatchesData(0, secureDeposits[0]);
    });
});

test('Create External MID', async ({ adminUser, dashboardPage, MIDsPage, newExternalMidPage }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    });
    await test.step('User opens "External MIDs" tab', async() => 
    {
        await MIDsPage.tab.open(MIDsTabs.External_MIDs);
    });
    await test.step('User clicks on "Add new" button', async() => 
    {
        await MIDsPage.externalMids.addNewExternalMid();
    });
    await test.step('User fills up required data for External MID', async() => 
    {
        await newExternalMidPage.createExternalMID(externalMIDs[0]);
    });
    await test.step('User checks if External MID appeared on the list', async() => 
    {
        await MIDsPage.externalMids.verifyRowMatchesData(0, externalMIDs[0]);
    });
});