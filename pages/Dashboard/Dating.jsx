import DateCard from "../../Components/DateCard"
import { useFetchDates } from "../../lib/hooks"
import { UserContext } from '../../lib/context'
import { auth } from '../../lib/firebase'
import Link from "next/link"
import Router from 'next/router'
import { useEffect,useContext } from 'react'
import styles from '../../styles/Dating.module.scss'
import { useState } from "react"


export default function DatingWindow(props) {
  const {user, username} = useContext(UserContext)
  useEffect(()=>{
    !username && Router.push('../')
  },[username])

  return (
    <main>
      <Link href="/Dashboard/Chats"><a>Chats</a></Link>
      <div className={styles.DatesContainer}>
        {props.userArray?.map((user,i)=>{
            return(
                <DateCard onClick={props.onClick} key={user.id} data={i} sweetheart={user.data}/>
            )
        })}
      </div>
    </main>
  )
}