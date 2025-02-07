import * as Cesium from "cesium/Source/Cesium.js";
import "cesium/Build/Cesium/Widgets/widgets.css";

// export default {

//测量空间直线距离 
/******************************************* */
export function measureLineSpace(viewer) {
  // 取消双击事件-追踪该位置
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
  let positions = [];
  let poly = null;
  let distance = 0;
  // let tooltip = document.getElementById("toolTip");
  let cartesian = null;
  let floatingPoint;
  // tooltip.style.display = "block";

  handler.setInputAction(function (movement) {
    // tooltip.style.left = movement.endPosition.x + 3 + "px";
    // tooltip.style.top = movement.endPosition.y - 25 + "px";
    // tooltip.innerHTML = '<p>单击开始，右击结束</p>';
    // cartesian = viewer.scene.pickPosition(movement.endPosition);
    let ray = viewer.camera.getPickRay(movement.endPosition);
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
    if (positions.length >= 2) {
      if (!Cesium.defined(poly)) {
        poly = new PolyLinePrimitive(positions);
      } else {
        positions.pop();
        // cartesian.y += (1 + Math.random());
        positions.push(cartesian);
      }
      distance = getSpaceDistance(positions);
      // tooltip.innerHTML='<p>'+distance+'米</p>';
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction(function (movement) {
    // tooltip.style.display = "none";
    // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
    // cartesian = viewer.scene.pickPosition(movement.position);
    let ray = viewer.camera.getPickRay(movement.position);
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (positions.length == 0) {
      positions.push(cartesian.clone());
    }
    positions.push(cartesian);
    //在三维场景中添加Label
    //   let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    let textDisance = distance + "米";
    // console.log(textDisance + ",lng:" + cartographic.longitude/Math.PI*180.0);
    floatingPoint = viewer.entities.add({
      name: '空间直线距离',
      // position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height),
      position: positions[positions.length - 1],
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
      label: {
        text: textDisance,
        font: '18px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(20, -20),
      }
    });
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction(function (movement) {
    handler.destroy(); //关闭事件句柄
    positions.pop(); //最后一个点无效
    // viewer.entities.remove(floatingPoint);
    // tooltip.style.display = "none";

  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

  let PolyLinePrimitive = (function () {
    function _(positions) {
      this.options = {
        name: '直线',
        polyline: {
          show: true,
          positions: [],
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2,
            color: Cesium.Color.ORANGE,
            outlineWidth: 3,
          }),
          width: 10,
          clampToGround: true
        }
      };
      this.positions = positions;
      this._init();
    }

    _.prototype._init = function () {
      let _self = this;
      let _update = function () {
        return _self.positions;
      };
      //实时更新polyline.positions
      this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
      viewer.entities.add(this.options);
    };

    return _;
  })();

  //空间两点距离计算函数
  function getSpaceDistance(positions) {
    let distance = 0;
    for (let i = 0; i < positions.length - 1; i++) {

      let point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
      let point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
      /**根据经纬度计算出距离**/
      let geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(point1cartographic, point2cartographic);
      let s = geodesic.surfaceDistance;
      //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
      //返回两点之间的距离
      s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
      distance = distance + s;
    }
    return distance.toFixed(2);
  }
}

//****************************测量空间面积************************************************//
export function measureAreaSpace(viewer) {
  // 取消双击事件-追踪该位置
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  // 鼠标事件
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
  let positions = [];
  let tempPoints = [];
  let polygon = null;
  // let tooltip = document.getElementById("toolTip");
  let cartesian = null;
  let floatingPoint; //浮动点
  // tooltip.style.display = "block";

  handler.setInputAction(function (movement) {
    // tooltip.style.left = movement.endPosition.x + 3 + "px";
    // tooltip.style.top = movement.endPosition.y - 25 + "px";
    // tooltip.innerHTML ='<p>单击开始，右击结束</p>';
    // cartesian = viewer.scene.pickPosition(movement.endPosition); 
    let ray = viewer.camera.getPickRay(movement.endPosition);
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
    if (positions.length >= 2) {
      if (!Cesium.defined(polygon)) {
        polygon = new PolygonPrimitive(positions);
      } else {
        positions.pop();
        // cartesian.y += (1 + Math.random());
        positions.push(cartesian);
      }
      // tooltip.innerHTML='<p>'+distance+'米</p>';
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction(function (movement) {
    // tooltip.style.display = "none";
    // cartesian = viewer.scene.pickPosition(movement.position); 
    let ray = viewer.camera.getPickRay(movement.position);
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
    if (positions.length == 0) {
      positions.push(cartesian.clone());
    }
    //positions.pop();
    positions.push(cartesian);
    //在三维场景中添加点
    let cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1]);
    let longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    let latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
    let heightString = cartographic.height;
    tempPoints.push({
      lon: longitudeString,
      lat: latitudeString,
      hei: heightString
    });
    floatingPoint = viewer.entities.add({
      name: '多边形面积',
      position: positions[positions.length - 1],
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    });
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction(function (movement) {
    handler.destroy();
    positions.pop();

    let textArea = getArea(tempPoints) + "平方公里";
    viewer.entities.add({
      name: '多边形面积',
      position: positions[positions.length - 1],
      label: {
        text: textArea,
        font: '18px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(20, -40),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    });
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

  let radiansPerDegree = Math.PI / 180.0; //角度转化为弧度(rad) 
  let degreesPerRadian = 180.0 / Math.PI; //弧度转化为角度

  //计算多边形面积
  function getArea(points) {

    let res = 0;
    //拆分三角曲面

    for (let i = 0; i < points.length - 2; i++) {
      let j = (i + 1) % points.length;
      let k = (i + 2) % points.length;
      let totalAngle = Angle(points[i], points[j], points[k]);


      let dis_temp1 = distance(positions[i], positions[j]);
      let dis_temp2 = distance(positions[j], positions[k]);
      res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
      //   console.log(res);
    }


    return (res / 1000000.0).toFixed(4);
  }

  /*角度*/
  function Angle(p1, p2, p3) {
    let bearing21 = Bearing(p2, p1);
    let bearing23 = Bearing(p2, p3);
    let angle = bearing21 - bearing23;
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  }
  /*方向*/
  function Bearing(from, to) {
    let lat1 = from.lat * radiansPerDegree;
    let lon1 = from.lon * radiansPerDegree;
    let lat2 = to.lat * radiansPerDegree;
    let lon2 = to.lon * radiansPerDegree;
    let angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
    if (angle < 0) {
      angle += Math.PI * 2.0;
    }
    angle = angle * degreesPerRadian; //角度
    return angle;
  }

  let PolygonPrimitive = (function () {
    function _(positions) {
      this.options = {
        name: '多边形',
        polygon: {
          hierarchy: [],
          //   perPositionHeight: true,
          material: new Cesium.GridMaterialProperty({
            color: Cesium.Color.YELLOW,
            cellAlpha: 0.2,
            lineCount: new Cesium.Cartesian2(8, 8),
            lineThickness: new Cesium.Cartesian2(2.0, 2.0)
          }),
          //   heightReference: 20000
        }
      };

      this.hierarchy = {
        positions
      };
      this._init();
    }

    _.prototype._init = function () {
      let _self = this;
      let _update = function () {
        return _self.hierarchy;
      };
      //实时更新polygon.hierarchy
      this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false);
      viewer.entities.add(this.options);
    };

    return _;
  })();

  function distance(point1, point2) {
    let point1cartographic = Cesium.Cartographic.fromCartesian(point1);
    let point2cartographic = Cesium.Cartographic.fromCartesian(point2);
    /**根据经纬度计算出距离**/
    let geodesic = new Cesium.EllipsoidGeodesic();
    geodesic.setEndPoints(point1cartographic, point2cartographic);
    let s = geodesic.surfaceDistance;
    //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
    //返回两点之间的距离
    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
    return s;
  }
}
//****************************测量位置坐标************************************************//
export function measurePointSpace(viewer) {
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
  //获取坐标点
  handler.setInputAction(function (event) {
    viewer.scene.globe.depthTestAgainstTerrain = true;
    let earthPosition = viewer.scene.pickPosition(event.position);

    var cartesian3 = new Cesium.Cartesian3(earthPosition.x, earthPosition.y, earthPosition.z);
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
    var lat = Cesium.Math.toDegrees(cartographic.latitude);
    var lng = Cesium.Math.toDegrees(cartographic.longitude);
    var alt = cartographic.height;
    let textArea = `坐标：(${lng},${lat},${alt})`;
    viewer.entities.add({
      name: '坐标',
      position: earthPosition,
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      },
      label: {
        text: textArea,
        font: '18px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(20, -40),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    });
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction(function (movement) {
    handler.destroy();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
export function changeBase(type, viewer) {
  let TOKEN_TIANDITU = window.webGL.TOKEN_TIANDITU;
  viewer.imageryLayers.removeAll();
  // let x = Math.round(Math.random() * 7)
  switch (type) {
    // 天地图
    case "tdt":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url: "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
            TOKEN_TIANDITU,
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          layer: "tdtBasicLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false,
          maximumLevel: 18,
        })
      );
      break;
    // 天地图矢量
    case "tdtsl":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url: "https://t1.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
            TOKEN_TIANDITU,
          layer: "tdtVecBasicLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false,
        })
      );
      break;
    // 谷歌影像
    case "gg":
      let url =
        "https://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali";
      viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: url,
          maximumLevel: 18,
        })
      );
      break;
    // arcgis影像
    case "arcgis":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
          enablePickFeatures: false,
          maximumLevel: 18,
        })
      );
      break;
    // arcgis矢量
    case "arcgis1":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.ArcGisMapServerImageryProvider({
          url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
          enablePickFeatures: false,
        })
      );
      break;
    // 高德影像底图
    case "gd":
      viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          maximumLevel: 18,
        })
      );
      break;
    case "dark":
      viewer.imageryLayers.addImageryProvider(
        new createTileMapServiceImageryProvider({
          url: "https://cesiumjs.org/blackmarble",
          credit: "Black Marble imagery courtesy NASA Earth Observatory",
          flipXY: true, // Only old gdal2tile.py generated tilesets need this flag.
        })
      );
      break;
  }
  //全球影像中文注记服务
  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=" +
        TOKEN_TIANDITU,
      subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
      layer: "tdtAnnoLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: false,
    })
  );
}

export function flyTo(node, viewer) {
  viewer.camera.flyTo({
    // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
    // fromDegrees()方法，将经纬度和高程转换为世界坐标
    destination: Cesium.Cartesian3.fromDegrees(
      node.data.centerpoint.x,
      node.data.centerpoint.y,
      500
    ),
    orientation: {
      // 指向
      heading: Cesium.Math.toRadians(90, 0),
      // 视角
      pitch: Cesium.Math.toRadians(-45),
      roll: 0.0,
    },
  });
}
