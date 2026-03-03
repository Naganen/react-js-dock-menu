# 🚀 React MacOS-Inspired Modern Dock Menu

A sleek, interactive, and highly flexible bottom menu component built with **React** and **Bootstrap 5**. Designed to bring a modern, OS-level navigation experience to web applications with minimal setup.

🔗 **Repository Link:** [https://github.com/Naganen/react-js-dock-menu](https://github.com/Naganen/react-js-dock-menu)

---

## ✨ Key Features

* **Universal Icon Support:** Highly flexible icon rendering—works perfectly with **Emojis**, **SVGs**, **Custom Components**, or standard **Image tags**.
* **Intelligent Interaction:** Seamlessly switches between a smooth "Hover" mode and a "Locked" focus mode during active navigation or searching.
* **MacOS "Notch" UI:** Features a minimal, elegant notch at the bottom of the screen that acts as a subtle trigger for the menu.
* **Folder System:** Supports nested menu items through a grid-based folder window, mimicking modern mobile and desktop operating systems.
* **Integrated Search:** Includes a built-in search bar that filters all menu items in real-time.
* **Auto-Expansion:** Smart search logic automatically opens the relevant folder if a matching result is found within a sub-menu.
* **Responsive Design:** Fully adaptive grid that wraps items automatically to prevent overflow on smaller viewports.

---

## 🛠️ Installation & Usage

### 1. Requirements

Ensure you have **Bootstrap 5** available in your project for layout utilities:

```bash
npm install bootstrap

```

### 2. Basic Implementation

Simply import the component and provide your configuration via the `menuData` prop:

```jsx
import React from 'react';
import DockMenu from './components/DockMenu';

const myMenuData = [
  { id: 1, name: "Dashboard", icon: "📊", link: "/dashboard" },
  { 
    id: 2, 
    name: "Settings", 
    icon: "⚙️", 
    isFolder: true,
    children: [
      { id: 21, name: "Profile", icon: "👤", link: "/profile" },
      { id: 22, name: "Security", icon: "🛡️", link: "/security" }
    ]
  },
  { id: 3, name: "Messages", icon: "✉️", link: "/messages" }
];

function App() {
  return (
    <div className="App">
      {/* Your content */}
      <DockMenu menuData={myMenuData} />
    </div>
  );
}

```

---

## ⚙️ Data Schema

The `menuData` prop accepts an array of objects with the following structure:

| Property | Type | Description |
| --- | --- | --- |
| `id` | number/string | Unique identifier for React rendering. |
| `name` | string | The label displayed under the icon. |
| `icon` | any | Any renderable content (Emoji, SVG, Image, etc.). |
| `link` | string | The target URL for navigation. |
| `isFolder` | boolean | Set to `true` to enable sub-menu functionality. |
| `children` | array | (Optional) List of items to be displayed inside a folder. |

---

## 🎨 Tech Stack

* **React** (Functional Components, Hooks: `useState`, `useEffect`, `useRef`)
* **Bootstrap 5** (Layout and form utilities)
* **CSS3** (Backdrop-filter blur, custom cubic-bezier transitions, and flex-grid)

---

### 📝 User Experience (UX) Note

The menu utilizes a **Click-Outside** listener and a **Focus-Lock** mechanism. This ensures that the menu remains stable and open while the user is actively searching or browsing folders, preventing accidental closures during precise interactions.

---

MIT License © [Naganen](https://www.google.com/search?q=https://github.com/Naganen)
