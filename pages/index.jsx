import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../lib/context'
import Router from "next/router";
import LoginPage from './LoginPage'
import AddInfo from './AddInfo'
import DatingWindow from './Dashboard/Dating'
export default function Home() {
  const {user, username} = useContext(UserContext)
  useEffect(()=>{
    username && Router.push('./Dashboard/Dating')
  })
  return (
    <div>
      {user ?
        !username && <AddInfo />:
       <LoginPage/> }
    </div>
  )
}
