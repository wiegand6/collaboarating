$(function () {
    var canvas = $('.whiteboard')[0];
    var context = canvas.getContext('2d');
    var current = {};
    var drawing = false;

    function drawLine(x0, y0, x1, y1) {
        context.beginPath();
        context.moveTo(x0, y0-25);
        context.lineTo(x1, y1-25);
        context.strokeStyle = $('#color-select')[0].value;
        context.lineWidth = $('#draw-width')[0].value;
        context.stroke();
        context.closePath();
    }

    function onMouseDown(e) {
        drawing = true;
        current.x = e.clientX;
        current.y = e.clientY;
    }

    function onMouseUp(e) {
        if (!drawing) { return; }
        if (($('#shape-select')[0].value == 'Free Hand') || ($('#shape-select')[0].value == 'Straight Line')){
            drawLine(current.x, current.y, e.clientX, e.clientY);
        }
        else if($('#shape-select')[0].value == 'Rectangle'){
            drawLine(current.x, current.y, current.x, e.clientY);
            drawLine(current.x, e.clientY, e.clientX, e.clientY);
            drawLine(e.clientX, e.clientY, e.clientX, current.y);
            drawLine(e.clientX, current.y, current.x, current.y);
        }
        else if($('#shape-select')[0].value == 'Triangle'){
            if((e.clientX>=current.x && e.clientY<current.y) || (e.clientX<current.x && e.clientY>=current.y)) {
                drawLine(current.x, current.y, e.clientX, current.y);
                drawLine(e.clientX, current.y, (current.x + e.clientX)/2, e.clientY);
                drawLine((current.x + e.clientX)/2, e.clientY, current.x, current.y);
            }
            else if((e.clientX>=current.x && e.clientY>=current.y) || (e.clientX<current.x && e.clientY<current.y)) {
                drawLine(current.x, current.y, current.x, e.clientY);
                drawLine(current.x, e.clientY, e.clientX, (current.y + e.clientY)/2);
                drawLine(e.clientX, (current.y + e.clientY)/2, current.x, current.y);
            }
        }
        else if($('#shape-select')[0].value == 'Ellipse'){
            context.beginPath();
            context.ellipse(((current.x + e.clientX)/2), ((current.y + e.clientY)/2-25), Math.abs((current.x - e.clientX)/2), Math.abs((current.y - e.clientY)/2), 0, 0, (2 * Math.PI));
            context.strokeStyle = $('#color-select')[0].value;
            context.lineWidth = $('#draw-width')[0].value;
            context.stroke();
            context.closePath()
        }
        drawing = false;
    }

    function onMouseMove(e) {
        if (!drawing) { return; }
        if ($('#shape-select')[0].value == 'Free Hand'){
            drawLine(current.x, current.y, e.clientX, e.clientY);
            current.x = e.clientX;
            current.y = e.clientY;
        }
    }

    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = (window.innerHeight-25);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseout', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);

    window.addEventListener('resize', onResize);
    onResize();

    /*
    $('#test-button')[0].onclick = function(){
        alert('test')
        alert($('#shape-select')[0].value)
    }
    */
});