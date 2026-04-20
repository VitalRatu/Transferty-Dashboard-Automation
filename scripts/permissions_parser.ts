import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { chromium } from '@playwright/test';
import { adminData } from '../test_data/userCredentials';
import { Routes } from '../fixtures/authFixtures';
import { LoginPage } from '../page_objects/LoginPage';
import { DashboardPage } from '../page_objects/Dashboard/DashboardPage';

const API_BASE_URL = process.env.BASE_URL;
const OUTPUT_PATH = path.join(__dirname, '../test_data/Permissions.ts');

async function updatePermissions() 
{
    const browser = await chromium.launch({ headless: true }); 
    const context = await browser.newContext({ baseURL: API_BASE_URL });
    const page = await context.newPage();

    try 
    {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        
        await loginPage.goTo(Routes.LOGIN);
        await loginPage.signIn(adminData.ADMIN_EMAIL, adminData.ADMIN_PASSWORD);
        await dashboardPage.sidebar.setLiveMode();

        const [permsResponse] = await Promise.all([
            page.waitForResponse(res => 
                res.url().includes('adminsrv.v1.AuthService/ListPermissions') && 
                res.request().method() === 'POST' && 
                res.status() === 200,
                { timeout: 15000 }
            ),
            page.goto('/users/list/roles/super')
        ]);

        const rawBody = await permsResponse.text();
        const permissions = rawBody.match(/[a-zA-Z0-9]+_[a-zA-Z0-9_]+/g) || [];

const fileContent = 
`export const PERMISSIONS = [
${permissions.map(p => `    '${p}'`).join(',\n')}
] as const;
export type ValidPermissions = typeof PERMISSIONS[number];
`;
        
        fs.writeFileSync(OUTPUT_PATH, fileContent, 'utf-8');
        console.log(`Success! File written to ${OUTPUT_PATH}`);

    } catch (error) 
    {
        console.error('Error updating permissions:', error);
        process.exit(1);
    } finally 
    {
        await browser.close(); 
    }
}

updatePermissions();