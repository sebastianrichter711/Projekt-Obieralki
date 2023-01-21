import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    formData.append("deliveryCost", data.deliveryCost);
    formData.append("description", data.description);
    formData.append("discounts", []);
    formData.append("dishes", []);
    formData.append("isDelivery", checked);
    formData.append("kitchenType", data.kitchenType);
    formData.append("logo", "");
    formData.append("minOrderCost", data.minOrderCost);
    formData.append("minOrderCostFreeDelivery", data.minOrderCostFreeDelivery);
    formData.append("moderatorId", data.moderatorId);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("waitingTimeForDelivery", data.waitingTimeForDelivery);
    console.log(formData);
    api.post("/restaurants", formData);
    navigate("/admin");
    //window.location.reload();
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Dodaj restaurację
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
                id="deliveryCost"
                label="Koszt dostawy"
                name="deliveryCost"
                autoComplete="deliveryCost"
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
                id="waitingTimeForDelivery"
                label="Czas oczekiwania na dostawę"
                name="waitingTimeForDelivery"
                autoComplete="waitingTimeForDelivery"
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
            Dodaj restaurację
          </Button>
        </form>
      </div>
    </Container>
  );
}
