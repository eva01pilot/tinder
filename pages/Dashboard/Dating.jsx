import DateCard from "../../Components/DateCard"
import { useFetchDates } from "../../lib/hooks"
import { UserContext } from '../../lib/context'
import { auth } from '../../lib/firebase'
import Link from "next/link"
import Router from 'next/router'
import { useEffect,useContext } from 'react'


export default function DatingWindow() {
  const {user, username} = useContext(UserContext)
  useEffect(()=>{
    !username && Router.push('../')
  })
    const userArray = useFetchDates()
  return (
    <main>
      <Link href="/Dashboard/Chats"><a>Chats</a></Link>
        {userArray.filter((user)=>user?.data?.uid!==auth?.currentUser?.uid).map((user)=>{
            return(
                <DateCard key={user.id} sweetheart={user.data}/>
            )
        })}
    </main>
  )
}