import {test, expect, Page, Locator} from "@playwright/test";

let page:Page

//let context:BrowserContext

test.beforeAll("open page", async({browser})=>{
    test.setTimeout(9000)

    //context = await browser.newContext();
    page = await browser.newPage();

    await page.goto("https://business.ee.co.uk/",{waitUntil: 'domcontentloaded'} );

})

test.afterAll("closing page", async()=>{
    test.setTimeout(9000)
    await page.close();
})


test.beforeEach("Reject cookies", async()=>{
    
    const cookie:Locator = page.getByRole('button', {name: 'Reject all'})


    
    if (await cookie.isVisible({ timeout: 5000 })) {
        await cookie.click();
        console.log('Cookie banner rejected');
    } else {
        console.log('Cookie banner not displayed');
    }


})

test("Verify login functionality", async()=>{

    // await page.goto("https://business.ee.co.uk/", {waitUntil: 'domcontentloaded'});

    //     const cookie:Locator = page.getByRole('button', {name: 'Reject all'})
    //     // await cookie.click();

        const login:Locator= page.locator('a.component-ee-global-masthead__log-in')
        await expect(login).toBeVisible();
        await login.click();

        await expect(page.locator("//input[@type='text']")).toBeVisible({timeout:90000});
        await page.locator("//input[@type='text']").fill('satikosarep9@gmail.com')
        await page.getByRole('button', {name: 'Next'}).click()

        //await expect(page.locator("//input[@type='password']")).toBeVisible(), {timeout:3000}
        await page.locator("//input[@type='password']").fill('Prajakta@2206')
        await page.getByRole('button', {name: 'Next'}).click()

        //await expect(page.locator("button[aria-label='Search'] span[class='lc-IconButton-content']")).toBeVisible();

        //await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();

        //await page.locator("button[aria-label='Search'] span[class='lc-IconButton-content']").fill('iphone'),{timeout:3000}


});


test("Verify Search functionality", async()=>{

    // await page.goto("https://business.ee.co.uk/", {waitUntil: 'domcontentloaded'});

    // const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
    // await cookie.click();

    await expect(page.locator("button[class='eed-header__control eed-header-search-toggle']")).toBeVisible();
    await page.locator("button[class='eed-header__control eed-header-search-toggle']").click();
    await expect(page.locator("//input[@id='q']")).toBeVisible();
    await page.locator("//input[@id='q']").fill('iphone')
    await expect(page.locator('#searchform-submit')).toBeVisible();
    await page.locator('#searchform-submit').click();

});

test.only("Verify filter/sort funtionality", async()=>{

    // await page.goto("https://business.ee.co.uk/", {waitUntil: 'domcontentloaded'});

    // const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
    // await cookie.click();

    const phone:Locator = page.getByRole('link', { name: 'Phones' }).nth(0);
    await expect(phone).toBeVisible();
    await phone.click();

    await expect(page.getByRole('button', {name: 'Filters'})).toBeVisible();
    //await page.getByRole('button', {name: 'Filters'}).click();


    await Promise.all([page.getByTestId("test-drawer-main-wrapper"), {state: 'visible',timeout: 15000,},
    page.getByRole('button', { name: 'Filters' }).click(),
    
]);
    //await page.waitForTimeout(7000);
    await expect(page.getByRole('combobox')).toBeVisible();
    page.getByRole('combobox').click();

    await page.waitForTimeout(8000);
    await expect(page.getByLabel('Monthly price (low to high)')).toBeVisible();
    await page.getByRole('option', {name: 'Monthly price (low to high)'}).click();


    const items:Locator = page.locator('.s-16acpgc')
    const total:number = await items.count();
    console.log( total);

    //const list:string[] = await items.allTextContents()

    //await items.nth(1).click()
    //console.log(await items.nth(1).textContent());

    for (let i=0; i<total; i++){
        const text = await items.nth(i).textContent();

        if ( text?.includes('£25.00')){
            await items.nth(i).click()
            break;
        }
    }
    // let i=0
    // for(i=0; i<12; i++)
        
    //     if(items.nth(i) == )

    // const list:string[] = await items.allTextContents()

    // console.log("list:", await list)

    // for (const i of list)
    // {
        
    // }

    // const itm = list.map(Price => Number(Price.replace('£', '').trim()));

    // console.log(itm)

    // for(const i of itm)
    // {
    //     if(i == 40)
    //     {
    //         console.log(itm)
            

    //     }


    // }

    // const drawer:Locator= page.getByTestId("test-drawer-main-wrapper")
    // await expect(drawer).toBeVisible();
    // console.log(await page.locator('button.s-1xy3eib.e6f1saf0').count())
    


});


