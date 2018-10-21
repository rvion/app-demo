import * as React from 'react'
import { store } from '../store'
import { observer } from 'mobx-react'

type LoginInfos = {
    username: string
    password: string
}

@observer
export class Login extends React.Component<{}, LoginInfos> {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        // if already connected,
        // show account infos
        if (store.auth != null) {
            return (
                <div>
                    <h2>connected</h2>
                    <pre>{JSON.stringify(store.auth, null, 4)}</pre>
                </div>
            )
        }
        // else, if not connected,
        // show the connection widget
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
                    onClick={() => store.login(this.state.username, this.state.password)}
                >
                    Log in as {this.state.username}
                </button>
            </div>
        )
    }
}
