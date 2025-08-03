import Head from "next/head"
import { useRouter } from "next/router"
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import Header from "../components/header"
import PlantList from "../components/plantList"
import { usePlantContext } from "../context"
import * as actions from "../context/action"
import { useState, useRef } from 'react'
import styles from "../styles/Home.module.css"

// use this page to display search bar and search results with PlantCard components
// relies on /api/plants/search to actually get data

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user
        const props = {}
        if (user) {
            props.user = req.session.user
            props.isLoggedIn = true
        } else {
            props.isLoggedIn = false
        }
        return { props }
    },
    sessionOptions
)

export default function Search({ user, isLoggedIn }) {
    const router = useRouter();
    const [ state, dispatch ] = usePlantContext()
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("")
    const [previousQuery, setPreviousQuery] = useState(null)
    const inputRef = useRef()
    const inputDivRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const query = inputRef.current.value.trim()
        if (!query) return

        setLoading(true)
        setPreviousQuery(query)

        try {
            const response = await fetch(`/api/plants?q=${query}`, {
                method: "GET",
                credentials: "include",
            })

            const data = await response.json()

            if(response.ok) {
                dispatch({
                    type: actions.SET_SEARCH_RESULTS,
                    payload: data.data
                })
            } else {
                console.error("Search failed:", data)
            }
        } catch (err) {
            console.error("Search error:", err)
        }
        setLoading(false)
    }

    const clearSearch = () => {
        dispatch({
            type: actions.SET_SEARCH_RESULTS,
            payload: []
        })
        setPreviousQuery(null)
        if (inputRef.current) inputRef.current.value = ""
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Search Plants</title>
            </Head>

        <Header isLoggedIn={isLoggedIn} username={user?.username} />            
            <main className={styles.main}>
                <h1 className={styles.title}>🔎 Search Plants</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        ref={inputRef}
                        type="text"
                        name="plant-search"
                        id="plant-search"
                        value={query}
                        placeholder="Search plants..."
                        autoFocus={true}
                        onChange={e => setQuery(e.target.value)}/>
                    <button type="submit">Search</button>
                </form>
                
                {loading && <Loading />}

                {!loading && state.searchResults?.length > 0 && (
                    <PlantList plants={state.searchResults} />
                )}

                {!loading && state.searchResults?.length === 0 && previousQuery && (
                    <NoResults
                        inputDivRef={inputDivRef}
                        inputRef={inputRef}
                        previousQuery={previousQuery}
                        clearSearch={clearSearch}
                    />
                )}
            </main>
        </div>
    )
}

function Loading() {
    return <span className={styles.loading}>Loading...</span>
}

function NoResults({ inputDivRef, inputRef, previousQuery, clearSearch }) {
    function handleLetsSearchClick() {
        inputRef.current.focus()
        if (previousQuery) clearSearch()
    }

    return (
        <div className={styles.noResults}>
            <p>{previousQuery ? `No results found for "${previousQuery}"` : "No data yet"}</p>
            <button onClick={handleLetsSearchClick}>Search Again</button>
        </div>
    )
}
