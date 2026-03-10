import { Locator, Page, expect } from '@playwright/test';
import { Routes } from '../../page_data/routes';

/**
 * Represents the Header component of the application
 * Provides functionality for user authentication management, project switching, 
 * time zone display, and global navigation via the application logo
 */
export class Header 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** Locator for the logout button in the user profile section */
    private readonly logOutButton: Locator;
    
    /** Locator for the display element showing the current application time zone */
    private readonly timeZoneLocator: Locator;
    
    /** Locator for the element displaying the currently active project name */
    private readonly currentProject: Locator;
    
    /** Locator for the application logo link used for dashboard navigation */
    private readonly transfertLogoLocator: Locator;
    
    /** Locator for the container of project dropdown options */
    private readonly projectOptions: Locator;

    /**
     * Initializes a new instance of the Header class
     * Sets up locators for key header elements including logout, timezone, and project selection components
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.logOutButton = this.page.locator('.user-logout');
        this.timeZoneLocator = this.page.locator('.tz-value');
        this.currentProject = this.page.locator('.project-name');
        this.transfertLogoLocator = this.page.locator('.header-logo-link')
        this.projectOptions = this.page.locator('.visible.menu.transition');
        this.projectOptions = this.page.locator('.visible.menu.transition .item');
    }

    /**
     * Terminates the current user session by clicking the logout button
     * Asserts that the logout button is visible before interaction and verifies navigation to the login page
     * @returns A promise that resolves when the logout process and redirection are complete
     */
    public async logout(): Promise<void>
    {
        expect (this.logOutButton).toBeVisible();
        await this.logOutButton.click();
        await expect (this.page).toHaveURL(Routes.LOGIN);
    }

    /**
     * Extracts the current local time zone value displayed in the header
     * Ensures the timezone element is visible before retrieving its inner text
     * @returns A promise that resolves to the timezone string (e.g., "UTC+2")
     */
    public async getLocalTimeZone(): Promise<string>
    {
        expect (this.timeZoneLocator).toBeVisible();
        const timeZone: string = await this.timeZoneLocator.innerText();
        return timeZone;
    }

    /**
     * Retrieves the display name of the project currently selected in the header
     * @returns A promise that resolves to the name of the active project
     */
    public async getCurrentProjectName(): Promise<string>
    {
        expect (this.currentProject).toBeVisible();
        const projectName: string = await this.currentProject.innerText();
        return projectName;
    }

    /**
     * Changes the active project context by selecting a new project from the dropdown
     * Only performs the switch if the target project is different from the currently selected one
     * Verifies visibility of the project option before clicking and confirms the update after selection
     * @param projectName - The exact name of the project to switch to
     * @returns A promise that resolves when the project switch is confirmed
     */
    public async switchProject(projectName: string): Promise<void>
    {
        expect (this.currentProject).toBeVisible();
        if (await this.currentProject.innerText() !== projectName)
        {
            await this.currentProject.click();
            const projectOption = this.page.getByRole('option', { name: projectName, exact: true });
            await expect(projectOption).toBeVisible();
            await projectOption.click();
            await expect (this.currentProject).toHaveText(projectName);
        }
    }
    
    /**
     * Navigates the user back to the Dashboard by clicking the application logo
     * Asserts that the logo is visible and verifies that the resulting URL matches the Dashboard route
     * @returns A promise that resolves when the navigation is complete
     */
    public async goToDashboardByLogo(): Promise<void>
    {
        expect (this.transfertLogoLocator).toBeVisible();
        await this.transfertLogoLocator.click();
        await expect (this.page).toHaveURL(Routes.DASHBOARD);
    }

    /**
     * Opens the project dropdown and compiles a list of all available project names
     * Automatically filters out management options like "Add project" from the returned list
     * @returns A promise that resolves to an array of strings containing all available project names
     */
    public async getListofProjects(): Promise<string[]>
    {
        expect (this.currentProject).toBeVisible();
        await this.currentProject.click();
        const projectCount: number = await this.projectOptions.count();
        const projectNames: string[] = [];
        for (let i = 0; i < projectCount; i++)
        {
            const projectName: string = await this.projectOptions.nth(i).innerText();
            if (projectName.trim() === 'Add project')
            {
                continue;
            }
            projectNames.push(projectName);
        }
        return projectNames;
    }

}