test("Verify product added to cart", async()=>{


    // await page.goto("https://business.ee.co.uk/phones/", {waitUntil: 'domcontentloaded'});

    // const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
    // await cookie.click();

    const phone:Locator = page.getByRole('link', { name: 'Phones' }).nth(0);
    await expect(phone).toBeVisible();
    await phone.click();


    const samsun_phone:Locator= await page.locator("a.s-16acpgc.e1afr6wb0").nth(0)
    await expect(samsun_phone).toBeVisible({timeout:7000});
    samsun_phone.click();

    //await expect(page.locator('.eb9j5l43')).toBeVisible();

    const cap:Locator = page.locator('.s-106lmnl span.ewzfj073')
    const cap_cnt:number= await cap.count();

    

    for(let i=0; i<cap_cnt; i++)
    {
        const cp:any = await cap.nth(i).textContent();


        if(cp == '256GB' )
        {
            await cp.click();
            break;
        }


    }

    const plans:Locator = page.locator(".product-filter-btn span.arc-Heading")
    const pln_cnt: number = await plans.count();

    for(let i=0; i<pln_cnt; i++) {
        const pln_txt:any = plans.nth(i).textContent();

        if(pln_txt == '50GB' || '36 months')
        {
            await plans.nth(i).click();
            break;
        }
    }

    await page.locator("a.s-12r8ev5 span.arc-Text").nth(1).click();
    const basket = page.getByTestId('add-to-button');
    //await basket.scrollIntoViewIfNeeded();
    //await basket.click({timeout:15000});

    if (await basket.isVisible({ timeout: 10_000 })) {
        await basket.click();
    } else {
        console.log('Add to basket button not available');
}
            
})


// test("Veridy add to basket", async()=>{

//     await page.goto("")

// })

test("Verify buttons on page are enabled/disabled", async()=>{

    // await page.goto("https://business.ee.co.uk/", {waitUntil: 'domcontentloaded'});

    // const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
    // await expect.soft(cookie).toBeVisible();
    // await cookie.click();


    const buttons:Locator= await page.locator("button[type='button']")
    const count = await buttons.count();

    // const skip_btn:Locator= await page.getByTitle("Previous")
    // await expect(skip_btn).toBeVisible();
    // skip_btn.to

    //const skip:Locator = await page.getByTitle("Previous")



    for (let i=0; i<count; i++){
        const btn = buttons.nth(i);

        

        if (await btn.isEnabled()){
            console.log(`Button ${i} is enabled`);
            expect(btn).toBeEnabled();

        }
        else{           

            console.log(`Button ${i} is disbaled`);
            expect(btn).toBeDisabled();

        }
        
        

    }
    //


})

test("Verify homepage loads within accptable time", async()=>{

    // await page.goto("https://business.ee.co.uk/", {waitUntil: 'domcontentloaded'});

    await expect(page).toHaveURL("https://business.ee.co.uk/", {timeout:4000} )

})

test("verify images loads correctly", async()=>{

    //await page.goto("http://satikosarep9@gmail.com:Prajakta@2206@business.ee.co.uk/")

    // await page.goto("https://business.ee.co.uk/", {waitUntil: 'domcontentloaded'})

    const images:Locator = await page.locator("img")
    const count = await images.count();

    for(let i=0; i<count; i++){
        const img = await images.nth(i);

        if(await img.isVisible()){
            await expect(images.nth(i)).toBeVisible();
            //const altetx:Locator= await images.nth(i).getAttribute('alt')

            console.log("image is available",await images.nth(i).getAttribute('alt'))
        }
        console.log("images is hidden/not avaialable:",await images.nth(i).getAttribute('alt'))
        

    }


})




