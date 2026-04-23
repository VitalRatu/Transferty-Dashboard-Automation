import { test } from '../../../../fixtures/fixtures';        

test('SuperAdmin user "Reconciliation -> Transactions" report', async ({ adminUser }) =>
{
    await test.step('User opens Reconciliation -> Transactions report tab', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('Reports');
        await adminUser.reportsPage.openTab('Reconciliation');
        await adminUser.reportsPage.reconciliationReportPage.openTab('Transactions');
    });

    await test.step('User creates and downloads Transaction reports', async() => 
    {
        await adminUser.reportsPage.reconciliationReportPage.recTransactionReportPage.createNewReport(
        {
            Project: 'automationStuff',
            TimeFrom: '2026-04-01 00:00:00',
            TimeTo: 'MI-2026-04-20 00:00:00',
            TransactionStatus: 'Success'
        });
        await adminUser.reportsPage.reconciliationReportPage.recTransactionReportPage.downloadReport();
    });
});

test('SuperAdmin user "Reconciliation -> Tx attempts" report', async ({ adminUser }) =>
{
    await test.step('User opens Reconciliation -> Tx attempts report tab', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('Reports');
        await adminUser.reportsPage.openTab('Reconciliation');
        await adminUser.reportsPage.reconciliationReportPage.openTab('Tx attempts');
    });

    await test.step('User creates and downloads Transaction reports', async() => 
    {
        await adminUser.reportsPage.reconciliationReportPage.recTxAttemptsReportPage.createNewReport(
        {
            Project: 'automationStuff',
            TimeFrom: '2026-04-01 00:00:00',
            TimeTo: 'MI-2026-04-20 00:00:00',
            TransactionStatus: 'Success'
        });
        await adminUser.reportsPage.reconciliationReportPage.recTxAttemptsReportPage.downloadReport();
    });
});

test('SuperAdmin user "Reconciliation -> Tx status mismatch" report', async ({ adminUser }) =>
{
    await test.step('User opens Reconciliation -> Tx status mismatch report tab', async() => 
    {
        await adminUser.projectsListPage.sidebar.openSidebarTab('Reports');
        await adminUser.reportsPage.openTab('Reconciliation');
        await adminUser.reportsPage.reconciliationReportPage.openTab('Tx status mismatch');
    });

    await test.step('User creates and downloads Transaction reports', async() => 
    {
        await adminUser.reportsPage.reconciliationReportPage.recTxStatusMismatchReportPage.createNewReport(
        {
            Project: 'automationStuff',
            TimeFrom: '2026-04-01 00:00:00',
            TimeTo: 'MI-2026-04-20 00:00:00',
            TransactionStatus: 'Success'
        });
        await adminUser.reportsPage.reconciliationReportPage.recTxStatusMismatchReportPage.downloadReport();
    });
});