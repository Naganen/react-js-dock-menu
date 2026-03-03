# 🚀 React MacOS-Inspired Modern Dock Menu

A sleek, interactive, and fully customizable bottom menu component built with **React** and **Bootstrap 5**, inspired by the iconic MacOS Dock. Designed to be a "Plug & Play" component for any React project.

🔗 **Repository Link:** [https://github.com/Naganen/react-js-dock-menu](https://github.com/Naganen/react-js-dock-menu)

---

## ✨ Features

* **Smart Hybrid Control:** Smooth hover effect by default. It locks automatically during interactions (searching or browsing folders) and stays open until you click outside.
* **MacOS "Notch" UI:** A subtle, elegant notch appears at the bottom of the screen when minimized, indicating the menu's presence.
* **iOS-Style Folder System:** Sub-menus are grouped into grid-based folder windows, providing a familiar and clean mobile UI experience.
* **Live Search & Auto-Expand:** Instant search across all items. Folders expand automatically if a matching result is found within them.
* **Responsive & Adaptive:** Items wrap into new rows if they exceed 60% of the screen width, ensuring the menu never overflows the viewport.
* **Dynamic FontAwesome Icons:** Manage your menu items easily using simple string identifiers for icons.

---

## 🛠️ Installation & Usage

This component is designed for seamless integration. You can simply drop the component file into your project.

### 1. Install Required Peer Dependencies

Ensure you have Bootstrap and FontAwesome icons installed in your project:

```bash
npm install bootstrap @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core

```

### 2. Import and Use

Copy the component file into your project and import it as follows:

```jsx
import React from 'react';
import RockSolidDock from './components/RockSolidDock';

function App() {
  return (
    <div className="App">
      {/* Your Page Content */}
      <main style={{ height: '200vh', padding: '20px' }}>
        <h1>Welcome to My App</h1>
        <p>Scroll down or hover the bottom notch to see the Dock in action!</p>
      </main>

      {/* The Dock Component */}
      <RockSolidDock />
    </div>
  );
}

export default App;

```

---

## ⚙️ Data Structure

To customize the menu items, simply edit the `menuData` array inside the component. Each item can be a direct link or a folder containing children:

```javascript
const menuData = [
  { 
    id: 1, 
    name: "Dashboard", 
    icon: "faGauge", 
    link: "/dashboard" 
  },
  { 
    id: 2, 
    name: "Settings", 
    icon: "faFolder", 
    isFolder: true,
    children: [
      { id: 21, name: "Profile", link: "/profile", icon: "faUser" },
      { id: 22, name: "Security", link: "/security", icon: "faShieldHalved" }
    ]
  }
];

```

---

## 🎨 Tech Stack

* **React** (Hooks: `useState`, `useEffect`, `useRef`)
* **Bootstrap 5** (Layout & Form utilities)
* **FontAwesome** (Scalable vector icons)
* **CSS3** (Backdrop-filter blur, cubic-bezier transitions, and flexbox)

---

### 📝 User Experience (UX) Note

This component addresses common "hover-glitch" issues found in similar dock clones. By implementing a **Focus-Lock** mechanism, the menu remains stable while the user is actively typing in the search bar or navigating through sub-folders, closing only when an explicit "click outside" action occurs.

---

MIT License © [Naganen](https://www.google.com/search?q=https://github.com/Naganen)
