//UNIT TESTS
// 1) If user's password don't match, make sure nothing is added to local storage. Conversely,
// if they match, check that something is added to local storage
// 2) When password's don't match, check message is displayed
// 3) Check that if user signed up correctly then it should be in our DB

/**
 * This function is responsible for checking that if the user enters two
 * different passwords, then nothing is added to localstorage
 */
//console.log(checkNothingInDB());
// function checkNothingInDB(){
//     //Manually populate, then check that local storage is empty
//     let loginForm = document.querySelector("form");
//     const user = document.getElementById('username').value = 'user';
//     const pass = document.getElementById('password').value = '1234';
//     const confPass = document.getElementById('confirmPassword').value = '123';
//     loginForm.click();
//     //expect(localStorage.length()).toBe(0);
//    // test('mismatching passwords', () => {
//         //expect(localStorage.length()).toBe(0);
//     //});
//     if(pass !== confPass) return localStorage.length === 0;
// }

// /**
//  * This function is responsible for checking that if the user enters two
//  * identical passwords, then there should be a user in local storage
//  */
//  console.log(validUser());
//  function validUser(){
//     let loginForm = document.querySelector("form");
//     const user = document.getElementById('username').value = 'user';
//     const pass = document.getElementById('password').value = '1234';
//     const confPass = document.getElementById('confirmPassword').value = '1234';
//     loginForm.click();
//     if(pass === confPass) return localStorage.length > 0;
// }

// test('mismatching passwords', () => {
//     let loginForm = document.querySelector("form");
//     const user = document.getElementById('username').value = 'user';
//     const pass = document.getElementById('password').value = '1234';
//     const confPass = document.getElementById('confirmPassword').value = '123';
//     loginForm.click();
//     expect(localStorage.length()).toBe(0);
// });
describe('Check nothing is in database', () => {
    beforeAll(async () => {
      console.log("loading");
    // First, launch a blank page
    //   const browser = await puppeteer.launch({
    //     headless: false,
    //     ignoreHTTPSErrors: true,
    //     args: [
    //         '--no-sandbox', 
    //         '--disable-setuid-sandbox'
    //     ]
    // });
    //   //Second, go to Sign Up page
    //   const pages = await browser.pages();
    //   const page = pages[0];
      await page.goto('http://127.0.0.1:5501/source/signUp.html');
    });

    it('Sign up Page - Checking nothing is in database', async () => {
        const form = await page.$('form');
        const shadow = await form.getProperty("shadowRoot");
        //from shadow get input?
        //from input type into specific field?
        expect(0).toBe(0);
    }, 10000);
  });

