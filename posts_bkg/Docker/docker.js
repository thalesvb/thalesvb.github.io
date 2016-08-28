function type(element, character) {
    element.innerText += character;
}

function readText() {
    var element = document.getElementById("dockerfile");
    var text = element.innerText;
    return [element, text];
}