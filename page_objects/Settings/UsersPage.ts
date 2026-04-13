import { BasePage } from '../BasePage';
import { Page } from '@playwright/test';
import { Routes } from '../../page_data/routes';
import { Tab } from '../related_components/Tab';
import { UsersListPage } from '../Settings/Users/UsersListPage';
import { AdminsListPage } from './Users/Admins/AdminsListPage';
import { SessionsListPage } from "../Settings/Users/SessionsListPage";
import { RolesListPage } from '../Settings/Users/Roles/RolesListPage';

export class UsersPage extends BasePage 
{
    public readonly tab: Tab;

    public readonly usersListPage: UsersListPage;

    public readonly adminsListPage: AdminsListPage;

    public readonly sessionsListPage: SessionsListPage;

    public readonly rolesListPage: RolesListPage;

    constructor(page: Page)
    {
        super(page, Routes.SETTINGS.USERS);
        this.tab = new Tab(page);

        this.usersListPage = new UsersListPage(page);
        this.adminsListPage = new AdminsListPage(page);
        this.sessionsListPage = new SessionsListPage(page);
        this.rolesListPage = new RolesListPage(page);
    }
}