let TemptureLayer = {
    temptureLayer:null,
    options:{
        viewer:null,
        tempture:[],
        bounds:[],
        callback:function(index){
		},
    },
    init:function(options={}){
        this.options = Object.assign(this.options,options)
        this.loadkriging(this.options)
    },
    loadkriging:function(options){
            let canvasMap = document.getElementById("cesiumContainer");
            let canvas = document.createElement("canvas")

            canvas.setAttribute("id", 'canvasMap')
            canvas.setAttribute("height", '1000')
            canvas.setAttribute("width", '1000')
            canvasMap.appendChild(canvas)

            let tempture=this.options.tempture;
            let bounds= this.options.bounds;
            let n = tempture.length;
            let t = [];
            let x = [];
            let y = [];
            for (let i = 1; i < n - 1; i++) {
                t.push(tempture[i].temperature); // 权重值
                x.push(tempture[i].lon); // x
                y.push(tempture[i].lat); // y
            }
            //使用gaussian(高斯)、exponential(指数)或spherical(球形)模型对数据集进行训练，返回的是一个variogram对象
            let variogram = kriging.train(t, x, y, "spherical", 0, 50);

            //使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值
            let grid = kriging.grid(bounds, variogram, 0.08);

            let colors = [
                "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b","#ffffbf", 
                "#fee08b", "#fdae61", "#f46d43","#d73027", "#a50026"
            ];
            //将得到的格网grid渲染至canvas上
            kriging.plot(canvas, grid, [73.4766, 135.088], [18.1055, 53.5693], colors);
            this.addImgae()
    },
    returnImgae:function() {
            let mycanvas = document.getElementById("canvasMap")
            console.log(mycanvas.toDataURL("image/png"))
            return mycanvas.toDataURL("image/png");
    },
    addImgae:function(){
        let _this=this
        _this.temptureLayer = _this.options.viewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
            url: _this.returnImgae(),
            rectangle: new Cesium.Rectangle(
                Cesium.Math.toRadians(73.4766),
                Cesium.Math.toRadians(18.1055),
                Cesium.Math.toRadians(135.088),
                Cesium.Math.toRadians(53.5693)
            )
        }));
        _this.temptureLayer.alpha = 0.8
    },
    remove:function(){
        let _this=this
        this.options.viewer.imageryLayers.remove(_this.temptureLayer);   
    }
   
}
export default TemptureLayer
