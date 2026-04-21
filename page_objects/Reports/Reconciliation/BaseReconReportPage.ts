import { Page, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { DetailsPageReader } from '../../related_components/DetailsPageReader';
import { CreationForm } from '../../related_components/CreationForm';
import fs from 'fs';
import path from 'path/win32';
import process from 'process';

export type FieldInputType = 'dropdown' | 'date' | 'text';

export type ReportFieldMapping<T> = 
{
    [K in keyof T]: { label: string; type: FieldInputType };
};

export abstract class BaseReconReportPage<T> extends BasePage 
{
    public readonly detailsReader: DetailsPageReader;
    public readonly creationForm: CreationForm;
    protected abstract readonly fieldMapping: ReportFieldMapping<T>;

    constructor(page: Page, URL: RegExp) 
    {
        super(page, URL);
        this.detailsReader = new DetailsPageReader(page);
        this.creationForm = new CreationForm(page);
    }

    public async downloadReport(buttonName: string = 'Download .csv file'): Promise<void> 
    {
        await this.page.waitForLoadState('networkidle');
        const tempFilePath = path.join(process.cwd(), `report_${Date.now()}.csv`);
        
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.detailsReader.clickActionButton(buttonName)
        ]);

        await download.saveAs(tempFilePath);
        
        try 
        {
            const stats = fs.statSync(tempFilePath);
            expect(stats.size, 'CSV file should not be empty').toBeGreaterThan(0);
        } 
        finally 
        {
            if (fs.existsSync(tempFilePath)) 
            {
                fs.unlinkSync(tempFilePath);
            }
        }
    }

    public async createNewReport(reportParameters: Partial<T>, saveButtonName: string = 'Export to csv'): Promise<void>
    {
        await this.detailsReader.clickActionButton('Create new report');

        for (const [key, value] of Object.entries(reportParameters)) 
        {
            if (value === undefined || value === null) 
            {
                continue;
            }
            
            const config = this.fieldMapping[key as keyof T];

            if (!config)
            {
                throw new Error(`Mapping for field "${key}" not found.`);
            } 
            switch (config.type) 
            {
                case 'dropdown':
                    await this.creationForm.selectDropDown(config.label, value as string);
                    break;
                case 'date':
                    await this.creationForm.fillDateInput(config.label, value as string);
                    break;
                case 'text':
                    await this.creationForm.fillInputField(config.label, value as string);
                    break;
            }
        }

        await this.creationForm.save(saveButtonName); 
    }
}