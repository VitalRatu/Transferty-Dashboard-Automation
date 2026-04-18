import { Page                     } from '@playwright/test'                   ;
import { Tab                      } from '../../related_components/Tab'       ;
import { ProvidersReportPage      } from './Channels/ProvidersReportPage'     ;
import { PSPReportPage            } from './Channels/PSPReportPage'           ;
import { IntermediariesReportPage } from './Channels/IntermediariesReportPage';
import { Orchestrator } from '../../Orchestrator';

export type ChannelsReportTabName = 
    | 'Providers' 
    | 'PSP' 
    | 'Intermediaries' 

export class ChannelsReportPage extends Orchestrator<ChannelsReportTabName>
{
    public readonly providersReportPage: ProvidersReportPage;
    public readonly pspReportPage: PSPReportPage;
    public readonly intermediariesReportPage: IntermediariesReportPage;


    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth)
        this.providersReportPage = new ProvidersReportPage(page);
        this.pspReportPage = new PSPReportPage(page);
        this.intermediariesReportPage = new IntermediariesReportPage(page);
    }
}