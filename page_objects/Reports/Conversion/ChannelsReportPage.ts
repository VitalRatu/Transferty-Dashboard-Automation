import { Page                     } from '@playwright/test'                   ;
import { Tab                      } from '../../related_components/Tab'       ;
import { ProvidersReportPage      } from './Channels/ProvidersReportPage'     ;
import { PSPReportPage            } from './Channels/PSPReportPage'           ;
import { IntermediariesReportPage } from './Channels/IntermediariesReportPage';

export class ChannelsReportPage
{
    public readonly page: Page;
    
    public readonly tab: Tab;

    public readonly providersReportPage: ProvidersReportPage;
    public readonly pspReportPage: PSPReportPage;
    public readonly intermediariesReportPage: IntermediariesReportPage;


    constructor(page: Page) 
    {
        this.page = page;
        this.tab = new Tab(page, 2);

        this.providersReportPage = new ProvidersReportPage(page);
        this.pspReportPage = new PSPReportPage(page);
        this.intermediariesReportPage = new IntermediariesReportPage(page);
    }
}