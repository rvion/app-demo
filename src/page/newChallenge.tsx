import * as React from 'react'
import { store } from '../store'
import { observer } from 'mobx-react'
// import { ChallengeList } from './challengeList'
// import { Login } from './login'

type P = {}
type S = {
    friendId: string | null
    challengeType: string
}

// https://reactjs.org/docs/forms.html
@observer
export class NewChallenge extends React.Component<P, S> {
    constructor(props: {}) {
        super(props)
        this.state = {
            friendId: null,
            challengeType: 'homelesscaring'
        }
    }
    render() {
        const uid = store.currentUserId
        if (uid == null) return 'error'

        return (
            <div>
                <h2>New challenge</h2>

                <label>
                    <span className="label">friend</span>
                    <select
                        value={this.state.friendId || ''}
                        onChange={ev => this.setState({ friendId: ev.target.value })}
                    >
                        <option value="" />
                        {Array.from(store.users.values()).map(u => {
                            return (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            )
                        })}
                    </select>
                </label>
                <button
                    onClick={() => {
                        store.createChallenge({
                            description: "'",
                            creator: uid,
                            receiver: uid,
                            duration: 10000
                        })
                    }}
                >
                    Challenger !
                </button>
            </div>
        )
    }
}
