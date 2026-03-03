import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const DockMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFolder, setActiveFolder] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const menuRef = useRef(null);

  const menuData = [
    { id: 1, name: "Dashboard", icon: "faGauge", link: "/dashboard" },
    {
      id: 2,
      name: "Settings",
      icon: "faFolder",
      isFolder: true,
      children: [
        { id: 21, name: "Profile", link: "/profile", icon: "faUser" },
        { id: 22, name: "Security", link: "/security", icon: "faShieldHalved" },
      ],
    },
    {
      id: 3,
      name: "Reports",
      icon: "faFolderOpen",
      isFolder: true,
      children: [
        { id: 31, name: "Sales", link: "/sales", icon: "faMoneyBillTrendUp" },
        { id: 32, name: "Traffic", link: "/traffic", icon: "faGlobe" },
      ],
    },
    { id: 4, name: "Messages", icon: "faEnvelope", link: "/messages" },
  ];

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
  }, [searchTerm]);

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
          position: fixed;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%) translateY(calc(100% - 22px));
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1000;
          padding-bottom: 5px;
          max-width: 60vw;
        }
        .dock-wrapper:hover, .dock-wrapper.locked {
          transform: translateX(-50%) translateY(0) !important;
        }
        .notch {
          width: 40px;
          height: 4px;
          background: #adb5bd;
          border-radius: 10px;
          margin: 0 auto 10px auto;
          opacity: 0.8;
        }
        .dock-container {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(15px);
          border-radius: 24px;
          padding: 15px 20px;
          box-shadow: 0 15px 45px rgba(0,0,0,0.25);
          border: 1px solid rgba(0,0,0,0.12);
          min-height: 140px;
          width: 100%;
        }
        .dock-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .dock-item-btn {
          border: none; background: transparent; color: #6c757d;
          transition: all 0.2s ease; padding: 10px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; width: 85px;
          text-decoration: none; cursor: pointer;
        }
        .dock-item-btn:hover { color: #000; background: rgba(0,0,0,0.05); transform: translateY(-5px); }
        .folder-window {
          position: absolute; bottom: calc(100% + 15px); left: 50%;
          transform: translateX(-50%); background: #ffffff; border-radius: 20px;
          padding: 12px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid #eee;
          min-width: 160px; z-index: 1001;
        }
        .folder-item {
          text-decoration: none; color: #495057; display: flex;
          flex-direction: column; align-items: center; padding: 8px;
          border-radius: 12px; transition: 0.2s;
        }
        .folder-item:hover { background: #f8f9fa; color: #0d6efd; }
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
              placeholder="Search pages..."
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
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <div key={item.id} className="position-relative">
                  {activeFolder === item.id && item.children && (
                    <div
                      className="folder-window"
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      {item.children
                        .filter((c) =>
                          c.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((child) => (
                          <a
                            key={child.id}
                            href={child.link}
                            className="folder-item"
                          >
                            <FontAwesomeIcon
                              icon={Icons[child.icon]}
                              size="sm"
                            />
                            <span
                              style={{
                                fontSize: "10px",
                                marginTop: "4px",
                                textAlign: "center",
                              }}
                            >
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
                      <FontAwesomeIcon icon={Icons[item.icon]} size="lg" />
                      <span
                        className="mt-1"
                        style={{ fontSize: "11px", textAlign: "center" }}
                      >
                        {item.name}
                      </span>
                    </button>
                  ) : (
                    <a
                      href={item.link}
                      className="dock-item-btn"
                      onClick={() => setIsLocked(false)}
                    >
                      <FontAwesomeIcon icon={Icons[item.icon]} size="lg" />
                      <span
                        className="mt-1"
                        style={{ fontSize: "11px", textAlign: "center" }}
                      >
                        {item.name}
                      </span>
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="d-flex align-items-center text-muted fst-italic">
                No results found...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DockMenu;
