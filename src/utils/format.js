export function formateaMiles(x) {
    
    if(typeof(x)!=="number") x = x.toString();

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function formateaPesos(x){
    return "$ "+formateaMiles(x)
}