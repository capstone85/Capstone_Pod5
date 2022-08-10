import "./StoreCard.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { spacing } from "@mui/system";
import { Link } from "react-router-dom";

export default function StoreCard(props) {
  const button = styled(Button)(spacing);

  return (
    <Card sx={{ maxHeight: 800, maxWidth: 900 }} className="store-card">
      <CardMedia
        className="store-card-image"
        component="img"
        height="auto"
        image={props.logo}
        alt={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📍 {props.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📍 {props.zipcode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📞 Phone Number
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ⏰ Store Hours:
          <p>
            Mon-Fri: 10:00 AM - 8 PM
            <br />
            Sat: 10:00 AM - 9 PM
            <br />
            Sun: Closed
          </p>
        </Typography>
        <hr className="store-card-spacing"></hr>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      {/* {props.form.category === "vendor" ? ( */}
      <div className="buttons">
        <CardActions>
          <div className="store-btn">
            <Button style={{ color: "#B86B77" }} size="small">
              Edit store info
            </Button>
          </div>
          <div className="store-btn">
            <Link
              to={"/store-page/create/" + props.id}
              style={{ textDecoration: "none" }}
            >
              <Button style={{ color: "#B86B77" }} size="small">
                Upload Merchandise
              </Button>
            </Link>
          </div>
          <div className="store-btn">
            <Link
              to={"/store-page/" + props.id}
              style={{ textDecoration: "none" }}
            >
              <Button style={{ color: "#B86B77" }} size="small">
                View products
              </Button>
            </Link>
          </div>
        </CardActions>
      </div>
      {/* ) : ( */}
      {/* <CardActions>
          <Button size="small">View styles</Button>
        </CardActions>
      )} */}
    </Card>
    /* Change buttons depending on user type */
  );
}
