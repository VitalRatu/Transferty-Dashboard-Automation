import { Page } from '@playwright/test';
import { Tab } from '../related_components/Tab';
import { APMsListPage } from './APMs/APMsListPage';
import { BINsListPage } from './BINs/BINsListPage';
import { CardsListPage } from './Cards/CardsListPage';
import { LabelsListPage } from './Labels/LabelsListPage';

export class CardsAndAccounts
{
    public readonly tab: Tab;

    public readonly apmsListPage: APMsListPage;
    public readonly binsListPage: BINsListPage;
    public readonly cardsListPage: CardsListPage;
    public readonly labelsListPage: LabelsListPage;

    constructor(page: Page) 
    {
        this.tab = new Tab(page);

        this.apmsListPage = new APMsListPage(page);
        this.binsListPage = new BINsListPage(page);
        this.cardsListPage = new CardsListPage(page);
        this.labelsListPage = new LabelsListPage(page);
    }

}