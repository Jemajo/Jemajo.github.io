let myMap = L.map("mapdiv", {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});
let overlayElevation = L.featureGroup().addTo(myMap);
//DOClink: 1.3.0.html#map-l-map
let myLayers= {
    osm: L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            subdomains : ["a", "b", "c"],
            //DOCLINK:http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>"
        //DOCLINK: http://leafletjs.com/reference-1.3.0.html#layer-attribution
        }
    ),

    bmapoverlay: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",
        {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>" //Zeigt Datenquelle rechts unten an 
        }
    ),
    tiris_nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8",  {
            attribution: "<a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
            pane: "overlayPane",
        }
    ),
    bmaporthofoto30cm: L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
        {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquellen: <a href='https://www.basemap.at'>basemap.at</a>" //Zeigt Datenquelle rechts unten an 
        }
    )
};

let ortho_m_beschr = L.featureGroup (
    [myLayers.bmaporthofoto30cm,
    myLayers.tiris_nomenklatur]
);

//DOCLINK: http://leafletjs.com/reference-1.3.0.html#map-addlayer

//DOKLINK: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
let myMapControl = L.control.layers ({
    //<Object> baselayers?
    "Karte" :myLayers.osm,
    "Orthofoto":ortho_m_beschr,
    
},
{  // Unterm Strich Platzhalter
},
{
    collapsed: false
});

//DOCLINK für collapse: http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed

myMap.addControl (myMapControl);

//DOCLINK: http://leafletjs.com/reference-1.3.0.html#map-addcontrol


// Zentrum der Karte setzen 
myMap.setView([47.267,11.383],11)
//DOKLINK: http://leafletjs.com/reference-1.3.0.html#map-setview

// Doclink Scale: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale

L.control.scale({
        maxWidth: 200, //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
        metric: true, //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-metric
        imperial: false, //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
        position: "bottomleft" //DOCLINK: http://leafletjs.com/reference-1.3.0.html#control-scale-position
}).addTo(myMap);

let gpxTrack = new L.GPX ("AdlerwegEtappe12.gpx", {
    async: true,
});
gpxTrack.on ("loaded", function (evt) {
    let track = evt.target;
    myMap.fitBounds(track.getBounds());
}).addTo(myMap); 

let hoehenProfil = L.control.elevation({
    position: "topright",
  theme: "lime-theme", //default: lime-theme
  width: 600,
  height: 125,
  margins: {
      top: 10,
      right: 20,
      bottom: 30,
      left: 50
  },
  useHeightIndicator: true, //if false a marker is drawn at map position
  interpolation: "linear", //see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
  hoverNumber: {
      decimalsX: 3, //decimals on distance (always in km)
      decimalsY: 0, //deciamls on hehttps://www.npmjs.com/package/leaflet.coordinatesight (always in m)
      formatter: undefined //custom formatter function may be injected
  },
  xTicks: undefined, //number of ticks in x axis, calculated by default according to width
  yTicks: undefined, //number of ticks on y axis, calculated by default according to height
  collapsed: true,  //collapsed mode, show chart on click or mouseover
  imperial: false    //display imperial units instead of metric
});

hoehenProfil.addTo(myMap);

gpxTrack.on("addline",function(evt){
    hoehenProfil.addData(evt.line);
})
/*L.geoJson(geojson,{
    onEachFeature: hoehenProfil.addData.bind(hoehenProfil) //working on a better solution
}).addTo(myMap);
*/


