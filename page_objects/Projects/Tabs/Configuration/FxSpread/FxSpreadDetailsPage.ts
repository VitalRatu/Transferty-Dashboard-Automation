import { Page, Locator, expect} from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import { DetailsPageReader } from '../../../../related_components/DetailsPageReader';

export class FxSpreadDetailsPage extends BasePage
{

    public readonly view: DetailsPageReader
    private readonly deleteModal: Locator 
    private readonly confirmDeleteButton: Locator

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/fxspread\/\d+\/?$/)

        this.view = new DetailsPageReader(page)
        this.deleteModal = this.page.locator('.ui.small.modal.transition.visible.active.Modal.live');
        this.confirmDeleteButton = this.deleteModal.getByRole('button', { name: 'Deactivate', exact: true });
    }

    public async clickEditButton(): Promise<boolean>
    {
        const isClicked = await this.view.clickActionButton('Edit')

        if(!isClicked)
        {
            return isClicked
        }
        
        await this.page.waitForURL(/\/projects\/\d+\/configurations\/fxspread\/\d+\/edit\/?$/)
        return isClicked
    }

    public async clickDeactivateButton(): Promise<boolean>
    {
        const isClicked = await this.view.clickActionButton('Deactivate')

        if(!isClicked)
        {
            return isClicked
        }

        await expect(this.deleteModal).toBeVisible();
        return isClicked
    }
}