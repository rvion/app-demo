import * as React from 'react'

type CardData = {
    name: string
    photo: string
}

export class Card extends React.Component<CardData> {
    render() {
        const { name, photo } = this.props
        return (
            <div className="card">
                <ul>
                    <li>nom: {name}</li>
                    <li>
                        photo: <img src={photo} />
                    </li>
                </ul>
            </div>
        )
    }
}
