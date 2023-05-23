import React, { useState } from "react";
import NATIONAL_PARKS_DATA from "./data.json";
import JUNCTION_DATA from "./nationalroad_junction";
import { Map } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw";

const INITIAL_VIEW_STATE = {
  latitude: 35.4453,
  longitude: 127.5795,
  zoom: 7,
  bearing: 0,
  pitch: 30,
};
const MAP_STYLE_DARKMATTER =
  "https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json";

function App() {
  const [isJunc, setIsJunc] = useState(true);

  const handleJunc = () => {
    setIsJunc(!isJunc);
  };

  const onClick = (info) => {
    if (info.object) {
      alert(`Name: ${info.object.properties.Name}`);
    }
  };

  const layers = [
    new GeoJsonLayer({
      id: "nationalParks",
      data: NATIONAL_PARKS_DATA,
      //Styles
      filled: true,
      pointRadiusMinPixels: 5,
      pointRadiusScale: 2000,
      getPointRadius: (f) => 5,
      getFillColor: (data) =>
        data.properties.Name.includes("National Park")
          ? [0, 0, 0, 255]
          : [86, 144, 58, 250],
      pickable: true,
      autoHighlight: true,
      onClick,
    }),
    isJunc &&
      new GeoJsonLayer({
        id: "national_road_junction",
        data: JUNCTION_DATA,
        //Styles
        stroked: true,
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusScale: 1,
        getPointRadius: (f) => 5,
        getFillColor: [255, 0, 0],
        getLineColor: [255, 0, 0, 10000],
        pickable: true,
        autoHighlight: true,
      }),
  ];
  return (
    <div className="testc">
      <div className="container">
        <button className="toggle-button" onClick={handleJunc}>
          {isJunc ? "Hide Junction" : "Show Junction"}
        </button>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
        >
          <Map
            mapStyle={MAP_STYLE_DARKMATTER}
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
    </div>
  );
}

export default App;
