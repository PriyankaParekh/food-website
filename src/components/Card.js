import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./contextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;

        //console.log(data);
      }
      return;

    }
      await dispatch({
        type: "ADD",
        id: props.foodItems._id,
        name: props.foodItems.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div className="card mt-4" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItems.img}
          className="card-img-top"
          alt="..."
          style={{ height: "170px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <div className="container w-100 d-flex">
            <select
              className="m-2 h-100 bg-dark text-light rounded"
              name="select"
              id=""
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-dark text-light rounded"
              name="select"
              ref={priceRef}
              id=""
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
              {/*{priceOptions}*/}
            </select>
            <div className="fw-bold fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-secondary justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {/*<a href="#" className="btn btn-primary">
              Go somewhere
            </a>*/}
        </div>
      </div>
    </div>
  );
}
