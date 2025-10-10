export const suma = (a, b)=>{
    return a + b;
}

export const resta = (a, b)=>{
    return a - b;
}

export const multiplicacion = (a, b)=>{
    return a * b;
}

export const division = (a, b)=>{
    if (b === 0){
        throw new Error ("No se puede dividir por cero");
    }
    return a / b;
}

