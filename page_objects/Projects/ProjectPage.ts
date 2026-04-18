import { Page                 } from '@playwright/test'                                       ;
import { Configuration        } from './Tabs/Configuration'                                   ;
import { Team                 } from './Tabs/Team'                                            ;
import { OrdersListPage       } from '../Orders/OrdersListPage'                               ;
import { TransactionsListPage } from '../Transactions/TransactionsPages/TransactionsListPage' ;
import { InvoicesListPage     } from '../Invoices/InvoicesListPage'                           ;
import { BillingPage          } from '../Billing/BillingPage'                                 ;
import { MonitoringPage       } from '../Monitoring/MonitoringPage'                           ;
import { ReportsPage          } from '../Reports/ReportsPage'                                 ;
import { Orchestrator         } from '../Orchestrator'                                        ;

export type ProjectTabName = 
    | 'Configuration' 
    | 'Team' 
    | 'Orders' 
    | 'Transactions' 
    | 'Invoices' 
    | 'Billing' 
    | 'Monitoring' 
    | 'Reports';

export class ProjectPage extends Orchestrator<ProjectTabName>
{
    public readonly configuration: Configuration;
    public readonly teamPage: Team;
    public readonly ordersListPage: OrdersListPage;
    public readonly transactionsListPage: TransactionsListPage
    public readonly invoicesListPage: InvoicesListPage;
    public readonly billingPage: BillingPage
    public readonly monitoringPage: MonitoringPage;
    public readonly reportsPage: ReportsPage;

    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth )
        this.configuration = new Configuration(page, tabDepth + 1);
        this.teamPage = new Team(page, tabDepth + 1);
        this.ordersListPage = new OrdersListPage(page);
        this.transactionsListPage = new TransactionsListPage(page);
        this.invoicesListPage = new InvoicesListPage(page);
        this.billingPage = new BillingPage(page, tabDepth + 1);
        this.monitoringPage = new MonitoringPage(page, tabDepth + 1);
        this.reportsPage = new ReportsPage(page, tabDepth + 1);
    }

    public async openTab(tabName:ProjectTabName)
    {
        await this.tab.open(tabName)
    }
}