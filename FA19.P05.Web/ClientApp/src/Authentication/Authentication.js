import React, { useState, useEffect } from 'react';
import Axios from "axios";
import AppSettings from '../AppSettings';

/* Tutorial
This component will check to see if a user is logged in in order to render the components within its tags.
Additionally, you can check to see what role a user is in order to render certain components.


~~~~~~AUTHORIZE IF LOGGED IN~~~~~~
To use this, wrap a component this component's tags, like this:

<Authorization>
    Content
</Authorization>

Doing this will let the "Content" render only if a user is logged in.


~~~~~~AUTHORIZE FOR SPECIFIC ROLES~~~~~~
If you would like to check for a specific role, include a "role = (roleName)" in the Authorization tag, like this:

<Authorization role="Admin">

This will check to see if the user is logged in as an admin. If they are, it will render the components within the tags.


~~~~~~RETURN USER FIELDS~~~~~~
You can also use this component to return certain fields of the current user. For example:

<Authentication field="Name">

Having this "field" prop will tell the component to return the name of the current user.


~~~~~~HIDE IF LOGGED IN~~~~~~
If you would like to hide certain components if a user is logged in (for example, a Login button), then do this:

<Authentication role="out">
    Logout
</Authentication>
*/

const Authentication = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [allowRender, setAllowRender] = useState(false);

    useEffect(() => {
        UserLogin();
    }, []);

    const UserLogin = () => {
        Axios.get(`${AppSettings.baseUrl}/api/Authentication`)
            .then(function (response) {
                setUserInfo(response.data);
                setUserRoles(response.data.roles);
                setIsLoggedIn(true);
                setAllowRender(true);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoggedIn(false);
                setAllowRender(true);
            })
        }

    function checkValid(role){
        return role === props.role;
    }

    const returnChildren = () => {
        if(props.field === undefined && allowRender === true)
        {
            let isValid = false;

            //Check for Roles
            if(props.role !== undefined)
            {isValid = userRoles.some(checkValid);}
            else if(isLoggedIn === true)
            {isValid = true;}

            //Hide component
            if(props.role === "out" && isLoggedIn===false)
            {isValid = true;}
            
            //Show components if validated.
            if(isValid === true){
                return(
                    props.children
                )
            }
        }
        else
        {
            switch(props.field)
            {
                case "Name": return userInfo.name;
                case "Username": return userInfo.username;
                case "Email": return userInfo.email;
                case "Roles": return userInfo.roles;
            }
        }
    }

    return(
        <div style={{display:"inline-block"}}>
            {returnChildren()}
        </div>
    )
}

export default Authentication;