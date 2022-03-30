import React from 'react'
import { Footer } from '../modules/layout/Footer'
import Home from '../modules/layout/Home'
import Navbar from '../modules/layout/Navbar'

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <Footer />
        </div>
    )
}

export default Homepage
