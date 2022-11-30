const { Browser, default: puppeteer } = require("puppeteer");

describe('Test planner app sign up page', () => {
    // visit the homepage 
    beforeAll(async () => {
      await page.goto('https://cse110-fa22-group26.github.io/cse110-fa22-group26/source/signUp.html');
    });

    // Check to make sure that nothing is added to local storage if passwords don't match
     it('password unmatch, no new user adds to localStorage', async () => {
         console.log(`new user input form`);
         await page.waitForSelector('input[name=username]');
         await page.$eval('input[name=username]', el => el.value = 'banana');

         await page.waitForSelector('input[name=password]');
         await page.$eval('input[name=password]', el => el.value = '123');

         await page.waitForSelector('input[name=confirmPassword]');
         await page.$eval('input[name=confirmPassword]', el => el.value = '12');

         await page.click('button[type="submit"]');
         await page.waitForSelector('p.warning-signup');
         const text = await page.evaluate(() => {
             const anchor = document.querySelector('p.warning-signup');
             return anchor.textContent;
         });
         console.log(text);
         let arr = await page.evaluate(() => {
           return localStorage.getItem('username');
         });
         expect(arr).toBe(null);
         //expect(localStorage.getItem("username")).toBe(null);
         //expect(text).toBe("Passwords don't match!")
         // test localStorage here
         // localStorage.getItem("username") === null)        
       });

      it('password match, user added to localStorage', async () => {
        await page.reload();
        console.log(`new user input form`);
        await page.waitForSelector('input[name=username]');
        await page.$eval('input[name=username]', el => el.value = 'banana');

        await page.waitForSelector('input[name=password]');
        await page.$eval('input[name=password]', el => el.value = '123');

        await page.waitForSelector('input[name=confirmPassword]');
        await page.$eval('input[name=confirmPassword]', el => el.value = '123');

        await page.click('button[type="submit"]');
       /* await page.waitForSelector('p.warning-signup');
        const text = await page.evaluate(() => {
            const anchor = document.querySelector('p.warning-signup');
            return anchor.textContent;
        });*/
        
        let retrieveUsername = await page.evaluate(() => {
          return localStorage.getItem('user');
        });
        expect(retrieveUsername).toBe(`{\"username\":\"banana\",\"tasks\":[[],[],[],[],[],[],[]]}`);
      }, 10000);
      
      
});