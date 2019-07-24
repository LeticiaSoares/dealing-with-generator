const fetch = require("node-fetch")
const api = 'https://api.github.com'

function* createQuoteFetcher({ user }) {
    console.log('user',user)
    const url = `${api}/users/${user}/repos`
    console.log('url',url)
    const response = yield fetch(url)
    return yield response.json()
}


const callGenerator = (gen,params) => {
    const generator = gen(params)
    const handle = (result) => {
        console.log('result done',result.done)
        if (result.done) return Promise.resolve(result.value)
        return Promise.resolve(result.value)
            .then(res => handle(generator.next(res)))
            .catch(error => generator.throw(error))
    }
    return handle(generator.next())
}

callGenerator(createQuoteFetcher,{ user : 'LeticiaSoares'}).then(response=>console.log('response',response[0].full_name))

