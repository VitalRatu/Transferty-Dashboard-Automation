import { BasePage } from '../BasePage'
import { Routes } from '../../page_data/routes'
import { Page } from 'playwright';
import { Tab as Tab } from '../related_components/Tab';
import { FilterBar } from '../related_components/FilterBar';
import { Table } from '../related_components/Table';
import { FinancialReportPage } from './FinancialReportPage';
import { TransactionsReportPage } from './TransactionsReportPage';
import { ConversionReportPage } from './ConversionReportPage';
import { ReconciliationReportPage } from './ReconciliationReportPage';
import { MarginReportPage } from './MarginReportPage';

/**
 * Represents the Reports page of the application
 * Extends the BasePage to provide functionality for generating, filtering, and viewing various financial and operational reports
 * Manages complex navigation through multiple levels of tabs and filtering options
 */
export class ReportsPage extends BasePage 
{
    /** The Table component used to display report data and generated records */
    public readonly table: Table;
    
    /** The FilterBar component used to apply specific date ranges and criteria for report generation */
    public readonly filters: FilterBar;
    
    /** The primary Tab component used for top-level navigation within the Reports section */
    public readonly tab: Tab;

    public readonly financialReportPage: FinancialReportPage;
    public readonly transactionsReportPage: TransactionsReportPage;
    public readonly conversionReportPage: ConversionReportPage;
    public readonly reconciliationReportPage: ReconciliationReportPage
    public readonly marginReportPage: MarginReportPage;
    
    /**
     * Initializes a new instance of the ReportsPage class
     * Sets the base route to the reports endpoint and instantiates components for tables, filters, and hierarchical tabs
     * @param page - The Playwright Page instance used for browser interactions
     */
    constructor(page: Page) 
    {
        super(page, Routes.REPORTS);
        
        this.table = new Table(page);   
        this.filters = new FilterBar(page);
        this.tab = new Tab(page, 0);

        this.financialReportPage = new FinancialReportPage(page);
        this.transactionsReportPage = new TransactionsReportPage(page);
        this.conversionReportPage = new ConversionReportPage(page);
        this.reconciliationReportPage = new ReconciliationReportPage(page);
        this.marginReportPage = new MarginReportPage(page);
    }
}