import { Page } from 'playwright';
import { Tab as Tab } from '../related_components/Tab';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';
import { FinancialReportPage } from './FinancialReportPage';
import { TransactionsReportPage } from './TransactionsReportPage';
import { ConversionReportPage } from './ConversionReportPage';
import { ReconciliationReportPage } from './ReconciliationReportPage';
import { MarginReportPage } from './MarginReportPage';
import { Orchestrator } from '../Orchestrator';

export type ReportsTabName = 
    | 'Financial' 
    | 'Transactions' 
    | 'Conversion' 
    | 'Reconciliation' 
    | 'Margin' 

export class ReportsPage extends Orchestrator<ReportsTabName>
{
    public readonly financialReportPage: FinancialReportPage;
    public readonly transactionsReportPage: TransactionsReportPage;
    public readonly conversionReportPage: ConversionReportPage;
    public readonly reconciliationReportPage: ReconciliationReportPage
    public readonly marginReportPage: MarginReportPage;
    
    /**
     * Initializes a new instance of the ReportsPage class
     * Sets the base route to the reports endpoint and instantiates components for tables, filters, and hierarchical tabs
     * @param page - The Playwright Page instance used for browser interactions
     * @param tabDepth - The depth of the tab hierarchy
     */
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth )

        this.financialReportPage = new FinancialReportPage(page , tabDepth + 1);
        this.transactionsReportPage = new TransactionsReportPage(page, tabDepth + 1);
        this.conversionReportPage = new ConversionReportPage(page, tabDepth + 1);
        this.reconciliationReportPage = new ReconciliationReportPage(page, tabDepth + 1);
        this.marginReportPage = new MarginReportPage(page);
    }
}