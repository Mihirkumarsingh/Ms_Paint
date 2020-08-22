  /* Drawing Section */
  
  const mspaint = {
    Select_painting: "",
    Selector: "",
    Context_of_paint: null,
    Icon: null,
    canvas: null,
    start: function(selector1, selector2) {
      this.Select_painting = selector1;
      this.Selector = selector2;
      let canvas = document.querySelector(this.Selector);
      this.canvas = canvas;
      this.Context_of_paint = canvas.getContext("2d");
      let universalColor = "";
      let plots = [];
      let painting = document.querySelector(this.Select_painting);
      let painting_style = getComputedStyle(painting);
      canvas.width = parseInt(painting_style.getPropertyValue("width"));
      canvas.height = parseInt(painting_style.getPropertyValue("height"));
  
      this.Icon = document.getElementById("current");
  
      let mouse = {
        x: 0,
        y: 0,
        getX: function() {
          return this.x - 65;
        },
        getY: function() {
          return this.y - 55;
        }
      };
  
      /* Drawing on Paint App */
      this.setLineWidth(3);
      this.setLineCap("round");
      this.setLineJoin("round");
      this.setColor("black");
  
      /* Mouse Capturing Work */
      let machine = this;
      canvas.addEventListener(
        "mousemove",
        function(e) {
          mouse.x = e.pageX - this.offsetLeft;
          mouse.y = e.pageY - this.offsetTop;
        },
        false
      );
  
      canvas.addEventListener(
        "mousedown",
        function(e) {
          machine.Context_of_paint.beginPath();
          machine.Context_of_paint.moveTo(mouse.getX(), mouse.getY());
          onPaint();
  
          canvas.addEventListener("mousemove", onPaint, false);
        },
        false
      );
  
      canvas.addEventListener(
        "mouseout",
        function() {
          canvas.removeEventListener("mousemove", onPaint, false);
        },
        false
      );
  
      canvas.addEventListener(
        "mouseup",
        function() {
          canvas.removeEventListener("mousemove", onPaint, false);
          plots = [];
        },
        false
      );
  
      let onPaint = function() {
        machine.Context_of_paint.lineTo(mouse.getX(), mouse.getY());
        machine.Context_of_paint.stroke();
        plots.push({ x: mouse.getX(), y: mouse.getY() });
      };
  
    
  
      /* Color changing */
      let colorButtons = document.getElementsByClassName("color");
      for (let index = 0; index < colorButtons.length; index++) {
        colorButtons[index].addEventListener("click", function() {
          machine.setColor(this.getAttribute("data-color"));
        });
      }
    },
    setLineWidth: function(lineWidth) {
      this.Context_of_paint.lineWidth = lineWidth;
    },
    setLineCap: function(lineCap) {
      this.Context_of_paint.lineCap = lineCap;
    },
    setLineJoin: function(lineJoin) {
      this.Context_of_paint.lineJoin = lineJoin;
    },
    setColor: function(color) {
      this.Icon.style.background = "#" + color;
      this.Context_of_paint.strokeStyle = "#" + color;
    }
  };
  
  

  
//   Download the file  
  window.download = function() {
    let dt = mspaint.canvas.toDataURL();
    dt = dt.replace(
      /^data:image\/[^;]/,
      "data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=art.png"
    );
    window.location.href = dt;
  };
  
  window.onload = function() {
    mspaint.start("#painting", "#paint");
  };
 
