import * as React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import { store } from './store'

import { Page1 } from './page1'
import { Page2 } from './page2'
import { Page3 } from './page3'

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
                <h1>test</h1>
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
