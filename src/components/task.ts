import Dom from "../utils/dom.js";
import FetchData from "../services/fetchData.js";

// pour éviter la redondance on a deplacé la fonction createMarkup dans un autre fichier et utilisé les prototypes - class parent et enfant
export default class Task extends Dom {
  id: number;
  name: string;
  done: boolean;
  parent: any;
  domElets: {
    articleElt: any;
    h2Elt: any;
    buttonDeleteElt: any;
    buttonValidateElt: any;
  };

  /**
   * Méhtode permettant de créer une instance des tâches
   * @param {number} id
   * @param {string} name
   * @param {boolean} done
   * @param {*} parent
   * @memberof Task
   */
  constructor(id: number, name: string, done: boolean, parent: any) {
    //super = super constructeur
    super();

    this.id = id;
    this.name = name;
    this.done = done;
    this.parent = parent;

    // Affichage. On assigne le retour du render dans domElets pour l'utiliser dans manageEvents
    this.domElets = this.render();
    this.domElets.buttonValidateElt.innerText = this.done
      ? "invalider"
      : "valider";
    this.manageEvents();
  }

  /**
   * Méthode permettant de s'occuper des évènements : -clique sur bouton de suppression ou de validation/invalidation
   *
   * @memberof Task
   */
  manageEvents(): void {
    this.domElets.buttonDeleteElt.addEventListener("click", () => {
      // console.log("bouton delete");
      if (confirm("Voulez vous vraiment supprimer ?") == true) {
        FetchData.deleteTask(this.id);
      }
    });

    // Gestion du clic sur le bouton Valider / Invalider
    this.domElets.buttonValidateElt.addEventListener("click", () => {
      console.log(`bouton Valider/Invalider cliqué`);

      // Changement local
      this.done = !this.done;
      this.domElets.h2Elt.classList.toggle("done");

      if (this.domElets.h2Elt.classList.contains("done"))
        this.parent.appendChild(this.domElets.articleElt);
      else {
        this.parent.prepend(this.domElets.articleElt);
      }
      // Gestion du label
      //this.domElets.buttonValidateElt.innerText = (this.done) ? "Valider" : "Invalider";

      // Appel du service
      console.log(FetchData.loadTasks());
      FetchData.patchTask(this.id, { done: this.done });
    });
  }

  /**
   * Méthode permettant d'afficher la tâche dans le DOM
   *
   * @return articleElt, h2Elt, buttonDeleteElt, buttonValidateElt,
   * @memberof Task
   */
  render(): any {
    //gestion de la class pour savoir si la tâche est faite ou pas
    const attributeClass = this.done ? { class: "done" } : {};
    // on utilise this. pour appeller la fonction qui est dans l'instance.. this.createMarkup car accessible par son prototype !
    const articleElt = this.createMarkup("article", "", this.parent);
    const h2Elt = this.createMarkup(
      "h2",
      this.name,
      articleElt,
      attributeClass
    );

    const buttonValidateElt = this.createMarkup(
      "button",
      "Valider",
      articleElt
    );
    const buttonDeleteElt = this.createMarkup(
      "button",
      "Supprimer",
      articleElt
    );

    return {
      articleElt,
      h2Elt,
      buttonDeleteElt,
      buttonValidateElt,
    };
  }
}
