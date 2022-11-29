// describe('Test planner app', () => {
//     // visit the homepage 
//     beforeAll(async () => {
//       await page.goto('https://cse110-fa22-group26.github.io/cse110-fa22-group26/source/homePage.html');
//     });

//     // Check to make sure that Add button can correctly add task under all weekday list
//     it('should display a new task', async () => {
//         console.log(`Checking add task button`);
//         let bottons = await page.$$('button');
//         for(let botton of bottons){
//             let button_innerText = await botton.getProperty('innerText');
//             let button_value = await button_innerText.jsonValue();
//             console.log('click botton', button_value);
//             await botton.click();
//         }

//         let task_card = await page.$('task-card');
//         console.log('task_card', task_card);

        
//       });
// });