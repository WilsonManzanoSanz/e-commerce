import { BASE_URL } from './http-const';
const URL = `${BASE_URL}/upload`.replace(':3001', ':3002');

export const uploadFile = (file) => {
    const data = new FormData();
    data.append('photo', file  );
    data.append('name', file.name);
    return new Promise((resolve, reject) => {
        fetch(URL, { // Your POST endpoint
            method: 'POST',
            body: data // This is your file object
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            response => {
                if(response.success){
                    response.data.path = `${response.data.location}`;
                    resolve(response.data);
                }
                else {
                    throw response.message;
                }
            } // Handle the success response object
        ).catch(
            error => reject(error) // Handle the error response object
        );
    })
};