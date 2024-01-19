export function formateaMiles(x) {
    
    if(typeof(x)!=="number") x = x.toString();

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function formateaPesos(x){
    return "$ "+formateaMiles(x)
}

export function validaTextoIngresado(x){
    const validacion =(txt)=>{
        
        if(txt.toString().trim()==="") return false
        return true
    }

    if(Array.isArray(x)){
        return x.every(validacion)
    }else{
        return validacion(x)
    }

}