import { pomTest } from './pomFixtures';
import { BrowserContext } from '@playwright/test';
import { PageManager } from './PageManager';
import process from 'node:process';
import 'dotenv/config'


export const Routes = 
{
    LOGIN: '/signin',
    DASHBOARD: '/dashboard',
    PROJECTS: '/projects',
};

type AuthFixtures = 
{
    merchantUser: PageManager;
    adminUser: PageManager;    
    newAdminSession: (email: string, password: string) => Promise<PageManager>;
    newMerchantSession: (email: string, password: string) => Promise<PageManager>;
};

let cachedMerchantStorage: Record<string, string>;
let merchantTokenTimestamp = 0;

let cachedAdminStorage: Record<string, string>;
let adminTokenTimestamp = 0;

const TOKEN_LIFETIME_MS = 14 * 60 * 1000;

export const authTest = pomTest.extend<AuthFixtures>({
    
    merchantUser: async ({ page, pageManager }, use) => 
    {
        const now = Date.now();

        if (!cachedMerchantStorage || (now - merchantTokenTimestamp > TOKEN_LIFETIME_MS)) 
        {
            await pageManager.loginPage.goTo(Routes.LOGIN);
            await pageManager.loginPage.signIn(process.env.MERCHANT_EMAIL!, process.env.MERCHANT_PASSWORD!,);
            
            cachedMerchantStorage = await page.evaluate(() => 
            {
                const StorageContent: Record<string, string> = {};
                for (let i = 0; i < window.localStorage.length; i++) 
                {
                    const key = window.localStorage.key(i);
                    if (key)
                    {
                        StorageContent[key] = window.localStorage.getItem(key) || '';
                    } 
                }
                return StorageContent;
            });
            
            merchantTokenTimestamp = Date.now();
        } 
        else 
        {
            await page.goto(Routes.LOGIN);

            await page.evaluate((value) => 
            {
                for (const key in value) 
                {
                    window.localStorage.setItem(key, value[key]);
                }
            }, cachedMerchantStorage);
            
            await page.goto(Routes.DASHBOARD);
            await page.waitForURL(/dashboard/, { timeout: 15000 });
            await page.waitForLoadState('load');
        }

        await pageManager.dashboardPage.sidebar.setLiveMode();
        
        await use(pageManager); 
    },

    adminUser: async ({ page, pageManager }, use) => 
    {
        const now = Date.now();

        if (!cachedAdminStorage || (now - adminTokenTimestamp > TOKEN_LIFETIME_MS)) 
        {
            await pageManager.loginPage.goTo(Routes.LOGIN);
            await pageManager.loginPage.signIn(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
            
            cachedAdminStorage = await page.evaluate(() =>
            {
                const state: Record<string, string> = {};
                for (let i = 0; i < window.localStorage.length; i++) 
                {
                    const key = window.localStorage.key(i);
                    if (key) 
                    {
                        state[key] = window.localStorage.getItem(key) || '';
                    }
                }
                return state;
            });
            adminTokenTimestamp = Date.now();
        } 
        else 
        {
            await page.goto(Routes.LOGIN);
            await page.evaluate((state) => 
            {
                for (const key in state) 
                {
                    window.localStorage.setItem(key, state[key]);
                }
            }, cachedAdminStorage);
            
            await page.goto(Routes.PROJECTS);
            await page.waitForURL(/projects/, { timeout: 15000 });
            await page.waitForLoadState('load');
        }

        await pageManager.projectsListPage.sidebar.setLiveMode();
        
        await use(pageManager);
    },

    newAdminSession: async ({ browser }, use) => 
    {
        const contexts: BrowserContext[] = [];

        const creator = async (email: string, password: string): Promise<PageManager> => 
        {
            const context = await browser.newContext();
            contexts.push(context);
            const page = await context.newPage();

            const pageManager = new PageManager(page);

            await pageManager.loginPage.goTo(Routes.LOGIN);
            await pageManager.loginPage.signIn(email, password);
            await pageManager.projectsListPage.sidebar.setLiveMode(true);
            
            await pageManager.projectsListPage.page.waitForURL(/projects/, { timeout: 15000 });

            return pageManager;
        };

        await use(creator);

        for (const context of contexts) 
        {
            await context.close();
        }
    },

    newMerchantSession: async ({ browser }, use) => 
    {
        const contexts: BrowserContext[] = [];

        const creator = async (email: string, password: string): Promise<PageManager> => 
        {
            const context = await browser.newContext();
            contexts.push(context);
            const page = await context.newPage();

            const pageManager = new PageManager(page);

            await pageManager.loginPage.goTo(Routes.LOGIN);
            await pageManager.loginPage.signIn(email, password);
            await pageManager.dashboardPage.sidebar.setLiveMode(true);

            await pageManager.dashboardPage.page.waitForURL(/dashboard/, { timeout: 15000 });
            
            return pageManager;
        };

        await use(creator);

        for (const context of contexts) 
        {
            await context.close();
        }
    }
});