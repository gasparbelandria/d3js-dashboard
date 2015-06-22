var width = 350,
    height = 350,
    radius = height/2,
    innerRadius = height/4,
    color = d3.scale.category20c();

function tweenPie(b) {
    var i = d3.interpolate({startAngle: 1.1*Math.PI, endAngle: 1.1*Math.PI}, b);
    return function(t) { return arc(i(t)); };
}

var data = [
    {
        id: "1",
        label: "Andrew Gelina",
        photo: "https://avatars0.githubusercontent.com/u/1186544?v=3&s=460",
        value: 34
    },{
        id: "2",
        label: "Mike Parvin",
        photo: "https://avatars0.githubusercontent.com/u/5796160?v=3&s=200",
        value: 20
    },{
        id: "3",
        label: "Luke Howarth",
        photo: "https://avatars0.githubusercontent.com/u/7111340?v=3&s=200",
        value: 10
    },{
        id: "4",
        label: "Tom McClutchy",
        photo: "https://avatars1.githubusercontent.com/u/11994?v=3&s=120",
        value: 35
    },{
        id: "5",
        label: "Mark Gaeta",
        photo: "https://avatars1.githubusercontent.com/u/70036?v=3&s=120",
        value: 53
    },{
        id: "6",
        label: "Nicole Vale",
        photo: "https://avatars3.githubusercontent.com/u/340884?v=3&s=120",
        value: 50
    },{
        id: "7",
        label: "Greg Lynch",
        photo: "https://avatars0.githubusercontent.com/u/313870?v=3&s=120",
        value: 40
    },{
        id: "8",
        label: "Chris Sava",
        photo: "https://avatars0.githubusercontent.com/u/1798620?v=3&s=460",
        value: 52
    }]

console.table(data);

/* */
//function zoomed() {
//    vis.attr("width", width)
//        .attr("height", height)
//        .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//}
//var zoom = d3.behavior.zoom()
//    .scaleExtent([0.2, 3])
//    .on("zoom", zoomed);

var pie = d3.layout.pie()
    .value(function(d){return d.value;});

// declare an arc
var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(innerRadius);

// declare an inner arc, that do the Donut effect
var arcOver = d3.svg.arc()
    .outerRadius(radius + 10)
    .innerRadius(innerRadius + 10);

var arcOverWhenClick = d3.svg.arc()
    .outerRadius(radius + 40)
    .innerRadius(innerRadius + 40);


/* d3-transform reference: https://github.com/trinary/d3-transform  */
var transform = d3.svg.transform()
    .translate(function(d) { return [radius, radius ] }) // d.value * 10
    .rotate(0)
    .scale(function(d) { return 2 }); // //return d.value + 2


var vis = d3.select('#chart')
    .append("svg:svg")
    .data([data])
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("transform", "translate(" + radius + "," + radius + ")")
    .on("click", function(d) {
        d3.select("g")
            .transition("transition_2")     // transition with name "trans_1"
            .delay(0)                       // transition starting 0ms after trigger
            .duration(5000)                 // transitioning during 500ms
            .ease("linear")                 // transition easing progression is linear...
            //.ease("elastic")
            .duration(140)
            .attr('transform', transform);
    })

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
    .data(pie).enter()
    .append("svg:g")
    .attr("class", "slice")
    .attr("data-id", function(d){
        return d.data["id"];
    })
    .append("svg:path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function (d) {
        return arc(d);
    })
    .on("mouseenter", function(d) {

        var label = d.data.label;
        var photo = d.data.photo;

        d3.select('.photo')
            .html('')
            .data(data)
            .html(function(){
                console.log(label);
                return '<img src="' + photo + '" width="50"><br /><span style="font-size: 12px;">' + label + '</span>';
            });

        d3.select(this)
            .transition()
            .duration(100)
            .attr("d", arcOver);

    })
    .on("mouseleave", function(d) {
        d3.select(this).transition()
            .attr("d", arc)
            .attr("stroke","none");
    })
    //.call(d3.behavior.drag().on('dragstart', function (d) {
    //    console.log("Started moving item with data:", d);
    //}))
    //.call(zoom)
    .transition("transition_1")     // transition with name "trans_1"
    .delay(0)                       // transition starting 0ms after trigger
    .duration(50)                   // transitioning during 500ms
    //.ease("linear")               // transition easing progression is linear...
    .ease("elastic")
    .duration(2000)
    .attrTween("d", tweenPie);

d3.select("#nMonth").on("input", function() {
    updateData(+this.value);
});

d3.select("#nAngle").on("input", function() {
    rotate(+this.value);
});

function updateData(nMonth) {
    var month;
    data.forEach(function(item){
        var optionRandom = random = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        var valuesRandom = random = Math.floor(Math.random() * (1 - 0 + 50)) + 0;
        if (optionRandom===1){
            item.value = Math.abs(item.value + valuesRandom);
        }else{
            item.value = Math.abs(item.value - valuesRandom);
        }
        return item;
    });

    switch(nMonth) {
        case 1:
            month = "January";
            break;
        case 2:
            month = "February";
            break;
        case 3:
            month = "March";
            break;
        case 4:
            month = "April";
            break;
        case 5:
            month = "May";
            break;
        case 6:
            month = "June";
            break;
        case 7:
            month = "July";
            break;
        case 8:
            month = "August";
            break;
        case 9:
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 12:
            month = "December";
            break;
    }

    d3.select('#month').text(month);

    d3.select('.svg svg')
        .data([data]);

    d3.select('.svg svg').selectAll('g path')
        .data(pie)
        .transition()
        .duration(100)
        //.ease("linear")
        .ease("elastic")
        .attrTween('d', tweenPie);

}

function rotate(nAngle) {
    d3.select("g")
        .attr("transform", "translate(" + radius + "," + radius + ") rotate("+nAngle+")");
}