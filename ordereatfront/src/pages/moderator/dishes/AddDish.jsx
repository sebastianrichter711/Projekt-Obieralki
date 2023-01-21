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
import Select from "react-select";

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

export default function AddDish() {
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
    description: "",
    dishSubtype: "",
    dishType: "",
    meatTypes: [],
    name: "",
    pizzaDiameter: "",
    price: "",
    restaurantId: "",
    sauces: [],
  });

  const [data, setData] = useState(initialFormData);
  const [dishType, setDishType] = useState("");

  const dishTypeOptions = [
    { value: 1, label: "Przystawki" },
    { value: 2, label: "Zupy" },
    { value: 3, label: "Dania główne" },
    { value: 4, label: "Desery" },
    { value: 5, label: "Pizza" },
    { value: 6, label: "Kebab" },
    { value: 7, label: "Dodatki" },
    { value: 8, label: "Napoje" },
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("description", data.description);
    formData.append("dishSubtype", data.dishSubtype);
    formData.append("dishType", dishType);
    formData.append("meatTypes", []);
    formData.append("name", data.name);
    formData.append("pizzaDiameter", data.pizzaDiameter);
    formData.append("price", data.price);
    formData.append("restaurantId", data.restaurantId);
    formData.append("sauces", []);
    console.log(formData);
    api.post("/dishes", formData);
    navigate("/admin");
    //window.location.reload();
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Dodaj danie
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                id="dishSubtype"
                label="Subkategoria dania"
                name="dishSubtype"
                autoComplete="dishSubtype"
                onChange={handleChange}
              />
              <Select
                isClearable={true}
                className="react-select"
                classNamePrefix="select"
                placeholder="Wybierz typ dania"
                options={dishTypeOptions}
                styles={{ display: "flex" }}
                onChange={(choice) => setDishType(choice.value)}
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
                fullWidth
                id="pizzaDiameter"
                label="Średnica pizzy"
                name="pizzaDiameter"
                autoComplete="pizzaDiameter"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Cena [zł]"
                name="price"
                autoComplete="price"
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="restaurantId"
                label="Restauracja (ID)"
                name="restaurantId"
                autoComplete="restaurantId"
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
            Dodaj danie
          </Button>
        </form>
      </div>
    </Container>
  );
}
