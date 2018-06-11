let myMap = L.map("mapdiv", {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});

//Marker-Icon festlegen
const myIcon = L.icon({
    iconUrl: '../icons/accommodation.png',
    iconAnchor: [15, 35],
});
//Layers definieren
let accommodationLayer = L.featureGroup();
let myLayers = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            subdomains: ["a", "b", "c"],
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>"
        }),
    tiris_nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
            attribution: "<a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
            pane: "overlayPane",
        }),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquellen: <a href='https://www.basemap.at'>basemap.at</a>"
        })
};

// Gruppierung
let ortho_m_beschr = L.featureGroup(
    [myLayers.bmaporthofoto30cm,
    myLayers.tiris_nomenklatur]);

myMap.addLayer(myLayers.osm);

// Kontrolle hinzufügen
let myMapControl = L.control.layers({

    "Karte": myLayers.osm,
    "Orthofoto": ortho_m_beschr,
}, {
        "Übernachtungsmöglichkeiten": accommodationLayer,
    }, {
        collapsed: false
    });
myMap.addControl(myMapControl);
L.control.scale({
    maxWidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft"
}).addTo(myMap);
myMap.addLayer(accommodationLayer);

for (const macc of accommodations) {
    L.marker([macc.lat, macc.lng], {
        icon: myIcon,
    }
    ).bindPopup(`<h1>${macc.name}</h1>
        <p>${macc.adresse} </br>${macc.webpage} </br>${macc.phone}</p>`)
        .addTo(accommodationLayer);
}
myMap.fitBounds(accommodationLayer.getBounds());

