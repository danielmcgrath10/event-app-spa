import React from "react";
import { getUsers } from "../../api";

export default function Users({users}){
    if(!users){
        console.log(users)
        getUsers();
    }

    const popUsers = () => {
        return(
            users.map((user, index) => 
                <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td></td>
                    <td></td>
                    <td><span><a href={`/users/${user.id}`}>Show</a></span></td>
                </tr>
            )
        )
    }
    
    return(
        <div>
            <div style={{marginBottom: "20px"}}>
                <h1>
                    List of Users
                </h1>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {popUsers()}
                </tbody>
            </table>
        </div>
    )
}