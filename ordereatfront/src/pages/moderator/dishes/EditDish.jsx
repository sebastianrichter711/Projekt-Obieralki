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
import Select from "react-select";
import DishService from "../../../services/dish.service";

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

  useEffect(() => {
    DishService.getDish(id).then((res) => {
      setData({
        ...data,
        //['id']: res.data.id,
        ["description"]: res.data.description,
        ["dishSubtype"]: res.data.dishSubtype,
        ["dishType"]: res.data.dishType,
        ["meatTypes"]: res.data.meatTypes,
        ["name"]: res.data.name,
        ["pizzaDiameter"]: res.data.pizzaDiameter,
        ["price"]: res.data.price,
        ["restaurantId"]: res.data.restaurantId,
        ["sauces"]: res.data.sauces,
      });
      console.log(res.data);
    });
  }, [setData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    api.put("dishes/" + id, {
      //id: formData.id,
      description: data.description,
      dishSubtype: data.dishSubtype,
      dishType: data.dishType,
      meatTypes: data.meatTypes,
      name: data.name,
      pizzaDiameter: data.pizzaDiameter,
      price: data.price,
      restaurantId: data.restaurantId,
      sauces: data.sauces,
    });
    //window.location.reload();
    navigate("/admin");
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edytuj danie
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
                value={data.description}
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
                value={data.dishSubtype}
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
                id="pizzaDiameter"
                label="Średnica pizzy"
                name="pizzaDiameter"
                autoComplete="pizzaDiameter"
                value={data.pizzaDiameter}
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
                id="restaurantId"
                label="Restauracja (ID)"
                name="restaurantId"
                autoComplete="restaurantId"
                value={data.restaurantId}
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
            Edytuj danie
          </Button>
        </form>
      </div>
    </Container>
  );
}
