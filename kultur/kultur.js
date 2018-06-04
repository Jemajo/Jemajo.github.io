let myMap = L.map("mapdiv", {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});
const myIcon = L.icon({
    iconUrl : '../icons/poi.png',
});
let kulturLayer = L.featureGroup();
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


// Layer zur Karte hinzufügen - zusammenbauen 
myMap.addLayer(myLayers.osm);

//DOCLINK: http://leafletjs.com/reference-1.3.0.html#map-addlayer

//DOKLINK: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
let myMapControl = L.control.layers ({
    //<Object> baselayers?
    "Karte" :myLayers.osm,
    "Orthofoto":ortho_m_beschr,
},
{  
    "Kulturelle Sehenswürdigkeiten": kulturLayer,
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

//const macc = L.featureGroup();

myMap.addLayer(kulturLayer);

for (let macc of pois) {
    L.marker([macc.lat, macc.lng],{
       icon: myIcon,
    }
).bindPopup(`<h1>${macc.name}</h1>
        <p> Was ist das? </br> ${macc.what} </br> </br> ${macc.adresse}</p>`)
      .addTo(kulturLayer);
    }


//let javascript = L.javascript(accommodations).addTo(myMap);
    //geojson.bindPopup(function(layer) {
    //  const props = layer.feature.properties;
    //const popupText = `<h1>${props.NAME}</h1>`;
    //return popupText;
    //});

myMap.fitBounds(kulturLayer.getBounds());

