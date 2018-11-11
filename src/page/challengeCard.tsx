import * as React from 'react'
import { Challenge } from '../store'
import { observer } from 'mobx-react'

type P1 = { challenge: Challenge }
type S1 = { refreshTimer: any }

@observer
export class ChallengeCard extends React.Component<P1, S1> {
    constructor(props: P1) {
        super(props)
        this.state = {
            refreshTimer: setInterval(() => {
                this.forceUpdate()
            }, 1000)
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.refreshTimer)
    }

    finished = () => {
        return (
            <div className="timesup">
                Timeout, restore your Karma, perform this: treat your friends for lunch
            </div>
        )
    }
    render() {
        const c = this.props.challenge
        if (c == null) return 'challenge not found'
        const remainingTime = (c.createdAt + c.duration - Date.now()) / 100000
        const remaininghours = Math.round(remainingTime)
        return (
            <div className="card">
                <img className="card-img-top" src="/give.png" alt="Card image cap" />
                <h5 className="card-title">{c.description}</h5>
                <h6 className="creator">by {c.creator}</h6>
                {remainingTime < 0 ? this.finished() : <h2>{remaininghours}h</h2>}
                {/* <pre>{JSON.stringify(c, null, 4)}</pre> */}
            </div>
        )
    }
}
