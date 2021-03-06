/**
 * Created by mauricio on 3/29/15.
 */
'use strict'
var d3 = window.d3
var utils = require('../utils')
var polylineModule = require('./polyline')

module.exports = function (chart) {
    var xScale = chart.meta.xScale
    var yScale = chart.meta.yScale
 
    var drawType = {
        text: (function(el, shape) { return drawText(el, shape) }),
        circle: (function(el, shape) { return drawCircle(el, shape) }),
        rect: (function(el, shape) { return drawRectangule(el, shape) }),
    }

    function drawText (el, shape) {
        var jsonArray = []
            jsonArray.push(shape)
        var innerSelection = el.selectAll('text')
            .data(jsonArray)

        innerSelection.enter()
            .append("text")

        innerSelection
            .attr('stroke', shape.fill)
            .attr('fill', shape.fill)
            .attr('font-size', function (d) { return xScale(shape.size)/40 + 'px' })
            .attr('x', function (d) { return xScale(d.x) })
            .attr('y', function (d) { return yScale(d.y) })
            //.transition()
            //.duration(5000)
            .style("-moz-transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("-ms-transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("-o-transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("-webkit-transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("-webkit-transform", "rotate("+shape.rotation+")")
            .style("-ms-transform", "rotate("+shape.rotation+")")
            .style("transform", "rotate("+shape.rotation+")")
            .text(shape.text)
        // .attr(d.attr)
        
        innerSelection.exit().remove()
    }

    function drawCircle (el, shape) {
        var jsonArray = []
            jsonArray.push(shape)
        var innerSelection = el.selectAll('circle')
            .data(jsonArray)

        innerSelection.enter()
            .append("circle")
            .attr('fill', "transparent")

        innerSelection
            .attr('stroke', shape.stroke)
            .attr('fill', shape.fill)
            .attr('cx', function (d) { return xScale(d.x) })
            .attr('cy', function (d) { return yScale(d.y) })
            .attr('r',  function (d) { var r = xScale(d.x + d.r) - xScale(d.x); return r })
        // .attr(d.attr)
        
        innerSelection.exit().remove()
    }

    function drawRectangule (el, shape) {
        var jsonArray = []
            jsonArray.push(shape)
        var innerSelection = el.selectAll('rect')
            .data(jsonArray)

        innerSelection.enter()
            .append("rect")
            .attr('fill', "transparent")

        innerSelection
            .attr('stroke', shape.stroke)
            .attr('fill', shape.fill)
            .attr('x', function (d) { var x = d.x - d.w/2; return xScale(x) })
            .attr('y', function (d) { var y = d.y + d.h/2; return yScale(y) })
            .attr('width',  function (d) { var w = xScale(d.x + d.w/2) - xScale(d.x - d.w/2); return w })
            .attr('height', function (d) { var h = yScale(d.y - d.h/2) - yScale(d.y + d.h/2); return h })
            //.transition()
            //.duration(5000)
            .style("-moz-transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("-ms-transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("-o-transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("-webkit-transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("transform-origin", function (d) { return xScale(d.x)+'px ' + yScale(d.y)+'px' })
            .style("-webkit-transform", "rotate("+shape.rotation+"deg)")
            .style("-ms-transform", "rotate("+shape.rotation+"deg)")
            .style("transform", "rotate("+shape.rotation+"deg)")

           // .attr(d.attr)
        
        innerSelection.exit().remove()
    }

    function shape (selection) {
        selection.each(function (d) {
            var el = d3.select(this)
            d.shape.fill = d.shape.fill ? utils.flatColor(d.shape.fill) : 'transparent';
            d.shape.stroke = d.shape.stroke ? utils.flatColor(d.shape.stroke) : '#2c3e50';
            drawType[d.shapeType](el, d.shape)
        })
    }

    return shape
}
