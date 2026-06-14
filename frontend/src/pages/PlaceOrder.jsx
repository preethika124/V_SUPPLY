import { useState } from "react";

import { placeOrder }
from "../services/orderService";

function PlaceOrder() {

    const [productId,
        setProductId] =
        useState("");

    const [quantity,
        setQuantity] =
        useState("");

    const [items,
        setItems] =
        useState([]);

    const addItem = () => {

        if(
            !productId ||
            !quantity
        ){
            return;
        }

        setItems([
            ...items,
            {
                productId,
                quantity:
                Number(quantity)
            }
        ]);

        setProductId("");
        setQuantity("");
    };

    const handleSubmit =
    async () => {

        try{

            const token =
            localStorage
            .getItem(
                "token"
            );

            await placeOrder(
                { items },
                token
            );

            alert(
                "Order Placed"
            );

            setItems([]);

        }
        catch(err){

            alert(
                err.response
                ?.data
                ?.message
                ||
                "Error"
            );

        }

    };

    return(

        <div>

            <h2>
                Place Order
            </h2>

            <input
                placeholder="Product Id"
                value={productId}
                onChange={(e)=>
                    setProductId(
                        e.target.value
                    )
                }
            />

            <input
                placeholder="Quantity"
                value={quantity}
                onChange={(e)=>
                    setQuantity(
                        e.target.value
                    )
                }
            />

            <button
                onClick={
                    addItem
                }
            >
                Add Item
            </button>

            <hr/>

            <h3>
                Cart
            </h3>

            {
                items.map(
                    (
                        item,
                        index
                    )=>(
                        <div
                            key={index}
                        >
                            Product:
                            {item.productId}
                            <br/>
                            Quantity:
                            {item.quantity}
                        </div>
                    )
                )
            }

            <br/>

            <button
                onClick={
                    handleSubmit
                }
            >
                Place Order
            </button>

        </div>

    );

}

export default PlaceOrder;