import { observable } from 'mobx'

class Store {
    @observable
    page: 'page1' | 'page2' | 'page3' = 'page1'

    @observable
    auth: any = null
}

export const store = new Store()
