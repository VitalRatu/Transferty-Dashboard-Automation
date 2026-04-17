import { Page } from 'playwright';
import { Tab } from '../related_components/Tab';
import { FinCountriesReportPage } from './Financial/FinCountriesReportPage';
import { FinGeneralReportPage } from './Financial/FinGeneralReportPage';
import { FinMethodsReportPage } from './Financial/FinMethodsReportPage';
import { ProjectsReportPage } from './Financial/ProjectsReportPage';
import { FinProvidersReportPage } from './Financial/FinProvidersReportPage';

export class FinancialReportPage
{
    public readonly page: Page;

    public readonly tab: Tab;

    public readonly finCountriesReportPage: FinCountriesReportPage
    public readonly finGeneralReportPage: FinGeneralReportPage;
    public readonly finMethodsReportPage: FinMethodsReportPage;
    public readonly finProvidersReportPage: FinProvidersReportPage;
    public readonly projectsReportPage: ProjectsReportPage;
    
    constructor(page: Page, tabDepth: number = 0) 
    {
        this.page = page;
        this.tab = new Tab(page, tabDepth);

        this.finCountriesReportPage = new FinCountriesReportPage(page);
        this.finGeneralReportPage = new FinGeneralReportPage(page);
        this.finMethodsReportPage = new FinMethodsReportPage(page);
        this.finProvidersReportPage = new FinProvidersReportPage(page);
        this.projectsReportPage = new ProjectsReportPage(page);
    }
}