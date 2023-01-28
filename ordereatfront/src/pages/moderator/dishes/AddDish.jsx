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
import Select from "react-select";

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
    dish_subtype: "",
    dish_type: "",
    meat_types: [],
    name: "",
    pizza_diameter: "",
    price: "",
    restaurant_id: "",
    sauces: [],
  });

  const [data, setData] = useState(initialFormData);
  const [dishType, setDishType] = useState("");

  const dishTypeOptions = [
    { value: "starter", label: "Przystawki" },
    { value: "soup", label: "Zupy" },
    { value: "main_course", label: "Dania główne" },
    { value: "dessert", label: "Desery" },
    { value: "pizza", label: "Pizza" },
    { value: "kebab", label: "Kebab" },
    { value: "additives", label: "Dodatki" },
    { value: "drinks", label: "Napoje" },
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
    formData.append("dish_subtype", data.dish_subtype);
    formData.append("dish_type", dishType);
    formData.append("meat_types", []);
    formData.append("name", data.name);
    formData.append("pizza_diameter", data.pizza_diameter);
    formData.append("price", data.price);
    formData.append("restaurant_id", data.restaurant_id);
    formData.append("sauces", []);
    console.log(formData);
    api.post("/dishes", formData);
    navigate("/admin");
    //window.location.reload();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Dodaj danie
        </Typography>
        <form
          style={{
            width: "100%", // Fix IE 11 issue.
            marginTop: 3,
          }}
          noValidate
        >
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
                id="dish_subtype"
                label="Subkategoria dania"
                name="dish_subtype"
                autoComplete="dish_subtype"
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
                id="pizza_diameter"
                label="Średnica pizzy"
                name="pizza_diameter"
                autoComplete="pizza_diameter"
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
                id="restaurant_id"
                label="Restauracja (ID)"
                name="restaurant_id"
                autoComplete="restaurant_id"
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
            Dodaj danie
          </Button>
        </form>
      </div>
    </Container>
  );
}
