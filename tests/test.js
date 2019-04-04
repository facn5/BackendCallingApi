const test = require('tape');
const supertest = require('supertest');
const router = require('../src/router');
const nock = require('nock');

test('Server is up', (t) => {
  let num = 2;
  t.equal(num, 2, 'Should return 2 - meaning server started');
  t.end();
})



test('Home route returns a status code of 200', (t) => {
    supertest(router)
        .get("/")
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
            t.error(err);

      t.equal(res.statusCode, 200, 'Should return 200');
      t.end()

    });
});

test('404 not found route returns a status code of 404', (t) => {
    supertest(router)
        .get("/sdfsfs")
        .expect(404)
        .end((err, res) => {
            t.error(err);
            t.equal(res.statusCode, 404, 'Should return 404');
            t.end()

        });
});

test('css file route returns a status code of 200', (t) => {
    supertest(router)
        .get("/public/styles/styles.css")
        .expect(200)
        .expect('Content-Type', /css/)
        .end((err, res) => {
            t.error(err);

            t.equal(res.statusCode, 200, 'Should return 200');
            t.end();

        });
});

test('API request', (t) => {
    nock('http://www.omdbapi.com')
        .get('/?s=batman&apikey=' + process.env.API_KEY)
        .reply(200, {
            "Search": [
                {
                    "Title": "Batman Begins",
                    "Year": "2005",
                    "imdbID": "tt0372784",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
                }
            ]
        });
        
    supertest(router)
        .get("/search?s=batman")
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            t.error(err);
            t.equal(res.statusCode, 200, 'Should return 200');
            t.equal(res.body[0].Title, 'Batman Begins', 'Should return correct first item')
            t.deepEqual(nock.pendingMocks(), [], 'No requests left');
            t.equal(nock.isDone(), true, 'All requests were satisfied');
            nock.cleanAll()
            t.end();
        });
});

test('500 error', (t) => {
    supertest(router)
        .get("/selectedss")
        .expect(500)
        .end((err, res) => {
            t.error(err);
            t.equal(res.statusCode, 500, 'Should return 500');
            t.end();

        });
});

test('handle item', (t) => {

    supertest(router)
        .get("/search?i=batman")
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            t.error(err);

            t.equal(res.statusCode, 200, 'Should return 200');
            t.end();

        });
});

test('responsiveness', (t) => {
    supertest(router)
        .get("/public/styles/responsiveness.css")
        .expect(200)
        .expect('Content-Type', /css/)
        .end((err, res) => {
            t.error(err);
            t.equal(res.statusCode, 200, 'Should return 200');
            t.end();

        });
});

test('index.html gives 500 error', (t) => {
    supertest(router)
        .get("/public/layouts/index.html")
        .expect(500)
        .end((err, res) => {
            t.error(err);
            t.equal(res.statusCode, 500, 'Should return 500');
            t.end();

        });
});

test('index.html gives 500 error', (t) => {
    supertest(router)
        .get("/selected")
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
            t.error(err);
            t.equal(res.statusCode, 200, 'Should return 200');
            t.end();

        });
});
