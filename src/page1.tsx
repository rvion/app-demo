import * as React from 'react';
import { store } from './store';

export class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h2>Accueil</h2>
                <button onClick={() => { store.goToPage({ name: 'newChallenge' }) }}>Nouveau challenge</button>
                <button onClick={() => { store.goToPage({ name: 'challengeList' }) }}>challenge en cours</button>
                {/* <Card name="toto1" photo="test1" /> */}
            </div>
        )
    }
}

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
