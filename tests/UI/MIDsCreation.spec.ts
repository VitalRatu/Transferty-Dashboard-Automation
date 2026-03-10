import {test} from '../../fixtures/fixtures';
import { SideBarMenuButtons} from '../../page_data/SideBarMenuButtons';
import { MIDsTabs } from '../../page_data/TabNames';
import { aggregatedMIDsData, externalMIDsData, internalMIDsData, secureDepositsData } from '../../test_data/MIDsData';

test('Create Internal MID', async ({ adminUser, dashboardPage, MIDsPage, newInternalMidPage }) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    await MIDsPage.tab.open(MIDsTabs.Internal_MIDs);
    await MIDsPage.internalMids.addNewInternalMid();
    await newInternalMidPage.createInternalMID(internalMIDsData[0]);
    await MIDsPage.internalMids.verifyRowMatchesData(0, internalMIDsData[0]);
});

test('Create Incoming Aggregated MID', async ({ adminUser, dashboardPage, MIDsPage, newAggregatedMidPage }) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    await MIDsPage.tab.open(MIDsTabs.Aggregated_MIDs);
    await MIDsPage.aggregatedMids.addNewAggregatedMid();
    await newAggregatedMidPage.createAggregatedMID(aggregatedMIDsData[0]);
    await MIDsPage.aggregatedMids.verifyRowMatchesData(0, aggregatedMIDsData[0]);
});

test('Create Outgoing Aggregated MID', async ({ adminUser, dashboardPage, MIDsPage, newAggregatedMidPage }) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    await MIDsPage.tab.open(MIDsTabs.Aggregated_MIDs);
    await MIDsPage.aggregatedMids.addNewAggregatedMid();
    await newAggregatedMidPage.createAggregatedMID(aggregatedMIDsData[1]);
    await MIDsPage.aggregatedMids.verifyRowMatchesData(0, aggregatedMIDsData[1]);
});

test('Create Secure Deposit Aggregated MID', async ({ adminUser, dashboardPage, MIDsPage, newAggregatedMidPage }) => 
{
    await dashboardPage.page.pause();
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    await MIDsPage.tab.open(MIDsTabs.Aggregated_MIDs);
    await MIDsPage.aggregatedMids.addNewAggregatedMid();
    await newAggregatedMidPage.createAggregatedMID(aggregatedMIDsData[2]);
    await MIDsPage.aggregatedMids.verifyRowMatchesData(0, aggregatedMIDsData[2]);
});

test('Create Secure Deposit', async ({ adminUser, dashboardPage, MIDsPage, newSecureDepositPage}) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    await MIDsPage.tab.open(MIDsTabs.Secure_Deposits);
    await MIDsPage.secureDeposits.addNewSecureDeposit();
    await newSecureDepositPage.createSecureDeposit(secureDepositsData[0]);
    await MIDsPage.secureDeposits.verifyRowMatchesData(0, secureDepositsData[0]);
});

test('Create External MID', async ({ adminUser, dashboardPage, MIDsPage, newExternalMidPage }) => 
{
    await dashboardPage.sidebar.clickButton(SideBarMenuButtons.MIDS);
    await MIDsPage.tab.open(MIDsTabs.External_MIDs);
    await MIDsPage.externalMids.addNewExternalMid();
    await newExternalMidPage.createExternalMID(externalMIDsData[0]);
    await MIDsPage.externalMids.verifyRowMatchesData(0, externalMIDsData[0]);
});