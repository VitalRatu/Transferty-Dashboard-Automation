import { test } from '../../../../fixtures/fixtures';        

test('Merchant user "Reconciliation -> Transactions" report', async ({ merchantUser }) =>
{
    await test.step('User opens Reconciliation -> Transactions report tab', async() => 
    {
        await merchantUser.dashboardPage.sidebar.openSidebarTab('Reports');
        await merchantUser.reportsPage.openTab('Reconciliation');
        await merchantUser.reportsPage.reconciliationReportPage.openTab('Transactions');
    });

    await test.step('User creates and downloads Transaction reports', async() => 
    {
        await merchantUser.reportsPage.reconciliationReportPage.recTransactionReportPage.createNewReport(
        {
            TimeFrom: '2026-04-01 00:00:00',
            TimeTo: 'MI-2026-04-20 00:00:00',
            TransactionStatus: 'Success'
        });
        await merchantUser.reportsPage.reconciliationReportPage.recTransactionReportPage.downloadReport();
    });
});

test('Merchant user "Reconciliation -> Tx attempts" report', async ({ merchantUser }) =>
{
    await test.step('User opens Reconciliation -> Tx attempts report tab', async() => 
    {
        await merchantUser.dashboardPage.sidebar.openSidebarTab('Reports');
        await merchantUser.reportsPage.openTab('Reconciliation');
        await merchantUser.reportsPage.reconciliationReportPage.openTab('Tx attempts');
    });

    await test.step('User creates and downloads Transaction reports', async() => 
    {
        await merchantUser.reportsPage.reconciliationReportPage.recTxAttemptsReportPage.createNewReport(
        {
            TimeFrom: '2026-04-01 00:00:00',
            TimeTo: 'MI-2026-04-20 00:00:00',
            TransactionStatus: 'Success'
        });
        await merchantUser.reportsPage.reconciliationReportPage.recTxAttemptsReportPage.downloadReport();
    });
});

test('Merchant user "Reconciliation -> Tx status mismatch" report', async ({ merchantUser }) =>
{
    await test.step('User opens Reconciliation -> Tx status mismatch report tab', async() => 
    {
        await merchantUser.dashboardPage.sidebar.openSidebarTab('Reports');
        await merchantUser.reportsPage.openTab('Reconciliation');
        await merchantUser.reportsPage.reconciliationReportPage.openTab('Tx status mismatch');
    });

    await test.step('User creates and downloads Transaction reports', async() => 
    {
        await merchantUser.reportsPage.reconciliationReportPage.recTxStatusMismatchReportPage.createNewReport(
        {
            TimeFrom: '2026-04-01 00:00:00',
            TimeTo: 'MI-2026-04-20 00:00:00',
            TransactionStatus: 'Success'
        });
        await merchantUser.reportsPage.reconciliationReportPage.recTxStatusMismatchReportPage.downloadReport();
    });
});