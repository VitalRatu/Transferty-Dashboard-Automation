import { Locator, Page, expect } from '@playwright/test';
import { Pagination } from './Pagination';

/**
 * Represents a generic table component used throughout the application
 * Provides comprehensive methods for interacting with table data, including searching by column values,
 * extracting cell text, handling icons within cells, and managing pagination
 */
export class Table 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The main container for the table element */
    private readonly tableBase: Locator;
    
    /** Locator for all column header elements */
    private readonly headers: Locator;
    
    /** Locator for all data rows within the table body */
    private readonly tableRows: Locator;
    
    /** Locator for the loading indicator to manage synchronization during data fetches */
    private readonly pageLoaded: Locator;

    /** The Pagination component associated with this table for navigating through data sets */
    public readonly pagination: Pagination;
   
    /**
     * Initializes a new instance of the Table class
     * Sets up locators for headers, rows, and the base container based on standard application classes
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.pagination = new Pagination(page);
        this.tableBase = page.locator('.Table-container');
        this.headers = this.tableBase.getByRole('columnheader');
        this.tableRows = this.tableBase.locator('tbody').getByRole('row');
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
    }

    /**
     * Retrieves the text content of all table headers
     * @returns A promise that resolves to an array of header text strings
     */
    public async getHeaders(): Promise<string[]> 
    {
        return this.headers.allInnerTexts();
    }

    /**
     * Retrieves the count of all data rows currently visible in the table
     * @returns A promise that resolves to the number of rows
     */
    public async getRowCount(): Promise<number> 
    {
        return this.tableRows.count();
    }

    /**
     * Retrieves the total count of column headers in the table
     * @returns A promise that resolves to the number of headers
     */
    public async getHeaderCount(): Promise<number>
    {
        return this.headers.count();
    }

    /**
     * Retrieves the zero-based index of a column by its display name
     * Performs a case-insensitive search and trims whitespace for matching
     * @param columnName - The case-insensitive name of the column to find
     * @throws {Error} If the specified column name is not found within the table headers
     * @returns A promise that resolves to the index of the found column
     */
    public async getColumnIndex(columnName: string): Promise<number> 
    {
        await this.headers.first().waitFor({ state: 'visible', timeout: 10000 });
        const headersText: string[] = await this.getHeaders();
        const index: number = headersText.findIndex(
          (header) =>
            header.trim().toLowerCase() === columnName.trim().toLowerCase(),
        );

        if (index === -1) 
        {
            throw new Error(`Column "${columnName}" not found`);
        }
        return index;
    }

    /**
     * Retrieves the text content of every data cell currently present in the table
     * @returns A promise that resolves to a flat array of all cell text strings
     */
    public async getAllCellsText(): Promise<string[]>
    {
        return await this.tableRows.allInnerTexts();
    } 

    /**
     * Internal helper to find a row locator based on a specific value in a specific column
     * Iterates through all rows and checks the inner text of the cell at the calculated column index
     * @param columnName - The name of the column to perform the search in
     * @param value - The text value to search for within the specified column
     * @throws {Error} If no row is found containing the specified value in the target column
     * @returns A promise that resolves to the Locator of the matching row
     */
    public async getRowLocatorByColumnValue(columnName: string, value: string): Promise<Locator> 
    {
        await this.page.waitForLoadState('networkidle');
        const colIndex: number = await this.getColumnIndex(columnName);
        await this.tableRows.first().waitFor({ state: 'visible' });
        const rowCount: number = await this.tableRows.count();
        for (let i = 0; i < rowCount; i++) 
        {
            const cellText: string = await this.tableRows.nth(i).getByRole('cell').nth(colIndex).innerText();
            if (cellText.includes(value))
            {
                return this.tableRows.nth(i);
            } 
        }
        throw new Error(`Row where column "${columnName}" contains "${value}" not found in ${rowCount} rows.`);
    }
    
    /**
     * Internal helper to find a row index based on a specific value in a specific column
     * Iterates through all rows and checks the inner text of the cell at the calculated column index
     * @param columnName - The name of the column to perform the search in
     * @param value - The text value to search for within the specified column
     * @throws {Error} If no row is found containing the specified value in the target column
     * @returns A promise that resolves to the index of the matching row
     */
    public async getRowIndexByColumnValue(columnName: string, value: string): Promise<number> 
    {
        const colIndex: number = await this.getColumnIndex(columnName);
        await this.tableRows.first().waitFor({ state: 'visible' });
        const rowCount: number = await this.tableRows.count();
        
        for (let i = 0; i < rowCount; i++) 
        {
            const cellText: string = await this.tableRows.nth(i).getByRole('cell').nth(colIndex).innerText();
            if (cellText.includes(value))
            {
                return i;
            } 
        }
        
        throw new Error(`Row index where column "${columnName}" contains "${value}" not found in ${rowCount} rows`);
    }

    /**
     * Locates a row by a unique value and clicks the first link within a target column's cell
     * @param lookupColumn - The column name used to identify the unique row (e.g., 'Tx ID')
     * @param uniqueValue - The unique identifier to look for in the lookup column
     * @param targetColumn - The column name containing the link to be clicked (e.g., 'Aggregated MID')
     * @returns A promise that resolves when the click action is completed
     */
    public async clickOnCellValueByUniqueValue(lookupColumn: string, uniqueValue: string, targetColumn: string): Promise<void> 
    {
        await this.page.waitForLoadState('networkidle');

        const row = await this.getRowLocatorByColumnValue(lookupColumn, uniqueValue);

        await expect(row).toBeVisible();

        const targetIndex = await this.getColumnIndex(targetColumn);

        await row.getByRole('cell').nth(targetIndex).getByRole('link').first().click();
    }

    /**
     * Scans every cell in the table for a specific text value and clicks the first available link inside that cell
     * Performs a deep search through rows and cells until the first match is found and triggered
     * @param textValue - The specific text to search for within all table cells
     * @throws {Error} If the specified text value is not found in any cell of the table
     * @returns A promise that resolves when the link is found and clicked
     */
    public async clickOnCellValueDirect(textValue: string): Promise<void> 
    {
        await this.tableRows.first().waitFor({ state: 'visible' });
        const rowCount = await this.tableRows.count();

        for (let i = 0; i < rowCount; i++) 
        {
            const row = this.tableRows.nth(i);
            const cellCount = await row.getByRole('cell').count();
            for (let j = 0; j < cellCount; j++) 
            {
                const cell = row.getByRole('cell').nth(j);
                const cellText = await cell.innerText();

                if (cellText.includes(textValue)) 
                {
                    const link = cell.locator('a, [role="link"]').first();

                    if (await link.count() > 0 && await link.isVisible()) 
                    {
                        await link.click();
                        return; 
                    }
                }
            }
        }
        throw new Error(`Cell with text "${textValue}" not found in the table.`);
    }

    /**
     * Finds a specific value within a designated column and clicks on the link inside that exact cell
     * This avoids heavy loops by leveraging Playwright's native locators and existing row-finding logic
     * @param columnName - The exact name of the table column header to search within
     * @param targetValue - The text value to locate and click
     * @returns A promise that resolves when the targeted value is clicked
     */
    public async clickOnColumnValue(columnName: string, targetValue: string): Promise<void> 
    {
        await this.page.waitForLoadState('networkidle');
        
        const row = await this.getRowLocatorByColumnValue(columnName, targetValue);
        await expect(row).toBeVisible();

        const columnIndex = await this.getColumnIndex(columnName);

        const targetCell = row.getByRole('cell').nth(columnIndex);

        const link = targetCell.locator('a, [role="link"], button').first();
        
        await link.click();
    }
    //TODO RECHECK IF EVER NEEDED
