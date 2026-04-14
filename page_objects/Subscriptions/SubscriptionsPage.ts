import { BasePage              } from '../BasePage'                          ;
import { Page                  } from '@playwright/test'                     ;
import { Routes                } from '../../page_data/routes'               ;
import { Tab                   } from '../related_components/Tab'            ;
import { PlansListPage         } from './Plans/PlansListPage'                ;
import { SubscriptionsListPage } from './Subscriptions/SubscriptionsListPage';
import { ProvidersListPage     } from './Providers/ProvidersListPage'        ;
import { OneclicksListPage     } from './Oneclicks/OneclicksListPage'        ;
import { TokensListPage        } from './Tokens/TokensListPage'              ;

export class SubscriptionsPage extends BasePage 
{
    /** The Tab component used to switch between different MID categories and management pages */
    public readonly tab: Tab;

    public readonly plansListPage: PlansListPage;

    public readonly subscriptionsListPage: SubscriptionsListPage;   

    public readonly providersListPage: ProvidersListPage;

    public readonly oneclicksListPage: OneclicksListPage;

    public readonly tokensListPage: TokensListPage;
    
    constructor(page: Page) 
    {
        super(page, Routes.SUBSCRIPTIONS); 
        this.tab = new Tab(page);

        this.plansListPage = new PlansListPage(page);
        this.subscriptionsListPage = new SubscriptionsListPage(page);
        this.providersListPage = new ProvidersListPage(page);
        this.oneclicksListPage = new OneclicksListPage(page);
        this.tokensListPage = new TokensListPage(page);
    }

}