export default class Dom {
    createMarkup(markupname, text, parent, attributes = {}) {
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
