// === CONFIG: pilih tahun yang ingin dipakai untuk styling (2022 | 2023 | 2024) ===
var yearTBC = "2024"; // ubah ke '2023' atau '2022' jika perlu

var size = 0;
var placement = "point";

// Fungsi kategori berdasarkan rentang nilai TBC
function categories_TBC_2022_2024(
  feature,
  value,
  size,
  resolution,
  labelText,
  labelFont,
  labelFill
) {
  // Pastikan value adalah number
  var v = Number(value);
  // Gunakan rentang yang sama seperti legendmu:
  // 179 - 1128  (rendah) => rgba(255,245,240,1.0)
  // 1128 - 2249 (sedang) => rgba(251,112,80,1.0)
  // 2249 - 6434 (tinggi) => rgba(103,0,13,1.0)
  if (!isFinite(v)) {
    // default style (tidak ada data)
    return [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0,0,0,1.0)",
          lineDash: null,
          lineCap: "butt",
          lineJoin: "miter",
          width: 0,
        }),
        fill: new ol.style.Fill({ color: "rgba(200,200,200,0.6)" }),
        text: createTextStyle(
          feature,
          resolution,
          labelText,
          labelFont,
          labelFill,
          placement
        ),
      }),
    ];
  }

  if (v >= 179 && v <= 1127.666667) {
    return [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0,0,0,1.0)",
          lineDash: null,
          lineCap: "butt",
          lineJoin: "miter",
          width: 0,
        }),
        fill: new ol.style.Fill({ color: "rgba(255,245,240,1.0)" }),
        text: createTextStyle(
          feature,
          resolution,
          labelText,
          labelFont,
          labelFill,
          placement
        ),
      }),
    ];
  } else if (v > 1127.666667 && v <= 2249.0) {
    return [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0,0,0,1.0)",
          lineDash: null,
          lineCap: "butt",
          lineJoin: "miter",
          width: 0,
        }),
        fill: new ol.style.Fill({ color: "rgba(251,112,80,1.0)" }),
        text: createTextStyle(
          feature,
          resolution,
          labelText,
          labelFont,
          labelFill,
          placement
        ),
      }),
    ];
  } else if (v > 2249.0 && v <= 6434.0) {
    return [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0,0,0,1.0)",
          lineDash: null,
          lineCap: "butt",
          lineJoin: "miter",
          width: 0,
        }),
        fill: new ol.style.Fill({ color: "rgba(103,0,13,1.0)" }),
        text: createTextStyle(
          feature,
          resolution,
          labelText,
          labelFont,
          labelFill,
          placement
        ),
      }),
    ];
  } else {
    // nilai di luar rentang — gaya fallback
    return [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0,0,0,1.0)",
          lineDash: null,
          lineCap: "butt",
          lineJoin: "miter",
          width: 0,
        }),
        fill: new ol.style.Fill({ color: "rgba(150,150,150,0.8)" }),
        text: createTextStyle(
          feature,
          resolution,
          labelText,
          labelFont,
          labelFill,
          placement
        ),
      }),
    ];
  }
}

// Style function yang dipakai layer (mengikuti pola qgis2web)
var style_TBC_2022_2024 = function (feature, resolution) {
  var context = {
    feature: feature,
    variables: {},
  };

  // Ambil value berdasarkan tahun yang telah dipilih
  var value = feature.get(yearTBC);
  var labelText = "";
  size = 0;
  var labelFont = "13.325px 'MS Shell Dlg 2', sans-serif";
  var labelFill = "rgba(0, 0, 0, 1)";
  var textAlign = "left";
  var offsetX = 8;
  var offsetY = 3;
  var placement = "point";

  // Gunakan nama wilayah sebagai label (misal field 'KOTA' atau 'kecamatan')
  // Sesuaikan nama field jika di datasetmu berbeda.
  if (feature.get("KOTA") !== null && feature.get("KOTA") !== undefined) {
    labelText = String(feature.get("KOTA"));
  } else if (
    feature.get("kecamatan") !== null &&
    feature.get("kecamatan") !== undefined
  ) {
    labelText = String(feature.get("kecamatan"));
  } else {
    labelText = "";
  }

  var style = categories_TBC_2022_2024(
    feature,
    value,
    size,
    resolution,
    labelText,
    labelFont,
    labelFill
  );

  return style;
};
