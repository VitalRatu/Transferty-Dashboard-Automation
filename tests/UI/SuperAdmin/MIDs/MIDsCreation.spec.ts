import { expect, test } from '../../../../fixtures/fixtures';
import { aggregatedMIDs, externalMIDs, internalMIDs, secureDeposits } from '../../../../test_data/MIDsData';

test('Create Internal MID', async ({ adminUser }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('MIDs');
    });

    await test.step('User opens "Internal MIDs" tab', async() => 
    {
        await adminUser.MIDsPage.openTab('Internal MIDs');
    });

    await test.step('User clicks on "Add new" button', async() => 
    {
        await adminUser.MIDsPage.internalMids.addNewInternalMid();
    });

    await test.step('User fills up required data for Internal MID', async() => 
    {
        await adminUser.newInternalMidPage.createInternalMID(internalMIDs[0]);
    });

    await test.step('User checks if Internal MID appeared on the list', async() => 
    {
        await adminUser.MIDsPage.internalMids.verifyRowMatchesData(0, internalMIDs[0]);
    });
});

test('Create Incoming Aggregated MID', async ({ adminUser }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('MIDs');
    });

    await test.step('User opens "Aggregated MIDs" tab', async() => 
    {
        await adminUser.MIDsPage.openTab('Aggregated MIDs');
    });

    await test.step('User clicks on "Add new" button', async() => 
    {
        await adminUser.MIDsPage.aggregatedMids.addNewAggregatedMid();
    });

    await test.step('User fills up required data for Incoming Aggregated MID', async() => 
    {
        await adminUser.newAggregatedMidPage.createAggregatedMID(aggregatedMIDs[0]);
    });

    await test.step('User checks if Aggregated MID appeared on the list', async() => 
    {
        await adminUser.MIDsPage.aggregatedMids.verifyRowMatchesData(0, aggregatedMIDs[0]);
    });

    await test.step('User deletes the Aggregated MID', async() => 
    {
        await adminUser.MIDsPage.aggregatedMids.openAggregatedMidDetails({description: aggregatedMIDs[0].description});
        await adminUser.aggregatedMidDetailsPage.clickDeleteButton();
    });

    await test.step('User checks if Aggregated MID was deleted', async() => 
    {
        const tempConst = await adminUser.MIDsPage.aggregatedMids.table.getAllValuesFromRowByIndex(0);
        expect(tempConst['Description']).not.toBe(aggregatedMIDs[0].description);  
    });
});

test('Create Outgoing Aggregated MID', async ({ adminUser }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('MIDs');
    });

    await test.step('User opens "Aggregated MIDs" tab', async() => 
    {
        await adminUser.MIDsPage.openTab('Aggregated MIDs');
    });

    await test.step('User clicks on "Add new" button', async() => 
    {
        await adminUser.MIDsPage.aggregatedMids.addNewAggregatedMid();
    });

    await test.step('User fills up required data for Outgoing Aggregated MID', async() => 
    {
        await adminUser.newAggregatedMidPage.createAggregatedMID(aggregatedMIDs[1]);
    });

    await test.step('User checks if Aggregated MID appeared on the list', async() => 
    {
        await adminUser.MIDsPage.aggregatedMids.verifyRowMatchesData(0, aggregatedMIDs[1]);
    });

    await test.step('User deletes the Aggregated MID', async() => 
    {
        await adminUser.MIDsPage.aggregatedMids.openAggregatedMidDetails({description: aggregatedMIDs[1].description});
        await adminUser.aggregatedMidDetailsPage.clickDeleteButton();
    });
    
    await test.step('User checks if Aggregated MID was deleted', async() => 
    {
        const tempConst = await adminUser.MIDsPage.aggregatedMids.table.getAllValuesFromRowByIndex(0);
        expect(tempConst['Description']).not.toBe(aggregatedMIDs[1].description);  
    });
});

test('Create Secure Deposit Aggregated MID', async ({ adminUser }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('MIDs');
    });

    await test.step('User opens "Aggregated MIDs" tab', async() => 
    {
        await adminUser.MIDsPage.openTab('Aggregated MIDs');
    });

    await test.step('User clicks on "Add new" button', async() => 
    {
        await adminUser.MIDsPage.aggregatedMids.addNewAggregatedMid();
    });

    await test.step('User fills up required data for Secure Deposit Aggregated MID', async() => 
    {
        await adminUser.newAggregatedMidPage.createAggregatedMID(aggregatedMIDs[2]);
    });

    await test.step('User checks if Aggregated MID appeared on the list', async() => 
    {
        await adminUser.MIDsPage.aggregatedMids.verifyRowMatchesData(0, aggregatedMIDs[2]);
    });

    await test.step('User deletes the Aggregated MID', async() => 
    {
        await adminUser.MIDsPage.aggregatedMids.openAggregatedMidDetails({description: aggregatedMIDs[2].description});
        await adminUser.aggregatedMidDetailsPage.clickDeleteButton();
    });
    
    await test.step('User checks if Aggregated MID was deleted', async() => 
    {
        const tempConst = await adminUser.MIDsPage.aggregatedMids.table.getAllValuesFromRowByIndex(0);
        expect(tempConst['Description']).not.toBe(aggregatedMIDs[2].description);  
    });  
});

test('Create Secure Deposit', async ({ adminUser }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('MIDs');
    });

    await test.step('User opens "Secure Deposits" tab', async() => 
    {
        await adminUser.MIDsPage.openTab('Secure Deposits');
    });

    await test.step('User clicks on "Add Secure Deposit" button', async() => 
    {
        await adminUser.MIDsPage.secureDeposits.addNewSecureDeposit();
    });

    await test.step('User fills up required data for Secure Deposit', async() => 
    {
        await adminUser.newSecureDepositPage.createSecureDeposit(secureDeposits[0]);
    });

    await test.step('User checks if Secure Deposit appeared on the list', async() => 
    {
        await adminUser.MIDsPage.secureDeposits.verifyRowMatchesData(0, secureDeposits[0]);
    });
});

test('Create External MID', async ({ adminUser }) => 
{
    await test.step('User clicks on "MIDs" tab', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('MIDs');
    });

    await test.step('User opens "External MIDs" tab', async() => 
    {
        await adminUser.MIDsPage.openTab('External MIDs');
    });

    await test.step('User clicks on "Add new" button', async() => 
    {
        await adminUser.MIDsPage.externalMids.addNewExternalMid();
    });

    await test.step('User fills up required data for External MID', async() => 
    {
        await adminUser.newExternalMidPage.createExternalMID(externalMIDs[0]);
    });
    
    await test.step('User checks if External MID appeared on the list', async() => 
    {
        await adminUser.MIDsPage.externalMids.verifyRowMatchesData(0, externalMIDs[0]);
    });
});