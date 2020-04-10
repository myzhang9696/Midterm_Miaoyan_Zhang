
// slide model:
// a title
// a description
// background color
var slides = [
  { title: "Philadelphia Farmers Markets Guide", description: "This website is a guidebook for citizens and farmers of Philly to know the business hour and other information for Farmers Markest. Please click the marker for more information.", color: "#F0F0F0" },
  { title: "Farmers Markets that opening on weekends", description: "There are 14 Farmers Markets open on weekends. Among them, 10 Farmers Markets open on Saturday and 4 Farmers Markets open on Saturdau. Please click the marker to check more details.", color: "#F0F0F0" },
  { title: "Farmers Markets that opening on weekdays", description: "There are 36 Farmers Markets open on weekdays. Please click the marker to check more details.", color: "#F0F0F0" },
  { title: "Farmers Markets that opening all year around", description: "Only 3 Farmers Markets open all year around, and other Farmers Markets only open a few months, mostly from Spring to Fall.", color: "#F0F0F0" },
  { title: "Farmers Markets that accept Philly Food Bucks", description: "Philly Food Bucks program is a healthy food incentive program, which encourages food stamp recipients to use their benefits to purchase local and fresh ingredients at participating Farmers Markets throughout the Philly. 36 of 50 Farmers Markets participate in this program.", color: "#F0F0F0" }
]
var currentSlide = 0

var loadSlide = function(slide) {
  $('#title').text(slide.title)
  $('#description').text(slide.description)
  $('#sidebar').css("background-color", slide.color)
}




var url_1 = "https://raw.githubusercontent.com/myzhang9696/Midterm_Miaoyan_Zhang/master/Midterm/file/Farmers_Markets.geojson";
var downloadData;


var parseData = function(Data_)
{
  return JSON.parse(Data_);
};


var makeMarkers = function(Data_) {
  var Markers_ = [];
  for(var i = 0; i<Data_.length; i++){
    if(Data_[i].geometry != null){
      var mark = L.marker([Data_[i].geometry.coordinates[1], Data_[i].geometry.coordinates[0]]).bindPopup(
        "<dl><dt>Farmers Market Name:</dt>"+ "<dd>" + Data_[i].properties.NAME + "</dd>"
        + "<dt>Opening Months:</dt>"+ "<dd>" +Data_[i].properties.MONTHS+ "</dd>"
        + "<dt>Opening Days:</dt>"+ "<dd>" +Data_[i].properties.DAY+ "</dd>"
        + "<dt>Opening Hours:</dt>"+ "<dd>" +Data_[i].properties.TIME+ "</dd>"
        + "<dt>Address:</dt>"+ "<dd>" +Data_[i].properties.ADDRESS+ "</dd>"      );
      Markers_.push(mark);
    }
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
  center: [40, -75.1639],
  zoom: 11
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

downloadData = $.ajax(url_1);
  downloadData.done(function(data) {
  parsed = parseData(data);
  markers = makeMarkers(parsed.features);
  plotMarkers(markers);});


var myFilter = function(parsed,slide) {
  var parsed_s=[]
  if(slide==0){
    for(var i = 0; i<parsed.features.length; i++){
      parsed_s=parsed.features
    };
  }
  if(slide==1){
    for(var i = 0; i<parsed.features.length; i++){
      if(parsed.features[i].properties.DAY=="Sat" ||parsed.features[i].properties.DAY=="Saturdays"||parsed.features[i].properties.DAY=="Sun"){
        parsed_s.push(parsed.features[i]);
      }
    };
  }
  else if (slide==2) {
    for(var i = 0; i<parsed.features.length; i++){
      if(parsed.features[i].properties.DAY!="Sat"&&parsed.features[i].properties.DAY!="Saturdays"&&parsed.features[i].properties.DAY!="Sun"){
        parsed_s.push(parsed.features[i]);
      }
    };
  }
  else if (slide==3) {
    for(var i = 0; i<parsed.features.length; i++){
      if(parsed.features[i].properties.MONTHS=="Open year round: 9am - 1pm (May - end of November); 10am - 12pm (Dec-April)" ||parsed.features[i].properties.MONTHS=="Open year round"){
        parsed_s.push(parsed.features[i]);
      }
    };
  }
  else if (slide==4) {
    for(var i = 0; i<parsed.features.length; i++){
      if(parsed.features[i].properties.ACCEPT_PHILLY_FOOD_BUCKS_=="Y"){
        parsed_s.push(parsed.features[i]);
      }
    };
  }
  return parsed_s;
};

var change_view = function(slide) {
  if(slide == 0){
    map.setView([40, -75.1639],11);
    console.log(slide);
  }
  else{
    map.setView([40, -75.1639],12);
    console.log(slide);
  }
}

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
    removeMarkers(markers);
  }
  downloadData = $.ajax(url_1);
    downloadData.done(function(data) {
    parsed = parseData(data);
    parsed = myFilter(parsed,currentSlide);
    markers = makeMarkers(parsed);
    plotMarkers(markers);});
  change_view(currentSlide);
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
  downloadData = $.ajax(url_1);
    downloadData.done(function(data) {
    parsed = parseData(data);
    parsed = myFilter(parsed,currentSlide);
    markers = makeMarkers(parsed);
    plotMarkers(markers);})
  change_view(currentSlide-1);
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
