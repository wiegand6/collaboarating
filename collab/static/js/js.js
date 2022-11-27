$(function () {
    /*getting the canvas that will be shared amongst users*/
    var canvas = $('#display')[0];
    var context = canvas.getContext('2d');
    /*a second canvas for previewing shapes before drawing them*/
    var pCanvas = $('#preview')[0];
    var pContext = pCanvas.getContext('2d');
    var current = {};
    var drawing = false;
    var reader = new FileReader();
    var imageInput = $('#image-input')[0]
    var img = new Image()

    function drawLine(c, x0, y0, x1, y1) {
        c.beginPath();
        c.moveTo(x0, y0-70);
        c.lineTo(x1, y1-70);
        c.strokeStyle = $('#color-select')[0].value;
        c.lineWidth = $('#draw-width')[0].value;
        c.stroke();
        c.closePath();
    }

    function onMouseDown(e) {
        drawing = true;
        current.x = e.clientX;
        current.y = e.clientY;
    }

    function onMouseUp(e) {
        if (!drawing) { return; }
        if (($('#shape-select')[0].value == 'Free Hand') || ($('#shape-select')[0].value == 'Straight Line')){
            drawLine(context, current.x, current.y, e.clientX, e.clientY);
        }
        else if($('#shape-select')[0].value == 'Rectangle'){
            drawLine(context, current.x, current.y, current.x, e.clientY);
            drawLine(context, current.x, e.clientY, e.clientX, e.clientY);
            drawLine(context, e.clientX, e.clientY, e.clientX, current.y);
            drawLine(context, e.clientX, current.y, current.x, current.y);
        }
        else if($('#shape-select')[0].value == 'Triangle'){
            if((e.clientX>=current.x && e.clientY<current.y) || (e.clientX<current.x && e.clientY>=current.y)) {
                drawLine(context, current.x, current.y, e.clientX, current.y);
                drawLine(context, e.clientX, current.y, (current.x + e.clientX)/2, e.clientY);
                drawLine(context, (current.x + e.clientX)/2, e.clientY, current.x, current.y);
            }
            else if((e.clientX>=current.x && e.clientY>=current.y) || (e.clientX<current.x && e.clientY<current.y)) {
                drawLine(context, current.x, current.y, current.x, e.clientY);
                drawLine(context, current.x, e.clientY, e.clientX, (current.y + e.clientY)/2);
                drawLine(context, e.clientX, (current.y + e.clientY)/2, current.x, current.y);
            }
        }
        else if($('#shape-select')[0].value == 'Ellipse'){
            context.beginPath();
            context.ellipse(((current.x + e.clientX)/2), ((current.y + e.clientY)/2-70), Math.abs((current.x - e.clientX)/2), Math.abs((current.y - e.clientY)/2), 0, 0, (2 * Math.PI));
            context.strokeStyle = $('#color-select')[0].value;
            context.lineWidth = $('#draw-width')[0].value;
            context.stroke();
            context.closePath();
        }
        else if($('#shape-select')[0].value == 'Insert Image'){
            context.drawImage(img, Math.min(current.x, e.clientX), Math.min(current.y, e.clientY)-70, Math.abs(e.clientX-current.x), Math.abs(e.clientY-current.y));
        }
        drawing = false;
        pContext.clearRect(0, 0, window.innerWidth, (window.innerHeight-70));
    }

    function onMouseMove(e) {
        if (!drawing) { return; }
        else if ($('#shape-select')[0].value == 'Free Hand'){
            drawLine(context, current.x, current.y, e.clientX, e.clientY);
            current.x = e.clientX;
            current.y = e.clientY;
        }
        else if ($('#shape-select')[0].value == 'Straight Line'){
            pContext.clearRect(0, 0, window.innerWidth, (window.innerHeight-70));
            drawLine(pContext, current.x, current.y, e.clientX, e.clientY);
        }
        else if($('#shape-select')[0].value == 'Rectangle'){
            pContext.clearRect(0, 0, window.innerWidth, (window.innerHeight-70));
            drawLine(pContext, current.x, current.y, current.x, e.clientY);
            drawLine(pContext, current.x, e.clientY, e.clientX, e.clientY);
            drawLine(pContext, e.clientX, e.clientY, e.clientX, current.y);
            drawLine(pContext, e.clientX, current.y, current.x, current.y);
            }
        else if($('#shape-select')[0].value == 'Triangle'){
            pContext.clearRect(0, 0, window.innerWidth, (window.innerHeight-70));
            if((e.clientX>=current.x && e.clientY<current.y) || (e.clientX<current.x && e.clientY>=current.y)) {
                drawLine(pContext, current.x, current.y, e.clientX, current.y);
                drawLine(pContext, e.clientX, current.y, (current.x + e.clientX)/2, e.clientY);
                drawLine(pContext, (current.x + e.clientX)/2, e.clientY, current.x, current.y);
            }
            else if((e.clientX>=current.x && e.clientY>=current.y) || (e.clientX<current.x && e.clientY<current.y)) {
                drawLine(pContext, current.x, current.y, current.x, e.clientY);
                drawLine(pContext, current.x, e.clientY, e.clientX, (current.y + e.clientY)/2);
                drawLine(pContext, e.clientX, (current.y + e.clientY)/2, current.x, current.y);
            }
        }
        else if($('#shape-select')[0].value == 'Ellipse'){
            pContext.clearRect(0, 0, window.innerWidth, (window.innerHeight-70));
            pContext.beginPath();
            pContext.ellipse(((current.x + e.clientX)/2), ((current.y + e.clientY)/2-70), Math.abs((current.x - e.clientX)/2), Math.abs((current.y - e.clientY)/2), 0, 0, (2 * Math.PI));
            pContext.strokeStyle = $('#color-select')[0].value;
            pContext.lineWidth = $('#draw-width')[0].value;
            pContext.stroke();
            pContext.closePath();
        }
        else if($('#shape-select')[0].value == 'Insert Image'){
            pContext.clearRect(0, 0, window.innerWidth, (window.innerHeight-70));
            pContext.drawImage(img, Math.min(current.x, e.clientX), Math.min(current.y, e.clientY)-70, Math.abs(e.clientX-current.x), Math.abs(e.clientY-current.y));
        }
    }

    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = (window.innerHeight-70);
        pCanvas.width = window.innerWidth;
        pCanvas.height = (window.innerHeight-70);
    };

    function readImage(e) {
        if(e.target.files) {
            let imageFile = e.target.files[0];
            reader.readAsDataURL(imageFile);
            reader.onloadend = function(e){
                img.src = e.target.result
            }
        }
    }

    pCanvas.addEventListener('mousedown', onMouseDown);
    pCanvas.addEventListener('mouseup', onMouseUp);
    pCanvas.addEventListener('mouseout', onMouseUp);
    pCanvas.addEventListener('mousemove', onMouseMove);

    window.addEventListener('resize', onResize);
    onResize();

    imageInput.addEventListener('change', readImage)

    /*
    $('#test-button')[0].onclick = function(){
        alert($('#display')[0])
    }
    */
});