import { Page                   } from '@playwright/test'                      ;
import { ProjectDetailsPage     } from '../Tabs/Configuration/Project/ProjectDetailsPage'  ;
import { MIDsPage               } from '../../MIDs/MIDsPage'                   ;
import { CurrenciesListPage     } from './Configuration/CurrenciesListPage'    ;
import { FxSpreadListPage       } from './Configuration/FxSpread/FxSpreadListPage'      ;
import { APIKeysListPage        } from '../../Developers/APIKeys/APIKeysListPage'       ;
import { RoutingRulesListPage   } from './Configuration/RoutingRulesListPage'  ;
import { AntifraudRulesListPage } from './Configuration/AntiFraudRulesListPage';
import { CheckoutPage           } from './Configuration/CheckoutPage'          ;
import { ReceiptPage            } from './Configuration/ReceiptPage'           ;
import { ChangelogListPage      } from './Configuration/ChangelogListPage'     ;
import { SettingsPage           } from './Configuration/SettingsPage'          ;
import { Orchestrator } from '../../Orchestrator';

export type TeamTabNames = 
    | 'Project details' 
    | 'MIDs' 
    | 'Currencies' 
    | 'FX spread'
    | 'API keys'
    | 'Routing rules'
    | 'Antifraud rules'
    | 'Checkout (HPP)'
    | 'Receipt'
    | 'Changelog'
    | 'Settings'


export class Configuration extends Orchestrator<TeamTabNames>
{
    public readonly projectDetails: ProjectDetailsPage;
    public readonly mids: MIDsPage;
    public readonly currencies: CurrenciesListPage;
    public readonly fxSpreads: FxSpreadListPage;
    public readonly apiKeys: APIKeysListPage
    public readonly routingRules: RoutingRulesListPage;
    public readonly antifraudRules: AntifraudRulesListPage
    public readonly checkout: CheckoutPage;
    public readonly receipt: ReceiptPage;
    public readonly changelog: ChangelogListPage;
    public readonly settings: SettingsPage;


    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth);

        this.projectDetails = new ProjectDetailsPage(page);
        this.mids = new MIDsPage(page, tabDepth + 1);
        this.currencies = new CurrenciesListPage(page);
        this.fxSpreads = new FxSpreadListPage(page);
        this.apiKeys = new APIKeysListPage(page);
        this.routingRules = new RoutingRulesListPage(page);
        this.antifraudRules = new AntifraudRulesListPage(page);
        this.checkout = new CheckoutPage(page, tabDepth + 1);
        this.receipt = new ReceiptPage(page, tabDepth + 1);
        this.changelog = new ChangelogListPage(page);
        this.settings = new SettingsPage(page, tabDepth + 1);
    }

}