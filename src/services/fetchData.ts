export default class FetchData {
  static url = "http://localhost:3000/tasks";

  /**
   * Méthode permettant de récupérer les tâches sur le serveur json-server en exécutant une requette http avec le verbe GET
   * @static
   * @return Promises <Tasks[]>
   * @memberof FetchData
   */
  static async loadTasks() {
    // fetch = get donc récupérer
    return fetch(FetchData.url)
      .then((response) => {
        if (response.status != 200) {
          throw new Error("pb dans loadTasks");
        } else return response.json();
      })
      .then((tasks) => {
        // si il n'y a pas d'erreur
        console.log(`tasks test : `, tasks);
        return tasks;
      })
      .catch((error) => {
        //console.log(`Erreur attrapée` + error);
      });
  }

  /**
   * Méthode permettant d'ajouter une tâche sur le serveur json-server en exécutant une requette http avec le verbe POST
   * @static
   * @param {{ name: any; done: boolean }} new_task
   * @return Promises <Tasks[]>
   * @memberof FetchData
   */
  static async addTask(new_task: { name: any; done: boolean }) {
    return fetch(FetchData.url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(new_task),
    })
      .then((response) => {
        console.log(`status dans le post`, response.status);
        if (response.status != 200) {
          throw new Error("Pb dans addTask");
        } else return response.json();
      })
      .then((task) => {
        console.log(`task retounré après un post :`, task);
        return task;
      })
      .catch((error) => {
        //console.log(`Erreur attrapée dans addTask` + error);
        // alert(`Erreur lors de l'ajout, la base de donnée n'est pas reliée, l'ajout va être retiré`);
        location.reload();
      });
  }

  /**
   * Méthode permettant de modifier une tâche sur le serveur json-server en exécutant une requette http avec le verbe UPDATE
   * @static
   * @param {number} id
   * @param {{ done: boolean }} updatedTask
   * @return Promises <Tasks[]>
   * @memberof FetchData
   */
  static async patchTask(id: number, updatedTask: { done: boolean }) {
    return fetch(`${FetchData.url}/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        console.log(`status dans le post`, response.status);
        if (response.status) {
          throw new Error("Pb dans patchTask");
        } else return response.json();
      })
      .then((task) => {
        console.log(`task retounré après un post :`, task);
        return task;
      })
      .catch((error) => {
        console.log(`Erreur attrapée dans patchTask` + error);
      });
  }

  /**
   * Méthode permettant de supprimer une tâche sur le serveur json-server en exécutant une requette http avec le verbe DELETE
   * @static
   * @param {number} id
   * @param {void} deleteTask
   * @return {*}
   * @memberof FetchData
   */
  static async deleteTask(id: number, deleteTask: void) {
    return fetch(`${FetchData.url}/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(deleteTask),
    })
      .then((response) => {
        console.log(`status dans le post`, response.status);
        if (response.status) {
          throw new Error("Pb dans deleteTask");
        } else return response.json();
      })
      .then((task) => {
        console.log(`task retounré après une suppression :`, task);
        return task;
      })
      .catch((error) => {
        console.log(`Erreur attrapée dans deleteTask` + error);
      });
  }
}
