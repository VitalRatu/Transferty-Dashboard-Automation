import { mergeTests } from '@playwright/test';
import { pomTest    } from './pomFixtures'   ;
import { authTest   } from './authFixtures'  ;

export const test = mergeTests(pomTest, authTest);

export { expect } from '@playwright/test';