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
    let text = await fetch(
        "http://localhost:4000/api/v1" + path, 
        opts
    );
    return await text.json();
}

async function api_patch(id, path, data) {
    let opts = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };
    console.log(opts)
    let text = await fetch (
        "http://localhost:4000/api/v1" + path + "/" + id, 
        opts
    );
    return await text.json();
}

async function api_delete(path, id) {
    let text = await fetch(
        "http://localhost:4000/api/v1" + path + "/" + id,
        {
            method: "DELETE"
        }
    );
    return await text;
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

export const get_events = async () => {
    api_get("/events").then((data) => store.dispatch({
        type: "events/set",
        data: data
    }))
}

export const create_event = async (data, session) => {
    api_post("/events", {"event": data, "session": session}).then((data) => {
        console.log("new event", data);
        get_events();
    })
}

export const update_user = async (id, data, session) => {
    api_patch(id, "/users",{"user": data, "session": session}).then(() => {
        getUsers();
    })
}

export const add_comment = async (data) => {
    api_post("/comments", {"comment": data}).then(() => {
        get_events();
    })
}

export const del_comment = async (id) => {
    api_delete("/comments", id).then(() => {
        get_events();
    })
}

export const add_invite = async (data, session) => {
    api_post("/invites", {"invite": data, "session": session}).then(() => {
        get_events();
    })
}

export const del_invite = async (id) => {
    api_delete("/invites", id).then(() => {
        get_events();
    })
}

export const upd_invite = async (id, val) => {
    api_patch(id, "/invites", {"accept": val}).then(() => {
        get_events();
    })
}

export const update_event = async (id, data) => {
    api_patch(id, "/events", {"event": data}).then(() => {
        get_events();
    })
}

export function load_defaults() {
    getUsers();   
    get_events(); 
}