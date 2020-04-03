
// slide model:
// a title
// a description
// background color
var slides = [
  { title: "Title", description: "This is the description", color: "#F0F0F0" },
  { title: "title1", description: "the first description", color: "#F0F0F0" },
  { title: "title2", description: "the second description", color: "#F0F0F0" },
  { title: "title3", description: "the first description", color: "#F0F0F0" },
  { title: "made up title", description: "made up description", color: "#F0F0F0" }
]
var currentSlide = 0

var loadSlide = function(slide) {
  $('#title').text(slide.title)
  $('#description').text(slide.description)
  $('#sidebar').css("background-color", slide.color)
}




var url_1;
var lat_1;
var lon_1;
var downloadData;


var parseData = function(Data_)
{
  return JSON.parse(Data_);
};


var makeMarkers = function(Data_) {
  var Markers_ = [];
  for(var i = 0; i<Data_.length; i++){
    var mark = L.marker([Data_[i][lat_1], Data_[i][lon_1]]);
    Markers_.push(mark);
  }
  return Markers_;
};


var plotMarkers = function(Markers_) {
  for(var i = 0; i< Markers_.length; i++){
    Markers_[i].addTo(map);
  }
};


var removeMarkers = function(Markers_) {
  for(var i = 0; i< Markers_.length; i++){
    map.removeLayer(Markers_[i]);
  }
};


var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var parsed;
var markers;
$("#button" ).click(function() {
  if (typeof(markers) != "undefined") {      // clear the map before each plot
    removeMarkers(markers);                  // except the first plot
  }
  url_1 = $("#text-input1").val();           // assign the value here rather than in the front
  lon_1 = $("#text-input2").val();           // in order to get the input after users click the Button
  lat_1 = $("#text-input3").val();           // in case the users change the default value
  downloadData = $.ajax(url_1);
    downloadData.done(function(data) {
    parsed = parseData(data);
    markers = makeMarkers(parsed);
    plotMarkers(markers);});
})




var next = function() {
  if (currentSlide == 0) {
    $('#previousButton').show()}
  if (currentSlide == slides.length - 1) {
  } else {
    $('#nextButton').show()
    currentSlide = currentSlide + 1
    loadSlide(slides[currentSlide])
  }
  if (typeof(markers) != "undefined") {      // clear the map before each plot
    removeMarkers(markers);                  // except the first plot
  }
  url_1 = "http://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-bike-crashes-snippet.json"           // assign the value here rather than in the front
  lon_1 = "LNG"         // in order to get the input after users click the Button
  lat_1 = "LAT"         // in case the users change the default value
  downloadData = $.ajax(url_1);
    downloadData.done(function(data) {
    parsed = parseData(data);
    markers = makeMarkers(parsed);
    plotMarkers(markers);});
  if (currentSlide == slides.length - 1) {
    $('#nextButton').hide()
  }

}

var previous = function() {
  if (currentSlide == slides.length - 1) {
    $('#nextButton').show()
  }
  if (typeof(markers) != "undefined" ) {      // clear the map before each plot
    removeMarkers(markers);                  // except the first plot
  }
  if(currentSlide != 1){
    url_1 = "http://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-bike-crashes-snippet.json"           // assign the value here rather than in the front
    lon_1 = "LNG"         // in order to get the input after users click the Button
    lat_1 = "LAT"         // in case the users change the default value
    downloadData = $.ajax(url_1);
      downloadData.done(function(data) {
      parsed = parseData(data);
      markers = makeMarkers(parsed);
      plotMarkers(markers);});}
  if (currentSlide == 0) {
  } else {
    $('#previousButton').show()
    currentSlide = currentSlide - 1
    loadSlide(slides[currentSlide])
  }
  if (currentSlide == 0) {
    $('#previousButton').hide()}

}


$('#nextButton').click(function(e) {
  next()
})
$('#previousButton').click(function(e) {
  previous()
})







;
