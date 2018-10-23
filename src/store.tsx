import { observable, action } from 'mobx'

export type UserId = string
export type User = {
    id: UserId
    name: string
    friends: string[]
}
export type ChallengeId = string
export type Challenge = {
    id: ChallengeId
    description: string
    creator: UserId
    receiver: UserId
    createdAt: number
    duration: number
    success: boolean
}
export type Page =
    | { name: 'newChallenge' }
    | { name: 'challengeIDo' }
    | { name: 'challengeISent' }

class Store {
    @observable
    page: Page = { name: 'challengeIDo' }

    @action
    goToPage(page: Page) {
        this.page = page
    }

    @observable
    auth: { user: Object; jwt: string } | null = null

    @observable
    challenges: Map<ChallengeId, Challenge> = new Map([
        [
            'c1',
            {
                id: 'c1',
                description: 'test',
                creator: 'u2',
                receiver: 'u1',
                createdAt: Date.now() - 2000,
                duration: 30000,
                success: false
            }
        ]
    ])

    @observable
    users: Map<UserId, User> = new Map([
        ['u1', { id: 'u1', name: 'U1', friends: ['u2'] }],
        ['u2', { id: 'u2', name: 'U2', friends: ['u1'] }],
        ['u3', { id: 'u3', name: 'U3', friends: [] }]
    ])

    @observable
    currentUserId: UserId | null = 'u1'

    @action
    createChallenge(infos: {
        description: string
        creator: UserId
        receiver: UserId
        duration: number
    }) {
        const newChallenge: Challenge = {
            id: String(Math.random()),
            description: infos.description,
            creator: infos.creator,
            receiver: infos.receiver,
            createdAt: Date.now(),
            duration: infos.duration,
            success: false
        }
        this.challenges.set(newChallenge.id, newChallenge)
    }

    @action
    finishChallenge(challenge: Challenge) {
        challenge.success = true
    }

    @action
    login(uid: string, _password: string) {
        if (this.currentUserId != null) return
        this.currentUserId = uid
        const user = this.users.get(uid)
        if (user == null) {
            this.users.set(uid, {
                id: uid,
                name: uid,
                friends: []
            })
        }
    }
}

export const store = new Store()
