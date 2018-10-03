import * as React from 'react'
import { store } from './store'
import { observer } from 'mobx-react'

@observer
export class Page3 extends React.Component {
    constructor(props) {
        super(props)
        if (store.beards.length === 0) store.fetchBoards()
    }

    render() {
        return (
            <div>
                <h2>Barbes</h2>
                <button onClick={() => store.fetchBoards()}>Fetch</button>
                <ul>
                    {store.beards.map(beard => {
                        return (
                            <li key={beard._id}>
                                <pre>{JSON.stringify(beard, null, 4)}</pre>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
