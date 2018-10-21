import * as React from 'react'
import { store } from '../store'
import { observer } from 'mobx-react'

@observer
export class ChallengeList extends React.Component {
    constructor(props: {}) {
        super(props)
        store.fetchChallenges()
    }

    render() {
        return (
            <div>
                <h2>Challenges</h2>
                <button onClick={() => store.fetchChallenges(true)}>Updates</button>
                <ul>
                    {store.challenges.map(challenge => {
                        return (
                            <li key={challenge._id}>
                                <pre>{JSON.stringify(challenge, null, 4)}</pre>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
