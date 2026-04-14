import { Page } from 'playwright';
import { Tab } from '../related_components/Tab';
import { FunnelReportPage } from './Conversion/FunnelReportPage';
import { ChannelsReportPage } from './Conversion/ChannelsReportPage';
import { DynamicsReportPage } from './Conversion/DynamicsReportPage';
import { ConCountriesReportPage } from './Conversion/ConCountriesReportPage';

export class ConversionReportPage
{
    public readonly page: Page;

    public readonly tab: Tab;

    public readonly funnelReportPage: FunnelReportPage;
    public readonly channelsReportPage: ChannelsReportPage
    public readonly dynamicsReportPage: DynamicsReportPage;
    public readonly conCountriesReportPage: ConCountriesReportPage;
    
    constructor(page: Page) 
    {
        this.page = page;
    
        this.tab = new Tab(page, 1);

        this.funnelReportPage = new FunnelReportPage(page);
        this.channelsReportPage = new ChannelsReportPage(page);
        this.dynamicsReportPage = new DynamicsReportPage(page);
        this.conCountriesReportPage = new ConCountriesReportPage(page);
    }
}