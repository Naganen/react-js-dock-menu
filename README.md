# 🚀 React MacOS-Inspired Modern Dock Menu

A sleek, interactive, and fully customizable bottom menu component built with **React** and **Bootstrap 5**, inspired by the iconic MacOS Dock.

🔗 **Repository Link:** [https://github.com/Naganen/react-js-dock-menu](https://github.com/Naganen/react-js-dock-menu)

---

## ✨ Features

* **Prop-Driven Data:** Pass your menu structure as a prop for maximum flexibility.
* **Smart Hybrid Control:** Smooth hover effect by default. It locks automatically during interactions (searching or browsing folders) and stays open until you click outside.
* **MacOS "Notch" UI:** A subtle, elegant notch appears at the bottom of the screen when minimized.
* **iOS-Style Folder System:** Sub-menus are grouped into grid-based folder windows.
* **Live Search & Auto-Expand:** Instant search across all items. Folders expand automatically if a result is found.
* **Responsive Grid:** Items automatically wrap into new rows if they exceed 60% of the screen width.

---

## 🛠️ Installation & Usage

### 1. Install Peer Dependencies

```bash
npm install bootstrap @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core

```

### 2. How to Use

Import the component and pass your `menuData` array as a prop:

```jsx
import React from 'react';
import DockMenu from './components/DockMenu';

const myMenuData = [
  { id: 1, name: "Dashboard", icon: "faGauge", link: "/dashboard" },
  { 
    id: 2, 
    name: "Settings", 
    icon: "faFolder", 
    isFolder: true,
    children: [
      { id: 21, name: "Profile", link: "/profile", icon: "faUser" },
      { id: 22, name: "Security", link: "/security", icon: "faShieldHalved" }
    ]
  },
  { id: 4, name: "Messages", icon: "faEnvelope", link: "/messages" }
];

function App() {
  return (
    <div className="App">
      <h1>My Application</h1>
      <DockMenu menuData={myMenuData} />
    </div>
  );
}

```

---

## ⚙️ Data Schema

The `menuData` prop expects an array of objects with the following structure:

| Property | Type | Description |
| --- | --- | --- |
| `id` | number/string | Unique identifier |
| `name` | string | Label displayed under the icon |
| `icon` | string | FontAwesome icon name (e.g., "faUser") |
| `link` | string | URL for direct navigation |
| `isFolder` | boolean | (Optional) Set to `true` to enable a sub-menu |
| `children` | array | (Optional) Array of objects for sub-menu items |

---

## 🎨 Tech Stack

* **React** (useState, useEffect, useRef)
* **Bootstrap 5** (Layout & Styles)
* **FontAwesome** (Icons)
* **CSS3** (Backdrop blur & cubic-bezier transitions)

---

MIT License © [Naganen](https://www.google.com/search?q=https://github.com/Naganen)
