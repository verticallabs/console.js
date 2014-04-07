describe('console', function() {
  it('should load extra tasks properly', function() {
    var console = require(__dirname + '/../console.js');
    var context = {};
    console.createContext(context);
    expect(context.command).not.to.be.null;
    expect(context.cd).not.to.be.null;
  });

  it('should change dirs properly', function(done) {
    var console = require(__dirname + '/../console.js');
    console.createContext(global);

debugger;
    cd('/')
    .then(function() {
      expect(process.cwd()).to.equal('/');
      done();
    });
  });
});
