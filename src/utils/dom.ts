export default class Dom {
    createMarkup(markupname:any, text:string, parent:any, attributes:any = {}) { // on est dans une class, donc on enleve le mot "function" -> c'est donc une methode
        const markup = document.createElement(markupname);
        markup.textContent = text;
        parent.appendChild(markup);
        for (let key in attributes) {
            //console.log(`attribute`, key);
            markup.setAttribute(key, attributes[key]);
        }
        return markup;
    }
}