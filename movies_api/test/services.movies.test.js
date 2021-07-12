const assert = require('assert')
const proxyquire = require('proxyquire')

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib')

const { moviesMock } = require('../utils/mocks/movies')

describe('services - movies', function() {
    const MoviesServices = proxyquire('../services/movies.js', {
        '../lib/mongo.js': MongoLibMock
    })

    const moviesService = new MoviesServices()

    describe('when getMovies method is called', async function() {
        it('should call the getAll MongoLib method', async function() {
            await moviesService.getMovies({})
            assert.strictEqual(getAllStub.called, true)
        })

        it('shoul return an array of movies', async function() {
            const result = await moviesService.getMovies({})
            const expect = moviesMock
            assert.deepEqual(result, expect)
        })
    })
})
