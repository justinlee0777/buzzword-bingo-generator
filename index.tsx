import * as React from 'react';
import { createRoot } from 'react-dom/client';

import BuzzwordBingo from './src/index';

const root = createRoot(document.body);

root.render(
  <BuzzwordBingo
    defaultFiles={[
      {
        name: 'Nagotoro',
        path: 'assets/bingosheets/personal/nagotoro/nagotoro-2.txt',
      },
      {
        name: 'Mob Psycho',
        path: 'assets/bingosheets/personal/mob-psycho-buzzword-bingo.txt',
      },
    ]}
  />
);
