import * as React from 'react'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import { Page2 } from './pages/page2'
import { store } from './core/state'
import { Page1 } from './pages/page1'

@observer
class Main extends React.Component {
    render() {
        return (
            <div>
                <h1>app</h1>
                <button onClick={() => (store.page = 'page1')}>page1</button>
                <button onClick={() => (store.page = 'page2')}>page2</button>
                {store.page === 'page1' ? <Page1 /> : <Page2 />}
            </div>
        )
    }
}

const $root = document.getElementById('root')
render(<Main />, $root)
