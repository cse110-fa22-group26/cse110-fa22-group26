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

