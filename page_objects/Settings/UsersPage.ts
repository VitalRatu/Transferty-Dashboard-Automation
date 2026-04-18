import { Page } from '@playwright/test';
import { UsersListPage } from '../Settings/Users/UsersListPage';
import { AdminsListPage } from './Users/AdminsListPage';
import { SessionsListPage } from "../Settings/Users/SessionsListPage";
import { RolesAdminListPage } from './Users/RolesAdminListPage';
import { Orchestrator } from '../Orchestrator';

export type UsersTabName = 
    | 'Users' 
    | 'Admins' 
    | 'Sessions' 
    | 'Roles' 

export class UsersPage extends Orchestrator<UsersTabName>
{
    public readonly usersListPage: UsersListPage;

    public readonly adminsListPage: AdminsListPage;

    public readonly sessionsListPage: SessionsListPage;

    public readonly rolesAdminListPage: RolesAdminListPage;

    constructor(page: Page, tabDepth = 0)
    {
        super(page, tabDepth);

        this.usersListPage = new UsersListPage(page);
        this.adminsListPage = new AdminsListPage(page);
        this.sessionsListPage = new SessionsListPage(page);
        this.rolesAdminListPage = new RolesAdminListPage(page);
    }
}