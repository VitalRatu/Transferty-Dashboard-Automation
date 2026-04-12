import 'dotenv/config';
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Routes } from '../page_data/routes';

/**
 * Represents the Login Page of the application
 * Provides locators and methods to interact with the authentication form and handle the sign-in flow
 */
export class LoginPage extends BasePage 
{
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;

    /**
     * Initializes a new instance of the LoginPage class
     * Sets up the locators for the email input, password input, and the sign-in button
     * @param page - The Playwright Page object used to interact with the browser context
     */
    constructor(page: Page) 
    {
        super(page, Routes.LOGIN);
        this.emailField = page.locator('input[name="email"]');
        this.passwordField = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
    }

    /**
     * Authenticates a user by filling out the login form and submitting it
     * This method simulates human-like sequential typing, clicks the sign-in button,
     * and waits for successful navigation to the Dashboard, ensuring the network is idle
     * @param email - The user's registered email address
     * @param password - The corresponding password for the user's account
     * @returns A promise that resolves when the login process is complete and the Dashboard URL is verified
     */
    /* public async signIn(email: string, password: string): Promise<void> 
    {
        await this.emailField.pressSequentially(email, { delay: 10 });
        await this.passwordField.pressSequentially(password, { delay: 10 });
        
        await expect(this.loginButton).toBeVisible();

        await this.loginButton.click();

        await this.page.waitForURL(new RegExp(Routes.DASHBOARD));

        await this.page.waitForLoadState('networkidle');

        await expect(this.page).toHaveURL(new RegExp(Routes.DASHBOARD), { timeout: 3000 });
    } */
   public async signIn(email: string, password: string): Promise<void> 
    {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        
        await expect(this.loginButton).toBeVisible();

        const responsePromise = this.page.waitForResponse(response => 
            response.url().includes('AuthService/Login') && response.status() === 200 && response.request().method() === 'POST'
        );

        await this.loginButton.click();

        await responsePromise;

        await this.page.waitForURL(new RegExp(Routes.DASHBOARD));
    }
}