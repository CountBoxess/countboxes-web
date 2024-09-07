function validatePlate(placa) {

    // Expressão regular para placas no formato antigo: AAA-1234
    const regexAntiga = /^[A-Z]{3}-\d{4}$/;

    // Expressão regular para placas no formato Mercosul: AAA1A23
    const regexMercosul = /^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/;

    // Verifica se a placa corresponde a qualquer um dos formatos
    if (regexAntiga.test(placa) || regexMercosul.test(placa)) {
        return true; // Placa válida
    } else {
        return false; // Placa inválida
    }
}

export default validatePlate;