import React, { useState } from "react";
import { OutlinedInput } from "@mui/material";
import { Button } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import RestaurantService from "../../services/restaurant.service";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function SearchBox(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchLocation, setSearchLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  console.log(searchText);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    var results = await api.get("/restaurants/" + searchLocation).then(
      (res) => {
        console.log(res.data);
        console.log(res.status.data);
        if (results === []) setRestaurants([]);
        else {
          setRestaurants(res.data);
        }
        navigate("/searched-restaurants", { state: { results: res.data } });
      },
      (error) => {
        if (error.response.status === 404)
          alert("Nie znaleziono restauracji dla podanej lokalizacji");
        if (error.response.status === 500) alert("Błąd aplikacji");
      }
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          ></OutlinedInput>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              //Search
              const params = {
                q: searchText,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
              };
              const queryString = new URLSearchParams(params).toString();
              const requestOptions = {
                method: "GET",
                redirect: "follow",
              };
              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                })
                .catch((err) => console.log("err: ", err));
            }}
          >
            Szukaj
          </Button>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Znajdź restauracje
          </Button>
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => {
            return (
              <div key={item?.place_id}>
                <ListItem
                  button
                  onClick={() => {
                    setSelectPosition(item);
                    {
                      item.address.road !== undefined
                        ? setSearchLocation(
                            item.address.road +
                              ", " +
                              item.address.city +
                              ", " +
                              item.address.state +
                              ", " +
                              item.address.country
                          )
                        : item.address.city !== undefined
                        ? setSearchLocation(
                            item.address.city +
                              ", " +
                              item.address.state +
                              ", " +
                              item.address.country
                          )
                        : setSearchLocation(
                            item.address.village +
                              ", " +
                              item.address.state +
                              ", " +
                              item.address.country
                          );
                    }

                    console.log(searchLocation);
                    console.log(item);
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="./placeholder.png"
                      alt="Placeholder"
                      style={{ width: 38, height: 38 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}
