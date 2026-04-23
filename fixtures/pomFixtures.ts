import { test as base } from '@playwright/test';
import { PageManager } from '../fixtures/PageManager';

type Fixtures = 
{
    pageManager: PageManager;
}

export const pomTest = base.extend<Fixtures>(
{
    pageManager: async ({ page }, use) =>
    {
        await use(new PageManager(page));
    }
});

export { expect } from "@playwright/test";