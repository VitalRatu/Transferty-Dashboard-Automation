import { Page } from 'playwright';
import { Tab } from '../related_components/Tab';
import { FunnelReportPage } from './Conversion/FunnelReportPage';
import { ChannelsReportPage } from './Conversion/ChannelsReportPage';
import { DynamicsReportPage } from './Conversion/DynamicsReportPage';
import { ConCountriesReportPage } from './Conversion/ConCountriesReportPage';
import { Orchestrator } from '../Orchestrator';

export type ConversionReportTabName = 
    | 'Funnel' 
    | 'Channels' 
    | 'Dynamics' 
    | 'Countries' 


export class ConversionReportPage extends Orchestrator<ConversionReportTabName>
{
    public readonly funnelReportPage: FunnelReportPage;
    public readonly channelsReportPage: ChannelsReportPage
    public readonly dynamicsReportPage: DynamicsReportPage;
    public readonly conCountriesReportPage: ConCountriesReportPage;
    
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth)
        this.funnelReportPage = new FunnelReportPage(page);
        this.channelsReportPage = new ChannelsReportPage(page, tabDepth + 1);
        this.dynamicsReportPage = new DynamicsReportPage(page);
        this.conCountriesReportPage = new ConCountriesReportPage(page);
    }
}