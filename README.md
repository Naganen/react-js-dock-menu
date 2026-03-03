# 🚀 React MacOS-Inspired Modern Dock Menu

A sleek, interactive, and fully customizable bottom menu component built with **React** and **Bootstrap 5**, inspired by the iconic MacOS Dock.



## ✨ Features

* **Smart Hybrid Control:** Operates with a smooth hover effect by default. Locks automatically when interacting (searching or opening folders) and remains open until clicking outside.
* **MacOS "Notch" UI:** Displays a subtle, elegant notch at the bottom of the screen when minimized.
* **iOS-Style Folder System:** Sub-menus are grouped into grid-based folder windows, mimicking mobile UI patterns.
* **Live Search & Auto-Expand:** Search through all menu items instantly. If a result is inside a folder, the folder expands automatically.
* **Responsive Grid:** Adapts to various screen sizes. Items wrap into new rows if they exceed 60% of the screen width.
* **Dynamic FontAwesome Icons:** Easily manageable data structure using FontAwesome string identifiers.

## 🛠️ Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Naganen/react-js-dock-menu.git
    cd react-js-dock-menu
    ```

2.  **Install dependencies:**
    ```bash
    npm install bootstrap @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
    ```

3.  **Run the project:**
    ```bash
    npm start
    # or if using Vite
    npm run dev
    ```

## 📂 Data Structure

The menu is driven by a simple JSON-like object:

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
      { id: 21, name: "Profile", link: "/profile", icon: "faUser" }
    ]
  }
];
