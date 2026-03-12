import { pomTest } from './pomFixtures';
import { userData, adminData } from '../test_data/userCredentials';
import { Routes } from '../page_data/routes';
import { DashboardPage } from '../page_objects/Dashboard/DashboardPage';

type AuthFixtures = 
{
    merchantUser: DashboardPage;
    adminUser: DashboardPage;
};

/* export const authTest = pomTest.extend<AuthFixtures>(
{
    merchantUser: async ({ loginPage, dashboardPage }, use) => 
    {
        await loginPage.goTo(Routes.LOGIN);
        await loginPage.signIn(userData.EMAIL, userData.PASSWORD);
        await dashboardPage.sidebar.setLiveMode();
        await use();
    },

   
    adminUser: async ({ loginPage, dashboardPage }, use) => 
    {
        await loginPage.goTo(Routes.LOGIN);
        await loginPage.signIn(adminData.ADMIN_EMAIL, adminData.ADMIN_PASSWORD);
        await dashboardPage.sidebar.setLiveMode();
        await use();
    },
}); */

// Global variables to store the exact snapshot of Local Storage in memory
let cachedMerchantStorage: Record<string, string>
let merchantTokenTimestamp = 0

// Separate variables for Admin state to prevent session crossover
let cachedAdminStorage: Record<string, string> 
let adminTokenTimestamp = 0

// Set token expiration threshold to 14 minutes (in milliseconds)
const TOKEN_LIFETIME_MS = 14 * 60 * 1000 

export const authTest = pomTest.extend<AuthFixtures>({
    
    merchantUser: async ({ page, loginPage, dashboardPage }, use) => 
    {
        // Capture the current timestamp to verify token freshness
        const now = Date.now()

        // Check if we need to perform a real UI login
        // Triggers if cache is empty (first test run) OR if 14 minutes have passed
        if (!cachedMerchantStorage || (now - merchantTokenTimestamp > TOKEN_LIFETIME_MS)) 
        {
            // Navigate to the login page and perform standard UI authentication
            await loginPage.goTo(Routes.LOGIN)
            await loginPage.signIn(userData.EMAIL, userData.PASSWORD)
            
            // Execute code inside the browser context to capture the session
            // We iterate through all Local Storage keys to ensure we don't miss anything (like userId or settings)
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
                return StorageContent // Return the complete state snapshot to the Node.js environment
            })
            
            // Update the timestamp to reset the 14-minute countdown
            merchantTokenTimestamp = Date.now()
        } 
        else 
        {
            // Fast path: bypass the UI login by injecting the cached session
            
            // Navigate to the app's domain first
            // Browsers block Local Storage access on blank pages due to security policies
            await page.goto(Routes.LOGIN)
            
            // Execute code inside the browser to restore the saved session data
            await page.evaluate((value) => 
            {
                for (const key in value) 
                {
                    window.localStorage.setItem(key, value[key])
                }
            }, cachedMerchantStorage)
            
            // Jump straight to the dashboard since the browser now believes we are fully authenticated
            await page.goto(Routes.DASHBOARD)
            await page.waitForURL(/dashboard/, { timeout: 15000 });
            await page.waitForLoadState('load');
        }

        // Perform post-login UI actions, like setting the Live Mode toggle
        await dashboardPage.sidebar.setLiveMode()
        
        // Pass the dashboardPage object to the actual test body and suspend fixture execution
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
                    if (key) state[key] = window.localStorage.getItem(key) || ''
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

