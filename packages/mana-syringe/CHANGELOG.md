# @difizen/mana-syringe

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
