import { Locator, Page, expect } from '@playwright/test';

/**
 * Represents the Pagination component used to handle data loading in tables or lists
 * Provides methods to check the visibility of the "Load More" trigger and to execute the loading of additional items
 */
export class Pagination 
{
    /** Locator for the specific button used to trigger additional data fetching */
    private readonly loadMoreButton: Locator;

    private readonly paginationContainer: Locator;

    /** The default number of items loaded per single pagination step */
    private readonly paginationAmount: number = 25;

    private readonly deactivateButtonLocator: Locator;
    

    /**
     * Initializes a new instance of the Pagination class
     * Sets up the locator for the "Show More" button using its unique ID
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.paginationContainer = page.locator('.show-more');
        this.loadMoreButton = page.locator('.show-more-button');
        this.deactivateButtonLocator = page.locator('.mt-1 .trigger-container');
    }

    /**
     * Executes a click action on the "Load More" button to fetch and display the next set of items
     * @returns A promise that resolves when the click action is completed
     */
    public async click(): Promise<void>
    {
        await this.loadMoreButton.click();
    }

    public async deactivateSelected(): Promise<void>
    {
        await this.deactivateButtonLocator.click();
    }
}