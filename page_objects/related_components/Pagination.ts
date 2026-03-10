import { Locator, Page, expect } from '@playwright/test';

/**
 * Represents the Pagination component used to handle data loading in tables or lists
 * Provides methods to check the visibility of the "Load More" trigger and to execute the loading of additional items
 */
export class Pagination 
{
    /** Locator for the specific button used to trigger additional data fetching */
    private readonly loadMoreButton: Locator;

    /** The default number of items loaded per single pagination step */
    readonly paginationAmount: number = 25;

    /**
     * Initializes a new instance of the Pagination class
     * Sets up the locator for the "Show More" button using its unique ID
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.loadMoreButton = page.locator('#show-more-button');
    }

    /**
     * Asserts that the "Load More" button is currently visible on the page
     * This is typically used to determine if there is more data available to be fetched
     * @returns A promise that resolves when the button visibility assertion passes
     */
    public async isVisible(): Promise<void>
    {
        return await expect(this.loadMoreButton).toBeVisible();
    }

    /**
     * Executes a click action on the "Load More" button to fetch and display the next set of items
     * @returns A promise that resolves when the click action is completed
     */
    public async click(): Promise<void>
    {
        await this.loadMoreButton.click();
    }
}