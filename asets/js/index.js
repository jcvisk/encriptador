(()=>{
const CARACTERES_PERMITIDOS = /[^a-zA-Z0-9\s]/;
const CLAVES = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
}
const CLAVES_REGEX = new RegExp(Object.keys(CLAVES).join('|'), 'g');

const btnCopiar = document.getElementById('copiar');
const btnEncriptar = document.getElementById('encriptarBtn');
const btnDesencriptar = document.getElementById('desencriptarBtn');
const input = document.getElementById('input');
const output = document.getElementById('output');
const mensajeOutput = document.getElementById('mensajes');
const invalidTextContainer = document.getElementById('invalidText');
const msjCopiado = document.getElementById('msjCopiado');
const errorCopiar = document.getElementById('errorCopiar');

btnEncriptar.addEventListener('click', function () {
    const texto = input.value.toLowerCase();
    const isValid = validarInputText(texto);
    if(!isValid) return;

    output.textContent = encriptador(texto);
});

btnDesencriptar.addEventListener('click', function () {
    const texto = input.value.toLowerCase();
    const isValid = validarInputText(texto);
    if(!isValid) return;

    output.textContent = desencriptador(texto);
});

btnCopiar.addEventListener('click', function () {
    const text = output.textContent;
    if(!text) {
        errorCopiar.classList.remove('d-none');
        setTimeout(() => {
            errorCopiar.classList.add('d-none');
        }, 1000);

        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand('copy');

    document.body.removeChild(textarea);

    msjCopiado.classList.remove('d-none');
    setTimeout(() => {
        msjCopiado.classList.add('d-none');
    }, 1000);
});

const validarInputText = (texto) => {
    output.textContent = "";
    //valido que no este vacio
    if (!texto) {
        invalidTextContainer.classList.remove('d-none');
        return false;
    }
    //valido que no contenga caracteres especiales
    if (CARACTERES_PERMITIDOS.test(texto)) {
        mensajeOutput.textContent = "El texto contiene caracteres especiales";
        invalidTextContainer.classList.remove('d-none');
        return false;
    }

    invalidTextContainer.classList.add('d-none');
    mensajeOutput.textContent = "";
    return true;
}




const encriptador = (texto) => {
    
    // Usar la función replace con una función de devolución de llamada
    const encriptado = texto.replace(CLAVES_REGEX, function (match) {
        return CLAVES[match];
    });

    return encriptado;
}

const desencriptador = (texto) => {
    // Crear una expresión regular que coincida con las claves en reversa
    const clavesReversa = {};
    Object.keys(CLAVES).forEach(function (key) {
        clavesReversa[CLAVES[key]] = key;
    });
    const clavesReversaRegex = new RegExp(Object.keys(clavesReversa).join('|'), 'g');

    // Usar la función replace con una función de devolución de llamada
    const desencriptado = texto.replace(clavesReversaRegex, function (match) {
        return clavesReversa[match];
    });

    return desencriptado;
}

})();