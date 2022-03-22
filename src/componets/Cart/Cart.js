import React, {useContext} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length;
    const itemRemoveHandler = (id)=>{
        cartCtx.removeItem(id);
    }
    const itemAddHandler = (item) =>{
        cartCtx.addItem({...item,amount:1});
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onRemove={itemRemoveHandler.bind(null,item.id)}
                onAdd={itemAddHandler.bind(null, item)}
            />))}</ul>;

    return (<Modal onClose={props.onCloseCart}>
        {cartItems}

        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes.buttonAlt} onClick={props.onCloseCart}>Close</button>
            {hasItems > 0 && <button className={classes.button}>Order</button>}
        </div>
    </Modal>);
}

export default Cart;