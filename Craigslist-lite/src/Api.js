import { async } from "q";


const baseURL = "https://strangers-things.herokuapp.com/api";
const cohortURL = "/2206-ftb-pt-web-pt";

 export const fetchApiPosts = async ()  => {
    try{
        const response = await fetch (`${baseURL}${cohortURL}/posts`);
        const data = await response.json();
        // console.log("data:", data)
        return data.data.posts;
    } catch (err) {
        console.error(err)
    }
}

export const regAndLogAPI = async (username, password, regOrLog) => {
    try{
        const response = await fetch(`${baseURL}${cohortURL}/users/${regOrLog}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })
        const data = await response.json();
        if( data.success === true){
            console.log(data.data.token)
            return data.data.token;
        } else{
            console.error(data.error.message)
        }
    } catch (err) {
        console.error(err)
    }
}

export const profileApi = async ({token}) => {
    try{
        const response = await fetch (`${baseURL}${cohortURL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data;
    } catch (err) {
        console.error(err)
    }
} 

export const createPostApi = async ({title, description, price, token, location}) => {
    try{
        const response = await fetch(`${baseURL}${cohortURL}/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    // willDeliver
                }
            })
        });
        console.log("response:", response)
        const data = await response.json();
        console.log("data:", data)
        return data.data.post;
    } catch (err) {
        console.error(err)
    }
}

// export const EditPostApi = async ({title, description, price, location, willDeliver, token, postId}) => {
//     try{
//         const response = await fetch (`${baseURL}${cohortURL}/${postId}`, {
//             method: "PATCH",
//             headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${token}`
//                     },
//             body: JSON.stringify({
//                 post: {
//                     title,
//                     description,
//                     price,
//                     willDeliver,
//                     location
//                 }
//             })
//         }); 
//         const data = await response.json()
//         return data
//         } catch (err) {
//     console.error(err)
// }
// }


// export const deletePostApi = async () => {
//  try{
//     const response = await fetch (`${baseURL}${cohortURL}/${postId}`, {
//         method: "DELETE",
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//     }
//  })
//  cont data
// } catch (err) {
//     console.error(err)
// }
// }
