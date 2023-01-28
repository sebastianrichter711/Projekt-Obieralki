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
import Select from "react-select";
import DishService from "../../../services/dish.service";

export default function EditDish() {
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

  useEffect(() => {
    DishService.getDish(id).then((res) => {
      setData({
        ...data,
        //['id']: res.data.id,
        ["description"]: res.data.description,
        ["dish_subtype"]: res.data.dish_subtype,
        ["dish_type"]: res.data.dish_type,
        ["meat_types"]: res.data.meat_types,
        ["name"]: res.data.name,
        ["pizza_diameter"]: res.data.pizza_diameter,
        ["price"]: res.data.price,
        ["restaurant_id"]: res.data.restaurant_id,
        ["sauces"]: res.data.sauces,
      });
      console.log(res.data);
      setDishType(data.dish_type);
    });
  }, [setData]);

  console.log(dishType);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    api.put("dishes/" + id, {
      //id: formData.id,
      description: data.description,
      dish_subtype: data.dish_subtype,
      dish_type: dishType === "" ? data.dish_type : dishType,
      meat_types: data.meat_types,
      name: data.name,
      pizza_diameter: data.pizza_diameter,
      price: data.price,
      restaurant_id: data.restaurant_id,
      sauces: data.sauces,
    });
    console.log(data);
    //window.location.reload();
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
          Edytuj danie
        </Typography>
        <form style={{ width: "100%" }} noValidate>
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
                value={data.description}
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
                value={data.dish_subtype}
                onChange={handleChange}
              />
              <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                placeholder="Wybierz typ dania"
                options={dishTypeOptions}
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
                value={data.name}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                fullWidth
                id="pizza_diameter"
                label="Średnica pizzy"
                name="pizza_diameter"
                autoComplete="pizza_diameter"
                value={data.pizza_diameter}
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
                value={data.price}
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
                value={data.restaurant_id}
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
            Edytuj danie
          </Button>
        </form>
      </div>
    </Container>
  );
}
