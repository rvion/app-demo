import * as React from 'react'
import { store } from '../store'
import { observer } from 'mobx-react'
import { ChallengeCard } from './challengeCard'

@observer
export class ChallengeIDo extends React.Component {
    render() {
        const myChallenges = Array.from(store.mychallenges.values()).filter(
            c => c.receiver === store.currentUserId
        )
        return (
            <div>
                <h2>My Deeds</h2>
                {myChallenges.map(c => {
                    return <ChallengeCard challenge={c} />
                })}
            </div>
        )
    }
}
