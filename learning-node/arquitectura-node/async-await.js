const promiseFunction = () => new Promise((resolve, reject) => {
    setTimeout(()=> {
        if (Math.random() < 0.5) {
            resolve('hello world')
        } else {
            reject(new Error('hello error'))
        }
    }, 2000)
})

async function asyncAwait() {
    try {
        const response = await promiseFunction()
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

asyncAwait()