import {test, expect, Locator} from "@playwright/test";

test("Verify login functionality", async({page})=>{

    await page.goto("https://business.ee.co.uk/");

        const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
        await cookie.click();

        const login:Locator= await page.locator('a.component-ee-global-masthead__log-in')
        await expect(login).toBeVisible();
        await login.click();

        await page.locator("//input[@type='text']").fill('satikosarep9@gmail.com')
        await page.getByRole('button', {name: 'Next'}).click()

        await expect(page.locator("//input[@type='password']")).toBeVisible();
        await page.locator("//input[@type='password']").fill('Prajakta@2206')
        await page.getByRole('button', {name: 'Next'}).click()

        await expect(page.locator("button[aria-label='Search'] span[class='lc-IconButton-content']")).toBeVisible();

        //await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();

        await page.locator("button[aria-label='Search'] span[class='lc-IconButton-content']").fill('iphone')


});


test("Verify Search functionality", async({page})=>{

    await page.goto("https://business.ee.co.uk/",  {waitUntil: 'domcontentloaded'});

    const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
    await cookie.click();

    await expect(page.locator("button[class='eed-header__control eed-header-search-toggle']")).toBeVisible();
    await page.locator("button[class='eed-header__control eed-header-search-toggle']").click();
    await expect(page.locator("//input[@id='q']")).toBeVisible();
    await page.locator("//input[@id='q']").fill('iphone')
    await expect(page.locator('#searchform-submit')).toBeVisible();
    await page.locator('#searchform-submit').click();

});

test("Verify filter/sort funtionality", async({page})=>{

    await page.goto("https://business.ee.co.uk/");

    const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
    await cookie.click();

    const phone:Locator = page.getByRole('link', { name: 'Phones' }).nth(0);
    await expect(phone).toBeVisible();
    await phone.nth(0).click();

    await expect(page.getByRole('button', {name: 'Filters'})).toBeVisible();
    //await page.getByRole('button', {name: 'Filters'}).click();


    await Promise.all([page.getByTestId("test-drawer-main-wrapper"), {state: 'visible',timeout: 15000,},
    page.getByRole('button', { name: 'Filters' }).click(),
    
]);
    await page.waitForTimeout(7000);
    await page.getByRole('combobox').click();
    
    await page.getByRole('option', {name: 'Monthly price (low to high)'}).click();


    const items:Locator = await page.locator('.s-16acpgc')
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


test("Verify product added to cart", async({page})=>{


    await page.goto("https://business.ee.co.uk/phones/");

    const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
    await cookie.click();


    await expect(page.locator("//a[@href='/phones/samsung/samsung-galaxy-s26-ultra/']")).toBeVisible();

    await page.locator("//a[@href='/phones/samsung/samsung-galaxy-s26-ultra/']").click();

    //await expect(page.locator('.eb9j5l43')).toBeVisible();

    const cap:Locator = await page.locator('.s-106lmnl span.ewzfj073')
    const cap_cnt:number= await cap.count();

    

    for(let i=0; i<cap_cnt; i++)
    {
        const cp:any = await cap.nth(i).textContent();


        if(cp == '256GB' )
        {
            await cap.nth(i).click();
            break;
        }


    }

    const plans:Locator = await page.locator(".product-filter-btn span.arc-Heading")
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
    await page.waitForTimeout(2000)
    await expect(page.getByTestId("add-to-button")).toBeVisible();
    await page.getByTestId("add-to-button").click();
            
})


// test("Veridy add to basket", async({page})=>{

//     await page.goto("")

// })

test("Verify buttons on page are enabled/disabled", async({page})=>{

    page.goto("https://business.ee.co.uk/")

    const cookie:Locator = await (page.getByRole('button', {name: 'Reject all'}))
    await cookie.click();


    const buttons:Locator= await page.locator("button[type='button']")
    const count = await buttons.count();


    for (let i=0; i<count; i++){
        const btn = buttons.nth(i);

        if (await btn.isEnabled()){
            console.log(`Button ${i} is enabled`);
        }
        expect(btn).toBeEnabled();

    }
    //


})

test("Verify homepage loads within accptable time", async({page})=>{

    await page.goto("https://business.ee.co.uk/");

    await expect(page).toHaveURL("https://business.ee.co.uk/", {timeout:3000} )

})

test.only("verify images loads correctly", async({page})=>{

    //await page.goto("http://satikosarep9@gmail.com:Prajakta@2206@business.ee.co.uk/")

    await page.goto("https://business.ee.co.uk/")

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




