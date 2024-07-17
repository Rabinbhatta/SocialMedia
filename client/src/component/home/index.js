import React from 'react'
import { Navbar } from '../navbar'

import "./styles.css"
import Upload from '../Upload'
import {FollowSection} from '../followSection'
import Followings from '../followings'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Upload/>
        <FollowSection/>
        <Followings/>
    </div>
  )
}

export default Home