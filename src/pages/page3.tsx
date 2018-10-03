import * as React from 'react'
import { ajax } from '../core/utils'
import { store } from '../core/state'

export class Page3 extends React.Component<{}, { beards: any[] }> {
    constructor(props) {
        super(props)
        this.state = { beards: [] }
        ajax({
            type: 'GET',
            url: `http://${window.location.hostname}:1337/beards`,
            headers: { Authorization: `Bearer ${store.auth.jwt}` },
            done: data => {
                console.log('Your data', data)
                this.setState({ beards: data })
            },
            fail: error => {
                console.log('An error occurred:', error)
            }
        })
    }
    render() {
        return (
            <div>
                <h2>Barbes</h2>
                <ul>
                    {this.state.beards.map(beard => {
                        return <li>{JSON.stringify(beard)}</li>
                    })}
                </ul>
            </div>
        )
    }
}
