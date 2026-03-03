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

  const getSearchGroups = () => {
    if (!searchTerm.trim()) return [];
    let groups = [];
    menuData.forEach((item) => {
      let matchingChildren =
        item.children?.filter((child) =>
          child.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

      const isMainMatch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (isMainMatch || matchingChildren.length > 0) {
        groups.push({
          parent: item,
          children: matchingChildren,
          isGroup: matchingChildren.length > 0,
        });
      }
    });
    return groups;
  };

  const searchGroups = getSearchGroups();

  return (
    <>
      <style>{`
        .dock-wrapper {
          position: fixed; bottom: 15px; left: 50%;
          transform: translateX(-50%) translateY(calc(100% - 25px));
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 9999; padding-bottom: 10px; width: fit-content; max-width: 98vw;
          display: flex; flex-direction: column; align-items: center;
        }
        .dock-wrapper:hover, .dock-wrapper.locked { transform: translateX(-50%) translateY(0) !important; }
        
        .notch { 
          width: 45px; height: 5px; background: #adb5bd; border-radius: 10px; 
          margin-bottom: 12px; opacity: 0.6; cursor: grab;
        }
        
        .dock-container {
          background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(25px);
          border-radius: 28px; padding: 12px 18px; box-shadow: 0 15px 50px rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.4); display: flex; flex-direction: column; align-items: center;
        }

        .dock-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; width: 100%; position: relative; }

        .dock-item-wrapper { position: relative; display: flex; justify-content: center; }

        .dock-item {
          border: none; background: transparent; transition: all 0.2s ease;
          padding: 8px; border-radius: 16px; display: flex; flex-direction: column;
          align-items: center; min-width: 75px; text-decoration: none; cursor: pointer; color: #333;
        }
        .dock-item:hover { background: rgba(0,0,0,0.06); transform: translateY(-4px); }
        .icon-box { font-size: 24px; height: 35px; display: flex; align-items: center; justify-content: center; }
        .item-text { font-size: 10px; font-weight: 500; margin-top: 4px; }

        /* ÜSTTE ORTALANMIŞ SUB-MENU (Hibrit Kullanım) */
        .centered-sub-menu {
          display: flex; flex-wrap: wrap; justify-content: center;
          background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(15px);
          border-radius: 20px; padding: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          border: 1px solid rgba(0,0,0,0.08); position: absolute;
          bottom: 115%; left: 50%; transform: translateX(-50%);
          z-index: 10000; width: max-content; max-width: 280px;
          animation: popUpCentered 0.3s cubic-bezier(0.17, 0.84, 0.44, 1);
        }
        .centered-sub-menu::after {
          content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
          border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #fff;
        }

        @keyframes popUpCentered {
          from { opacity: 0; transform: translateX(-50%) translateY(15px) scale(0.9); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }

        .search-group {
          display: flex; align-items: center; background: rgba(0,122,255,0.05); 
          border-radius: 20px; padding: 4px; gap: 4px; border: 1px solid rgba(0,122,255,0.1);
        }
      `}</style>

      <div
        ref={menuRef}
        className={`dock-wrapper ${isLocked ? "locked" : ""}`}
        onMouseDown={() => setIsLocked(true)}
      >
        <div className="notch"></div>
        <div className="dock-container">
          <div className="search-section w-100 mb-3">
            <input
              type="text"
              className="form-control rounded-pill border-0 bg-light px-3"
              style={{ fontSize: "13px" }}
              placeholder="Search apps..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActiveFolder(null);
              }}
              onFocus={() => setIsLocked(true)}
            />
          </div>

          <div className="dock-grid">
            {searchTerm.trim() === ""
              ? // --- NORMAL MOD ---
                menuData.map((item) => (
                  <div key={item.id} className="dock-item-wrapper">
                    <button
                      className="dock-item"
                      style={
                        activeFolder === item.id
                          ? {
                              background: "rgba(0,122,255,0.1)",
                              color: "#007aff",
                            }
                          : {}
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveFolder(
                          activeFolder === item.id ? null : item.id
                        );
                      }}
                    >
                      <div className="icon-box">{item.icon}</div>
                      <span className="item-text">{item.name}</span>
                    </button>

                    {activeFolder === item.id && item.children && (
                      <div
                        className="centered-sub-menu"
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {item.children.map((child) => (
                          <a
                            key={child.id}
                            href={child.link}
                            className="dock-item"
                            style={{ minWidth: "65px" }}
                          >
                            <div
                              className="icon-box"
                              style={{ fontSize: "20px" }}
                            >
                              {child.icon}
                            </div>
                            <span
                              className="item-text"
                              style={{ fontSize: "9px" }}
                            >
                              {child.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              : // --- ARAMA MODU (Hibrit) ---
                searchGroups.map((group) => {
                  if (!group.isGroup) {
                    return (
                      <div key={group.parent.id} className="dock-item-wrapper">
                        {/* Klasör Penceresi Arama Modunda da Burada Açılabilir */}
                        {activeFolder === group.parent.id &&
                          group.parent.children && (
                            <div
                              className="centered-sub-menu"
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              {group.parent.children.map((child) => (
                                <a
                                  key={child.id}
                                  href={child.link}
                                  className="dock-item"
                                  style={{ minWidth: "65px" }}
                                >
                                  <div
                                    className="icon-box"
                                    style={{ fontSize: "20px" }}
                                  >
                                    {child.icon}
                                  </div>
                                  <span
                                    className="item-text"
                                    style={{ fontSize: "9px" }}
                                  >
                                    {child.name}
                                  </span>
                                </a>
                              ))}
                            </div>
                          )}

                        {group.parent.isFolder ? (
                          <button
                            className="dock-item"
                            style={
                              activeFolder === group.parent.id
                                ? {
                                    background: "rgba(0,122,255,0.1)",
                                    color: "#007aff",
                                  }
                                : {}
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveFolder(
                                activeFolder === group.parent.id
                                  ? null
                                  : group.parent.id
                              );
                            }}
                          >
                            <div className="icon-box">{group.parent.icon}</div>
                            <span className="item-text">
                              {group.parent.name}
                            </span>
                          </button>
                        ) : (
                          <a href={group.parent.link} className="dock-item">
                            <div className="icon-box">{group.parent.icon}</div>
                            <span className="item-text">
                              {group.parent.name}
                            </span>
                          </a>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={group.parent.id} className="search-group">
                      <div className="dock-item" style={{ opacity: 0.5 }}>
                        <div className="icon-box">{group.parent.icon}</div>
                        <span className="item-text" style={{ fontSize: "8px" }}>
                          {group.parent.name}
                        </span>
                      </div>
                      {group.children.map((child) => (
                        <a
                          key={child.id}
                          href={child.link}
                          className="dock-item"
                          style={{ minWidth: "65px" }}
                        >
                          <div
                            className="icon-box"
                            style={{ fontSize: "20px" }}
                          >
                            {child.icon}
                          </div>
                          <span className="item-text">{child.name}</span>
                        </a>
                      ))}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DockMenu;
