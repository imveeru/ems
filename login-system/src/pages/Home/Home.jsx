import React from 'react'
import Header from '../../components/Header/Header'
import {useAuth} from '../../context/AuthContext'
import './home.css'

function Home() {

    const {currentUser}=useAuth()
    console.log(currentUser)

    return (
        <div>
            <Header />
            <div className="home-container">
                <h1>Welcome {currentUser.uid}</h1>
            </div>
        </div>
    )
}

export default Home
