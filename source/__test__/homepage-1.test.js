const puppeteer = require("puppeteer");
let browser;
let page;

let isOpen = false;

beforeAll(async () => {
  const width = 1000;
  const height = 950;

  browser = await puppeteer.launch(isOpen ? option : {});

  page = await browser.newPage();

  await page.evaluateOnNewDocument(function () {
    window.localStorage.clear();

    window.localStorage.setItem(
      "user",
      JSON.stringify({
        username: "test1",
        tasks: [[], [], [], [], [], [], []],
      })
    );
    window.localStorage.setItem(
      "todoListDB",
      JSON.stringify([
        {
          username: "test1",
          password: "123",
          tasks: [[], [], [], [], [], [], []],
        },
      ])
    );
  });

  await page.setViewport({ width, height });

  await page.goto("http://127.0.0.1:5501/source/homePage.html");
});

describe("Homepage Test", () => {
  it("   There should be 7 Add buttons", async () => {
    const handle = await page.$$(".addBtn");
    expect(handle.length).toBe(7);
  });

  it(" All Add button can correctly add task under all weekday list ", async () => {
    await page.$$eval(".addBtn", (elem) => elem.forEach((e) => e.click()));
    const handle = await page.$$("task-card");
    expect(handle.length).toBe(7);
  });
});
