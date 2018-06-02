/*
kletterspots = {

        "features":[{
    
        "geometry":{
            "type":"point",
            "coordinates": [47.282304, 11.394418]
            },
            "properties":{
                "name": "Höttinger Steinbruch",
                "topolink":"https://www.climbers-paradise.com/sportklettern-innsbruck-tirol/location/hoettinger-steinbruch/"
    
            },
            "geometry":{
                "type":"point",
                "coordinates": [47.312001, 11.376287]
                },
                "properties":{
                    "name": "Kletterarena-Seegrube",
                    "topolink":"https://www.climbers-paradise.com/sportklettern-innsbruck-tirol/location/nordkette-kletterarena-seegrube-sportklettern/"
        
                },
                "geometry":{
                    "type":"point",
                    "coordinates": [47.270672, 47.270672]
                    },
                    "properties":{
                        "name": "Kranebitter Steinbruch",
                        "topolink":"http://www.klettertopo.de/Routendatenbank.php?L_ID=2&G_ID=146&F_ID=5256&Start_Ausgabe_Fels=0"
            
                },
                "geometry":{
                    "type":"point",
                    "coordinates":[47.278491, 11.256032]
                }, 
                "propertiers":{
                    "name":"Ehnbackklamm",
                    "topolink":"https://www.climbers-paradise.com/sportklettern-innsbruck-tirol/location/ehnbachklamm/"
                }}]
            }
    

L.geoJSON(kletterspots,{
    pointToLayer: function(geoJSONPoint, latLng){
        console.log({coordinates: features.geometry.coordinates[0]})
    }
})
*/
// Rahmen für die Karte 
let myMap = L.map("mapclimbing", {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
});
let climbingSpots = L.featureGroup();

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
   "Kletterspots": climbingSpots
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