const $template = document.getElementById('task-list-template');

class TaskList extends HTMLElement {
    tasks = [];

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        // this.shadowRoot.innerHTML = $template.content;

        this.$name = this.shadowRoot.getElementById('name');
        this.$tasks = this.shadowRoot.getElementById('tasks');
        this.$formAddTask = this.shadowRoot.querySelector('form-add-task'); 
        this.$taskList = this.shadowRoot.querySelector('.task-list');
        console.log(this.$taskList);
        this.$taskList.addEventListener('add-task-event', (event) => {
            console.log(event.detail);
            this.addTask(event.detail);
        });
    }
    addTask(task) {
        this.tasks.push(task);
        this.tasks.sort();
        this.render();
    }
    render() {
        
let data=""
         this.tasks.forEach((task)=> {data+= `
            <div>
                ${task.content}">
            </div>`;
        })
        
        this.$tasks.innerHTML=data;
     console.log(this.$tasks.innerHTML);
     
    }
}

window.customElements.define('task-list', TaskList);