/*     public async getValueFromRow(searchColumn: string, searchValue: string, resultColumn: string): Promise<string> 
    {
        const row: Locator = await this.getRowLocatorByColumnValue(searchColumn, searchValue);
        await expect(row).toBeVisible();
        const resultColIndex: number = await this.getColumnIndex(resultColumn);
        return await row.getByRole('cell').nth(resultColIndex).innerText();
    } */

    /**
     * Extracts all text values from a specific column across all visible rows
     * @param columnName - The name of the column to collect values from
     * @returns A promise that resolves to an array of text strings from the specified column
     */
    public async getAllValuesFromColumn(columnName: string): Promise<string[]>
    {
        const colIndex: number = await this.getColumnIndex(columnName);
        await this.tableRows.first().waitFor({ state: 'visible' });
        const rowCount: number = await this.getRowCount();
        const values: string[] = [];
        for (let i = 0; i < rowCount; i++)
        {
            const cellText: string = await this.tableRows.nth(i).getByRole('cell').nth(colIndex).innerText();
            values.push(cellText);
        }
        return values;
    }

    /**
     * Retrieves all text data from a specific row identified by its index
     * Automatically maps cell values to header names and handles icon title extraction for empty text cells
     * @param rowIndex - The zero-based index of the row to extract
     * @returns A promise that resolves to a record where keys are header names and values are cell texts
     */
    public async getAllValuesFromRowByIndex(rowIndex: number): Promise<Record<string, string>>
    {
        await this.page.waitForLoadState('load');
        const row = this.tableRows.nth(rowIndex);
        await expect(row).toBeVisible();
        const headerTexts = await this.getHeaders();
        const cellCount = await row.getByRole('cell').count();
        
        const rowData: Record<string, string> = {};

        for (let i = 0; i < cellCount; i++) 
        {
            const cell = row.getByRole('cell').nth(i);
            let cellText = await cell.innerText();

            if (cellText.trim() === '') 
            {
                const icon = cell.locator('img, svg').first();
                if (await icon.count() > 0) 
                {
                    const title = await icon.getAttribute('title');
                    cellText = title ? title.toUpperCase() : '';
                }
            }
            const cleanValue = cellText.trim().replace(/\n/g, ' ');
            const key = headerTexts[i] ? headerTexts[i].trim() : `column_${i}`;
            rowData[key] = cleanValue;
        }
        return rowData;
    }

    /**
     * Retrieves all data from a row identified by a unique value in a search column
     * Maps the entire row into a key-value object where keys correspond to column headers
     * Handles special cases like icons (by extracting titles) and multi-line text cleaning
     * @param searchColumn - The name of the column to search within (e.g., 'Wallet ID')
     * @param uniqueValue - The unique identifier to find in the search column
     * @returns A promise that resolves to a record object representing the entire row's data
     */
    public async getAllValuesFromRowByColumnValue(searchColumn: string, uniqueValue: string): Promise<Record<string, string>> 
    {
        const row = await this.getRowLocatorByColumnValue(searchColumn, uniqueValue);
        await expect(row).toBeVisible();

        const headerTexts = await this.getHeaders();
        const cellCount = await row.getByRole('cell').count();
        
        const rowData: Record<string, string> = {};

        for (let i = 0; i < cellCount; i++) 
        {
            const cell = row.getByRole('cell').nth(i);
            let cellText = await cell.innerText();
            
            if (cellText.trim() === '') 
            {
                const icon = cell.locator('img, svg').first();
                if (await icon.count() > 0) 
                {
                    const title = await icon.getAttribute('title');
                    cellText = title ? title.toUpperCase() : '';
                }
            }
            
            const cleanValue = cellText.trim().replace(/\n/g, ' ');
            const key = headerTexts[i] ? headerTexts[i].trim() : `column_${i}`;
            
            rowData[key] = cleanValue;
        }
        
        return rowData;
    }

    /**
     * Triggers the pagination to load more data and waits for the row count to increase
     * Ensures the "Load More" button is visible before clicking and validates the table expansion
     * @throws {Error} If the pagination button is not visible on the page
     * @returns A promise that resolves once the table has successfully loade
     * d additional rows
     */
    public async loadMoreTableData(): Promise<void>
    {
        const isButtonVisible = await this.pagination.isVisible();

        if (!isButtonVisible)
        {
          throw new Error("Load More button is not visible.");
        }

        const rowsBefore: number = await this.getRowCount();
        
        await this.pagination.click();
        
        await expect(async () => 
        {
            const rowsAfter: number = await this.getRowCount();
            expect(rowsAfter).toBeGreaterThan(rowsBefore);
        }).toPass({ timeout: 10000 });
    }
}