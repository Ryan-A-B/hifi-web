var MAX_TEXT_HEIGHT = 30;

window.onload = function () {
    displayNewPlaceNames();
    setInterval(displayNewPlaceNames, 10000);
}

// Uses ajax to retrieve new Place Names
function displayNewPlaceNames () {
    //var url = 'https://metaverse.highfidelity.io/api/v1/new_place_names';
    var url = 'new_place_names.php';

    $.getJSON(url, function (data) {
            var names = String(data['data']['new_place_names']).split(',');
            names.shuffle();
            renderCloud(names);
    });
}

// Compares two arrays
// Returns true if equal
// false otherwise
Array.prototype.equals = function (array) {
    if (!array) {
        return false;
    }

    if (this.length != array.length) {
        return false;
    }

    for (var i = 0; i < this.length; i++) {
        if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
}

// Randomly resorts array
Array.prototype.shuffle = function () {
    var j, tmp;
    for (var i = 0; i < this.length; i++) {
        // Random Integer between 0 and array length - 1
        j = Math.round(Math.random() * (this.length - 1));

        // If i and j are equal no point swaping
        if (i != j) {
            tmp = this[j];
            this[j] = this[i];
            this[i] = tmp;
        }
    }
}

// PlaceName "class" constructor
function PlaceName (canvas, context, name, center, textHeight, margin, padding) {
    // Initialise class variables
    this.canvas = canvas;
    this.context = context;
    this.name = name;
    this.center = center;
    this.textHeight = textHeight;

    // To check textWidth the context height needs to be set
    // This seems to take a bit of processing time
    // Thus don't do it if it's not necessary
    if (this.context.font.split(' ')[0] != textHeight + 'px') {
        this.context.font = textHeight + 'px Helvetica';
    }

    this.textWidth = this.context.measureText(this.name).width;

    this.margin = [this.canvas.width * margin, this.canvas.height * margin];
    this.padding = [this.canvas.width * padding, this.canvas.height * padding];
}

// Returns the angle in radians from the center of PlaceName to center of canvas
PlaceName.prototype.getAngleToCenter = function () {
    var x = this.center[0] - this.canvas.width / 2;
    var y = this.center[1] - this.canvas.height / 2;

    return Math.atan2(y, x);
}

// Returns coordinates of top left corner and bottom right corner (Canvas origin is top left)
// as array [topLeftX, topLeftY, BottomRightX, BottomRightY]
PlaceName.prototype.getBoundingBox = function () {
    var box = [
        Math.floor(this.center[0] - (this.textWidth / 2 + this.padding[0] + this.margin[0])),
        Math.floor(this.center[1] - (this.textHeight / 2 + this.padding[1] + this.margin[1])),
        Math.ceil(this.center[0] + (this.textWidth / 2 + this.padding[0] + this.margin[0])),
        Math.ceil(this.center[1] + (this.textHeight / 2 + this.padding[1] + this.margin[1]))
    ];

    return box;
}

// Checks this PlaceName against array of PlaceNames
// Returns true if collision is detected
// false otherwise
PlaceName.prototype.hasCollision = function (placeName) {
    // Find distance in the y between center of this and center of supplied placename
    var yDist = Math.abs(this.center[1] - placeName.center[1]);
    // Subtract the minimum distance in the y to disallow collision
    yDist -= (this.textHeight + placeName.textHeight) / 2 + (this.padding[1] + this.margin[1]) * 2;

    // If positive or zero then no collision
    // If negative need to check x
    if (yDist >= 0) {
        return false;
    }

    // Repeat for x
    var xDist = Math.abs(this.center[0] - placeName.center[0]);
    xDist -= (this.textWidth + placeName.textWidth) / 2 + (this.padding[0] + this.margin[0]) * 2;

    // If negative collision detected
    if (xDist < 0) {
        return true;
    }
    // Otherwise no collision
    return false;
}

// Attempts to move PlaceName dist in axis direction (0=x, 1=y)
// Fails if the move would cause collision
PlaceName.prototype.slide = function (placeNames, axis, dist) {
    // No point wasting processor time if dist is zero
    if (dist == 0) {
        return false;
    }

    // Add dist to center's coordinate
    this.center[axis] += dist;
    for (var i = 0; i < placeNames.length; i++) {
        // Don't check for collision with self
        if (this == placeNames[i]) {
            continue;
        }

        // If collision results, revert change and return false
        if (this.hasCollision(placeNames[i])) {
            this.center[axis] -= dist;
            return false;
        }
    }
    // No collision
    return true;
}

// Moves PlaceName towards center
PlaceName.prototype.gravitate = function (placeNames) {
    var dist = 32;
    var theta, dx, dy;
    var prevCenters = new Array();
    var stillMoving, bouncing = false;

    // Had an issue in which the PlaceName was 
    // bouncing between two or three positions
    do {
        // Record of previous positions
        prevCenters.push(this.center.slice());

        // Get angle to center
        theta = this.getAngleToCenter();
        // Break into components
        dx = Math.round(-dist*Math.cos(theta));
        dy = Math.round(-dist*Math.sin(theta));

        // Move PlaceName
        this.slide(placeNames, 1, dy);
        this.slide(placeNames, 0, dx);

        // Check if PlaceName actually moved
        stillMoving = !this.center.equals(prevCenters[prevCenters.length - 1]);
        // Check if revisiting old positions (bouncing)
        for (var i = prevCenters.length - 2; i >= 0; i--) {
            if (this.center.equals(prevCenters[i])) {
                bouncing = true;
                break;
            }
        }

        // If no movement occured and dist is greater than one
        if (!stillMoving && dist > 1) {
            // Attempt a smaller movement next time
            dist /= 2;
            // Prevent do-while loop ending
            stillMoving = true;
            bouncing = false;
        }
    } while (stillMoving && !bouncing);
}

// Removes PlaceName from canvas
PlaceName.prototype.erase = function () {
    var box = this.getBoundingBox();

    if (box) {
        this.context.clearRect(box[0], box[1], box[2]-box[0], box[3]-box[1]);
    }
}

// Draws PlaceName on canvas
PlaceName.prototype.render = function () {
    // Radius of corners
    var radius = 5;

    var box = this.getBoundingBox();
    if (!box) {
        return;
    }
    // Remove margin from bounding box, only want padding
    box[0] += this.margin[0];
    box[1] += this.margin[1];
    box[2] -= this.margin[0];
    box[3] -= this.margin[1];

    // Check if PlaceName is outside of canvas
    // Don't want to display if PlaceName is cut off
    if (box[0] < 0 || box[1] < 0 || box[2] > this.canvas.width || box[3] > this.canvas.height) {
        return;
    }

    // Find transparency based on text height
    var alpha = this.textHeight / MAX_TEXT_HEIGHT;

    // Set colour and transparency
    this.context.fillStyle = "rgba(96, 148, 197, " + alpha + ")";
    this.context.strokeStyle = "rgba(96, 148, 197, " + alpha + ")";

    // Draw the text
    this.context.fillText(this.name, this.center[0], this.center[1]);

    // Draw the box
    this.context.beginPath();
    this.context.moveTo(box[0] + radius, box[1]);
    this.context.lineTo(box[2] - radius, box[1]);
    this.context.arcTo(box[2], box[1], box[2], box[1] + radius, radius);
    this.context.lineTo(box[2], box[3] - radius);
    this.context.arcTo(box[2], box[3], box[2] - radius, box[3], radius);
    this.context.lineTo(box[0] + radius, box[3]);
    this.context.arcTo(box[0], box[3], box[0], box[3] - radius, radius);
    this.context.lineTo(box[0], box[1] + radius);
    this.context.arcTo(box[0], box[1], box[0] + radius, box[1], radius);
    this.context.stroke();
}

// Generate a random angle
// Keeping away from 0, 90, 180 and 270 as these can cause the cloud
// to be too tall or too wide
function getRandomAngle () {
    var angle;

    do {
        // 0 <= angle < 360
        angle = Math.random() * Math.PI * 2;
    } while (
        // angle < 10
        angle < Math.PI/18 ||
        // 60 < angle < 120
        angle > Math.PI/3 && angle < 2*Math.PI/3 ||
        // 170 < angle < 190
        angle > 17*Math.PI/18 && angle < 19*Math.PI/18 ||
        // 240 < angle < 300
        angle > 4*Math.PI/3 && angle < 5*Math.PI/3 ||
        // angle > 370
        angle > 35*Math.PI/18
    );

    return angle;
}

// Creates and draws Place Name Cloud
function renderCloud (names) {
    // Get Canvas and generate 2d context
    var canvas = document.getElementById('placeNameCloud');
    var context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set center of PlaceName to be center of text
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Set margin and padding percentages (percentage of canvas width or height)
    var margin = 0.005;
    var padding = 0.01;

    // Want to place first PlaceName in center
    // Can't use 'i' incase first Place Name has profanity
    var firstPlaceName = true;
    var placeNames = new Array();
    for (var i = 0; i < names.length; i++) {
        // Check for profanity, if found skip
        if (hasProfanity(names[i])) {
            continue;
        }
        if (firstPlaceName) {
            // First PlaceName goes at center of canvas with largest size
            placeNames.push(new PlaceName(
                canvas, context, names[i], 
                [Math.round(canvas.width/2), Math.round(canvas.height/2)], 
                MAX_TEXT_HEIGHT, margin, padding
            ));
            firstPlaceName = false;
        } else {
            // Set text height in stages based on random number
            var tmp = Math.random();
            var textHeight;
            if (tmp > 0.7) {
                textHeight = Math.round(MAX_TEXT_HEIGHT * 0.85);
            } else if (tmp > 0.3) {
                textHeight = Math.round(MAX_TEXT_HEIGHT * 0.6);
            } else {
                textHeight = Math.round(MAX_TEXT_HEIGHT * 0.4);
            }

            // Position PlaceName 800px from center at random angle
            placeNames.push(new PlaceName(
                canvas, context, names[i], 
                [
                    Math.round(canvas.width/2 + 800*Math.cos(getRandomAngle())), 
                    Math.round(canvas.height/2 + 800*Math.sin(getRandomAngle()))
                ], 
                textHeight, margin, padding
            ));

            // Move PlaceName towards center
            placeNames[placeNames.length - 1].gravitate(placeNames);
        }
        // Draw PlaceName
        placeNames[placeNames.length - 1].render();
    }
}
