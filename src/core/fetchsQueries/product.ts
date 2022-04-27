import { BASE_URL } from '../http-const';
export const searchProduct = (payload) => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/products?` +  new URLSearchParams(payload) , {
            method: 'GET'
        }).then(
            response => response.json() 
        ).then(
            response => {
                if(response.success){
                    resolve(response.data);
                }
                else {
                    throw response.message;
                }
            }
        ).catch(
            error => reject(error)
        );
    })
};