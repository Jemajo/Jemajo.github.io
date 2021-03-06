let myMap = L.map("mapdiv", {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
}
);
const myIcon = L.icon({
    iconUrl: '../icons/poi.png',
    iconAnchor: [15, 35],
}
);
let kulturLayer = L.featureGroup();

let myLayers = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            subdomains: ["a", "b", "c"],

            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>"

        }
    ),
    tiris_nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
            attribution: "<a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
            pane: "overlayPane",
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquellen: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    )
};
let ortho_m_beschr = L.featureGroup(
    [myLayers.bmaporthofoto30cm,
    myLayers.tiris_nomenklatur]
);
myMap.addLayer(myLayers.osm);

let myMapControl = L.control.layers({
    "Karte": myLayers.osm,
    "Orthofoto": ortho_m_beschr,
},
    {
        "Kulturelle Sehenswürdigkeiten": kulturLayer,
    },
    {
        collapsed: false
    });

myMap.addControl(myMapControl);

myMap.setView([47.267, 11.383], 11)

L.control.scale({
    maxWidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft"
}).addTo(myMap);

myMap.addLayer(kulturLayer);

for (let mkult of pois) {
    L.marker([mkult.lat, mkult.lng], {
        icon: myIcon,
    }
    ).bindPopup(`<h1>${mkult.name}</h1>
        <p> Was ist das? </br> ${mkult.what} </br> </br> ${mkult.adresse}</p>`)
        .addTo(kulturLayer);
}
myMap.fitBounds(kulturLayer.getBounds());

