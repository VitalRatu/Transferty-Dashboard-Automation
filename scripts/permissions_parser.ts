import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { adminData, merchantData } from '../test_data/userCredentials'; // Убедись, что импорты правильные
import { Routes } from '../fixtures/authFixtures';
import { LoginPage } from '../page_objects/LoginPage';
import { DashboardPage } from '../page_objects/Dashboard/DashboardPage';
import { ProjectsListPage } from '../page_objects/Projects/ProjectsListPage';

const API_BASE_URL = process.env.BASE_URL;
const OUTPUT_PATH = path.join(__dirname, '../test_data/Permissions.ts');


async function scrapePermissions(
    browser: Browser, 
    email: string, 
    password: string, 
    targetUrl: string, 
    userType: 'Admin' | 'Merchant'
): Promise<string[]> {
    console.log(`[${userType}] Starting permissions extraction...`);
    
    const context = await browser.newContext({ baseURL: API_BASE_URL });
    const page = await context.newPage();

    try {
        const loginPage = new LoginPage(page);
        await loginPage.goTo(Routes.LOGIN);
        await loginPage.signIn(email, password);

        if (userType === 'Merchant') 
        {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.sidebar.setLiveMode();
        } else 
        {
            const projectsListPage = new ProjectsListPage(page);
            await projectsListPage.sidebar.setLiveMode();
        }

        const [permsResponse] = await Promise.all([
            page.waitForResponse(res => 
                res.url().includes('adminsrv.v1.AuthService/ListPermissions') && 
                res.request().method() === 'POST' && 
                res.status() === 200,
                { timeout: 15000 }
            ),
            page.goto(targetUrl)
        ]);

        const rawBody = await permsResponse.text();

        const permissions = rawBody.match(/[a-zA-Z0-9]+_[a-zA-Z0-9_]+/g) || []; 
        
        console.log(`[${userType}] Successfully extracted ${permissions.length} permissions.`);
        return permissions;

    } finally 

    {
        await context.close();
    }
}

async function updatePermissions() {
    const browser = await chromium.launch({ headless: true }); 

    try 
    {
        const adminPerms = await scrapePermissions(
            browser, 
            adminData.ADMIN_EMAIL, 
            adminData.ADMIN_PASSWORD, 
            '/users/list/roles/super', 
            'Admin'
        );

        const merchantPerms = await scrapePermissions(
            browser, 
            merchantData.MERCHANT_EMAIL, 
            merchantData.MERCHANT_PASSWORD, 
            '/team/roles/project_owner', 
            'Merchant'
        );

        const fileContent = 
`
export const ADMIN_PERMISSIONS = [
${adminPerms.map(p => `    '${p}'`).join(',\n')}
] as const;
export type ValidAdminPermissions = typeof ADMIN_PERMISSIONS[number];

export const MERCHANT_PERMISSIONS = [
${merchantPerms.map(p => `    '${p}'`).join(',\n')}
] as const;
export type ValidMerchantPermissions = typeof MERCHANT_PERMISSIONS[number];
`;
        
        fs.writeFileSync(OUTPUT_PATH, fileContent, 'utf-8');
        console.log(`\nSuccess! All permissions written to ${OUTPUT_PATH}`);

    } catch (error) {
        console.error('Error updating permissions:', error);
        process.exit(1);
    } finally {
        await browser.close(); 
    }
}

updatePermissions();