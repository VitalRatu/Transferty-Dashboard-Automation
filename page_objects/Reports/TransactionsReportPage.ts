import { Page } from 'playwright';
import { Tab } from '../related_components/Tab';
import { TranGeneralReportPage } from './Transactions/TranGeneralReportPage';
import { TranMethodsReportPage } from './Transactions/TranMethodsReportPage';
import { TranCountriesReportPage } from './Transactions/TranCountriesReportPage';
import { TranDistributionReportPage } from './Transactions/TranDistributionReportPage';
import { Orchestrator } from '../Orchestrator';

export type TransactionsReportTabName = 
    | 'General' 
    | 'Methods' 
    | 'Countries' 
    | 'Distribution' 

export class TransactionsReportPage extends Orchestrator<TransactionsReportTabName>
{
    public readonly tranGeneralReportPage: TranGeneralReportPage;
    public readonly tranMethodsReportPage: TranMethodsReportPage
    public readonly tranCountriesReportPage: TranCountriesReportPage;
    public readonly tranDistributionReportPage: TranDistributionReportPage;
    
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth)
        this.tranGeneralReportPage = new TranGeneralReportPage(page);
        this.tranMethodsReportPage = new TranMethodsReportPage(page);
        this.tranCountriesReportPage = new TranCountriesReportPage(page);
        this.tranDistributionReportPage = new TranDistributionReportPage(page);
    }
}