var canvas = {
    init: function() {
        this.canvas = document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')
        this.pen = document.getElementById('pen')
        this.eraser = document.getElementById('eraser')
        this.black = document.getElementById('black')
        this.red = document.getElementById('red')
        this.yellow = document.getElementById('yellow')
        this.blue = document.getElementById('blue')
        this.thin = document.getElementById('thin')
        this.thick = document.getElementById('thick')
        this.thicker = document.getElementById('thicker')
        this.clear = document.getElementById('clear')
        this.save = document.getElementById('save')
        this.paintOrEraser = false
        this.eraserEnable = false
        this.lastPoint = { x: undefined, y: undefined }
        this.lineWidth = 2
        this.setCanvasSize()
        this.bind()
    },
    bind: function() {
        var _this = this
            //特性检测
        if (document.body.ontouchstart !== undefined) {
            //触屏设备
            this.canvas.ontouchstart = function(e) {
                _this.paintOrEraser = true
                var x = e.touches[0].clientX //因为触屏支持多点触控，所以可能收集多个
                var y = e.touches[0].clientY
                if (_this.eraserEnable) {
                    _this.context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    _this.lastPoint = { x: x, y: y }
                    _this.drawCircle(x, y, _this.lineWidth / 2)
                }
            }
            this.canvas.ontouchmove = function(e) {
                if (_this.paintOrEraser) {
                    var x = e.touches[0].clientX
                    var y = e.touches[0].clientY
                    var newPoint = { x: x, y: y }
                    if (_this.eraserEnable) {
                        _this.context.clearRect(x - 5, y - 5, 10, 10)
                    } else {
                        _this.drawCircle(x, y, _this.lineWidth / 2)
                        _this.drawLine(_this.lastPoint.x, _this.lastPoint.y, newPoint.x, newPoint.y)
                        _this.lastPoint = newPoint
                    }
                }
            }
            this.canvas.ontouchend = function() {
                _this.paintOrEraser = false
            }
        } else {
            //非触屏设备
            this.canvas.onmousedown = function(e) {
                _this.paintOrEraser = true
                var x = e.clientX
                var y = e.clientY
                if (_this.eraserEnable) {
                    _this.context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    _this.lastPoint = { x: x, y: y }
                    _this.drawCircle(x, y, _this.lineWidth / 2)
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
                        _this.drawCircle(x, y, _this.lineWidth / 2)
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
        }
        this.pen.onclick = function() {
            _this.eraserEnable = false
            _this.pen.classList.add('active')
            _this.eraser.classList.remove('active')
        }
        this.eraser.onclick = function() {
            _this.eraserEnable = true
            _this.eraser.classList.add('active')
            _this.pen.classList.remove('active')
        }
        this.black.onclick = function() {
            _this.black.classList.add('active')
            _this.red.classList.remove('active')
            _this.yellow.classList.remove('active')
            _this.blue.classList.remove('active')
            _this.context.strokeStyle = 'black'
            _this.context.fillStyle = 'black'
        }
        this.red.onclick = function() {
            _this.black.classList.remove('active')
            _this.red.classList.add('active')
            _this.yellow.classList.remove('active')
            _this.blue.classList.remove('active')
            _this.context.strokeStyle = 'red'
            _this.context.fillStyle = 'red'
        }
        this.yellow.onclick = function() {
            _this.black.classList.remove('active')
            _this.red.classList.remove('active')
            _this.yellow.classList.add('active')
            _this.blue.classList.remove('active')
            _this.context.strokeStyle = 'yellow'
            _this.context.fillStyle = 'yellow'
        }
        this.blue.onclick = function() {
            _this.black.classList.remove('active')
            _this.red.classList.remove('active')
            _this.yellow.classList.remove('active')
            _this.blue.classList.add('active')
            _this.context.strokeStyle = 'blue'
            _this.context.fillStyle = 'blue'
        }
        this.thin.onclick = function() {
            _this.thin.classList.add('active')
            _this.thick.classList.remove('active')
            _this.thicker.classList.remove('active')
            _this.lineWidth = 2;
        }
        this.thick.onclick = function() {
            _this.thin.classList.remove('active')
            _this.thick.classList.add('active')
            _this.thicker.classList.remove('active')
            _this.lineWidth = 5;
        }
        this.thicker.onclick = function() {
            _this.thin.classList.remove('active')
            _this.thick.classList.remove('active')
            _this.thicker.classList.add('active')
            _this.lineWidth = 10;
        }
        this.clear.onclick = function() {
            _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height)
        }
        this.save.onclick = function() {
            var url = _this.canvas.toDataURL('img/png')
            var a = document.createElement('a')
            document.body.appendChild(a)
            a.href = url
            a.download = "我的绘画"
            a.target = "_blank"
            a.click()
        }
    },
    drawCircle: function(x, y, radius) {
        this.context.beginPath()
        this.context.arc(x, y, radius, 0, Math.PI * 2)
        this.context.fill()
    },
    drawLine: function(x1, y1, x2, y2) {
        this.context.beginPath()
        this.context.lineWidth = this.lineWidth
        this.context.moveTo(x1, y1)
        this.context.lineTo(x2, y2)
        this.context.stroke()
        this.context.closePath()
    },
    // 电脑用函数
    setCanvasSize: function() {
        //设置了属性，而非css，相当于在标签上加了width=xxx height=yyy
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        this.canvas.width = pageWidth
        this.canvas.height = pageHeight
        this.context.fillStyle = 'white'
        this.context.fillRect(0, 0, pageWidth, pageHeight)
        this.context.fillStyle = 'black'
    }
}

canvas.init()