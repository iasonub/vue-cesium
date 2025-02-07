

let step = 0;
let arrTileLayer=null;
let  idxTimer = null;
let alphaStep = 0.01
let Cloud = {
    arrTileLayer : null,
    option:{
        imageList:[],
        time:1,
        callback:function(index){
				
		},
    },
    init:function(options={}){
        this.option = Object.assign(this.option,options)
        this._start(this.option.imageList,this.option.time)
    },
    _start(urlArr, time) {
        let arr = [],layers = this.option.viewer.scene.imageryLayers;

        //获取图层
        for (let i = 0, len = urlArr.length; i < len; i++) {
          let tileLayer =
          layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
            url: urlArr[i][0],
            rectangle: Cesium.Rectangle.fromDegrees(71.9282, 3.9079, 134.8656, 57.9079)
          }));
            tileLayer.alpha = 0
            arr.push(tileLayer);
        }

        arrTileLayer = arr;
        step = 0;
        this._changeRadarAlpha(time);
    },
    _changeRadarAlpha(time) {
        const _that=this
        if (step > arrTileLayer.length - 1) {
          step = 0;
          arrTileLayer[arrTileLayer.length - 1].alpha = 0;
        }
        let layer1 = arrTileLayer[step];
        let layer2 = arrTileLayer[step + 1];
        if (!layer1 || !layer2) {
          return;
        }
        layer1.alpha = 1;
        layer2.alpha = 0;

        clearInterval(idxTimer);
        idxTimer = window.setInterval(function () {
          layer1.alpha -= alphaStep;
          layer2.alpha += alphaStep;

          if (layer1.alpha < alphaStep) {
            layer1.alpha = 0;
            step++;
            _that._changeRadarAlpha(time);
          }
        }, time * 1000 * alphaStep);
      },
      removeLayer(){
        console.log(this.option.viewer.scene.imageryLayers)
        // let layer=this.option.viewer.scene.imageryLayers
        // layer.layerRemoved()
        clearInterval(idxTimer)
      }
}


export default Cloud