import React from "react";

function CardItem({order}){
    return(
        <div className="card-box">
            <div className="card-box__order">
                <span>ORDER ID</span> 
            </div>
            <div className="card-box__title">
                <span>{order.do_id}</span>
            </div>
            
            <p style={{ margin: "4px 0" }}> 
            {order.goods_name}
            </p>
            <p style={{ margin: "4px 0" }}>
             {order.origin_name} -{">"} {order.destination_name}
            </p>

            <button className="button-detail"
                onClick={() => alert(`Lihat detail pesanan:\n\nOrder ID: ${order.do_id}\nBarang: ${order.goods_name}\nOrigin: ${order.origin_name}\nDestination: ${order.destination_name}\nDestination Address : ${order.destination_address}`)}
            >
                Lihat Detail
            </button>
        </div>
    )
}

export default CardItem;