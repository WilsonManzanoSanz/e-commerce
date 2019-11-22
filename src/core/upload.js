const BASE_URL = `http://localhost:3002`;
const URL = `${BASE_URL}/api/v1/upload`;

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
                    response.data.path = `${BASE_URL}/${response.data.path}`;
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