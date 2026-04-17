import { Page                   } from '@playwright/test'                      ;
import { Tab                    } from '../../related_components/Tab'          ;
import { ProjectDetailsPage     } from './Configuration/ProjectDetailsPage'    ;
import { MIDsPage               } from '../../MIDs/MIDsPage'                   ;
import { CurrenciesListPage     } from './Configuration/CurrenciesListPage'    ;
import { FxSpreadListPage       } from './Configuration/FxSpreadListPage'      ;
import { APIKeysListPage        } from './Configuration/APIKeysListPage'       ;
import { RoutingRulesListPage   } from './Configuration/RoutingRulesListPage'  ;
import { AntifraudRulesListPage } from './Configuration/AntiFraudRulesListPage';
import { CheckoutPage           } from './Configuration/CheckoutPage'          ;
import { ReceiptPage            } from './Configuration/ReceiptPage'           ;
import { ChangelogListPage      } from './Configuration/ChangelogListPage'     ;
import { SettingsPage           } from './Configuration/SettingsPage'          ;

export class Configuration 
{
    public readonly tab: Tab;

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
        this.tab = new Tab(page, tabDepth);

        this.projectDetails = new ProjectDetailsPage(page);
        this.mids = new MIDsPage(page, tabDepth + 1);
        this.currencies = new CurrenciesListPage(page);
        this.fxSpreads = new FxSpreadListPage(page);
        this.apiKeys = new APIKeysListPage(page);
        this.routingRules = new RoutingRulesListPage(page);
        this.antifraudRules = new AntifraudRulesListPage(page);
        this.checkout = new CheckoutPage(page);
        this.receipt = new ReceiptPage(page);
        this.changelog = new ChangelogListPage(page);
        this.settings = new SettingsPage(page);
    }

}