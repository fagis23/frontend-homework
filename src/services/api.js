export const fetchOrders = async (payload) => {
    try {
      const res = await fetch("https://frontend-api-mocking-production-2cb1.up.railway.app/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }
  
      const json = await res.json(); // ✅ pastikan json() dipanggil
      console.log("Full API response:", json);
      return json;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { data: [] }; // fallback jika error
    }
  };
  