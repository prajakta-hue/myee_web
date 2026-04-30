import {test, expect, Locator} from '@playwright/test'

test("verify login", async({page})=>{

    await page.goto("https://business.ee.co.uk/", {waitUntil: 'domcontentloaded'});


    // const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'})))
    // await cookie.click();

    const login:Locator= await page.locator('a.component-ee-global-masthead__log-in')
    await expect(login).toBeVisible();
    await login.click();


    await page.locator("//input[@type='text']").fill('satikosarep9@gmail.com')
    await page.getByRole('button', {name: 'Next'}).click()

    await expect(page.locator("//input[@type='password']")).toBeVisible();
    await page.locator("//input[@type='password']").fill('Prajakta@2206')
    await page.getByRole('button', {name: 'Next'}).click()

    // await expect(page.locator('accordion-title')).toBeVisible()
    // await page.locator('accordion-title').click();


    const texts:Locator = await page.locator('[data-testid="help-accordion-link"]');

    const text_cnt:number =  await texts.count();

    console.log("text count:", text_cnt)

    //expect(text_cnt).toBeGreaterThan(0);

    //console.log("texts list:", await texts.first().textContent());



    let textlist:string[] = await texts.allTextContents();

    console.log("texts title:", textlist);

    for(let tl of textlist)
    {
        console.log(tl);
    }

    const phones:Locator = await page.locator("//div[contains(@data-testid,'carousel-item')]");

    // const count: number = await phones.count();

    // expect(count).toBeGreaterThan(0);

    // const cntctlnk:Locator =  await page.locator("//a[text()='Contact us']")
    // expect(cntctlnk).toBeVisible();

    
    const searchButton = page.getByTestId('search-open-button');

    await expect.soft(searchButton).toBeVisible();
    await searchButton.click();

    await expect(page.locator("input.SearchInput-module_search-input__text__Brc1x")).toBeVisible();
    await page.locator("input.SearchInput-module_search-input__text__Brc1x").click();








})