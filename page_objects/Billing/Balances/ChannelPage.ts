import { Page, Locator, expect } from '@playwright/test';
import { ChannelProviderListPage } from './Channel/ChannelProviderListPage';
import { ChannelPSPListPage } from './Channel/ChannelPSPListPage';
import { Orchestrator } from '../../Orchestrator';

export type ChannelPageTabName = 
    | 'Provider' 
    | 'PSP' 

/**
 * Represents the Channel Balances page within the billing module
 * This class provides a specialized interface for monitoring and auditing funds 
 * categorized by specific payment channels, gateways, or processing routes
 */
export class ChannelPage extends Orchestrator<ChannelPageTabName>
{ 
    public readonly channelProviderListPage:ChannelProviderListPage

    public readonly channelPSPListPage:ChannelPSPListPage

    constructor(page: Page, tabDepth = 0) 
    {
        super(page, tabDepth);

        this.channelProviderListPage = new ChannelProviderListPage(page, tabDepth + 1)
        this.channelPSPListPage = new ChannelPSPListPage(page, tabDepth + 1)
    }
}