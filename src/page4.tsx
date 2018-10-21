import * as React from 'react'
import { store } from './store'
import { observer } from 'mobx-react'

@observer
export class Page4 extends React.Component {
    render() {
        return (
            <div>
                <h2>New challenge</h2>
                <h3>Select a friend</h3>
                function that fetches friends list
            </div>
        )
    }
}
