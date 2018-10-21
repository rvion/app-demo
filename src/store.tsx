import { observable, action } from 'mobx'

export type Friend = {
    _id: string,
    name: string
}

export type Challenge = {
    _id: string
}
export type Page =
    | { name: 'login' }
    | { name: 'logout' }
    | { name: 'home' }
    | { name: 'notFound', originalURL: string }
    | { name: 'newChallenge' }
    | { name: 'challengeList' }
    | { name: 'challengeDetail', challengeId: string }

export function pageToURL(page: Page): string {
    if (page.name === 'challengeDetail') return `/challenge/${page.challengeId}`
    if (page.name === 'notFound') return `/404?url=${page.originalURL}`
    return `/${page.name}`
}
// url= http://localhost:1234/foo/bar?test=3
// window.location.pathanme = "/foo/bar"
// window.location.search = "?test=3&bar=5"
export function urlToPage(): Page {
    const loc = window.location
    // const [query, params]= url.split('?')
    // const segments = url.
    if (loc.pathname === '/login') return { name: 'login' }
    return { name: 'home' }
}

class Store {
    @observable
    page: Page = { name: "home" }

    constructor() {
        // const page = urlToPage(window.location.pppppp)
        // this.page=page
    }
    @action
    goToPage(page: Page) {
        this.page = page
        // window.history.pushState()
    }

    @observable
    auth: { user: Object; jwt: string } | null = null

    @observable
    friends: Friend[] = []

    @observable
    challenges: Challenge[] = []

    @action
    login(identifier: string, password: string) {
        ajax({
            type: 'POST',
            url: `http://${window.location.hostname}:1337/auth/local`,
            data: { identifier, password },
            done: (auth: any) => {
                console.log('authentication success:', { auth })
                store.auth = auth
            }
        })
    }


    @action
    fetchChallenges(force = true) {
        if (this.challenges.length > 0 && !force) return console.log('no need to refresh: skipping.')
        // FIXME: replace by proper implementation
        this.challenges = [
            { _id: 'fghjk' }
        ]
        return
    }

    @action
    fetchFriends(force: Boolean = false) {
        if (this.friends.length > 0 && !force) return console.log('no need to refresh: skipping.')
        // FIXME
        this.friends = [
            { _id: "fghjkl", name: 'paul' }
        ]
        // if (this.auth == null) return console.warn('not connected')
        // ajax({
        //     type: 'GET',
        //     url: `http://${window.location.hostname}:1337/friends`,
        //     headers: { Authorization: `Bearer ${this.auth.jwt}` },
        //     done: friends => {
        //         console.log('beard fetch success:', { friends })
        //         this.friends = friends
        //     }
        // })
    }
}

export const store = new Store()

// helper function to ease copy-pasting code from strapi-doc
// like in page https://strapi.io/documentation/guides/authentication.html#register-a-new-user
export function ajax(options: {
    type: 'POST' | 'GET'
    url: string
    data?: Object
    headers?: Object
    done: (data: Object) => any
    fail?: (err: any) => any
}) {
    const opts: any = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...(options.headers || {})
        },
        cache: 'no-cache',
        credentials: 'include'
    }
    if (options.data) opts.body = JSON.stringify(options.data)
    if (options.type) opts.method = options.type
    console.log('[ajax] fetching', options.url, opts)
    fetch(options.url, opts)
        .then(response => {
            //www.tjvantoll.com/2015/09/13/fetch-and-errors/
            https: if (!response.ok) throw Error(response.statusText)
            return response.json()
        })
        .then(options.done)
        .catch(options.fail || logError)
}

function logError(error: any) {
    console.log('An error occurred:', error)
}
