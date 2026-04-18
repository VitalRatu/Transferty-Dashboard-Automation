import { pomTest                  } from './pomFixtures'                          ;
import { merchantData , adminData } from '../test_data/userCredentials'           ;                ;
import { DashboardPage            } from '../page_objects/Dashboard/DashboardPage';

export const Routes = 
{
    LOGIN: '/signin',
    DASHBOARD: '/dashboard',
};

type AuthFixtures = 
{
    merchantUser: DashboardPage;
    adminUser: DashboardPage;
};

// Merchant state
let cachedMerchantStorage: Record<string, string>
let merchantTokenTimestamp = 0

// Admin state
let cachedAdminStorage: Record<string, string> 
let adminTokenTimestamp = 0

const TOKEN_LIFETIME_MS = 14 * 60 * 1000 

export const authTest = pomTest.extend<AuthFixtures>({
    
    merchantUser: async ({ page, loginPage, dashboardPage }, use) => 
    {
        const now = Date.now()

        if (!cachedMerchantStorage || (now - merchantTokenTimestamp > TOKEN_LIFETIME_MS)) 
        {
            await loginPage.goTo(Routes.LOGIN)
            await loginPage.signIn(merchantData.MERCHANT_EMAIL, merchantData.MERCHANT_PASSWORD)
            
            cachedMerchantStorage = await page.evaluate(() => 
            {
                const StorageContent: Record<string, string> = {}
                for (let i = 0; i < window.localStorage.length; i++) 
                {
                    const key = window.localStorage.key(i)
                    if (key)
                    {
                        StorageContent[key] = window.localStorage.getItem(key) || ''
                    } 
                }
                return StorageContent
            })
            
            merchantTokenTimestamp = Date.now()
        } 
        else 
        {

            await page.goto(Routes.LOGIN)

            await page.evaluate((value) => 
            {
                for (const key in value) 
                {
                    window.localStorage.setItem(key, value[key])
                }
            }, cachedMerchantStorage)
            
            await page.goto(Routes.DASHBOARD)
            await page.waitForURL(/dashboard/, { timeout: 15000 });
            await page.waitForLoadState('load');
        }

        await dashboardPage.sidebar.setLiveMode()
        
        await use() 
    },

    adminUser: async ({ page, loginPage, dashboardPage }, use) => 
    {
        // The logic here is identical to merchantUser but isolates admin credentials and state
        const now = Date.now()

        if (!cachedAdminStorage || (now - adminTokenTimestamp > TOKEN_LIFETIME_MS)) 
        {
            await loginPage.goTo(Routes.LOGIN)
            await loginPage.signIn(adminData.ADMIN_EMAIL, adminData.ADMIN_PASSWORD)
            
            cachedAdminStorage = await page.evaluate(() =>
            {
                const state: Record<string, string> = {}
                for (let i = 0; i < window.localStorage.length; i++) 
                {
                    const key = window.localStorage.key(i)
                    if (key) 
                    {
                        state[key] = window.localStorage.getItem(key) || ''
                    }
                }
                return state
            })
            adminTokenTimestamp = Date.now()
        } 
        else 
        {
            await page.goto(Routes.LOGIN)
            await page.evaluate((state) => 
            {
                for (const key in state) 
                {
                    window.localStorage.setItem(key, state[key])
                }
            }, cachedAdminStorage)
            
            await page.goto(Routes.DASHBOARD)
            await page.waitForURL(/projects/, { timeout: 15000 });
            await page.waitForLoadState('load');
        }

        await dashboardPage.sidebar.setLiveMode()
        await use()
    },
})

