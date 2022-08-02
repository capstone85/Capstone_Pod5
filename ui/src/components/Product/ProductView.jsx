import "./ProductView.css";
import ProductCard from "../ProductCard/ProductCard";

// Renders product card with product description
export default function ProductView({
  product,
  productId,
  quantity,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  setIsFetching,
}) {
  return (
    <div className="product-view">
      <h1 className="product-id">Product #{productId}</h1>
      <ProductCard
        category={product.category}
        description={product.description}
        showDescription={true}
        image={product.image}
        name={product.name}
        price={product.price}
        productId={product.id}
        products={product}
        quantity={quantity}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
        setIsFetching={setIsFetching}
      />
    </div>
  );
}
