import React from "react";

function SearchBar({ keyword,onChange, onClear}){
    return(
        <div style={{position:'relative', width:"100%"}}>
            <input 
            type="text"
            placeholder="Cari bedasarkan nama barang"
            value={keyword}
            onChange={(e)=> onChange(e.target.value)}
            style={{
                padding:"10px 40px 10px 10px",
                width:"100%",
                boxSizing: 'border-box'
            }}
            />

            {keyword && (
                <button
                onClick={onClear}
                style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >x</button>
            )}
        </div>
    )
}

export default SearchBar;