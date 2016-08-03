import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1';

describe.only('facebook-helper', () => {
  let facebookHelper = null;

  before(async function(done){
    let userId = "694380983949269";
    let token = "EAACEdEose0cBANUj4LTJg4bpkQqvbS1hjBVPTHtlZCnfxqwZBcIGNPwA1CfxRU9PZAXI43N6X91HbUzfO6Q47fctTc6tJzejT6u1s7WHfzuXOzTZA0utM6vS9fHFtDcBR2uILG8LZCPnp5MFaBUZBZAmAKoiplbJIbBuGct55zlRQZDZD";
    models = await task1_initModel();
    facebookHelper = new FacebookHelper({userId, token});
    done();
  });
  //新增１
  let models = null;
  let friends = null;
  //１

  it("get friends list", async (done) => {
    try {
      friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");

//新增２
  var count = friends.length;
  for(var i=0;i<count;i++){
      let addUser = {name: friends[i].name, facebookid: friends[i].id }
      let result = {};
      result = await models.friend.create(addUser)
      result.toJSON().should.has.keys(
        'id',
        'name',
        'facebookid',
        'createdAt',
        'updatedAt'
      );
    }
//２

      done();
    } catch (e) {
      done(e);
    }
  });

  it('get friend', async (done) => {
    try{
      let result = await models.friend.findAll();
      result.length.should.be.equal(friends.length);
      done();
    }
    catch(e){
      done(e);
    }
  });
  it('change email to hellojs@trunk.studio', async (done) => {
    try{
      let result1 = await models.friend.findOne({
         where: {
           id:1,
         },  });
      result1.email = 'hellojs@trunk.studio';
      let result = await result1.save();
      console.log(result.name , result.id , result.email);
      //  result.email.should.equal('hellojs@trunk.studio');
         done();
      }
        catch(e){
      done(e);
      }
    });

    it('刪除信箱為hellojs@trunk.studio的使用者', async (done) => {
        try {;
          let result = {};
          result = await models.friend.findOne({
            where: {
              email:'hellojs@trunk.studio',
            },
        });
          await result.destroy();
          let check = await models.User.findOne({
          where: {
              email: 'hellojs@trunk.studio',
            },
          });
          (check === null).should.be.true;
            done();
          } catch (e) {
            done(e);
          }
             });

});
