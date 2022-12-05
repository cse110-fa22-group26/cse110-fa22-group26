const { Browser, default: puppeteer } = require("puppeteer");

describe('Test planner app welcome page', () => {
    beforeAll(async () => {
        await page.evaluateOnNewDocument(function () {
            window.localStorage.clear();
            //save template user to local storage
            window.localStorage.setItem(
                "user",
                JSON.stringify({
                  username: "userOne",
                  tasks: [[],[],[],[],[],[],[]],
                })
            );

            window.localStorage.setItem(
              "todoListDB",
              JSON.stringify([
                {
                  username: "userOne",
                  password: "12345",
                  tasks: [[], [], [], [],[], [], []],
                },
              ])
            );
        });
        await page.goto('https://cse110-fa22-group26.github.io/cse110-fa22-group26/source/welcomePage.html');
    });

    //Given that user has not yet signed up, warning message must be displayed
    it('username does not exist, warning message displayed', async () => {
        await page.reload();
        await page.waitForSelector('input[name=username]');
        await page.$eval('input[name=username]', el => el.value = 'joe');

        await page.waitForSelector('input[name=password]');
        await page.$eval('input[name=password]', el => el.value = '123456');

        await page.click('button[type="submit"]');

        await page.waitForSelector('p.warning-username');
        const text = await page.evaluate(() => {
            const anchor = document.querySelector('p.warning-username');
            return anchor.textContent;
        });
        expect(text).toBe("Username does not exist");
      }, 10000);

        //If user who exists tries to login, but their password is incorrect, message should be displayed
        it('username exist correctly with correct information in localstorage', async () => {
            //User log's in
            await page.reload();
            await page.waitForSelector('input[name=username]');
            await page.$eval('input[name=username]', el => el.value = 'userOne');

            await page.waitForSelector('input[name=password]');
            await page.$eval('input[name=password]', el => el.value = '1234')

            await page.click('button[type="submit"]');

            //should be notified about incorrect password
            await page.waitForSelector('p.warning-password');
            const warning = await page.evaluate(() => {
                const anchor = document.querySelector('p.warning-password');
                return anchor.textContent;
            });

            expect(warning).toBe("Incorrect Password");
        }, 10000);

      // If user exists, they should be redirected to homepage
      it('user exist, so no warning is displayed', async () => {
        await page.reload();
        const correctPage = "https://cse110-fa22-group26.github.io/cse110-fa22-group26/source/homePage.html";
        await page.waitForSelector('input[name=username]');
        await page.$eval('input[name=username]', el => el.value = 'userOne');

        await page.waitForSelector('input[name=password]');
        await page.$eval('input[name=password]', el => el.value = '12345')

        await page.click('button[type="submit"]');

        const currentWebPage = await page.evaluate(() => {
            return window.location.href
        });

        expect(currentWebPage).toBe(correctPage);

        
      }, 10000);

});