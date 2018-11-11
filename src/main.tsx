import * as React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import { store } from './store'

import { Login } from './page/login'
import { ChallengeIDo } from './page/challengeIDo'
import { NewChallenge } from './page/newChallenge'
import { ChallengeISent } from './page/challengeISent'
import { Link } from './link'

@observer
class Main extends React.Component {
    render() {
        let pageWidget: React.ReactNode = '404 page not found'

        const uid = store.currentUserId
        if (uid == null) return <Login />

        let page = store.page
        if (page.name === 'challengeIDo') {
            pageWidget = <ChallengeIDo />
        } else if (page.name === 'challengeISent') {
            pageWidget = <ChallengeISent />
        } else if (page.name === 'newChallenge') {
            pageWidget = <NewChallenge />
        }

        return (
            <div className="appLayout">
                <div className="layoutHeader">
                    <img src="karma.png" height="40.938px" width="100px" />
                </div>
                <div className="layoutContentPane">
                    <div className="layoutContent">{pageWidget}</div>
                </div>
                <div className="layoutMenu">
                    <div className="navigationPannel">
                        <Link page={{ name: 'newChallenge' }} label="New Deed" />
                        <Link page={{ name: 'challengeIDo' }} label="My Deeds" />
                        <Link page={{ name: 'challengeISent' }} label="Deeds sent" />
                    </div>
                </div>
            </div>
        )
    }
}

const $root = document.getElementById('root')
render(<Main />, $root)
