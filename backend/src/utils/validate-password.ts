export const validatePassword = (password: string) => {
    let asciiLowerCase = []
    let asciiUpperCase = []
    let numbers = []
    let symbols = []
    let passwordList = []

    for(let i=65; i<=90; i++){
        asciiUpperCase.push(String.fromCharCode(i))
    }

    for(let j=97; j<= 122; j++){
        asciiLowerCase.push(String.fromCharCode(j))
    }

    for(let k=48; k<= 57; k++){
        numbers.push(String.fromCharCode(k))
    }

    for(let l=33; l<= 47; l++){
        symbols.push(String.fromCharCode(l))
    }

    for(let m=58; m<= 64; m++){
        symbols.push(String.fromCharCode(m))
    }

}