const { Browser, default: puppeteer } = require("puppeteer");

describe('Test planner app sign up page', () => {
    // visit the homepage 
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5501/source/signUp.html');
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
         let arr = await page.evaluate(() => {
           return localStorage.getItem('username');
         });
         expect(arr).toBe(null);       
       });

      // Check to make sure that 'Passwords don't match!' is displayed if user enters
      // two different passwords
      it('password do not match, inner text must display message', async () => {
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
  
        expect(text).toBe("Passwords don't match!");
      }, 10000);

      // When user account does not already exist and password's match, make sure
      // their information is properly added to local storage
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
    
        let retrieveUsername = await page.evaluate(() => {
          return localStorage.getItem('user');
        });
        expect(retrieveUsername).toBe(`{\"username\":\"banana\",\"tasks\":[[],[],[],[],[],[],[]]}`);
      }, 10000);

      // When user account already exists, make sure nothing correct message is displayed
      it('User already exists, "Username already exists!" is displayed', async () => {
        //go back to sign up page to test duplicate user
        await page.evaluate(() => {
          location.replace('signUp.html');
        });

        await page.waitForSelector('input[name=username]');
        await page.$eval('input[name=username]', el => el.value = 'banana');

        await page.waitForSelector('input[name=password]');
        await page.$eval('input[name=password]', el => el.value = '123');

        await page.waitForSelector('input[name=confirmPassword]');
        await page.$eval('input[name=confirmPassword]', el => el.value = '123');

        await page.click('button[type="submit"]');
    
        await page.waitForSelector('p.duplicate-username');
        const text = await page.evaluate(() => {
            const anchor = document.querySelector('p.duplicate-username');
            return anchor.textContent;
        });
        expect(text).toBe("Username already exists!");
      }, 10000);

      // When user account already exists, make sure nothing is added to localstorage
      it('User already exists, check nothing added to local storage', async () => {
        //already at sign up page

        //number of users prior to execution
        let currNumUsers = await page.evaluate(() => {
          return localStorage.length;
        });

        await page.waitForSelector('input[name=username]');
        await page.$eval('input[name=username]', el => el.value = 'banana');

        await page.waitForSelector('input[name=password]');
        await page.$eval('input[name=password]', el => el.value = '123');

        await page.waitForSelector('input[name=confirmPassword]');
        await page.$eval('input[name=confirmPassword]', el => el.value = '123');

        await page.click('button[type="submit"]');
    
        //number of users after someone with duplicate information signed up
        let numUsersAfterSubmit = await page.evaluate(() => {
          return localStorage.length;
        });
        //since a new user was not added since in the previous test we use a user with 
        //the exact credentials, the number of users should remain the same
        expect(currNumUsers).toBe(numUsersAfterSubmit);
      }, 10000);

      /*
      Tasks to test: User's with different usernames but same password and vice versa
      */
      
});