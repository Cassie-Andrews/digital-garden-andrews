import Head from "next/head"
import { useRouter } from "next/router"
import styles from "../styles/Home.module.css"
import { withIronSessionSsr } from "iron-session/next"
import sessionOptions from "../config/session"
import Header from "../components/header"
import { usePlantContext } from "../context"
import PlantList from "../components/plantList"
import * as actions from "../context/action"
import { useState, useRef } from 'react'

// use this page to display search bar and search results with PlantCard components
// relies on /api/plants/search to actually get data

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const { user } = req.session
        const props = {}
        if (user) {
            props.user = req.session.user
        }
        props.isLoggedIn = !!user;
        return { 
            props: {
                isLoggedIn: true,
                user,
            } }
    },
    sessionOptions
)

export default function Search({ isLoggedIn, plants, user }) {
    const [{plantSearchResults}, dispatch] = usePlantContext()
    const [query, setQuery] = useState("")
    const [fetching, setFetching] = useState(false)
    const [previousQuery, setPreviousQuery] = useState()
    const inputRef = useRef()
    const inputDivRef = useRef()

    async function handleSubmit(e) {
        e.preventDefault()
        if (fetching || !query.trim() || query === previousQuery) return
        setPreviousQuery(query)
        setFetching(true)
        const res = await fetch(`/api/plants?q=${encodeURIComponent(query)}`)
        if (res.status !== 200) return
        const data = await res.json()
        dispatch({
            action: actions.SEARCH_PLANTS,
            payload: data
                ?.data
                ?.map(({ id, default_image }) => ({
                    plant_id: id,
                    image_url: default_image?.small_url || ""
                })) || []
        })
        setFetching(false)
    }
    return (
        <>
            <Head>
                <title>Search page</title>
            </Head>

            <Header isLoggedIn={isLoggedIn} username={user?.username}/>
            
            <main>
                <h1>Seach page</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="plant-search">Search for a plant: </label>
                    <div ref={inputDivRef}>
                        <input
                            ref={inputRef}
                            type="text"
                            name="plant-search"
                            id="plant-search"
                            value={query}
                            autoFocus={true}
                            onChange={e => setQuery(e.target.value)}/>
                        <button type="submit">Search</button>
                    </div>
                </form>
                {
                    fetching
                    ? <Loading />
                    : plantSearchResults?.length
                    ? <PlantList plants={plantSearchResults} />
                    : <NoResults
                    {...{inputRef, inputDivRef, previousQuery}}
                    clearSearch={() => setQuery("")}/>
                }
            </main>
        </>
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
        </div>
    )
}
