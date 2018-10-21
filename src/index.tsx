import * as React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import { store } from './store'

import { Page1 } from './page1'
import { Page2 } from './page2'
import { Page3 } from './page3'
import { Link } from './link';

@observer
class Main extends React.Component {
    render() {
        let pageWidget: React.ReactNode = '404 page not found'
        let page = store.page
        if (page.name === 'home') {
            pageWidget = <Page1 />
        } else if (page.name === 'login') {
            pageWidget = <Page2 />
        } else if (page.name === 'challengeList') {
            pageWidget = <Page3 />
        }

        return (
            <div className="appLayout">
                <div className="layoutHeader">
                    <h1>Karma</h1>
                </div>
                <div className="layoutContent">
                    {pageWidget}
                </div>
                <div className="layoutMenu">
                    <div className="navigationPannel">
                        <Link page={{ name: 'home' }} label="accueil" />
                        <Link page={{ name: 'login' }} label="Login" />
                        <Link page={{ name: 'challengeList' }} label="page3" />
                    </div >
                </div >
            </div >
        )
    }
}

const $root = document.getElementById('root')
render(<Main />, $root)
