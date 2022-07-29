import "./StoreCard.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function StoreCard(props) {
  return (
    <Card sx={{ maxWidth: 500 }} className="store-card">
      <CardMedia
        component="img"
        height="200"
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
          📞 Phone Number
        </Typography>
        <hr></hr>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      {/* {props.form.category === "vendor" ? ( */}
      <CardActions>
        <Button size="small">Edit store info</Button>
        <hr></hr>
        <Button size="small">Upload merchandise</Button>
      </CardActions>
      {/* ) : ( */}
      {/* <CardActions>
          <Button size="small">View styles</Button>
        </CardActions>
      )} */}
    </Card>
    /* Change buttons depending on user type */
  );
}
