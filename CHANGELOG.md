# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [v2.1.0] 2019-04-11
### Added
- Added --remove-types option to create JS-only releases.


## [2.0.9] 2019-01-15
### Added
New **publishto** script added with support for the **dir** command.


## [2.0.8] 2019-01-08
### Added
After publishing is complete, publishtogit now fetches the newly created tags in the development repo.


## [2.0.7] 2019-01-02
### Fixed
- This tool no longer depends on the gitlib, asynchrony and stella libraries. 
Instead, it uses copied files from depot.


## [2.0.6] 2018-07-31
### Changed
- Updated the version of gitlib so that this library and gitlib will be dependent
  upon the same version of the stella library.  This will avoid unexpected
  incompatibilities (see README.md).


## [2.0.5] 2018-07-31
### Changed
Moved components into libraries so they can be reused.


## [2.0.4] 2018-07-31
### Changed
Moved components into libraries so they can be reused.


## [2.0.3] 2018-04-10
### Added
- Reorganized internal code into libraries.


## [2.0.2] 2018-03-15
### Fixed
- Fixed bug where checkout was not completing before the temporary branch was
created.


## [2.0.1] 2018-03-14
### Added
- Made `gitRepo.getCurrentBranch()` resolve with `undefined` when in a detached
  head state.
- Added `gitRepo.getCommitDeltas()`.
### Changed
- Enhanced tag messages to include branch name, commit hash and username.
- Added a check to make sure the development branch is not in a detached head
  state before publishing.
- Added a check to make sure the development branch has been pushed to origin
  before publishing.
- Changed to location of the temporary directory to `.publishtogit`.  


## [2.0.0] 2018-03-13
### Changed
Significantly changed the way this tool publishes to Git.
  - The same repo that is used for development is always used to publishing.
  - When publishing, branches are not created for the major and minor release
    numbers.  Now a release directly branches off of the code that was used to
    build it.
### Removed
- `publishtogit.json` is no longer used.


## [1.0.5] 2018-03-09
### Added
- SemVer now supports prerelease strings.
### Changed
- Updated release instructions.


## [1.0.4] 2018-03-01
### Added
- Added a `--tag` command line option that can be used to specify an additional tag
to be applied to the published commit.  This option can be specified multiple
times in order to create multiple tags.  If a tag already exists, it is moved.


## [v1.0.3] 2018-02-25
### Added
for new features.
### Changed
- The tag created applied when publishing is no longer
"v<major>.<minor>.<patch>".  Instead, it is "v<package.json_version" so that
prerelease tags can be used (e.g. 1.2.3-alpha.3).
