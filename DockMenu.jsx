import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DockMenu = ({ menuData = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFolder, setActiveFolder] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsLocked(false);
        setActiveFolder(null);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const firstMatch = menuData.find((item) =>
        item.children?.some((c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      if (firstMatch) setActiveFolder(firstMatch.id);
    }
  }, [searchTerm, menuData]);

  const filteredMenu = menuData.filter((item) => {
    const mainMatch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const childMatch = item.children?.some((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return mainMatch || childMatch;
  });

  return (
    <>
      <style>{`
        .dock-wrapper {
          position: fixed; bottom: 10px; left: 50%;
          transform: translateX(-50%) translateY(calc(100% - 25px));
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 9999; padding-bottom: 10px; width: fit-content; max-width: 90vw;
        }
        .dock-wrapper:hover, .dock-wrapper.locked { transform: translateX(-50%) translateY(0) !important; }
        .notch { width: 45px; height: 5px; background: #adb5bd; border-radius: 10px; margin: 0 auto 15px auto; opacity: 0.6; cursor: pointer; }
        .dock-container {
          background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-radius: 28px; padding: 12px 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.4); min-height: 120px;
        }
        .dock-grid { display: flex; flex-wrap: nowrap; justify-content: center; gap: 12px; }
        .dock-item-btn {
          border: none; background: transparent; color: #444; transition: all 0.2s ease;
          padding: 8px; border-radius: 18px; display: flex; flex-direction: column;
          align-items: center; min-width: 75px; text-decoration: none; cursor: pointer;
        }
        .dock-item-btn:hover { background: rgba(0,0,0,0.06); transform: translateY(-8px); color: #000; }
        .icon-container { font-size: 24px; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; height: 32px; }
        .folder-window {
          position: absolute; bottom: calc(100% + 20px); left: 50%; transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-radius: 22px; 
          padding: 15px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.05); min-width: 180px; z-index: 10001;
        }
        .folder-item {
          text-decoration: none; color: #555; display: flex; flex-direction: column;
          align-items: center; padding: 10px; border-radius: 15px; transition: 0.2s;
        }
        .folder-item:hover { background: #f0f0f0; color: #007aff; transform: scale(1.05); }
      `}</style>

      <div
        ref={menuRef}
        className={`dock-wrapper ${isLocked ? "locked" : ""}`}
        onMouseDown={() => setIsLocked(true)}
      >
        <div className="notch"></div>
        <div className="dock-container">
          <div className="mb-3 px-1">
            <input
              type="text"
              className="form-control form-control-sm rounded-pill border-0 bg-light px-3"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsLocked(true)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFolder(null);
                setIsLocked(true);
              }}
            />
          </div>
          <div className="dock-grid">
            {filteredMenu.map((item) => (
              <div key={item.id} className="position-relative">
                {activeFolder === item.id && item.children && (
                  <div
                    className="folder-window"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {item.children
                      .filter((c) =>
                        c.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((child) => (
                        <a
                          key={child.id}
                          href={child.link}
                          className="folder-item"
                        >
                          <div className="icon-container">{child.icon}</div>
                          <span style={{ fontSize: "11px", fontWeight: "500" }}>
                            {child.name}
                          </span>
                        </a>
                      ))}
                  </div>
                )}
                {item.isFolder ? (
                  <button
                    className="dock-item-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFolder(
                        activeFolder === item.id ? null : item.id
                      );
                      setIsLocked(true);
                    }}
                  >
                    <div className="icon-container">{item.icon}</div>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      {item.name}
                    </span>
                  </button>
                ) : (
                  <a
                    href={item.link}
                    className="dock-item-btn"
                    onClick={() => setIsLocked(false)}
                  >
                    <div className="icon-container">{item.icon}</div>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      {item.name}
                    </span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DockMenu;
