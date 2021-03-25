// Taken from the Class notes
import store from "./store";

async function api_get(path) {
    let text = await fetch("http://localhost:4000/api/v1" + path, {});
    let res = await text.json();
    return res.data;
}

async function api_post(path, data) {
    let opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };
    console.log(path, data, opts)
    let text = await fetch(
        "http://localhost:4000/api/v1" + path, 
        opts
    );
    return await text.json();
}

// Inspired by the notes
export const getUsers = async () => {
    api_get("/users").then((data) => store.dispatch({
        type: "users/set",
        data: data
    }))
}

export const create_user = async (data) => {
    api_post("/users", {"user": data}).then((data) => {
        console.log("new user", data);
    })
}

//Taken from the notes
export function api_login(email, password) {
    api_post("/session", {"email": email, "password": password})
    .then((data) => {
        console.log("login resp", data);
        if(data.session){
            let action = {
                type: 'session/set',
                data: data.session
            }
            store.dispatch(action)
        } else if (data.error){
            let action = {
                type: 'error/set',
                data: data.error
            }
            store.dispatch(action);
        }
    })
}

export function load_defaults() {
    getUsers();    
}