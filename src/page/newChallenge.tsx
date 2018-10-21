import * as React from 'react'
import { store } from '../store'
import { observer } from 'mobx-react'

type State = {
    friendId: string | null,
    challengeType: string
}

// https://reactjs.org/docs/forms.html

@observer
export class Page4 extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            friendId: null,
            challengeType: 'homelesscaring'
        }
        store.fetchFriends()
    }
    render() {
        return (
            <div>
                <h2>New challenge</h2>

                <pre>{JSON.stringify(this.state, null, 4)}</pre>

                <h3>Select a friend</h3>
                <select value='tre' onChange={(ev) => this.setState({ friendId: ev.target.value })}>
                    <option value="tre">erthj</option>
                    <option value="tree">dfghjkl</option>
                    <option value="treee">fghjkl</option>
                </select>

                {store.friends.map((friend => {
                    return (
                        <div key={friend._id}>
                            {friend.name}
                        </div>
                    )
                }))}



            </div>
        )
    }
}
