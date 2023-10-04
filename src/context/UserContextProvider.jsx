import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import auth from '../firebase/firebase.config';




export const UserContext = createContext(null)







const UserContextProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const [selectCategory, setSelectCatagpry] = useState(0)
    const [currentUser, setCurentUser] = useState(null)
    const [firstShow, setFirstShow] = useState('')
    const [loading, setLoading] = useState(true)
    const [bookmark, setBookMark] = useState([])


    const handelGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const handelGithub = () => {
        setLoading(true)
        return signInWithPopup(auth, gitHubProvider)
    }

    // Email And Password

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const registrationUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handelLogout = () => {
        setLoading(true)
        return signOut(auth)
    }



    // current user

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurentUser(user)
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])







    const dataSend = {
        selectCategory,
        setSelectCatagpry,

        // current user
        currentUser,

        // logout
        handelLogout,

        // loging method
        handelGoogle,
        handelGithub,
        // pass
        signInUser,
        registrationUser,

        // first show
        firstShow,
        setFirstShow,

        // isloading

        loading,

        // add bookmark
        bookmark,
        setBookMark
    }



    return (
        <UserContext.Provider value={dataSend}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;