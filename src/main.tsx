import * as React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import { store } from './core/state'

import { Page1 } from './pages/page1'
import { Page2 } from './pages/page2'
import { Page3 } from './pages/page3'

@observer
class Main extends React.Component {
    render() {
        let pageWidget: React.ReactNode = '404 page not found'
        let page = store.page
        if (page === 'page1') {
            pageWidget = <Page1 />
        } else if (page === 'page2') {
            pageWidget = <Page2 />
        } else if (page === 'page3') {
            pageWidget = <Page3 />
        }

        return (
            <div>
                <h1>app</h1>
                <button onClick={() => (store.page = 'page1')}>page1</button>
                <button onClick={() => (store.page = 'page2')}>page2</button>
                <button onClick={() => (store.page = 'page3')}>page3</button>
                {pageWidget}
            </div>
        )
    }
}

const $root = document.getElementById('root')
render(<Main />, $root)
