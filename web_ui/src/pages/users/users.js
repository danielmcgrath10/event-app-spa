import React, { useEffect, useState } from "react";
import {connect} from "react-redux";

export default function Users(props){
    let [users, setUsers] = useState(null);

    const getUsers = ({users, user_form, dispatch}) => {
        
    }
    
    useEffect(() => {
        if(!users){
            let list = getUsers();
            setUsers(list);
        }
    }, [])

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
                {/* <%= for user <- @users do %>
                    <tr>
                    <td><%= user.name %></td>
                    <%= if have_current_user?(@conn) do %>
                        <td><%= user.email %></td>
                        <td><span><%= link "Show", to: Routes.user_path(@conn, :show, user) %></span></td>
                    <%else %>
                        <td></td>
                        <td></td>
                    <%end %>
                    <%= if current_user_id?(@conn, user.id) do %>
                        <td><span><%= link "Edit", to: Routes.user_path(@conn, :edit, user) %></span></td>
                        <td><span><%= link "Delete", to: Routes.user_path(@conn, :delete, user), method: :delete, data: [confirm: "Are you sure?"] %></span></td>
                    <%else %>
                        <td></td>
                        <td></td>
                    <%end %>
                    </tr>
                <% end %> */}
                </tbody>
            </table>
        </div>
    )
}