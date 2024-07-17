import React from 'react'
import { Navbar } from '../navbar'

import "./styles.css"
import Upload from '../Upload'
import {FollowSection} from '../followSection'
import Followings from '../followings'
import Posts from '../../Posts'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Upload/>
        <FollowSection/>
        <Followings/>
        <Posts/>
    </div>
  )
}

export default Home