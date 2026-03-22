# ThreeScene (background WebGL)

Import elsewhere as:

```ts
import ThreeScene from '@/src/components/ThreeScene'
```

**Why there is also `../ThreeScene.tsx` (one level up):** Next’s resolver tries the file `components/ThreeScene.tsx` before the folder `components/ThreeScene/`. Without that file, the build fails with “No such file”. The root file is only:

`export { default } from './ThreeScene/Scene'`

Inside this folder, **`index.ts`** mirrors the same re-export for tools that resolve the directory.

## Layout

```
ThreeScene/
├── index.ts                 # public API (re-exports default)
├── Scene.tsx                # React canvas + effect lifecycle
├── types.ts                 # shared object types
├── constants.ts             # breakpoints, defaults
├── README.md
├── animation/               # frame tick helpers (scroll, explosion, stars)
├── galaxy/                  # spiral points + shaders
├── michelangelo/            # hand particles + shaders + layout
├── lib/                     # math + viewport helpers
├── postprocessing/          # EffectComposer + bloom
├── scroll/                  # DOM section measurements
├── stars/                   # background star layers
└── textures/                # procedural star sprite
```

