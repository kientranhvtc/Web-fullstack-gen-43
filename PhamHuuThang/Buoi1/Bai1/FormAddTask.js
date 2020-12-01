const $template = document.getElementById("form-add-task-template")
let data=[];

class FormAddTask extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$formAddTask=this.shadowRoot.querySelector(".form-add-task")
        this.$formAddTask.onsubmit = (e) => {
            e.preventDefault();
            // this.addTask();
            this.handle();
            this.$formAddTask.reset();
        }
    }
    handle() {
        let content = this.$formAddTask.content.value.trim();
        // validate
        if (content == '') {
            alert('Input your content');
        } else {
            // định nghĩa event
            let addTaskEvent = new CustomEvent('add-task-event', {
                bubbles: true,
                detail: {
                    content: content, 
                }
            });

            // phát addTaskEvent từ form-add-task
            this.dispatchEvent(addTaskEvent);
        }       
    }
  
}

window.customElements.define("form-add-task", FormAddTask);