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
  
  it("There should be 7 input boxes that you can enter ", async () => {
    await page.$$eval(".addBtn", (elem) => elem.forEach((e) => e.click()));

    var card = await page.$$(".task-board");
    var values = [];

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$eval("task-card", async (ele) => {
        var input = await ele.shadowRoot.querySelector('input[type="text"]');
        input.value = "test";
      });
    }

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      var val = await ele.$eval("task-card", async (ele) => {
        return await ele.shadowRoot.querySelector('input[type="text"]').value;
      });
      values.push(val);
    }

    expect(values.length).toBe(7);
  });

  it(" Monday confirm button is clicked , The task is saved to the first location in localStorage ", async () => {
    const lenIndex = 0;

    await page.$$eval(".addBtn", (elem) =>
      elem.forEach((e, index) => {
        if (index === 0) {
          e.click();
        }
      })
    );

    var card = await page.$$(".task-board");

    var ele = card[lenIndex];
    await ele.$eval("task-card", async (el) => {
      var button = await el.shadowRoot.querySelector("button");
      button.click();
    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[lenIndex].length).toBe(1);
  });

  it(" Tuesday confirm button is not clicked , The task is not saved to the second location in localStorage ", async () => {
    const lenIndex = 1;

    await page.$$eval(".addBtn", (elem) =>
      elem.forEach((e, index) => {
        if (index === 1) {
          e.click();
        }
      })
    );

    var card = await page.$$(".task-board");

    var ele = card[lenIndex];
    await ele.$eval("task-card", async (el) => {
      var button = await el.shadowRoot.querySelector("button");
      //button.click();
    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[lenIndex].length).toBe(0);
  });

  it(" Wednesday confirm button is clicked , The task is saved to the third location in localStorage ", async () => {
    const lenIndex = 2;

    await page.$$eval(".addBtn", (elem) =>
      elem.forEach((e, index) => {
        if (index === 2) {
          e.click();
        }
      })
    );

    var card = await page.$$(".task-board");

    var ele = card[lenIndex];
    await ele.$eval("task-card", async (el) => {
      var button = await el.shadowRoot.querySelector("button");
      button.click();
    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[lenIndex].length).toBe(1);
  });

  it(" Thursday confirm button is not clicked , The task is not saved to the fourth location in localStorage ", async () => {
    const lenIndex = 3;

    await page.$$eval(".addBtn", (elem) =>
      elem.forEach((e, index) => {
        if (index === 3) {
          e.click();
        }
      })
    );

    var card = await page.$$(".task-board");

    var ele = card[lenIndex];
    await ele.$eval("task-card", async (el) => {
      var button = await el.shadowRoot.querySelector("button");
      //button.click();
    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[lenIndex].length).toBe(0);
  });

  it(" Friday confirm button is clicked , The task is saved to the  fifth location in localStorage ", async () => {
    const lenIndex = 4;

    await page.$$eval(".addBtn", (elem) =>
      elem.forEach((e, index) => {
        if (index === 4) {
          e.click();
        }
      })
    );

    var card = await page.$$(".task-board");

    var ele = card[lenIndex];
    await ele.$eval("task-card", async (el) => {
      var button = await el.shadowRoot.querySelector("button");
      button.click();
    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[lenIndex].length).toBe(1);
  });

  it(" Saturday confirm button is not clicked , The task is not saved to the sixth location in localStorage ", async () => {
    const lenIndex = 5;

    await page.$$eval(".addBtn", (elem) =>
      elem.forEach((e, index) => {
        if (index === 5) {
          e.click();
        }
      })
    );

    var card = await page.$$(".task-board");

    var ele = card[lenIndex];
    await ele.$eval("task-card", async (el) => {
      var button = await el.shadowRoot.querySelector("button");
      //button.click();
    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[lenIndex].length).toBe(0);
  });

  it(" Sunday confirm button is clicked , The task is saved to the  seventh location in localStorage ", async () => {
    const lenIndex = 6;

    await page.$$eval(".addBtn", (elem) =>
      elem.forEach((e, index) => {
        if (index === 6) {
          e.click();
        }
      })
    );

    var card = await page.$$(".task-board");

    var ele = card[lenIndex];
    await ele.$eval("task-card", async (el) => {
      var button = await el.shadowRoot.querySelector("button");
      button.click();
    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[lenIndex].length).toBe(1);
  });
});
