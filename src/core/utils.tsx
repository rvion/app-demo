// helper function to ease copy-pasting code from strapi-doc
// like in page https://strapi.io/documentation/guides/authentication.html#register-a-new-user
export function ajax(options: {
    type: 'POST' | 'GET'
    url: string
    data?: Object
    headers?: Object
    done: (Object) => any
    fail: (any) => any
}) {
    const opts: any = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...(options.headers || {})
        },
        cache: 'no-cache',
        credentials: 'include'
    }
    if (options.data) opts.body = JSON.stringify(options.data)
    if (options.type) opts.method = options.type
    console.log('[ajax] fetching', options.url, opts)
    fetch(options.url, opts)
        .then(response => {
            //www.tjvantoll.com/2015/09/13/fetch-and-errors/
            https: if (!response.ok) throw Error(response.statusText)
            return response.json()
        })
        .then(options.done)
        .catch(options.fail)
}
