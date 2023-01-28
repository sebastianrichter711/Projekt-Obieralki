import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//MaterialUI
import { CssBaseline } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import api from "../../../services/api";
import { Checkbox } from "@mui/material";

export default function AddRestaurant() {
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

  const handleChangeDelivery = (event) => {
    setChecked(event.target.value);
  };

  console.log(checked);

  const handleChange = (e) => {
    if ([e.target.name] == "name") {
      setData({
        ...data,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
        //['slug']: slugify(e.target.value.trim()),
      });
    } else {
      setData({
        ...data,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
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
    let formData = new FormData();
    formData.append("address", data.address);
    formData.append("delivery_cost", data.delivery_cost);
    formData.append("description", data.description);
    formData.append("discounts", []);
    formData.append("dishes", []);
    formData.append("is_delivery", checked);
    formData.append("kitchen_type", data.kitchen_type);
    formData.append("logo", "");
    formData.append("min_order_cost", data.min_order_cost);
    formData.append(
      "min_order_cost_free_delivery",
      data.min_order_cost_free_delivery
    );
    formData.append("moderator_id", data.moderator_id);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append(
      "waiting_time_for_delivery",
      data.waiting_time_for_delivery
    );
    console.log(formData);
    api.post("/restaurants", formData);
    navigate("/admin");
    //window.location.reload();
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
          Dodaj restaurację
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
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Opis"
                name="description"
                autoComplete="description"
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
                onChange={handleChange}
              />
              {"Czy dostawa"}
              <Checkbox onChange={handleChangeDelivery} />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="kitchen_type"
                label="Typ kuchni"
                name="kitchen_type"
                autoComplete="kitchen_type"
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
            Dodaj restaurację
          </Button>
        </form>
      </div>
    </Container>
  );
}
