// task shadow dom
class taskCard extends HTMLElement {
    constructor() {
      super(); // Inheret everything from HTMLElement
      const shadowRoot = this.attachShadow({ mode: "open" });
    }
  
    /**
     * Called when the .data property is set on this element.
     *
     * @param {Object} data - The data to pass into the <task-card>, must be of the
     *                        following format:
     *                        {
     *                          "day": taskBoard.parentNode.id,
     *                          "taskID": newTaskID, 
     *                          "input":"", 
     *                          "checkBox":false,
     *                          "confirmDisable": false,
     *                          "inputDisable": false
     *                        }
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;

      let shadowRoot = this.shadowRoot;
      const fontAwesomeScript = document.querySelector(
        `script[src*="https://kit.fontawesome.com/8c6cfa6ebd.js"]`
      );
      const id = setInterval(() => {
        console.log('setInterval');
        const fontAwesomeFont = document.querySelector('#fa-v5-font-face');
        const fontAwesomeMain = document.querySelector('#fa-main');
        if (fontAwesomeScript && fontAwesomeFont && fontAwesomeMain) {
          shadowRoot.appendChild(fontAwesomeScript.cloneNode());
          shadowRoot.appendChild(fontAwesomeFont.cloneNode('deep'));
          shadowRoot.appendChild(fontAwesomeMain.cloneNode('deep'));
          clearInterval(id);
        }
      }, 1);
      // create new task div element
      let newTaskDiv = document.createElement('div');
      // add task element valuse.
      newTaskDiv.innerHTML += `
      <input type="checkbox">
      <input type="text" name="taskName" class="input" value=${data["input"]}>
      <i class="fa fa-trash icon deleteBtn"></i>
      <i class="fas fa-edit icon editBtn"></i>
      <button type="submit" class="confirmBtn" >Confirm</button>`;
      newTaskDiv.getElementsByTagName('input')[1].disabled = data["inputDisable"];
      newTaskDiv.getElementsByTagName('button')[0].disabled=data["confirmDisable"];
      newTaskDiv.getElementsByTagName('input')[0].checked = data["checkBox"];
      shadowRoot.appendChild(newTaskDiv);
    }
    
  }
  // define <task-card>
  customElements.define("task-card", taskCard);