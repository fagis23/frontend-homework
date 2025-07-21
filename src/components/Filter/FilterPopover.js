import React, { useState, useEffect, useRef } from "react";

function FilterPopover({
  originOptions,
  destinationOptions,
  originCode,
  destinationCode,
  setOriginCode,
  setDestinationCode,
  onClose,
}) {
  const [activeTab, setActiveTab] = useState("origin");
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [tempOrigin, setTempOrigin] = useState([...originCode]);
  const [tempDestination, setTempDestination] = useState([...destinationCode]);
  const popoverRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose(); // batalkan perubahan dan tutup
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const toggleCode = (code, type) => {
    const current = type === "origin" ? tempOrigin : tempDestination;
    const setter = type === "origin" ? setTempOrigin : setTempDestination;
    if (current.includes(code)) {
      setter(current.filter((item) => item !== code));
    } else {
      setter([...current, code]);
    }
  };

  const handleApply = () => {
    setOriginCode(tempOrigin);
    setDestinationCode(tempDestination);
    onClose();
  };

  const handleResetAll = () => {
    setTempOrigin([]);
    setTempDestination([]);
  };

  const renderTabOptions = (type, codes, selected, search, setSearch) => {
    const filtered = codes.filter((code) =>
      code.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div>
        <div className="search-top">
            <input
            type="text"
            placeholder="Cari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", marginBottom: "8px", padding: "6px" }}
            />
            <button onClick={() => setSearch("")} style={{ marginBottom: "8px" }}>
            X
            </button>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {filtered.map((code) => (
            <label key={code}>
              <input
                type="checkbox"
                checked={selected.includes(code)}
                onChange={() => toggleCode(code, type)}
              />
              {" "}
              {code}
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={popoverRef}
     className="box-popover"
    >
      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "12px" }}>
        <button
          onClick={() => setActiveTab("origin")}
          style={{
            flex: 1,
            padding: "8px",
            background: activeTab === "origin" ? "#007bff" : "#eee",
            color: activeTab === "origin" ? "#fff" : "#000",
            border: "none",
          }}
        >
          Origin ({tempOrigin.length})
        </button>
        <button
          onClick={() => setActiveTab("destination")}
          style={{
            flex: 1,
            padding: "8px",
            background: activeTab === "destination" ? "#007bff" : "#eee",
            color: activeTab === "destination" ? "#fff" : "#000",
            border: "none",
          }}
        >
          Destination ({tempDestination.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === "origin"
        ? renderTabOptions("origin", originOptions, tempOrigin, originSearch, setOriginSearch)
        : renderTabOptions("destination", destinationOptions, tempDestination, destinationSearch, setDestinationSearch)}

      {/* Footer */}
    <div className="search-bottom">
        <button className="search-bottom__reset" onClick={handleResetAll}>Reset</button>
        <button className="search-bottom__apply"
          onClick={handleApply}
          disabled={
            tempOrigin.toString() === originCode.toString() &&
            tempDestination.toString() === destinationCode.toString()
          }
         
        >
          Terapkan
        </button>
      </div>
    </div>
  );
}

export default FilterPopover;
