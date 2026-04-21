import {test} from '../../../../fixtures/fixtures'        

test('SuperAdmin user "Reconciliation -> Transactions" report', async ({ adminUser, projectsListPage, reportsPage}) =>
{
    await test.step('User opens Reconciliation -> Transactions report tab', async() => 
    {
        await projectsListPage.sidebar.openSidebarTab('Reports')
        await reportsPage.openTab('Reconciliation')
        await reportsPage.reconciliationReportPage.openTab('Transactions')
    });

    await test.step('User creates and downloads Transaction reports', async() => 
    {
        await reportsPage.reconciliationReportPage.recTransactionReportPage.createNewReport(
        {
            Project: 'automationStuff',
            TimeFrom: '2026-04-01 00:00:00',
            TimeTo: 'MI-2026-04-20 00:00:00',
            TransactionStatus: 'Success'
        })
        await reportsPage.reconciliationReportPage.recTransactionReportPage.downloadReport()
    });
});

test('SuperAdmin user "Reconciliation -> Tx attempts" report', async ({ adminUser, projectsListPage, reportsPage}) =>
{
    await test.step('User opens Reconciliation -> Transactions report tab', async() => 
    {
        await projectsListPage.sidebar.openSidebarTab('Reports')
        await reportsPage.openTab('Reconciliation')
        await reportsPage.reconciliationReportPage.openTab('Tx attempts')
    });

    await test.step('User creates and downloads Transaction reports', async() => 
    {
        await reportsPage.reconciliationReportPage.recTxAttemptsReportPage.createNewReport(
        {
            Project: 'automationStuff',
            TimeFrom: '2026-04-01 00:00:00',
            TimeTo: 'MI-2026-04-20 00:00:00',
            TransactionStatus: 'Success'
        })
        await reportsPage.reconciliationReportPage.recTxAttemptsReportPage.downloadReport()
    });
});

test('SuperAdmin user "Reconciliation -> Tx status mismatch" report', async ({ adminUser, projectsListPage, reportsPage}) =>
{
    await test.step('User opens Reconciliation -> Transactions report tab', async() => 
    {
        await projectsListPage.sidebar.openSidebarTab('Reports')
        await reportsPage.openTab('Reconciliation')
        await reportsPage.reconciliationReportPage.openTab('Tx status mismatch')
    });

    await test.step('User creates and downloads Transaction reports', async() => 
    {
        await reportsPage.reconciliationReportPage.recTxStatusMismatchReportPage.createNewReport(
        {
            Project: 'automationStuff',
            TimeFrom: '2026-04-01 00:00:00',
            TimeTo: 'MI-2026-04-20 00:00:00',
            TransactionStatus: 'Success'
        })
        await reportsPage.reconciliationReportPage.recTxStatusMismatchReportPage.downloadReport()
    });
});
