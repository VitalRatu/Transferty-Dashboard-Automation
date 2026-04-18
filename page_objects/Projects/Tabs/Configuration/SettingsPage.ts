import { Page} from '@playwright/test';
import { TxStatusesPage } from './Settings/TxStatusesPage';
import { AssigmentRulesListPage } from './Settings/AssigmentRulesListPage';
import { ReconciliationSettings } from './Settings/ReconciliationSettings';
import { FallbackDomainListPage } from './Settings/FallbackDomainListPage';
import { Orchestrator } from '../../../Orchestrator';

export type SettingsTabName = 
    | 'Tx statuses' 
    | 'Assigment rules' 
    | 'Reconciliation' 
    | 'Fallback domains'

export class SettingsPage extends Orchestrator<SettingsTabName>
{
    public readonly txStatusesPage: TxStatusesPage
    public readonly fallbackDomainsListPage: FallbackDomainListPage
    public readonly assigmentRulesListPage: AssigmentRulesListPage
    public readonly reconciliationSettings: ReconciliationSettings

    constructor(page: Page, tabDepth = 0) 
    {
        super(page, tabDepth)
        this.txStatusesPage = new TxStatusesPage(page)
        this.fallbackDomainsListPage = new FallbackDomainListPage(page)
        this.assigmentRulesListPage = new AssigmentRulesListPage(page)
        this.reconciliationSettings = new ReconciliationSettings(page)
    }
}