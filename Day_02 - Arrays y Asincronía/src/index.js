#!/usr/bin/env node


// Módulo nativo de Node.js para leer argumentos de línea de comandos
const process = require('process');

const sumar = (a, b) => a + b;

const restar = (a, b) => a - b;

const multiplicar = (a, b) => a * b;

function dividir(a, b) {
    if (b === 0) {
        throw new Error('No se puede dividir por cero');
    }
    return a / b;
}

function esNumeroValido(valor) {
    // parseFloat convierte string a número
    // isNaN verifica si NO es un número
    return !isNaN(parseFloat(valor)) && isFinite(valor);
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

function main() {
    
    const args = process.argv.slice(2); // extraemos elementos desde la posi 2 (2,3,4,...)

    if (args.length !== 3) {
        console.error('❌ Error: Número incorrecto de argumentos');
        process.exit(1); 
    }

    // Extraer los argumentos
    const [num1String, operacion, num2String] = args;
    //const num1String = args[0];
    //const operacion = args[1];
    //const num2String = args[2];

    // Validar que los números sean válidos
    if (!esNumeroValido(num1String) || !esNumeroValido(num2String)) {
        console.error('❌ Error: Los argumentos deben ser números válidos');
        console.log(`Recibido: "${num1String}" y "${num2String}"`);
        process.exit(1);
    }

    const num1 = parseFloat(num1String);
    const num2 = parseFloat(num2String);

    let resultado;

    try {
        switch (operacion) {
            case '+':
                resultado = sumar(num1, num2);
                break;
            
            case '-':
                resultado = restar(num1, num2);
                break;
            
            case '*':
            case 'x':
                resultado = multiplicar(num1, num2);
                break;
            
            case '/':
                resultado = dividir(num1, num2);
                break;
            
            default:
                console.error(`❌ Error: Operación "${operacion}" no reconocida`);
                console.log('\n💡 Operaciones válidas: +, -, *, /');
                process.exit(1);
        }

        // Mostrar el resultado
        mostrarResultado(num1, operacion, num2, resultado);

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}


function mostrarResultado(num1, op, num2, resultado) {
    console.log(`
***********************************************
            🧮 R E S U L T A D O 
***********************************************

   ${num1} ${op} ${num2} = ${resultado}

✅ Operación completada exitosamente
    `);
}


// Ejecutar la función principal
main();