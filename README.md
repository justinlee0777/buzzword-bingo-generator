# Buzzword Bingo Generator

Website for generating randomized Buzzword Bingo sheets.

## Deployment

To install, run

```
npm install buzzword-bingo-generator
```

The code is shipped as an un-optimized (un-minified) React library with only one export.

```
import BuzzwordBingo from 'buzzword-bingo-generator';
```

There are no required props.

The code can be ran locally with `yarn start`.

## Features

It takes in a .txt file in the following format:

```
1. Foo
2. Bar
3. Baz
...
```

It accepts 2x2, 3x3, 4x4 and 5x5 sheets.

Cells can be formatted with regex, to strip off list styles like the 1., 2., 3. above.

The Free Square! cell can be replaced with text or an image.

For text:

```
Free) Free square replacement!
```

For image:

```
Free) http://imageUrl!image
```

Finally, preset sheets can be configured onto the component.

## Possible Features

- Allow any cell to be an image
- Special effects when bingo has been achieved
- Letting players know if they are one cell away from bingo
