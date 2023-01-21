import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//MaterialUI
import { CssBaseline } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import api from "../../../services/api";
import { Checkbox } from "@mui/material";
import RestaurantService from "../../../services/restaurant.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
}));

export default function EditOrder() {
  function slugify(string) {
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  const navigate = useNavigate();
  const { id } = useParams();

  const initialFormData = Object.freeze({
    address: "",
    deliveryCost: "",
    description: "",
    discounts: [],
    dishes: null,
    isDelivery: "",
    kitchenType: "",
    logo: null,
    minOrderCost: "",
    minOrderCostFreeDelivery: "",
    moderatorId: "",
    name: "",
    phone: "",
    waitingTimeForDelivery: "",
  });

  const [data, setData] = useState(initialFormData);
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    RestaurantService.getRestaurant(id).then((res) => {
      setData({
        ...data,
        //['id']: res.data.id,
        ["address"]: res.data.address,
        ["deliveryCost"]: res.data.deliveryCost,
        ["description"]: res.data.description,
        ["discounts"]: res.data.discounts,
        ["dishes"]: res.data.dishes,
        ["isDelivery"]: res.data.isDelivery,
        ["kitchenType"]: res.data.kitchenType,
        ["logo"]: res.data.logo,
        ["minOrderCost"]: res.data.minOrderCost,
        ["minOrderCostFreeDelivery"]: res.data.minOrderCostFreeDelivery,
        ["moderatorId"]: res.data.moderatorId,
        ["name"]: res.data.name,
        ["phone"]: res.data.phone,
        ["waitingTimeForDelivery"]: res.data.waitingTimeForDelivery,
      });
      console.log(res.data);
    });
  }, [setData]);

  const handleChangeDelivery = (event) => {
    setChecked(event.target.value);
  };

  console.log(checked);

  const handleChange = (e) => {
    if ([e.target.name] == "name") {
      setData({
        ...data,
        // Trimming any whitespace
        [e.target.name]: e.target.value,
        //['slug']: slugify(e.target.value.trim()),
      });
    } else {
      setData({
        ...data,
        // Trimming any whitespace
        [e.target.name]: e.target.value,
      });
    }
  };

  // const config = {headers: {'Content-Type': 'multipart/form-data'}};
  // const URL = 'http://127.0.0.1:8000/add_discipline/';
  // let formData = new FormData();
  // formData.append('name', postData.name);
  // formData.append('icon', postImage.image[0]);
  // axios
  //     .post(URL,formData,config)
  //     .then((res) => {
  //     console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    api.put("restaurants/" + id, {
      //id: formData.id,
      address: data.address,
      deliveryCost: data.deliveryCost,
      description: data.description,
      discounts: data.discounts,
      dishes: data.dishes,
      isDelivery: data.isDelivery,
      kitchenType: data.kitchenType,
      logo: data.logo,
      minOrderCost: data.minOrderCost,
      minOrderCostFreeDelivery: data.minOrderCostFreeDelivery,
      moderatorId: data.moderatorId,
      name: data.name,
      phone: data.phone,
      waitingTimeForDelivery: data.waitingTimeForDelivery,
    });
    window.location.reload();
    navigate("/admin");
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edytuj restaurację
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Adres"
                name="address"
                autoComplete="address"
                value={data.address}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="deliveryCost"
                label="Koszt dostawy"
                name="deliveryCost"
                autoComplete="deliveryCost"
                value={data.deliveryCost}
                onChange={handleChange}
              />
              <Checkbox onChange={handleChangeDelivery} />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="kitchenType"
                label="Typ kuchni"
                name="kitchenType"
                autoComplete="kitchenType"
                value={data.kitchenType}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="minOrderCost"
                label="Minimalny koszt zamówienia"
                name="minOrderCost"
                autoComplete="minOrderCost"
                value={data.minOrderCost}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="minOrderCostFreeDelivery"
                label="Bezpłatna dostawa od"
                name="minOrderCostFreeDelivery"
                autoComplete="minOrderCostFreeDelivery"
                value={data.minOrderCostFreeDelivery}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="moderatorId"
                label="Moderator (ID)"
                name="moderatorId"
                autoComplete="moderatorId"
                value={data.moderatorId}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nazwa"
                name="name"
                autoComplete="name"
                value={data.name}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Nr telefonu"
                name="phone"
                autoComplete="phone"
                value={data.phone}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="waitingTimeForDelivery"
                label="Czas oczekiwania na dostawę"
                name="waitingTimeForDelivery"
                autoComplete="waitingTimeForDelivery"
                value={data.waitingTimeForDelivery}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Edytuj restaurację
          </Button>
        </form>
      </div>
    </Container>
  );
}
