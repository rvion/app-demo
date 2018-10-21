import { observable, action } from 'mobx'

export type Page =
    | { name: 'login' }
    | { name: 'logout' }
    | { name: 'home' }
    | { name: 'notFound', originalURL: string }
    | { name: 'newChallenge' }
    | { name: 'challengeList' }
    | { name: 'challengeDetail', challengeId: string }

function pageToURL(page: Page): string {
    if (page.name === 'challengeDetail') return `/challenge/${page.challengeId}`
    if (page.name === 'notFound') return `/404?url=${page.originalURL}`
    return `/${page.name}`
}
// url= http://localhost:1234/foo/bar?test=3
// window.location.pathanme = "/foo/bar"
// window.location.search = "?test=3&bar=5"
function urlToPage(): Page {
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
    beards: { _id: string }[] = []

    @action
    login(identifier: string, password: string) {
        ajax({
            type: 'POST',
            url: `http://${window.location.hostname}:1337/auth/local`,
            data: { identifier, password },
            done: function (auth) {
                console.log('authentication success:', { auth })
                store.auth = auth
            }
        })
    }

    @action
    fetchBoards() {
        if (this.auth == null) return console.warn('not connected')
        ajax({
            type: 'GET',
            url: `http://${window.location.hostname}:1337/beards`,
            headers: { Authorization: `Bearer ${this.auth.jwt}` },
            done: beards => {
                console.log('beard fetch success:', { beards })
                this.beards = beards
            }
        })
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
    done: (Object) => any
    fail?: (any) => any
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
function logError(error) {
    console.log('An error occurred:', error)
}
