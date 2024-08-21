// src/components/Folder.js
"use client";
import React, { useState } from "react";
import File from "./File";
import { ChevronRight, ChevronDown } from "lucide-react";
import { MenuType } from "./Sidebar";

interface FolderProps {
  menu: MenuType;
}
function Folder({ menu }: FolderProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  const toggleFolder = () => {
    setIsFolderOpen(!isFolderOpen);
  };

  return (
    <div className="text-sm font-medium">
      <div className="cursor-pointer flex items-center" onClick={toggleFolder}>
        {isFolderOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span className="ml-2">{menu.name}</span>
      </div>
      {isFolderOpen && (
        <div className="ml-3 gap-2 flex flex-col mt-2">
          {menu?.contents.map((item) => (
            <React.Fragment key={item.name}>
              {item.type === "root" ? (
                <Folder menu={item} />
              ) : (
                <File menu={item} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Folder;
