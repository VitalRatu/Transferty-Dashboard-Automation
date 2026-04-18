import { Page } from '@playwright/test';
import { Tab } from '../related_components/Tab';
import { AuditTrailListPage } from './AuditTrail/AuditTrailListPage';
import { RulesPage } from './Rules/RulesPage';
import { EndpointsListPage } from './Endpoints/EndpointsListPage';
import { TriggeredRulesListPage } from './Triggered_Rules/TriggeredRulesListPage';
import { LimitsListPage } from './Limits/LimitsListPage';
import { ConversionListPage } from './Conversion/ConversionListPage';
import { Orchestrator } from '../Orchestrator';

export type MonitoringTabName =
    | 'Audit trail'
    | 'Rules'
    | 'Endpoints'
    | 'Triggered rules'
    | 'Limits'
    | 'Conversion'


export class MonitoringPage extends Orchestrator<MonitoringTabName>
{
    public readonly auditTrailListPage: AuditTrailListPage;
    public readonly rulesListPage: RulesPage;
    public readonly endpointsListPage: EndpointsListPage;
    public readonly triggeredRulesListPage: TriggeredRulesListPage;
    public readonly limitsListPage: LimitsListPage;
    public readonly conversionListPage: ConversionListPage;
    
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth);
        this.auditTrailListPage = new AuditTrailListPage(page);
        this.rulesListPage = new RulesPage(page, tabDepth + 1);   
        this.endpointsListPage = new EndpointsListPage(page);
        this.triggeredRulesListPage = new TriggeredRulesListPage(page);
        this.limitsListPage = new LimitsListPage(page);
        this.conversionListPage = new ConversionListPage(page);
    }
}