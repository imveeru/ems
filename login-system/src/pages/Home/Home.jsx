import React from 'react'
import Header from '../../components/Header/Header'
import {useAuth} from '../../context/AuthContext'

function Home() {

    const {currentUser}=useAuth()
    console.log(currentUser)

    return (
        <div>
            <Header />
            <h1>Welcome {currentUser.uid}</h1>
        </div>
    )
}

export default Home
