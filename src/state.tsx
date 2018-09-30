import { observable } from 'mobx'

class Store {
    @observable
    page: 'page1' | 'page2' = 'page1'
}

export const store = new Store()
