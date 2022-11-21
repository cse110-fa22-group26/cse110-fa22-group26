// task shadow dom
class taskCard extends HTMLElement {
    constructor() {
      super(); // Inheret everything from HTMLElement
      
      const taskShadowOpen = this.attachShadow({ mode: "open" });
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

      const taskDiv = document.createElement("div");
      taskDiv.setAttribute("class", "tasks");
      taskDiv.innerHTML += `<input type="checkbox">
      <input type="text" name="taskName" class="input">
      <i class="fa-solid fa-trash-can icon deleteBtn"></i>
      <i class="fa-solid fa-pen-to-square icon editBtn"></i>
      <button type="submit" class="confirmBtn">Confirm</button>`;

      taskShadowOpen.appendChild(taskDiv);
    }
  
    /**
     * Called when the .data property is set on this element.
     *
     * For Example:
     * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
     * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     *
     * @param {Object} data - The data to pass into the <recipe-card>, must be of the
     *                        following format:
     *                        {
     *                          "imgSrc": "string",
     *                          "imgAlt": "string",
     *                          "titleLnk": "string",
     *                          "titleTxt": "string",
     *                          "organization": "string",
     *                          "rating": number,
     *                          "numRatings": number,
     *                          "lengthTime": "string",
     *                          "ingredients": "string"
     *                        }
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;

      let shadow = this.shadowRoot;
      let getTaskDiv = shadow.createElement("div");
      getTaskDiv.innerHTML += `<input type="checkbox">
      <input type="text" name="taskName" class="input">
      <i class="fa fa-trash icon deleteBtn"></i>
      <i class="fas fa-edit icon editBtn"></i>
      <button type="submit" class="confirmBtn">Confirm</button>`;
    }
  }
  
  customElements.define("task-card", taskCard);