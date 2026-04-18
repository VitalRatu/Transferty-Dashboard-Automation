import { Page                  } from '@playwright/test'                     ;
import { PlansListPage         } from './Plans/PlansListPage'                ;
import { SubscriptionsListPage } from './Subscriptions/SubscriptionsListPage';
import { ProvidersListPage     } from './Providers/ProvidersListPage'        ;
import { OneclicksListPage     } from './Oneclicks/OneclicksListPage'        ;
import { TokensListPage        } from './Tokens/TokensListPage'              ;
import { Orchestrator } from '../Orchestrator';

export type SubscriptionsTabName = 
    | 'Plans' 
    | 'Subscriptions' 
    | 'Providers'
    | 'Oneclicks'
    | 'Tokens'

export class SubscriptionsPage extends Orchestrator<SubscriptionsTabName>
{
    public readonly plansListPage: PlansListPage;

    public readonly subscriptionsListPage: SubscriptionsListPage;   

    public readonly providersListPage: ProvidersListPage;

    public readonly oneclicksListPage: OneclicksListPage;

    public readonly tokensListPage: TokensListPage;
    
    constructor(page: Page, tabDepth = 0) 
    {
        super(page, tabDepth); 

        this.plansListPage = new PlansListPage(page);
        this.subscriptionsListPage = new SubscriptionsListPage(page);
        this.providersListPage = new ProvidersListPage(page);
        this.oneclicksListPage = new OneclicksListPage(page);
        this.tokensListPage = new TokensListPage(page);
    }

}