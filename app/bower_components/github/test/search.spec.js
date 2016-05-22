import Github from '../lib/GitHub';
import testUser from './fixtures/user.json';
import {assertSuccessful} from './helpers/callbacks';

describe('Search', function() {
   let github;

   before(function() {
      github = new Github({
         username: testUser.USERNAME,
         password: testUser.PASSWORD,
         auth: 'basic'
      });
   });

   it('should search repositories', function(done) {
      let options;
      let search = github.search({
         q: 'tetris language:assembly',
         sort: 'stars',
         order: 'desc'
      });

      search.forRepositories(options, assertSuccessful(done));
   });

   it('should search code', function(done) {
      let options;
      let search = github.search({
         q: 'addClass in:file language:js repo:jquery/jquery'
      });

      search.forCode(options, assertSuccessful(done));
   });

   it('should search issues', function(done) {
      let options;
      let search = github.search({
         q: 'windows pip label:bug language:python state:open ',
         sort: 'created',
         order: 'asc'
      });

      search.forIssues(options, assertSuccessful(done));
   });

   it('should search users', function(done) {
      let options;
      let search = github.search({
         q: 'tom repos:>42 followers:>1000'
      });

      search.forUsers(options, assertSuccessful(done));
   });
});
