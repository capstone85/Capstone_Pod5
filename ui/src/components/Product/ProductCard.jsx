import * as React from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Renders image, name, price, and quantity of products.
// Buttons allow users to change quantity of products.
export default function ProductCard(props) {
  return (
    <div className="product-card">
      {/* <div className="media">
        <Link
          to={"/products/" + props.productId}
          onClick={() => props.setIsFetching(true)}
        >
          <img
            className="product-image"
            src={props.image}
            alt={props.name}
          ></img>
        </Link>
      </div>

      <div>
        <p className="product-name">{props.name}</p>

        {props.quantity > 0 ? (
          <p className="quantity">{props.quantity}</p>
        ) : null}
      </div>

      <div className="item-description">
        {props.showDescription ? (
          <>
            <p>{props.description}</p>
          </>
        ) : null}
      </div>
      <p className="product-price">${props.price.toFixed(2)}</p>

      <div className="buttons">
        <button
          className="remove"
          onClick={() => {
            props.handleRemoveItemFromCart(props.productId);
          }}
        >
          -
        </button>
        <button
          className="add"
          onClick={() => {
            props.handleAddItemToCart(props.productId);
          }}
        >
          +
        </button>
      </div> */}

      {/* <Card sx={({ maxWidth: 200 }, { maxHeight: 400 })}>
        <CardMedia
          component="img"
          height="50"
          image="https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw4ba24826/images/large/637708739570526487-2088237.png?sw=750&sh=750&sm=fit&sfrm=png"
          alt="cartier bracelet"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            <span className="product-name">Bracelet</span>
            <span className="price">$100</span>
          </Typography>
        </CardContent>
        <CardActions>
          <div className="favorite-add">
            <Button size="small">
              <FavoriteBorderIcon />
            </Button>
          </div>
          <div className="cart-add">
            <Button size="small">
              <AddShoppingCartIcon />
            </Button>
          </div>
        </CardActions>
      </Card> */}
      <main role="main">
        <div class="product">
          <figure>
            <img
              src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F51%2F17%2F5117a2d52d6332f96afe56b30c2628905d0fbe68.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_dresses_longsleevedress%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D"
              alt="Product Image"
              className="product-image"
            />
          </figure>

          <div class="product-description">
            <div class="info">
              <h1>Dress</h1>
              <p>Orange</p>
            </div>

            <div class="price">89</div>
          </div>

          <div class="product-sidebar">
            <button class="buy">
              <span>BUY ITEM</span>
            </button>

            <button class="info">
              <span>MORE INFO</span>
            </button>

            <button class="size">
              <span>SIZES</span>
            </button>

            <button class="colors">
              <span>
                <a href="" class="color black"></a>
                <a href="" class="color white"></a>
                <a href="" class="color red"></a>
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
