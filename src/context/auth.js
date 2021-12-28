import React , {useEffect,useState} from 'react'
// import { v1 as uuidv1 } from 'uuid';
import  { Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import cookie from 'react-cookies'
// import { Redirect } from 'react-router';

export const AuthContext = React.createContext();


const AuthProvider = props =>{
    const [loggedIn , setLoggedIn] = useState(false);
    const [ token, setToken ] = useState(null);
    const [ users, setUsers ] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [ user, setUser ] = useState({});
    const [register, setRegister] = useState(false)
    const [existUser, setExistUser ] = useState(false)
     
    const signup = (username,password, role) => {
        if(!usernames.includes(username)){
            setUsers([...users, {username: username, password: password, role: role}])
            setUsernames([...usernames, username])
            console.log('hello')
            setRegister(true)
        } else{
            console.log('username already in use')
            setExistUser(true)
        }
    }
    const signin = (username, password) => {
        users.forEach(user => {
            if(user.username === username && user.password === password){
                let token = btoa(`${username}:${password}`)
                console.log("🚀 ~ file: auth.js ~ line 29 ~ signin ~ token", user)
                setLoginState(!!user, token, user)
             
            //    validateToken(token)
            } else {
                console.log('Invalid username or password')
            }
        })
    }

    const validateToken = token => {
        try {
            const user = jwt.decode(token);
            setLoginState(true, token, user)
        } catch (error) {
            console.error('User is not verified', error.message);
            setLoginState(false,null,{})
        }

    }
    const setLoginState = (loggedIn, token, user) => {
        cookie.save('auth', token, user);
        setToken(token)
        setLoggedIn(loggedIn)
        setUser(user)
    }
    const logout = () => {
        setToken(null);
        setLoggedIn(false);
        setUser({});
        setRegister(false)
    }
    // useEffect( () => {
    //     const token = cookie.load('auth');
    //     validateToken(token)
    // },[])
    let state = { 
        loggedIn: loggedIn,
        token: token,
        users:users,
        signup:signup,
        signin:signin,
        user: user,
        logout: logout,
        register: register,
        existUser:existUser
    }

    return(
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;