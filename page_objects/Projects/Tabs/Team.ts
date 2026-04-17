import { Page            } from '@playwright/test'             ;
import { Tab             } from '../../related_components/Tab' ;
import { TeamListPage    } from './Team/TeamListPage'          ;
import { RolesListPage   } from './Team/RolesListPage'         ;
import { IPWhiteListPage } from './Team/IPWhiteListPage'       ;
import { Orchestrator } from '../../Orchestrator';

export type TeamTabNames = 
    | 'Team' 
    | 'Roles' 
    | 'IP whitelist' 

export class Team extends Orchestrator<TeamTabNames>
{
    public readonly teamListPage: TeamListPage; 
    public readonly rolesListPage: RolesListPage;
    public readonly ipWhiteListPage: IPWhiteListPage;

    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth);

        this.teamListPage = new TeamListPage(page);
        this.rolesListPage = new RolesListPage(page);
        this.ipWhiteListPage = new IPWhiteListPage(page);
    }

    public async openTab(tabName:TeamTabNames)
    {
        await this.tab.open(tabName)
    }
}