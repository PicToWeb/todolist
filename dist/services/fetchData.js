export default class FetchData {
    static url = "http://localhost:3000/tasks";
    /**
         * VA chercher les tâches sur le serveur json-server en exécutant une requêtte http avec le verbe GET
         
         * @returns Promises <Tasks[]>
         */
    static async loadTasks() {
        return fetch(FetchData.url) // fetch = get donc récupérer
            .then(response => {
            if (response.status != 200) {
                throw new Error("pb dans loadTasks");
            }
            else
                return response.json();
        })
            .then(tasks => {
            console.log(`tasks test : `, tasks);
            return tasks;
        }) // si ca se passe bien j'arrive la 
            .catch(error => {
            console.log(`Erreur attrapée` + error);
        });
    }
    /**
     * Ajoute une tâche sur le serveur json-server en exécutant une requêtte http avec le verbe POST
     * @param {*} new_task
     * @returns Promises <Task>
     */
    static async addTask(new_task) {
        return fetch(FetchData.url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(new_task)
        })
            .then(response => {
            console.log(`status dans le post`, response.status);
            if (response.status != 200) {
                throw new Error("Pb dans addTask");
            }
            else
                return response.json();
        })
            .then(task => {
            console.log(`task retounré après un post :`, task);
            return task;
        })
            .catch(error => {
            console.log(`Erreur attrapée dans addTask` + error);
        });
    }
    static async patchTask(id, updatedTask) {
        return fetch(`${FetchData.url}/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify(updatedTask)
        })
            .then(response => {
            console.log(`status dans le post`, response.status);
            if (response.status) {
                throw new Error("Pb dans patchTask");
            }
            else
                return response.json();
        })
            .then(task => {
            console.log(`task retounré après un post :`, task);
            return task;
        })
            .catch(error => {
            console.log(`Erreur attrapée dans patchTask` + error);
        });
    }
    static async deleteTask(id, deleteTask) {
        return fetch(`${FetchData.url}/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(deleteTask)
        })
            .then(response => {
            console.log(`status dans le post`, response.status);
            if (response.status) {
                throw new Error("Pb dans deleteTask");
            }
            else
                return response.json();
        })
            .then(task => {
            console.log(`task retounré après une suppression :`, task);
            return task;
        })
            .catch(error => {
            console.log(`Erreur attrapée dans deleteTask` + error);
        });
    }
}
