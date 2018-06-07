// noch machen: Farbe von Linie auf diese Ändern:     color: "#b40000",
let myMap = L.map("mapdiv", {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
}
);
let etappeGroup12 = L.featureGroup();
let etappeGroup13 = L.featureGroup();

//Kartenlayer festlegen
let myLayers = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            subdomains: ["a", "b", "c"],
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>openstreetmap.org</a>"
        }
    ),

    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",
        {
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
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
        {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquellen: <a href='https://www.basemap.at'>basemap.at</a>"
        }
    )
};
myMap.addLayer(myLayers.osm);

//Gruppierung Orthophoto & Beschriftung
let ortho_m_beschr = L.featureGroup(
    [myLayers.bmaporthofoto30cm,
    myLayers.tiris_nomenklatur]
);

//Marker-Layer Etappe 12
myMap.addLayer(etappeGroup12);
const start12 = [47.35467730, 11.47713480];
const finish12 = [47.27091590, 11.39537570];

L.marker(start12, {
    icon: L.icon({ iconUrl: '../icons/start.png', iconAnchor: [15, 35], })
}).addTo(etappeGroup12);

L.marker(finish12, {
    icon: L.icon({ iconUrl: '../icons/finish.png', iconAnchor: [15, 35], })
}).addTo(etappeGroup12);

//Marker-Layer Etappe 13
myMap.addLayer(etappeGroup13);
const start13 = [47.21111820, 11.45217410];
const finish13 = [47.22586360, 11.52931450];

L.marker(start13, {
    icon: L.icon({ iconUrl: '../icons/start.png', iconAnchor: [15, 35], })
}).addTo(etappeGroup13);

L.marker(finish13, {
    icon: L.icon({ iconUrl: '../icons/finish.png', iconAnchor: [15, 35], })
}).addTo(etappeGroup13);

// Track Etappe 12
let gpxTrack12 = new L.GPX("AdlerwegEtappe12.gpx", {
    async: true,
});

gpxTrack12.on("loaded", function (evt) {
    let track = evt.target;
}).addTo(myMap);


let hoehenProfil12 = L.control.elevation({
    position: "topright",
    theme: "steelblue-theme",
    width: 600,
    height: 125,
    margins: {
        top: 10,
        right: 20,
        bottom: 30,
        left: 50
    },
    useHeightIndicator: true,
    interpolation: "linear",
    hoverNumber: {
        decimalsX: 3,
        decimalsY: 0,
        formatter: undefined
    },
    xTicks: undefined,
    yTicks: undefined,
    collapsed: true,
    imperial: false
}).addTo(myMap);

gpxTrack12.on("addline", function (evt) {
    hoehenProfil12.addData(evt.line);
});
gpxTrack12.addTo(myMap);

// Track Etappe 13
let gpxTrack13 = new L.GPX("AdlerwegEtappe13.gpx", {
    async: true,
    track_options: {
        color: "#b40000"
    }
});

gpxTrack13.on("loaded", function (evt) {
    let track = evt.target;
}).addTo(myMap);

let hoehenProfil = L.control.elevation({
    position: "topright",
    theme: "steelblue-theme",
    height: 125,
    margins: {
        top: 10,
        right: 20,
        bottom: 30,
        left: 50
    },
    useHeightIndicator: true,
    interpolation: "linear",
    hoverNumber: {
        decimalsX: 3,
        decimalsY: 0,
        formatter: undefined
    },
    xTicks: undefined,
    yTicks: undefined,
    collapsed: true,
    imperial: false
}).addTo(myMap);

gpxTrack13.on("addline", function (evt) {
    hoehenProfil.addData(evt.line);
});
gpxTrack13.addTo(myMap);

let myMapControl = L.control.layers({
    "Karte": myLayers.osm,
    "Orthofoto": ortho_m_beschr,
},
    {
        "Start- & Endpunkt der Etappe 12": etappeGroup12,
        "Track der Etappe 12": gpxTrack12,
        "Start- & Endpunkt der Etappe 13": etappeGroup13,
        "Track der Etappe 13": gpxTrack13,
    },
    {
        collapsed: false
    });

myMap.addControl(myMapControl);

L.control.scale({
    maxWidth: 200,
    metric: true,
    imperial: false,
    position: "bottomleft"
}).addTo(myMap);

// Variablen Gruppieren für fitBounds
let etappeGroups = L.featureGroup(
    [
        etappeGroup12,
        etappeGroup13,
    ],
);

myMap.fitBounds(etappeGroups.getBounds());

