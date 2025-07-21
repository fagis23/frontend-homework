import React, {use, useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import CardItem from "../components/CardItem";
import FilterPopover from "../components/Filter/FilterPopover";
import {fetchOrders} from "../services/api";

function Home(){
const [orders, setOrders] = useState([]);
const [keyword, setKeyword] = useState("");
const [page, setPage] = useState(1);
const [filterVisible , setFilterVisible] = useState(false);
const [originCode , setOriginCode] = useState([])
const [destinationCode, setDestinationCode] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [originCodeOptions, setOriginCodeOptions] = useState([]);
const [destinationCodeOptions, setDestinationCodeOptions] = useState([]);


const loadData = async () => {
    setIsLoading(true);
    const payload = {
        keyword,
        filter:{
            order_status: [0],
            origin_code: originCode,
            destination_code: destinationCode
          },          
        page,
    };

    console.log("Payload sent:", payload);
    
    try{
        const response = await fetchOrders(payload);
        console.log("Fetched orders:", response.data);
        setOrders(response.order_list || []);

        const uniqueOrigins = [
            ...new Set(response.order_list.map((o) => o.origin_code)),
          ];
          const uniqueDestinations = [
            ...new Set(response.order_list.map((o) => o.destination_code)),
          ];
          
          setOriginCodeOptions(uniqueOrigins);
          setDestinationCodeOptions(uniqueDestinations);
          
    } catch (err){
        console.error("Fetch failed", err)
    } finally{
        setIsLoading(false);
        
    }
};

useEffect(()=>{
    loadData()
    
},[keyword,page,originCode,destinationCode]);

const handleClear = () =>{
    setKeyword("");
    setPage(1);
}

return(
    <div>
        <div className="filter_header">
            <div className="filter_header_left">
                <SearchBar keyword={keyword} onChange={setKeyword} onClear={handleClear}/>
                <button className="button-filter" onClick={()=> setFilterVisible(true)}>Filter</button>
            </div>
            <div className="filter_header_right">
                <Pagination 
                page={page}
                onPrev={() => setPage((p)=>Math.max(1, p-1))}
                onNext={() => setPage((p)=> p + 1)}
                />
            </div>
        </div>
        
       

        {filterVisible && (
            <FilterPopover
                originOptions={originCodeOptions}
                destinationOptions={destinationCodeOptions}
                originCode={originCode}
                destinationCode={destinationCode}
                setOriginCode={setOriginCode}
                setDestinationCode={setDestinationCode}
                onClose={() => setFilterVisible(false)}
            />

        )}

        {isLoading ? (
        <p>Loading...</p>
        ) : (
        <div className="grid-list">
            {orders.map((order) => (
            <CardItem key={order.do_id} order={order} />
            ))}
        </div>
        )}

        
    </div>
)
}

export default Home;