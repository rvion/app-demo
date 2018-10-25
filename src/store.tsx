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
                description: 'Send a postcard to your grandmother',
                creator: 'u1',
                receiver: 'u2',
                createdAt: Date.now() - 2000,
                duration: 1000,
                success: false
            }
        ]
    ])

    @observable
    mychallenges: Map<ChallengeId, Challenge> = new Map([
        [
            'c2',
            {
                id: 'c2',
                description: 'Buy a meal for a homeless person',
                creator: 'Corentin',
                receiver: 'u1',
                createdAt: Date.now() - 2000,
                duration: 300000,
                success: false
            }
        ]
    ])

    @observable
    users: Map<UserId, User> = new Map([
        ['u1', { id: 'u1', name: 'Amélie', friends: ['u2'] }],
        ['u2', { id: 'u2', name: 'Corentin', friends: ['u1'] }],
        ['u3', { id: 'u3', name: 'Samy', friends: [] }],
        ['u4', { id: 'u4', name: 'Eric', friends: ['u1'] }]
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
