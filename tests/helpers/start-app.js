import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

import GitlabAdapter from 'ember-data-gitlab/adapters/gitlab';

import UserFactory from './factories/user';
import OrganizationFactory from './factories/organization';
import RepositoryFactory from './factories/repository';
import BranchFactory from './factories/branch';
import ReleaseFactory from './factories/release';
import BlobFactory from './factories/blob';
import TreeFactory from './factories/trees';

import './custom-helpers/assert-gitlab-branch-ok';
import './custom-helpers/assert-gitlab-organization-ok';
import './custom-helpers/assert-gitlab-repository-ok';
import './custom-helpers/assert-gitlab-user-ok';
import './custom-helpers/assert-gitlab-release-ok';
import './custom-helpers/assert-gitlab-blob-ok';
import './custom-helpers/assert-gitlab-tree-ok';

const { merge, run } = Ember;

export default function startApp(attrs) {
  let application;

  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  UserFactory.defineUser();
  OrganizationFactory.defineOrganization();
  RepositoryFactory.defineRepository();
  BranchFactory.defineBranch();
  ReleaseFactory.defineRelease();
  BlobFactory.defineBlob();
  TreeFactory.defineTree();

  // Pretender doesn't work with fully qualified URLs
  GitlabAdapter.reopen({
    // Caution: overriding ember-data private api
    ajax(url, type, options) {
      url = url.replace('https://api.gitlab.com', '');
      return this._super(url, type, options);
    }
  });

  return application;
}
