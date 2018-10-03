import * as React from 'react'
import { store } from '../state'

type LoginInfos = {
    username: string
    password: string
}
export class Page2 extends React.Component<{}, LoginInfos> {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        if (store.auth) {
            return 'connected'
        }
        return (
            <div>
                <h2>Page2: Login</h2>
                <label>
                    username
                    <input
                        value={this.state.username}
                        onChange={ev => this.setState({ username: ev.target.value })}
                        type="text"
                    />
                </label>
                <label>
                    password
                    <input
                        value={this.state.password}
                        onChange={ev => this.setState({ password: ev.target.value })}
                        type="password"
                    />
                </label>
                <button
                    onClick={() => {
                        ajax({
                            type: 'POST',
                            url: `http://${window.location.hostname}:1337/auth/local`,
                            data: {
                                identifier: this.state.username,
                                password: this.state.password
                            },
                            done: function(auth) {
                                console.log('Well done!')
                                console.log('User profile', auth.user)
                                console.log('User token', auth.jwt)
                            },
                            fail: function(error) {
                                console.log('An error occurred:', error)
                            }
                        })
                    }}
                >
                    Log in as {this.state.username}
                </button>
            </div>
        )
    }
}

// helper function to ease copy-pasting code from strapi-doc
// like in page https://strapi.io/documentation/guides/authentication.html#register-a-new-user
function ajax(a: {
    type: 'POST' | 'GET'
    url: string
    data?: Object
    done: (Object) => any
    fail: (any) => any
}) {
    const opts: any = {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        cache: 'no-cache',
        credentials: 'include'
    }
    if (a.data) opts.body = JSON.stringify(a.data)
    if (a.type) opts.method = a.type
    console.log('[ajax] fetching', a.url, opts)
    fetch(a.url, opts)
        .then(response => {
            //www.tjvantoll.com/2015/09/13/fetch-and-errors/
            https: if (!response.ok) throw Error(response.statusText)
            return response.json()
        })
        .then(a.done)
        .catch(a.fail)
}
