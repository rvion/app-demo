import * as React from 'react'
import { store } from '../store'
import { observer } from 'mobx-react'

@observer

export class ChallengeList extends React.Component {
    constructor(props: {}) {
        super(props)
        store.fetchChallenges()
    }
    /* https://stackoverflow.com/questions/51618496/simple-countdown-timer-typescript
       } class Timer {
        constructor(public counter = 90) {
            let intervalId = setInterval(() => {
                this.counter = this.counter - 1;
                console.log(this.counter)
                if (this.counter === 0) clearInterval(intervalId)
            }, 1000)
        }
   }
   */
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
