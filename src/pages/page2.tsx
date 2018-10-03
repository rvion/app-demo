import * as React from 'react'
import { store } from '../core/state'
import { ajax } from '../core/utils'

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
