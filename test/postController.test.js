import 'chai/register-expect';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('Post controller /posts...', () => {
  describe('/GET...', () => {
    it('to return successfully', done => {
      chai.request(app)
        .get('/posts')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(4);
          done();
        });
    });

    it('to return successfully when filtering by userId', done => {
      const testUserId = 1;
      const query = {
        user: testUserId,
      };
      chai.request(app)
        .get('/posts')
        .query(query)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(2);
          res.body.forEach(post => expect(post.userId).to.equal(testUserId));
          done();
        });
    });

    it('to return an empty array when given an incorrect userId', done => {
      const testUserId = 99999;
      const query = {
        user: testUserId,
      };
      chai.request(app)
        .get('/posts')
        .query(query)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(0);
          done();
        });
    });

    it('to find by id', done => {
      chai.request(app)
        .get('/posts/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('to return not found', done => {
      chai.request(app)
        .get('/posts/99')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('/POST...', () => {
    it('to return a complete post model', done => {
      const post = {
        userId: 1,
        title: 'test title',
        body: 'test body',
      };
      chai.request(app)
        .post('/posts')
        .send(post)
        .end((err, res) => {
          const newPost = res.body;

          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(newPost).to.have.property('id');
          expect(newPost).to.have.property('userId');
          expect(newPost).to.have.property('title');
          expect(newPost).to.have.property('body');
          done();
        });
    });
  });

  describe('/PUT...', () => {
    it('should update an existing post', done => {
      const post = {
        title: 'test title',
        body: 'test body',
      };

      chai.request(app)
        .put('/posts/1')
        .send(post)
        .end((err, res) => {
          const updatedPost = res.body;

          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(updatedPost).to.have.property('id');
          expect(updatedPost).to.have.property('userId');
          expect(updatedPost).to.have.property('title');
          expect(updatedPost).to.have.property('body');

          expect(updatedPost.id).to.equal(1);
          expect(updatedPost.title).to.equal(post.title);
          expect(updatedPost.body).to.equal(post.body);
          done();
        });
    });

    it('should return not found for a unsuccessful update by id', done => {
      const post = {
        title: 'test title',
        body: 'test body',
      };

      chai.request(app)
        .put('/posts/99999')
        .send(post)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('/DELETE...', () => {
    it('should delete the post', done => {
      chai.request(app)
        .delete('/posts/1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return not found', done => {
      chai.request(app)
        .delete('/posts/99')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
