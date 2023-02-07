import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home = () => {
	const { data: session } = useSession()

	const { push, asPath } = useRouter()

	const handleSignOut = async () => {
		const data = await signOut({ redirect: false, callbackUrl: '/auth/signin' })

		push(data.url)
	}

	const handleSignIn = () => push(`/auth/signin?callbackUrl=${asPath}`)

	return (
		<div placeItems='center' gridRowGap='1rem'>
			{session ? (
				<>
					<div>Signed in as {session.user.email}</div>
					<button onClick={handleSignOut}>Sign out</button>
				</>
			) : (
				<>
					<div>You are not signed in</div>

					<button onClick={handleSignIn}>Sign in</button>
				</>
			)}
		</div>
	)
}

export default Home