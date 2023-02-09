import React from 'react'
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router'


export default function Index() {

	const { push } = useRouter()

	const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    push('/login');
  }

	return (
		<div>index</div>
	)
}