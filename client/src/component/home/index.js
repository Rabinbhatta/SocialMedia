import React from 'react'
import { Navbar } from '../navbar'

import "./styles.css"
import Upload from '../Upload'
import {FollowSection} from '../followSection'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Upload/>
        <FollowSection/>
    </div>
  )
}

export default Home