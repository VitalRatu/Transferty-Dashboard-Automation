import { BasePage } from '../BasePage';
import { Page } from '@playwright/test';
import { Routes } from '../../page_data/routes';
import { Tab } from '../related_components/Tab';
import { AuditTrailListPage } from './AuditTrail/AuditTrailListPage';
import { RulesListPage } from './Rules/RulesListPage';
import { EndpointsListPage } from './Endpoints/EndpointsListPage';
import { TriggeredRulesListPage } from './Triggered_Rules/TriggeredRulesListPage';
import { LimitsListPage } from './Limits/LimitsListPage';
import { ConversionListPage } from './Conversion/ConversionListPage';


export class MonitoringPage
{
    public readonly tab: Tab;

    public readonly auditTrailListPage: AuditTrailListPage;
    public readonly rulesListPage: RulesListPage;
    public readonly endpointsListPage: EndpointsListPage;
    public readonly triggeredRulesListPage: TriggeredRulesListPage;
    public readonly limitsListPage: LimitsListPage;
    public readonly conversionListPage: ConversionListPage;
    
    constructor(page: Page, tabDepth: number = 0) 
    {
        this.tab = new Tab(page);

        this.auditTrailListPage = new AuditTrailListPage(page);
        this.rulesListPage = new RulesListPage(page, tabDepth + 1);   
        this.endpointsListPage = new EndpointsListPage(page);
        this.triggeredRulesListPage = new TriggeredRulesListPage(page);
        this.limitsListPage = new LimitsListPage(page);
        this.conversionListPage = new ConversionListPage(page);
    }

}