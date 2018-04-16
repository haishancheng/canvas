var canvas = {
    init: function() {
        this.eraser = document.getElementById('eraser')
        this.canvas = document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')
        this.paintOrEraser = false
        this.eraserEnable = false
        this.lastPoint = { x: undefined, y: undefined }
        this.setCanvasSize()
        this.bind()
    },
    bind: function() {
        var _this = this
        this.canvas.onmousedown = function(e) {
            _this.paintOrEraser = true
            console.log(_this.paintOrEraser)
            var x = e.clientX
            var y = e.clientY
            if (_this.eraserEnable) {
                _this.context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                _this.lastPoint = { x: x, y: y }
                _this.drawCircle(x, y, 2)
            }
        }
        this.canvas.onmousemove = function(e) {
            if (_this.paintOrEraser) {
                var x = e.clientX
                var y = e.clientY
                var newPoint = { x: x, y: y }
                if (_this.eraserEnable) {
                    _this.context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    _this.drawCircle(x, y, 2)
                    _this.drawLine(_this.lastPoint.x, _this.lastPoint.y, newPoint.x, newPoint.y)
                    _this.lastPoint = newPoint
                }
            }
        }
        this.canvas.onmouseup = function() {
            _this.paintOrEraser = false
        }
        this.canvas.onmouseleave = function() {
            _this.paintOrEraser = false
        }
        window.onresize = function() {
            _this.setCanvasSize()
        }
        this.eraser.onclick = function() {
            _this.eraserEnable = !_this.eraserEnable
        }
    },
    drawCircle: function(x, y, radius) {
        this.context.beginPath()
        this.context.arc(x, y, radius, 0, Math.PI * 2)
        this.context.fill()
    },
    drawLine: function(x1, y1, x2, y2) {
        this.context.beginPath()
        this.context.lineWidth = 4
        this.context.moveTo(x1, y1)
        this.context.lineTo(x2, y2)
        this.context.stroke()
        this.context.closePath()
    },
    setCanvasSize: function() {
        //设置了属性，而非css，相当于在标签上加了width=xxx height=yyy
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        this.canvas.width = pageWidth
        this.canvas.height = pageHeight
    }
}

canvas.init()