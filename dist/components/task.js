import Dom from "../utils/dom.js";
import FetchData from "../services/fetchData.js";
export default class Task extends Dom {
    id; // pour eviter redondance on a deplacer la fonction create markup dans un autre fichier et utilisé les prototypes acec class parent et enfant
    name;
    done;
    parent;
    domElets;
    constructor(id, name, done, parent) {
        super(); // obligé de faire appel au super constructeur
        // 3 propriete essentiel pour gérer nos taches
        this.id = id;
        this.name = name;
        this.done = done;
        this.parent = parent;
        //affichage 
        this.domElets = this.render(); // Affichage. on stock le retour du render dans domElets pouyr l'utiser dans manageEvents
        this.domElets.buttonValidateElt.innerText = (this.done) ? "invalider" : "valider";
        this.manageEvents(); // pour gerer les events
    }
    /**
     *
     */
    manageEvents() {
        this.domElets.buttonDeleteElt.addEventListener("click", () => {
            console.log('bouton delete');
            if (confirm("Voulez vous vraiment supprimer ?") == true) {
                FetchData.deleteTask(this.id);
                //this.domElets.articleElt.remove();
            }
            ;
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
    // quand je créer une tache, je l'affiche
    render() {
        //gestion de la class pour savoir si la tache est faite ou pas 
        const attributeClass = (this.done) ? { "class": "done" } : {};
        // const inputAdd = document.querySelector("form input").value;
        // const btnForm = document.querySelector("form button");
        const articleElt = this.createMarkup("article", "", this.parent); // on utilise this. pour appeller la fonction qui est dans l'instance.. this.createMarkup car accessible par son prototype ! 
        const h2Elt = this.createMarkup("h2", this.name, articleElt, attributeClass);
        // on doit pouvoir modifier => crééer des évents
        const buttonValidateElt = this.createMarkup("button", "Valider", articleElt);
        const buttonDeleteElt = this.createMarkup("button", "Supprimer", articleElt);
        return ({
            articleElt,
            h2Elt,
            buttonDeleteElt,
            buttonValidateElt
        });
    }
}
