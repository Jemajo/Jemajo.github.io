// Rahmen für die Karte 
let myMap = L.map("mapclimbing", {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});
let climbingLayer = L.featureGroup();

let myLayers = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],

            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>"

        }
    ),

    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    ),
    tiris_nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
            attribution: "<a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
            pane: "overlayPane",
        }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquellen: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    )
};

let ortho_m_beschr = L.featureGroup(
    [myLayers.bmaporthofoto30cm,
        myLayers.tiris_nomenklatur
    ]
);


// Layer zur Karte hinzufügen - zusammenbauen 
myMap.addLayer(myLayers.osm);

let myMapControl = L.control.layers({
    //<Object> baselayers?
    "Karte": myLayers.osm,
    "Orthofoto": ortho_m_beschr,


}, { // Unterm Strich Platzhalter
    "Kletterspots": climbingLayer
}, {
    collapsed: false
});
myMap.addControl(myMapControl);
// Zentrum der Karte setzen 
myMap.setView([47.267, 11.383], 11)
L.control.scale({
    maxWidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft"
}).addTo(myMap);

const myIcon = L.icon({
    iconUrl : '../icons/climbing.png',
});
myMap.addLayer(climbingLayer);
for (const ks of kletterspots) {
    L.marker([ks.lat, ks.lng], {
        iconUrl: myIcon,
    }).bindPopup(`<h1>${ks.name}</h1>
        <p>${ks.topolink}</br>${ks.Infos}</p>`).addTo(climbingLayer);
}
myMap.fitBounds(climbingLayer.getBounds());




/*

async function ladeGeojsonLayer(kletterspots){
    const response = await fetch(kletterspots.feature);
    const response_json = await response.feature();
}


let geojsonObjekt_klettern = L.geoJSON(kletterspots,{ // in den .js datensatz kletterspots schauen
    onEachFeature: function(feature, layer){ // alle informationen im datensatz unter feature abrufen
        //console.log(feature);
        //console.log(feature.properties.NAME);
        let popup = "pupsi" // nur der text in "" wird abgerufen..
        for (attribut in feature.properties){ //zugreifen auf die attribute in feature.properties (name und link)
            let wert = feature.properties[attribut]; //schreiberleichertung
            //console.log(attribut, wert);
            if (wert && wert.toString().startsWith("http:")){ //http als weblink anzeigen
                popup+=`${attribut}: <a href="${wert}"> Link zum Topo</a></br>`; 
            } else {
                popup+= `${attribut}:${wert}</br>`;
            }
        }
        //console.log(popup)
        layer.bindPopup(popup,{
           maxWidth:900,
        });
       
    },
    pointToLayer: function(geoJsonPoint, latlng){
        L.marker(latlng,{
            icon:L.icon({
                iconUrl: "../icons/climbing1.png", 
                iconAnchor: [16, 32],
                popupAnchor: [0,-32],
            })
        }
    )
    }
});
const markerKletterspots = L.geoJSON(kletterspots,{
    onEachFeature: function(feature, layer){
        let latlng = feature.geometry.coordinates[0];
        console.log(latlng);
        L.marker(latlng,{
            icon:L.icon({
                iconUrl: "../icons/climbing1.png", 
                iconAnchor: [16, 32],
                popupAnchor: [0,-32],
            })
        })
    }
})


//L.geoJSON(geojsonObjekt_klettern).addTo(myMap);
//myMap.addLayer(geojsonObjekt_klettern);
//myMap.fitBounds(geojsonObjekt_klettern.getBounds());









//marker für kletterspots
const hoettingerSteinbruch = [47.282304, 11.394418];
L.marker(hoettingerSteinbruch);
let hs = L.marker(hoettingerSteinbruch
   ,{icon: L.icon({iconUrl: "../icons/climbing1.png",iconAnchor: [16, 37]})}
).addTo(climbingSpots)
hs.bindPopup("<h3>Kletterspot Höttinger Steinbruch</h3><p><a href='https://www.climbers-paradise.com/sportklettern-innsbruck-tirol/location/hoettinger-steinbruch/'>Topo-Link</a></p>").addTo(myMap);
//hs.addTo(myMapControl);

const seegrube = [47.312001, 11.376287];
L.marker(seegrube);
let sg = L.marker(seegrube
   ,{icon: L.icon({iconUrl: "../icons/climbing1.png",iconAnchor: [16, 37]})}
).addTo(climbingSpots)
sg.bindPopup("<h3>Kletterarena Seegrube</h3><p><a href='https://www.climbers-paradise.com/sportklettern-innsbruck-tirol/location/nordkette-kletterarena-seegrube-sportklettern/'>Topo-Link</a></p>").addTo(myMap);
//sg.addTo(myMapControl);

const kranebitterSteinbruch = [47.2708, 11.3397];
L.marker(kranebitterSteinbruch);
let ks = L.marker(kranebitterSteinbruch
   ,{icon: L.icon({iconUrl: "../icons/climbing1.png",iconAnchor: [16, 37]})}
).addTo(climbingSpots)
ks.bindPopup("<h3>Kletterspot Kranebitter Steinbruch</h3><p><a href='http://www.klettertopo.de/Routendatenbank.php?L_ID=2&G_ID=146&F_ID=5256&Start_Ausgabe_Fels=0'>Topo-Link</a></p>").addTo(myMap);
//ks.addTo(myMapControl);

const ehnbachklamm = [47.278491, 11.256032];
L.marker(ehnbachklamm);
let ebk = L.marker(ehnbachklamm
   ,{icon: L.icon({iconUrl: "../icons/climbing1.png",iconAnchor: [16, 37]})}
).addTo(climbingSpots)
ebk.bindPopup("<h3>Kletterspot Ehnbachklamm</h3><p><a href='https://www.climbers-paradise.com/sportklettern-innsbruck-tirol/location/ehnbachklamm/'>Topo-Link</a></p>").addTo(myMap);
//ebk.addTo(myMapControl);
*/