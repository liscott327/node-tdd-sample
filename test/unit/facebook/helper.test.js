import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';

describe.skip('facebook-helper', () => {
  let facebookHelper = null;

  before((done) => {
    let userId = "694380983949269";
    let token = "EAACEdEose0cBANUj4LTJg4bpkQqvbS1hjBVPTHtlZCnfxqwZBcIGNPwA1CfxRU9PZAXI43N6X91HbUzfO6Q47fctTc6tJzejT6u1s7WHfzuXOzTZA0utM6vS9fHFtDcBR2uILG8LZCPnp5MFaBUZBZAmAKoiplbJIbBuGct55zlRQZDZD";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    done();
  });

  let models = null;
  beforeEach(async (done) => {
    try {
      models = await task1_initModel()
      done()
    } catch (e) {
      done(e)
    }
  });


  it("get friends list", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");


  var count = friends.length;

  for(var i=0;i<count;i++){
      let addUser = {username: friends[i].name, id: friends[i].id ,email: friends[i].email}
      let result = {};
      result = await models.User.create(addUser)
      result.toJSON().should.has.keys(
        'id',
        'username',
        'email',
        'createdAt',
        'updatedAt'
      );
    }

      done();
    } catch (e) {
      done(e);
    }
  });

  it.skip("publish post", async (done) => {
    try {
      let post = {
        message: 'use FB API TDD test facebook post api'
      }
      let result = await facebookHelper.publishPost(post);
      console.log("result", result);
      done();
    } catch (e) {
      done(e);
    }
  });



});
