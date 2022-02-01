/**
 * @interface
 * Interfejs produktu
 * @param {string} name - nazwa produktu
 * @param {string} description - opis produktu
 * @param {string} price - cena produktu
 */
export interface Product {
    name:string;
    description:string;
    price:number;
}