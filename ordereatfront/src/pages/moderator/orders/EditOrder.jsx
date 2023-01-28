import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//MaterialUI
import { CssBaseline } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import api from "../../../services/api";
import { Checkbox } from "@mui/material";
import RestaurantService from "../../../services/restaurant.service";

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
    delivery_cost: "",
    description: "",
    discounts: [],
    dishes: null,
    is_delivery: "",
    kitchen_type: "",
    logo: null,
    min_order_cost: "",
    min_order_cost_free_delivery: "",
    moderator_id: "",
    name: "",
    phone: "",
    waiting_time_for_delivery: "",
  });

  const [data, setData] = useState(initialFormData);
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    RestaurantService.getRestaurant(id).then((res) => {
      setData({
        ...data,
        //['id']: res.data.id,
        ["address"]: res.data.address,
        ["delivery_cost"]: res.data.delivery_cost,
        ["description"]: res.data.description,
        ["discounts"]: res.data.discounts,
        ["dishes"]: res.data.dishes,
        ["is_delivery"]: res.data.is_delivery,
        ["kitchen_type"]: res.data.kitchen_type,
        ["logo"]: res.data.logo,
        ["min_order_cost"]: res.data.min_order_cost,
        ["min_order_cost_free_delivery"]: res.data.min_order_cost_free_delivery,
        ["moderator_id"]: res.data.moderator_id,
        ["name"]: res.data.name,
        ["phone"]: res.data.phone,
        ["waiting_time_for_delivery"]: res.data.waiting_time_for_delivery,
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
      delivery_cost: data.delivery_cost,
      description: data.description,
      discounts: data.discounts,
      dishes: data.dishes,
      is_delivery: data.is_delivery,
      kitchen_type: data.kitchen_type,
      logo: data.logo,
      min_order_cost: data.min_order_cost,
      min_order_cost_free_delivery: data.min_order_cost_free_delivery,
      moderator_id: data.moderator_id,
      name: data.name,
      phone: data.phone,
      waiting_time_for_delivery: data.waiting_time_for_delivery,
    });
    window.location.reload();
    navigate("/admin");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edytuj restaurację
        </Typography>
        <form style={{ width: "100%" }} noValidate>
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
                id="delivery_cost"
                label="Koszt dostawy"
                name="delivery_cost"
                autoComplete="delivery_cost"
                value={data.delivery_cost}
                onChange={handleChange}
              />
              <Checkbox onChange={handleChangeDelivery} />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="kitchen_type"
                label="Typ kuchni"
                name="kitchen_type"
                autoComplete="kitchen_type"
                value={data.kitchen_type}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="min_order_cost"
                label="Minimalny koszt zamówienia"
                name="min_order_cost"
                autoComplete="min_order_cost"
                value={data.min_order_cost}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="min_order_cost_free_delivery"
                label="Bezpłatna dostawa od"
                name="min_order_cost_free_delivery"
                autoComplete="min_order_cost_free_delivery"
                value={data.min_order_cost_free_delivery}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="moderator_id"
                label="Moderator (ID)"
                name="moderator_id"
                autoComplete="moderator_id"
                value={data.moderator_id}
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
                id="waiting_time_for_delivery"
                label="Czas oczekiwania na dostawę"
                name="waiting_time_for_delivery"
                autoComplete="waiting_time_for_delivery"
                value={data.waiting_time_for_delivery}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Edytuj restaurację
          </Button>
        </form>
      </div>
    </Container>
  );
}
