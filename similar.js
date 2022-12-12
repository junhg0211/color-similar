let colorPicker1, colorPicker2;

function setup() {
  createCanvas(400, 400);

  colorPicker1 = createColorPicker("#fdde59");
  colorPicker2 = createColorPicker("#2c2c2c");
}

function rgbToHsv(R, G, B) {
  //R, G and B input range = 0 ÷ 255
  //H, S and V output range = 0 ÷ 1.0

  var_R = ( R / 255 )
  var_G = ( G / 255 )
  var_B = ( B / 255 )

  var_Min = min( var_R, var_G, var_B )    //Min. value of RGB
  var_Max = max( var_R, var_G, var_B )    //Max. value of RGB
  del_Max = var_Max - var_Min             //Delta RGB value

  V = var_Max

  if ( del_Max == 0 )                     //This is a gray, no chroma...
  {
      H = 0
      S = 0
  }
  else                                    //Chromatic data...
  {
     S = del_Max / var_Max

     del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max
     del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max
     del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max

     if      ( var_R == var_Max ) H = del_B - del_G
     else if ( var_G == var_Max ) H = ( 1 / 3 ) + del_R - del_B
     else H = ( 2 / 3 ) + del_G - del_R

      if ( H < 0 ) H += 1
      if ( H > 1 ) H -= 1
  }

  return [Math.cos(2*Math.PI*H)*2*S, Math.sin(2*Math.PI*H)*2*S, 2*V];
}

function draw() {
  background(255, 255, 255);

  noStroke();

  let c1 = colorPicker1.color();
  fill(c1);
  rect(100, 100, 100, 100);

  let c2 = colorPicker2.color();
  fill(c2);
  rect(200, 100, 100, 100);

  fill(0);
  let c1c = rgbToHsv(c1.levels[0], c1.levels[1], c1.levels[2]);
  let c2c = rgbToHsv(c2.levels[0], c2.levels[1], c2.levels[2]);

  let dh = c1c[0] - c2c[0];
  let ds = c1c[1] - c2c[1];
  let dv = c1c[2] - c2c[2];

  let distance = Math.sqrt(Math.pow(dh, 2) + Math.pow(ds, 2) + Math.pow(dv, 2));

  text(distance, 100, 300);

  if (distance < 1) {
    text("Similar!", 200, 330);
  }

  text(`${c1c}\n${c2c}`, 100, 350);
}
