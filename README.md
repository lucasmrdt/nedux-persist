# nedux-persist - persist your nedux store

![typescript](https://img.shields.io/badge/-typescript-blueviolet) [![version](https://img.shields.io/badge/version-beta-blue)](https://www.npmjs.com/package/nedux-persist) [![size](https://img.shields.io/bundlephobia/minzip/nedux-persist?color=green&label=size)](https://www.npmjs.com/package/nedux-persist)

> The official [middleware](https://github.com/lucasmrdt/nedux#%EF%B8%8F-middlewares) persistor for [nedux](https://github.com/lucasmrdt/nedux). Performant and flexible.

## 📦 Installation

```bash
npm install nedux-persist --save
```

## 💻 Usage with examples

|        Name         |                                        Codesandbox                                         |
| :-----------------: | :----------------------------------------------------------------------------------------: |
| 🔒 Persisting Token | [here](https://codesandbox.io/s/new-feather-777tm?fontsize=14&hidenavigation=1&theme=dark) | [here](https://codesandbox.io/s/nedux-todos-nm8j0?fontsize=14&hidenavigation=1&theme=dark) |

## 📜 Documentation

### `Import`

```javascript
// ES6
import { persistKeys } from 'nedux-persist';

// ES5
var persistKeys = require('nedux-persist').persistKeys;
```

### `persistKeys(keys, [localStorage])`

Create a middleware that may your `keys` persisted.

|    argument    | required |        type         | description                       |
| :------------: | :------: | :-----------------: | :-------------------------------- |
|     `keys`     |    ✅    |     `string[]`      | The keys that you want to persist |
| `localStorage` |    ❌    | [Storage](#storage) | The keys that you want to persist |

<a id="storage"></a>

### Storage

| argument  | required |                  type                  | description                |
| :-------: | :------: | :------------------------------------: | :------------------------- |
| `getItem` |    ✅    |       `(key: string) => string`        | Get the value from Storage |
| `setItem` |    ✅    | `(key: string, value: string) => void` | Set the value into Storage |

## 🎛 Basic Usage

```typescript
import { createStore } from 'nedux';
import { persistKeys } from 'nedux-persist';

type Store = {
  token: string;
  useless: number;
};

const store = createStore<Store>(
  { token: '', useless: 0 },
  persistKeys(['token']),
);

store.subscribe('token', { next: token => console.log(`token: ${token}`) });
```

## 🙋🏼 Contributions

All [Pull Requests](https://github.com/lucasmrdt/nedux-persist/compare?expand=1), [Issues](https://github.com/lucasmrdt/nedux-persist/issues) and [Discussions](https://github.com/lucasmrdt/nedux-persist/issues) are welcomed !
