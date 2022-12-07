$(function () {
    /* getting the canvas that will be shared amongst users */
    var canvas = $('#display')[0];
    var context = canvas.getContext('2d');
    var canvasBox = canvas.getBoundingClientRect();
    /* a second canvas for previewing shapes before drawing them */
    var pCanvas = $('#preview')[0];
    var pContext = pCanvas.getContext('2d');
    var current = {};
    var drawing = false;
    /* stuff to handle inserting images to the canvas */
    var reader = new FileReader();
    var imageInput = $('#image-input')[0]
    var img = new Image()
    /* elements for changing the brush */
    var drawWidth = $('#draw-width')[0]
    var drawColor = $('#color-select')[0]
    var drawShape = $('#shape-select')[0]
    /* elements for changing canvas size */
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight-70;

    function drawLine(c, x0, y0, x1, y1) {
        c.beginPath();
        c.moveTo(x0 - canvasBox.left, y0 - canvasBox.top);
        c.lineTo(x1 - canvasBox.left, y1 - canvasBox.top);
        c.strokeStyle = drawColor.value;
        c.lineWidth = drawWidth.value;
        c.stroke();
        c.closePath();
    }

    function onMouseDown(e) {
        drawing = true;
        current.x = e.pageX;
        current.y = e.pageY;
    }

    function onMouseUp(e) {
        if (!drawing) { return; }
        if ((drawShape.value == 'Free Hand') || (drawShape.value == 'Straight Line')){
            drawLine(context, current.x, current.y, e.pageX, e.pageY);
        }
        else if(drawShape.value == 'Rectangle'){
            drawLine(context, current.x, current.y, current.x, e.pageY);
            drawLine(context, current.x, e.pageY, e.pageX, e.pageY);
            drawLine(context, e.pageX, e.pageY, e.pageX, current.y);
            drawLine(context, e.pageX, current.y, current.x, current.y);
        }
        else if(drawShape.value == 'Triangle'){
            if((e.pageX>=current.x && e.pageY<current.y) || (e.pageX<current.x && e.pageY>=current.y)) {
                drawLine(context, current.x, current.y, e.pageX, current.y);
                drawLine(context, e.pageX, current.y, (current.x + e.pageX)/2, e.pageY);
                drawLine(context, (current.x + e.pageX)/2, e.pageY, current.x, current.y);
            }
            else if((e.pageX>=current.x && e.pageY>=current.y) || (e.pageX<current.x && e.pageY<current.y)) {
                drawLine(context, current.x, current.y, current.x, e.pageY);
                drawLine(context, current.x, e.pageY, e.pageX, (current.y + e.pageY)/2);
                drawLine(context, e.pageX, (current.y + e.pageY)/2, current.x, current.y);
            }
        }
        else if(drawShape.value == 'Ellipse'){
            context.beginPath();
            context.ellipse(((current.x + e.pageX)/2), ((current.y + e.pageY)/2-canvasBox.top), Math.abs((current.x - e.pageX)/2), Math.abs((current.y - e.pageY)/2), 0, 0, (2 * Math.PI));
            context.strokeStyle = drawColor.value;
            context.lineWidth = drawWidth.value;
            context.stroke();
            context.closePath();
        }
        else if(drawShape.value == 'Insert Image'){
            context.drawImage(img, Math.min(current.x, e.pageX), Math.min(current.y, e.pageY)-canvasBox.top, Math.abs(e.pageX-current.x), Math.abs(e.pageY-current.y));
        }
        drawing = false;
        pContext.clearRect(0, 0, canvasWidth, (canvasHeight-canvasBox.top));
    }

    function onMouseMove(e) {
        if (!drawing) { return; }
        else if (drawShape.value == 'Free Hand'){
            drawLine(context, current.x, current.y, e.pageX, e.pageY);
            current.x = e.pageX;
            current.y = e.pageY;
        }
        else if (drawShape.value == 'Straight Line'){
            pContext.clearRect(0, 0, canvasWidth, (canvasHeight-canvasBox.top));
            drawLine(pContext, current.x, current.y, e.pageX, e.pageY);
        }
        else if(drawShape.value == 'Rectangle'){
            pContext.clearRect(0, 0, canvasWidth, (canvasHeight-canvasBox.top));
            drawLine(pContext, current.x, current.y, current.x, e.pageY);
            drawLine(pContext, current.x, e.pageY, e.pageX, e.pageY);
            drawLine(pContext, e.pageX, e.pageY, e.pageX, current.y);
            drawLine(pContext, e.pageX, current.y, current.x, current.y);
            }
        else if(drawShape.value == 'Triangle'){
            pContext.clearRect(0, 0, canvasWidth, (canvasHeight-canvasBox.top));
            if((e.pageX>=current.x && e.pageY<current.y) || (e.pageX<current.x && e.pageY>=current.y)) {
                drawLine(pContext, current.x, current.y, e.pageX, current.y);
                drawLine(pContext, e.pageX, current.y, (current.x + e.pageX)/2, e.pageY);
                drawLine(pContext, (current.x + e.pageX)/2, e.pageY, current.x, current.y);
            }
            else if((e.pageX>=current.x && e.pageY>=current.y) || (e.pageX<current.x && e.pageY<current.y)) {
                drawLine(pContext, current.x, current.y, current.x, e.pageY);
                drawLine(pContext, current.x, e.pageY, e.pageX, (current.y + e.pageY)/2);
                drawLine(pContext, e.pageX, (current.y + e.pageY)/2, current.x, current.y);
            }
        }
        else if(drawShape.value == 'Ellipse'){
            pContext.clearRect(0, 0, canvasWidth, (canvasHeight-canvasBox.top));
            pContext.beginPath();
            pContext.ellipse(((current.x + e.pageX)/2), ((current.y + e.pageY)/2-canvasBox.top), Math.abs((current.x - e.pageX)/2), Math.abs((current.y - e.pageY)/2), 0, 0, (2 * Math.PI));
            pContext.strokeStyle = drawColor.value;
            pContext.lineWidth = drawWidth.value;
            pContext.stroke();
            pContext.closePath();
        }
        else if(drawShape.value == 'Insert Image'){
            pContext.clearRect(0, 0, canvasWidth, (canvasHeight-canvasBox.top));
            pContext.drawImage(img, Math.min(current.x, e.pageX), Math.min(current.y, e.pageY)-canvasBox.top, Math.abs(e.pageX-current.x), Math.abs(e.pageY-current.y));
        }
    }

    function readImage(e) {
        if(e.target.files) {
            let imageFile = e.target.files[0];
            reader.readAsDataURL(imageFile);
            reader.onloadend = function(e){
                img.src = e.target.result
            }
        }
    }

    function resizeCanvas() {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        pCanvas.width = canvasWidth;
        pCanvas.height = canvasHeight;
    };

    pCanvas.addEventListener('mousedown', onMouseDown);
    pCanvas.addEventListener('mouseup', onMouseUp);
    pCanvas.addEventListener('mouseout', onMouseUp);
    pCanvas.addEventListener('mousemove', onMouseMove);

    imageInput.addEventListener('change', readImage);

    $('#resize-button')[0].onclick = function() {
        if(confirm('CAUTION: This will resize your board, clearing it.')){
            canvasWidth = $('#width-control')[0].value
            canvasHeight = $('#height-control')[0].value
            resizeCanvas()
        }
    }

    $('#width-control')[0].value = canvasWidth;
    $('#height-control')[0].value = canvasHeight;
    resizeCanvas();
});