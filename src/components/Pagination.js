import React from "react";

function Pagination({ page, onPrev, onNext }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" , gap: "10px" }}>
      <button
        onClick={onPrev}
        disabled={page === 1}
        style={{
          padding: "8px 16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: page === 1 ? "#eee" : "#007bff",
          color: page === 1 ? "#aaa" : "#fff",
          cursor: page === 1 ? "not-allowed" : "pointer",
        }}
      >
        {"<"}
      </button>

      <span style={{ padding: "8px 16px" }}>Page {page}</span>

      <button
        onClick={onNext}
        style={{
          padding: "8px 16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
