// Taken from the Class notes
import store from "./store";

async function api_get(path) {
    let text = await fetch("http://localhost:4000/api/v1/" + path, {});
    let res = await text.json();
    return res.data;
}

// Inspired by the notes
export const getUsers = async () => {
    api_get("/users").then((data) => store.dispatch({
        type: "users/set",
        data: data
    }))
}

//Taken from the notes
export function api_login(name, password) {
    api_post("/session", {name, password}.then((data) => {
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
    }))
}

export function load_defaults() {
    getUsers();
}