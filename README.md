# 🚀 React MacOS-Inspired Modern Dock Menu

A sleek, interactive, and highly flexible bottom menu component built with **React** and **Bootstrap 5**. This version is designed to be **library-agnostic**, meaning you can use Emojis, SVGs, or custom Image tags as icons without dependency errors.

🔗 **Repository Link:** [https://github.com/Naganen/react-js-dock-menu](https://github.com/Naganen/react-js-dock-menu)

---

## ✨ Key Features

* **Zero-Dependency Icons:** Use Emojis, SVGs, or `<img>` tags directly. No more "Element type is invalid" errors.
* **Smart Hybrid Control:** Smooth hover effect that "locks" into place during active interactions (searching or browsing folders).
* **MacOS "Notch" UI:** A minimal indicator at the bottom of the screen when the menu is hidden.
* **Auto-Expanding Folders:** Live search scans through all items; if a match is found inside a folder, the folder opens automatically.
* **Responsive Grid:** Menu items stay centered and wrap perfectly on smaller screens.

---

## 🛠️ Installation & Usage

### 1. Requirements

You only need **Bootstrap 5** for the basic layout styling:

```bash
npm install bootstrap

```

### 2. Implementation

Copy `DockMenu.jsx` into your project and pass your data via the `menuData` prop.

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
      <DockMenu menuData={myMenuData} />
    </div>
  );
}

```

---

## ⚙️ Data Schema

| Property | Type | Description |
| --- | --- | --- |
| `id` | number/string | Unique ID for React keys. |
| `name` | string | Label displayed below the icon. |
| `icon` | any | Can be an **Emoji**, **SVG code**, or **`<img>`** tag. |
| `link` | string | Navigation URL. |
| `isFolder` | boolean | If `true`, clicks will toggle the sub-menu window. |
| `children` | array | Array of objects for sub-menu items (folders). |

---

## 🎨 Tech Stack

* **React** (useState, useEffect, useRef)
* **Bootstrap 5** (Layout utilities)
* **CSS3** (Backdrop-filter blur, Bezier transitions, and absolute positioning)

---

### 📝 Developer Note

This component uses a **Focus-Lock** mechanism. When a user clicks the search bar or opens a folder, the menu stays visible even if the mouse leaves the area. It only minimizes when the user clicks anywhere outside the menu.

---

MIT License © [Naganen](https://www.google.com/search?q=https://github.com/Naganen)
