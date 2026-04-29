import {test, expect, Locator} from '@playwright/test'

test("Verify title", async ({page})=>{

    await page.goto("https://business.ee.co.uk/");
    let title:Locator = await page.getByLabel('EE Logo')
    await expect(title).toBeVisible()
    await expect(page.getByText('Shop by category')).toBeVisible()
    await expect(page.getByAltText('iPhone 17 5G 256GB')).toBeVisible()
    const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
    await cookie.click();
    await page.getByLabel('Search').first().click()
    await page.getByPlaceholder('Search').first().fill('iphone')
    await page.getByRole('button', {name : 'Close Search'}).click()
    await expect(page.getByTitle('View April deals')).toBeVisible()
    const login:Locator= await page.locator('a.component-ee-global-masthead__log-in')
    await expect(login).toBeVisible();
    await login.click();
        //console.log("title:", title)

    await page.getByLabel('Email or username').fill('Prajakta');
    
    


});

