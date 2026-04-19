import { Page } from 'playwright';
import { FinCountriesReportPage } from './Financial/FinCountriesReportPage';
import { FinGeneralReportPage } from './Financial/FinGeneralReportPage';
import { FinMethodsReportPage } from './Financial/FinMethodsReportPage';
import { FinProvidersReportPage } from './Financial/FinProvidersReportPage';
import { FinProjectsReportPage } from './Financial/FinProjectsReportPage';
import { Orchestrator } from '../Orchestrator';

export type FinancialReportTabName = 
    | 'General' 
    | 'Methods' 
    | 'Countries' 
    | 'Providers' 
    | 'Projects' 


export class FinancialReportPage extends Orchestrator<FinancialReportTabName>
{
    public readonly finCountriesReportPage: FinCountriesReportPage
    public readonly finGeneralReportPage: FinGeneralReportPage;
    public readonly finMethodsReportPage: FinMethodsReportPage;
    public readonly finProvidersReportPage: FinProvidersReportPage;
    public readonly finProjectsReportPage: FinProjectsReportPage
    
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth)
        this.finCountriesReportPage = new FinCountriesReportPage(page);
        this.finGeneralReportPage = new FinGeneralReportPage(page);
        this.finMethodsReportPage = new FinMethodsReportPage(page);
        this.finProvidersReportPage = new FinProvidersReportPage(page);

        //Only for sidebar. Not available through project details
        this.finProjectsReportPage = new FinProjectsReportPage(page) 
    }
}