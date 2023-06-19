import React, { useEffect, useState } from "react";
import "./auth.scss";
import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PostWithAuth } from "../../services/HttpService";
export default function Auth(){
    const [userName, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = useState(null);
    
    let navigate = useNavigate();

    const onChange = (event, isUSerName) => {
        isUSerName ? setUserName(event) : setPassword(event)
    }

    const buttonActions = (i, action) => {
        refreshUser(action)
        setUserName("")
        setPassword("")
    }

    const refreshUser = (action) => {
        PostWithAuth("/auth/" + action,{
            userName: userName,
            password: password,
        })
          .then((res) => res.json())
          .then(
            (result) => {
                localStorage.setItem("token", result.message);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", userName)
                navigate(0)
            },
            (e) => {
              console.log(e);
              setError(e);
            }
        );
        
    };
    
    return (

        <FormControl style={{marginTop:50}}>
            <InputLabel>Username</InputLabel>
            <Input onChange={(i) => onChange(i.target.value, true)}/>
            <InputLabel style={{top: 80}}>Password</InputLabel>
            <Input onChange={(i)=> onChange(i.target.value)} style={{top: 40}}/>
            <Button onClick={(e) => buttonActions(e, "register")} variant="contained"
            style={{marginTop:60, background:'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color:'white'}}
            >Register</Button>

            <FormHelperText style={{marginTop:20}}>
                Are you already registered?
            </FormHelperText>

            <Button onClick={(e) => buttonActions(e, "login")} variant="contained"
            style={{marginTop:10, background:'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color:'white'}}
            >Login</Button>

        </FormControl>
    )
}