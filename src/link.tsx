import * as React from 'react'
import { store, Page } from './store'
import { observer } from 'mobx-react'

@observer
export class Link extends React.Component<{
    page: Page,
    label: string,
}> {

    render() {
        const isActive = store.page.name === this.props.page.name
        return (
            <button
                className={isActive ? 'active' : ''}
                onClick={() => {
                    store.goToPage(this.props.page)
                }}
            >
                {this.props.label}
            </button >
        )
    }
}
