import Dom from "../utils/dom.js";
import Task from "./task.js";
import FetchData from "../services/fetchData.js";
export default class TodoList extends Dom {
    rootDom;
    domElts;
    constructor() {
        super();
        // Référence à l'élément du DOM existant qui a pour id "root"
        this.rootDom = document.getElementById("root");
        // Création des éléments du DOM
        this.domElts = this.render();
        // Gestion des événements
        this.manageEvents();
        // Import des tâches
        (async () => {
            const tasks = await FetchData.loadTasks();
            console.log(`taches dans le constructeur de TodoList`, tasks);
            console.log(`this`, this);
            this.renderTasks(tasks);
        })();
    }
    manageEvents() {
        this.domElts.form.addEventListener("submit", (event) => {
            console.log(`Dans submit addEventListener`);
            // Supprimer l'appel de la requête http via l'action du formulaire avec la méthode GET
            event.preventDefault();
            // Récupération des données envoyées par le formulaire
            const taskName = this.domElts.input.value;
            if (taskName) {
                // Création d'une tâche
                const new_task = {
                    name: taskName,
                    done: false,
                };
                new Task(Math.floor(Math.random() * 1000), new_task.name, new_task.done, this.domElts.sectionListTasks);
                this.domElts.input.value = "";
                // Ajout de la tâche sur le serveur via FechData.addTask(new_task)
                FetchData.addTask(new_task);
            }
        });
    }
    render() {
        // const form = document.querySelector("form");
        const form = this.createMarkup("form", "", this.rootDom);
        const label = this.createMarkup("label", "Tâche : ", form, { for: "task" });
        const input = this.createMarkup("input", "", form, {
            id: "task",
            type: "text",
        });
        const buttonSubmit = this.createMarkup("button", "Ajouter une tâche", form, { id: "task", type: "submit" });
        //création de l'element section qui comprend toutes les taches
        const sectionListTasks = this.createMarkup("section", "", this.rootDom);
        return {
            form,
            input,
            sectionListTasks,
        };
    }
    // renderTasks(tasks){
    //     tasks.forEach(task =>{
    //         new Task(task.id,task.name,task.done,this.domElts.sectionListTask);
    //     })
    // }
    renderTasks(tasks) {
        tasks
            .sort((a, b) => {
            return a.done - b.done;
        })
            .forEach((task) => {
            new Task(task.id, task.name, task.done, this.domElts.sectionListTasks);
        });
    }
}
