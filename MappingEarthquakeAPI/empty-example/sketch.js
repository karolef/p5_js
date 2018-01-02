let mapimg;
let clat = 0;
let clon = 0;

// 31.2304° N, 121.4737° E SHanghai
// 49.2827° N, 123.1207° W Vancouver
let lat = 49.2827;
let lon = -123.1207;

let zoom = 1;

let earthquakes;

function preload() {
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoidmVydXNvIiwiYSI6ImNqYnYydmxtdTFycnMycXBjbWdod3l3MXYifQ.ekgOTY2J5B4kn52X3O_4pw");
  //earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

// Web Mercator transformation

function mercX(lon) {
  lon = radians(lon);
  let a = (256 / PI) * pow(2, zoom);
  let b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  let a = (256 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(1024, 512);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  let cx = mercX(clon);
  let cy = mercY(clat);

  for (let i = 0; i < earthquakes.length; i++) {
    let data = earthquakes[i].split(/,/);

    let lat = data[1];
    let lon = data[2];
    let mag = data[4];
    let x = mercX(lon) - cx;
    let y = mercY(lat) - cx;

    mag = pow(10, mag);
    mag = sqrt(mag);

    let magmax = sqrt(pow(10, 10));

    let d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }
}
