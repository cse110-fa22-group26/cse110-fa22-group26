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

  await page.goto("https://cse110-fa22-group26.github.io/cse110-fa22-group26/source/homePage.html");
});

describe("Homepage Test", () => {
  // Add button tests
  it("There should be 7 Add buttons", async () => {
    const handle = await page.$$(".addBtn");
    expect(handle.length).toBe(7);
  });

  it("All Add button can correctly add task under all weekday list", async () => {
    await page.$$eval(".addBtn", (elem) => elem.forEach((e) => e.click()));
    const handle = await page.$$("task-card");
    expect(handle.length).toBe(7);
  });
  
  it("There should be 7 input boxes that you can enter", async () => {
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

  // confirm button tests
  it("Monday confirm button is clicked, the task is saved to the first location in localStorage", async () => {
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

  it("Tuesday confirm button is not clicked, the task is not saved to the second location in localStorage", async () => {
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

  it("Wednesday confirm button is clicked, the task is saved to the third location in localStorage", async () => {
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

  it("Thursday confirm button is not clicked, the task is not saved to the fourth location in localStorage", async () => {
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

  it("Friday confirm button is clicked, the task is saved to the fifth location in localStorage", async () => {
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

  it("Saturday confirm button is not clicked, the task is not saved to the sixth location in localStorage", async () => {
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

  it("Sunday confirm button is clicked, the task is saved to the seventh location in localStorage", async () => {
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

  // delete button tests
  it("Monday delete button is clicked, the task is deleted from the localStorage ", async () => {
    const lenIndex = 0;

    var card = await page.$$(".task-board");

    var ele = card[lenIndex];
    await ele.$eval("task-card", async (el) => {
      var button = await el.shadowRoot.childNodes[0].getElementsByClassName("deleteBtn")[0];
      button.click();
    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[lenIndex].length).toBe(0);
  });

  // Edit button tests
   it("Sunday edit button is clicked, the input box is open", async () => {
    const lenIndex = 6;

    var card = await page.$$(".task-board");

    var ele = card[lenIndex];
    const disable = await ele.$eval("task-card", async (el) => {
      var button = await el.shadowRoot.childNodes[0].getElementsByClassName("editBtn")[0];
      button.click();
      var input = await el.shadowRoot.childNodes[0].getElementsByTagName("input")[1];
      return input.disabled;
    });
    expect(disable).toBe(false);
  });

  // Checking to make sure that it remembers the deletion after we refresh the page
  it("Checking number of Monday tasks after reload", async () => {
    await page.reload();

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[0].length).toBe(0);
  });

  it("All delete icon can correctly delete certain task from ui", async () => {

    await page.$$eval(".addBtn", (elem) => elem.forEach((e) => e.click()));

    var card = await page.$$(".task-board");

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$eval("task-card", async (ele) => {
        var input = await ele.shadowRoot.querySelector('input[type="text"]');
        input.value = "test";
        var button = await ele.shadowRoot.querySelector("button");
        button.click();
      });
    }

    const list1 = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list1.find((item) => item.username === "test1") || {
      tasks: [],
    };

    var addLen = userInfo.tasks.reduce((previousValue, currentValue) => {
      return currentValue.length + previousValue;
    }, 0);

    var card = await page.$$(".task-board");

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$eval("task-card", async (ele) => {
        var del = await ele.shadowRoot.querySelector(".deleteBtn");
        del.click();
      });
    }

    const list2 = await page.$$("task-card");

    expect(list2.length).toBe(addLen-7);
  });

  it("All delete icon can correctly delete certain task from localStorage", async () => {
    await page.$$eval(".addBtn", (elem) => elem.forEach((e) => e.click()));

    var card = await page.$$(".task-board");

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$eval("task-card", async (ele) => {
        var input = await ele.shadowRoot.querySelector('input[type="text"]');
        input.value = "test";

        var add = await ele.shadowRoot.querySelector("button");
        add.click();

        var del = await ele.shadowRoot.querySelector(".deleteBtn");
        del.click();
      });
    }

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    var addLen = userInfo.tasks.reduce((previousValue, currentValue) => {
      return currentValue.length + previousValue;
    }, 0);

    expect(addLen).toBe(0);
  });

  it("All delete clicked, works also after refresh", async () => {
    await page.reload();

    var card = await page.$$("task-card");

    expect(card.length).toBe(0);
  });

  it("All confirm button clicked, the input box is disabled", async () => {
    await page.$$eval(".addBtn", (elem) => elem.forEach((e) => e.click()));

    var card = await page.$$(".task-board");

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$eval("task-card", async (ele) => {
        var input = await ele.shadowRoot.querySelector('input[type="text"]');
        input.value = "test";

        var add = await ele.shadowRoot.querySelector("button");
        add.click();
      });
    }

    const values = [];

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      var val = await ele.$eval("task-card", async (ele) => {
        return await ele.shadowRoot
          .querySelector('input[type="text"]')
          .getAttribute("disabled");
      });
      values.push(val);
    }

    var isAllEdit = true;

    values.forEach((second) => {
      if (second == null) {
        isAllEdit = false;
      }
    });

    expect(isAllEdit).toBe(true);

  });

  it("All edit icon can open the input box", async () => {
    var card = await page.$$(".task-board");

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$eval("task-card", async (ele) => {
        var edit = await ele.shadowRoot.querySelector(".editBtn");
        edit.click();
      });
    }

    const values = [];

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      var val = await ele.$eval("task-card", async (ele) => {
        return await ele.shadowRoot
          .querySelector('input[type="text"]')
          .getAttribute("disabled");
      });
      values.push(val);
    }
    var isAllEdit = false;

    values.forEach((second) => {
      if (second !== null) {
        isAllEdit = true;
      }
    });

    expect(isAllEdit).toBe(false);
  });

  it("The Monday confirm button is clicked - the task is saved in localStorage", async () => {
    await page.$$eval(".addBtn", (elem) =>
      elem.forEach((e, index) => {
        if (index === 0) {
          e.click();
        }
      })
    );

    var card = await page.$$(".task-board");

    var ele = card[0];
    await ele.$eval("task-card", async (el) => {
      var input = await el.shadowRoot.querySelector('input[type="text"]');
      input.value = "test";

      var add = await el.shadowRoot.querySelector("button");
      add.click();
    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[0].length).toBe(1);
  });

  it("If the Monday confirm button is clicked, task is updated in localStorage", async () => {
    var card = await page.$$(".task-board");

    var ele = card[0];
    await ele.$eval("task-card", async (el) => {
      var edit = await el.shadowRoot.querySelector(".editBtn");
      edit.click();

      var input = await el.shadowRoot.querySelector('input[type="text"]');
      input.value = "test-update";

      var add = await el.shadowRoot.querySelector("button");
      add.click();
    });

    var taskID = await page.$eval("task-card", (elem) => elem.id);
    console.log("taskID -> :", taskID);

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[0][0].input).toBe("test-update");
  });

  it("If the Monday confirm button is not clicked, task is not updated in localStorage", async () => {
    var card = await page.$$(".task-board");

    var ele = card[0];
    await ele.$eval("task-card", async (el) => {
      var edit = await el.shadowRoot.querySelector(".editBtn");
      edit.click();

      var input = await el.shadowRoot.querySelector('input[type="text"]');
      input.value = "test-update-again";

    });

    const list = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("todoListDB"));
    });

    var userInfo = list.find((item) => item.username === "test1") || {
      tasks: [],
    };

    expect(userInfo.tasks[0][0].input).toBe("test-update");
  });

  it("all task is checked", async () => {
    await page.$$eval(".addBtn", (elem) => elem.forEach((e) => e.click()));

    var card = await page.$$(".task-board");
    var values = [];

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$eval("task-card", async (ele) => {
        var input = await ele.shadowRoot.querySelector('input[type="text"]');
        input.value = "test";

        var add = await ele.shadowRoot.querySelector("button");
        add.click();

        var checkbox = await ele.shadowRoot.querySelector(
          'input[type="checkbox"]'
        );
        checkbox.click();
      });
    }

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      var val = await ele.$eval("task-card", async (ele) => {
        return await ele.shadowRoot.querySelector('input[type="checkbox"]')
          .checked;
      });
      values.push(val);
    }

    console.log("values -> :", values[0]);

    var isAllChecked = true;

    values.forEach((second) => {
      if (second == false) {
        isAllChecked = false;
      }
    });

    expect(JSON.stringify([values.length, isAllChecked])).toBe(JSON.stringify([7,true]));
  });

  it("it still marked with checkbox after page refresh", async () => {
    const todoListDB = await page.evaluate(() => {
      return Promise.resolve(localStorage.getItem("todoListDB"));
    });

    const user = await page.evaluate(() => {
      return Promise.resolve(localStorage.getItem("user"));
    });

    await page.evaluateOnNewDocument(
      (todoListDB, user) => {
        window.localStorage.clear();

        window.localStorage.setItem("todoListDB", todoListDB);
        window.localStorage.setItem("user", user);
      },
      todoListDB,
      user
    );

    await page.reload();

    var card = await page.$$(".task-board");
    var values = [];

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      var val = await ele.$eval("task-card", async (ele) => {
        return await ele.shadowRoot.querySelector('input[type="checkbox"]')
          .checked;
      });
      values.push(val);
    }

    var isAllChecked = true;

    values.forEach((second) => {
      if (second == false) {
        isAllChecked = false;
      }
    });

    expect(JSON.stringify([values.length, isAllChecked])).toBe(JSON.stringify([7,true]));
  });

  it("When all tasks are completed, the progress bar should be 100% ", async () => {
    let style = await page.$eval("#top-progress", (el) =>
      el.getAttribute("style")
    );
    expect(style).toBe("width: 100%;");
  });

  it("After all data is initialized and refreshed ", async () => {
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
    await page.reload();

    let width = await page.$eval("#top-progress", (el) => el.style.width);
    expect(width).toBe("0%");

    var card = await page.$$("task-card");
    expect(card.length).toBe(0);
  });

  // 0%
  it("Create four tasks per day and you should have a total of 28 tasks and all progress bars should be 0%", async () => {
    await page.$$eval(".addBtn", (elem) =>
      elem.forEach((e) => {
        e.click();
        e.click();
        e.click();
        e.click();
      })
    );

    var card = await page.$$(".task-board");

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$$eval("task-card", async (ele) => {
        ele.forEach(async (second, index) => {
          var add = await second.shadowRoot.querySelector("button");
          add.click();
        });
      });
    }

    let bigWidth = await page.$eval("#top-progress", (el) => el.style.width);
    expect(bigWidth).toBe("0%");

    var shadow = await page.$$("task-card");
    expect(shadow.length).toBe(28);

    const subProgress = await page.$$(".collapsible");
    const values = [];
    const texts = [];
    for (let i = 0; i < subProgress.length; i++) {
      var ele = subProgress[i];
      var width = await ele.$eval(".progress", async (ele) => {
        return await ele.style.width;
      });

      var text = await ele.$$eval("span", async (ele) => {
        return await ele[1].textContent.replace(/[\s\n]/gi, "");
      });

      values.push(width);
      texts.push(text);
    }
    var isAllEdit = false;
    var isHalf = false;

    values.forEach((second) => {
      if (second !== "0%") {
        isAllEdit = true;
      }
    });

    texts.forEach((second) => {
      if (second !== "(4Tasks,0Done)") {
        isHalf = true;
      }
    });

    expect(isAllEdit).toBe(false);
    expect(isHalf).toBe(false);
  });

  //   50%
  it("With the first two tasks completed each day, all progress bars should be 50%", async () => {
    var card = await page.$$(".task-board");

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$$eval("task-card", async (ele) => {
        ele.forEach((second, index) => {
          if (index < 2) {
            var checkbox = second.shadowRoot.querySelector(
              'input[type="checkbox"]'
            );
            checkbox.click();
          }
        });
      });
    }

    let bigWidth = await page.$eval("#top-progress", (el) => el.style.width);
    expect(bigWidth).toBe("50%");

    var shadow = await page.$$("task-card");
    expect(shadow.length).toBe(28);

    const subProgress = await page.$$(".collapsible");
    const values = [];
    const texts = [];
    for (let i = 0; i < subProgress.length; i++) {
      var ele = subProgress[i];
      var width = await ele.$eval(".progress", async (ele) => {
        return await ele.style.width;
      });

      var text = await ele.$$eval("span", async (ele) => {
        return await ele[1].textContent.replace(/[\s\n]/gi, "");
      });

      values.push(width);
      texts.push(text);
    }
    var isAllEdit = false;
    var isHalf = false;

    values.forEach((second) => {
      if (second !== "50%") {
        isAllEdit = true;
      }
    });

    texts.forEach((second) => {
      if (second !== "(4Tasks,2Done)") {
        isHalf = true;
      }
    });

    expect(isAllEdit).toBe(false);
    expect(isHalf).toBe(false);
  });

  //   100%
  it("When deleting the last two tasks of each day,should have a total of 14 tasks and  all progress bars should be 100%", async () => {
    var card = await page.$$(".task-board");

    for (let i = 0; i < card.length; i++) {
      var ele = card[i];
      await ele.$$eval("task-card", async (ele) => {
        ele.forEach((second, index) => {
          if (index >= 2) {
            var del = second.shadowRoot.querySelector(".deleteBtn");
            del.click();
          }
        });
      });
    }

    let bigWidth = await page.$eval("#top-progress", (el) => el.style.width);
    expect(bigWidth).toBe("100%");

    var shadow = await page.$$("task-card");
    expect(shadow.length).toBe(14);

    const subProgress = await page.$$(".collapsible");
    const values = [];
    const texts = [];

    for (let i = 0; i < subProgress.length; i++) {
      var ele = subProgress[i];
      var width = await ele.$eval(".progress", async (ele) => {
        return await ele.style.width;
      });
      var text = await ele.$$eval("span", async (ele) => {
        return await ele[1].textContent.replace(/[\s\n]/gi, "");
      });

      values.push(width);
      texts.push(text);
    }
    var isAllEdit = false;
    var isHalf = false;

    values.forEach((second) => {
      if (second !== "100%") {
        isAllEdit = true;
      }
    });
    texts.forEach((second) => {
      if (second !== "(2Tasks,2Done)") {
        isHalf = true;
      }
    });

    expect(isAllEdit).toBe(false);
    expect(isHalf).toBe(false);
  });
  
});
