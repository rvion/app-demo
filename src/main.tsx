import * as React from 'react'
import {render}from 'react-dom'


class Main extends React.Component {
    render(){
        return (
            <div>test 2</div>
        )
    }
}


const $root= document.getElementById('root')
render(<Main/>,$root)