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
                  tasks: [["Do Hw 1"], ["Do Hw 2"], ["Do Hw 3"], ["Do Hw 4"],
                  ["Do Hw 5"], ["Do Hw 6"], ["Do Hw 7"]],
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
        //TODO: must switch url before submitting
        await page.goto('http://127.0.0.1:5501/source/welcomePage.html');
    });

    //Given that user has not yet signed up, warning message must be displayed
    it('username does not exist, warning message displayed', async () => {
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

      //User who exists should be able to login. At login, their information storage to
      //local storage should be retrievable 
      it('username exist correctly with correct information in localstorage', async () => {
        //Look at before all method. User is signed up
        await page.$eval('input[name=username]', el => el.value = 'userOne');

        await page.waitForSelector('input[name=password]');
        await page.$eval('input[name=password]', el => el.value = '12345')
        await page.click('button[type="submit"]');
        
        //retrieve user's information
        let retrieveUsername = await page.evaluate(() => {
          return localStorage.getItem('user');
        });

        //After user who exists login, their information in local storage be able to be retrieved
        //from the home page
        expect(retrieveUsername).toBe(`{\"username\":\"userOne\",\"tasks\":[["Do Hw 1"],["Do Hw 2"],["Do Hw 3"],["Do Hw 4"],["Do Hw 5"],["Do Hw 6"],["Do Hw 7"]]}`);
      }, 10000);

});