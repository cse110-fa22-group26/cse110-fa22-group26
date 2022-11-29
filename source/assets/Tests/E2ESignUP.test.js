describe('Test planner app sign up page', () => {
    // visit the homepage 
    beforeAll(async () => {
      await page.goto('https://cse110-fa22-group26.github.io/cse110-fa22-group26/source/signUp.html');
    });

    // Check to make sure that Add button can correctly add task under all weekday list
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
        expect(text).toBe("Passwords don't match!")
        // test localStorage here
      });
});