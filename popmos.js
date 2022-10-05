let myself;
let scalefactor = 12 ;
let smaller=[];
let allImages=[];
var imgAmount = 55;
let w;
let h;
var brightImages = [256];
let brightnessValues = [];
let resto = [];
let destino = "./imagDestino/1.jpg";
function preload() {
 
 myself = loadImage(destino); 
   for (i = 0; i < imgAmount; i++) {
    now = "/database/"+i + '.jpg';
    allImages[i] = loadImage(now);    
  }

}

function setup() {
  createCanvas(myself.width, myself.height);
  w = myself.width/scalefactor;
  h = myself.height/scalefactor;
  for (var i = 0; i < allImages.length; i++) {
    var img = allImages[i];
    allImages[i] = createImage(w, h,RGB);
    allImages[i].copy(img, 0, 0, img.width, img.height, 0, 0, w, h);
    allImages[i].loadPixels();
    let avg = 0;
    let heights = [];
    let widths = [];
    allImages.forEach(ob=>{
      heights.push(ob.height);
      widths.push(ob.width);
    })
  
    for (var j = 0; j < allImages[i].height; j++) {    
      for (var k = 0; k < allImages[i].width; k++) {
        let colorpi = colorAt(allImages[i].pixels,allImages[i].width, j, k)      
        let b = (brightness(colorpi)) 
        avg += b;
      }
    }
    avg /= allImages[i].width * allImages[i].height;
    brightnessValues[i] = avg;
  }

  for ( i = 0; i < 256; i++) {    
    let record = 256;
    for ( j = 0; j < brightnessValues.length; j++) {
      let diff = abs(i - brightnessValues[j]);  
        if (diff < record) {        
          record = diff;
          brightImages[i] = allImages[j];
          resto.push(i);
        }
    }
  }

  smaller = createImage(w, h,RGB);
  smaller.copy(myself, 0, 0, myself.width, myself.height, 0, 0,w , h);


}

function draw() {
  //background(0);

  //image(myself,0,0)
  smaller.loadPixels();
  let pixim = [];

  for (let x =0; x < w; x ++) {
    for (let y = 0; y < h; y ++) {

      var imageIndex = floor(brightness(colorAt(smaller.pixels,w , x, y)));
            
      if (isNaN(imageIndex)) {
        resto = shuffle(resto);
        image(brightImages[resto[0]],x*scalefactor,y*scalefactor,scalefactor,scalefactor);        
      }else{
        pixim.push(imageIndex);
        image(brightImages[imageIndex],x*scalefactor,y*scalefactor,scalefactor,scalefactor);
      }
    }
  }
  noLoop();

}

function colorAt(pixArray, camWidth, x, y) {
 let idx;
 if(pixArray.length<5000){
  idx = 1*int(y * camWidth + x);
 }else{
  idx = 4*int(y * camWidth + x);
 }
  return [pixArray[idx],
    pixArray[idx + 1],
    pixArray[idx + 2],
    pixArray[idx + 3]
  ];
}

function maxpi (arr1){
var mf = 1;
var m = 0;
var item;
for (var i=0; i<arr1.length; i++)
{
        for (var j=i; j<arr1.length; j++)
        {
                if (arr1[i] == arr1[j])
                  m++;
                if (mf<m)
                {
                  mf=m; 
                  item = arr1[i];
                }
        }
        m=0;
}
return item;
}

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

function mouseClicked() {

  if (destino === "./imagDestino/2.jpg") {
    destino = "./imagDestino/1.jpg";
    setup();
    redraw();
  } else {
    destino = "./imagDestino/2.jpg";
  }
}