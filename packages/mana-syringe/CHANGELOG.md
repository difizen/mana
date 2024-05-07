# @difizen/mana-syringe

## 0.1.15

### Patch Changes

- 95eb30c: chore: add father config
- Updated dependencies [95eb30c]
  - @difizen/mana-common@0.1.15

## 0.1.14

### Patch Changes

- 1b880fe: fix: attributes in ContributionOptionConfig
- Updated dependencies [1b880fe]
  - @difizen/mana-common@0.1.14

## 0.1.13

### Patch Changes

- 76745bd: feat: add ContributionOptionConfig
- Updated dependencies [76745bd]
  - @difizen/mana-common@0.1.13

## 0.1.12

### Patch Changes

- 8eee617: chore: update the peerDependencies about react
- Updated dependencies [8eee617]
  - @difizen/mana-common@0.1.12

## 0.1.11

### Patch Changes

- 6fb1d96: mana-observable: Allows defining properties that should not be observed.
- 67e2969: Add mana-ui package
- c1cf9c7: Compatible with disposable-collection old API
- Updated dependencies [6fb1d96]
- Updated dependencies [67e2969]
- Updated dependencies [c1cf9c7]
  - @difizen/mana-common@0.1.11

## 0.1.10

### Patch Changes

- 9f85eb3: App: No longer use proxy to operate tree nodes to improve performance.
- 5c2f9f3: Workaround on Illegal invocation errors
- 1e70032: Fix: Object.prototype methods should not be called directly on the object
- 4cb40cf: Avoid adjacent dividing lines in menus.
- f090577: No longer proxies access to forzen objects
- 9fed876: Allow custom modal rendering logic.
- 395394b: Observable: Allows users to add custom exclusion rules for observable transformations
- 36bd4ee: Readonly & non-configurable property should return the actual value
- Updated dependencies [9f85eb3]
- Updated dependencies [5c2f9f3]
- Updated dependencies [1e70032]
- Updated dependencies [4cb40cf]
- Updated dependencies [f090577]
- Updated dependencies [9fed876]
- Updated dependencies [395394b]
- Updated dependencies [36bd4ee]
  - @difizen/mana-common@0.1.10

## 0.1.9

### Patch Changes

- b5ec5a9: Fix: Divider display between menu groups.
- 4d9bc01: 1. Once a menu is activated, clicking it again will no longer deactivate it. 2. Even with proxy objects, the original notifier can be found.
- 4722513: The file tree can be accessed contextually via the file tree menu
- Updated dependencies [b5ec5a9]
- Updated dependencies [4d9bc01]
- Updated dependencies [4722513]
  - @difizen/mana-common@0.1.9

## 0.1.8

### Patch Changes

- 9c87e44: 1. Once a menu is activated, clicking it again will no longer deactivate it. 2. Even with proxy objects, the original notifier can be found.
- Updated dependencies [9c87e44]
  - @difizen/mana-common@0.1.8

## 0.1.7

### Patch Changes

- 1650890: add simple mode for uri which not escape & unescape
- Updated dependencies [1650890]
  - @difizen/mana-common@0.1.7

## 0.1.6

### Patch Changes

- b6bac8e: add vscode uri and add parameters in parse function
- Updated dependencies [b6bac8e]
  - @difizen/mana-common@0.1.6

## 0.1.5

### Patch Changes

- 530df5c: Get notifier before observable transform.
- Updated dependencies [530df5c]
  - @difizen/mana-common@0.1.5

## 0.1.4

### Patch Changes

- d36870f: 1. Add slot related events. 2. Add implementation of basic stateful views.
- Updated dependencies [d36870f]
  - @difizen/mana-common@0.1.4

## 0.1.3

### Patch Changes

- Performance optimization of view rendering and issue fixing of file tree
- Updated dependencies
  - @difizen/mana-common@0.1.3

## 0.1.2

### Patch Changes

- 1. [observable] Do not track dom element object.
- Updated dependencies
  - @difizen/mana-common@0.1.2

## 0.1.1

### Patch Changes

- 1. [observable] Optimize the handling of frozen objects and some built-in types.
  2. [observable] Support pausing property change events.
  3. Support tab props & support multi-parameter method to handle menu status.
- Updated dependencies
  - @difizen/mana-common@0.1.1

## 0.1.0

### Minor Changes

- - [observable] remove `Reactable` and use `notifier` as message trigger.
  - [observable] better event handling.
  - [syringe] the syringe module now supports setting dependencies.

### Patch Changes

- c137209: 1. (core) add onActiveChange event in DefaultSlotView. 2. (observable) update
  Notifier api & increased coverage.
- c9b0853: 1. The syringe module now supports setting dependencies. 2. Observable has
  been refactored with fewer entities and better event handling. 3. Fixed some other
  issues and improved code quality.
- 3f50036: Initial Version
- Updated dependencies
- Updated dependencies [c137209]
- Updated dependencies [c9b0853]
- Updated dependencies [3f50036]
  - @difizen/mana-common@0.1.0

## 0.0.2-alpha.3

### Patch Changes

- 1. (core) add onActiveChange event in DefaultSlotView.
  2. (observable) update Notifier api & increased coverage.
- Updated dependencies
  - @difizen/mana-common@0.0.2-alpha.3

## 0.0.2-alpha.2

### Patch Changes

- 1. The syringe module now supports setting dependencies.
  2. Observable has been refactored with fewer entities and better event handling.
  3. Fixed some other issues and improved code quality.
- Updated dependencies
  - @difizen/mana-common@0.0.2-alpha.2

## 0.0.2-alpha.1

### Patch Changes

- Initial Version
- Updated dependencies
  - @difizen/mana-common@0.0.2-alpha.1
