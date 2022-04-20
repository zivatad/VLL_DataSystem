"use strict";let geojson_mp3,geojson_mp4,br1Data,loading=[],geojson_nb={},geojson_wd={},geojson_mp1={},geojson_mp2={},ln1Data=[];{const e="https://data.eindhoven.nl/api/records/1.0/search/?dataset=wijken&rows=20&facet=wijkcode&facet=wijknaam",t="https://raw.githubusercontent.com/tue-vll/data/master/Sport2017.json",n="https://raw.githubusercontent.com/tue-vll/data/master/Sport2006-2017_ward.json",a="https://raw.githubusercontent.com/tue-vll/data/master/publicLight2017.json",o="https://raw.githubusercontent.com/tue-vll/data/master/Green.json",s="https://raw.githubusercontent.com/tue-vll/data/master/bikeRoute.json",r="https://raw.githubusercontent.com/tue-vll/data/master/Bennekel_reasons_not.json",l=fetch("https://data.eindhoven.nl/api/records/1.0/search/?dataset=buurten&rows=116&facet=buurtcode&facet=buurtnaam&facet=wijkcode&facet=wijknaam").then(e=>e.json()),i=fetch(e).then(e=>e.json()),u=fetch(t).then(e=>e.json()),p=fetch(n).then(e=>e.json()),d=fetch(a).then(e=>e.json()),c=fetch(s).then(e=>e.json()),h=fetch(r).then(e=>e.json()),g={visualizations:()=>{l.then(e=>{let t=e.records,n=t.length;geojson_nb.type="FeatureCollection",geojson_nb.features=[];for(let e=0;e<n;e++){let n={type:"Feature",geometry:{type:"Polygon",coordinates:t[e].fields.geo_shape.coordinates},properties:{neighborhood:t[e].fields.buurtnaam}};geojson_nb.features.push(n)}loading[0]="nb",u.then(e=>{let t=e,n=[];geojson_mp1=geojson_nb;for(let e=0;e<geojson_mp1.features.length;e++){let a=geojson_mp1.features[e].properties;a=a.neighborhood.replace(", ",",");const o=t.filter(e=>e.Buurten==a);n.push(o[0])}for(let e=0;e<geojson_mp1.features.length;e++)geojson_mp1.features[e].properties.sports=n[e]["doet aan sport 2017"];vizmaps("mp1","Gray","initialize"),loading[1]="mp1"})}),i.then(e=>{let t=e.records,n=t.length;geojson_wd.type="FeatureCollection",geojson_wd.features=[];for(let e=0;e<n;e++){let n={type:"Feature",geometry:{type:"Polygon",coordinates:t[e].fields.geo_shape.coordinates},properties:{ward:t[e].fields.wijknaam.slice(5)}};geojson_wd.features.push(n)}loading[2]="wd"}),p.then(e=>{let t=e,n=Object.keys(t[0]).length;for(let e=0;e<t.length;e++){let a={values:[]};for(let o=0;o<n-1;o++){let n=null!==t[e][2006]&&0!==t[e][2006],s=null!==t[e][2007]&&0!==t[e][2007],r=null!==t[e][2008]&&0!==t[e][2008],l=null!==t[e][2009]&&0!==t[e][2009],i=null!==t[e][2010]&&0!==t[e][2010],u=null!==t[e][2011]&&0!==t[e][2011],p=null!==t[e][2012]&&0!==t[e][2012],d=null!==t[e][2013]&&0!==t[e][2013],c=null!==t[e][2014]&&0!==t[e][2014],h=null!==t[e][2015]&&0!==t[e][2015],g=null!==t[e][2016]&&0!==t[e][2016],m=null!==t[e][2017]&&0!==t[e][2017];n&&s&&r&&l&&i&&u&&p&&d&&c&&h&&g&&m&&(a.name="",a.name=t[e].Wijken,a.values[o]={year:Object.keys(t[e])[o],percent:t[e][Object.keys(t[e])[o]]})}void 0!==a.name&&ln1Data.push(a)}vizcharts("ln1"),loading[3]="ln1"}),d.then(e=>{let t=e;geojson_mp2.type="FeatureCollection",geojson_mp2.features=[];for(let e=0;e<t.length;e++)if(""!==t[e].Kleur&&null!==t[e].Wattage&&t[e].Wattage>=100){let n=t[e].Locat.split(", "),a={type:"Feature",geometry:{type:"Point",coordinates:[parseFloat(n[0]),parseFloat(n[1])]},properties:{color:t[e].Kleur,watt:t[e].Wattage}};geojson_mp2.features.push(a)}vizmaps("mp2","DarkGray","initialize"),loading[4]="mp2"}),d3.json(o).then(function(e){geojson_mp3=e,vizmaps("mp3","Gray","initialize"),loading[5]="mp3"}),c.then(e=>{geojson_mp4=e,vizmaps("mp4","Gray","initialize"),loading[6]="mp4"}),h.then(e=>{br1Data=e,e=e.sort(function(e,t){return d3.ascending(e.Number,t.Number)});let t=48,n=24,a=24,o=300,s=600-o-n,r=600-t-a,l=d3.select("#Bennekel-modal_inner").append("svg").attr("width",s+o+n).attr("height",r+t+a).append("g").attr("transform","translate("+o+","+t+")"),i=d3.scaleLinear().rangeRound([0,s]).domain([0,d3.max(e,function(e){return e.Number})]),u=d3.scaleBand().rangeRound([r,0],.1).domain(e.map(function(e){return e.Reasons})),p=d3.axisLeft(u),d=(l.append("g").attr("class","y axis").call(p),l.selectAll(".bar").data(e).enter().append("g"));d.append("rect").attr("class","bar").attr("y",function(e){return u(e.Reasons)}).attr("height",u.bandwidth()-6).attr("x",0).attr("width",function(e){return i(e.Number)}),d.append("text").attr("class","label")})}};document.addEventListener("DOMContentLoaded",()=>{g.visualizations()})}