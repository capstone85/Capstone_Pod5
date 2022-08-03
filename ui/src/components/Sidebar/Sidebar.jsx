  
  
// import * as React from "react";
// //import CheckoutForm from "../checkOutForm/CheckoutForm";
// import ShoppingCart from "../ShoppingCart/ShoppingCart";
// import "./Sidebar.css";
// import { useState } from "react";

// export default function Sidebar({
//   handleOnToggle,
//   isOpen,
//   products,
//   shoppingCart,
//   handleOnCheckoutFormChange,
//   handleOnSubmitCheckoutForm,
  
//   checkoutForm,
//   setShoppingCart,
//   subtotal,
//   cartSize,
//   setSubtotal,
// }) {
//   const shoppingCartEmpty = !shoppingCart && isOpen ? (
//     <p>No items added to cart yet. Start shopping now!</p>
//   ) : null;
//   const sidebarClass = isOpen ? "sidebar-active" : "sidebar";
//   return (
//     <div className="here">
//     <section className={sidebarClass}>
//       <section className="sidenav">
//         <div className="all-items">
//           <button onClick={handleOnToggle}>CLICK</button>

//           <i className="material-icons md-48">add_shopping_cart</i>

//           <i className="material-icons md-48">monetization_on</i>

//           <i className="material-icons md-48">fact_check</i>
//         </div>
//         {shoppingCartEmpty}
//         <ShoppingCart
//           isOpen={isOpen}
//           shoppingCart={shoppingCart}
//           products={products}
//           subtotal={subtotal}
//           cartSize={cartSize}
//         />
//         {/* <CheckoutForm isOpen={isOpen} 
        
//         handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
//         handleOnCheckoutFormChange={handleOnCheckoutFormChange}
     
//         shoppingCart={shoppingCart}
//         checkoutForm={checkoutForm}
//         setShoppingCart={setShoppingCart}
//         /> */}
//       </section>
//     </section>
//     </div>
//   );
// }
