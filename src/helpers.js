export const htmlDecode = (content) => {
    if(content!='' && typeof document !== "undefined"){
        let txt = content;
        let e = document.createElement('div');
        e.innerHTML = content;
        return e.childNodes.length === 0 ? txt : e.childNodes[0].nodeValue;
    }
    return '';
}

export const txtSlice = (txt,limit=100) => {
    const string = txt.replace(/(<([^>]+)>)/gi, "");
    return string.substring(0, limit)+"...";
}