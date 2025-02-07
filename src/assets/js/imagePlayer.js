let ImagePlayer = {
        index: 0, // 当前播放索引
		timer: null, // 定时器
        imgTotalNum:2,
        speed:200,
        timeValue:[],
        option:{
			orderBy:'asc', // 播放顺序：asc=正序播放，desc=倒序播放
			speed:200, // 播放速度，单位毫秒
			index:0, // 当前显示索引序号
            imgTotalNum: 2, // 图片总数
            timeValue:[],
            callback:function(index){
				
			},
		},
        init: function(options) {
			this.option = $.extend(this.option, options);
			this.imgTotalNum = this.option.imgTotalNum;
            this.timeValue=this.option.timeValue;
            this.speed=this.option.speed
            this.index=this.option.index
			this.bindEvent();
			this.show(this.option.index);
		},
        bindEvent: function(){
			let self = this;
			
			$('#first').click(function(){
				self.stop();
				self.index = self.imgTotalNum - 1;
				self.show(self.index);
			});
			
			$('#last').click(function(){
				self.stop();
				self.index = 0;
				self.show(self.index);
			});
			
			$('#next, #right-arrow').click(function(){
				self.stop();
				self.prev();
			});
			$('#prev, #left-arrow').click(function(){
				self.stop();
				self.next();
			});
			$('#play').click(function(){
				if(self.timer == null) {
					self.player();
				} else {
					self.stop();
				}
			});

            if(this.imgTotalNum > 1) {
				this.initSlider();
				
				$('#left-arrow').hover(function(){
					$(this).addClass('leftarrow');
				},function(){
					$(this).removeClass('leftarrow');
				});
				$('#right-arrow').hover(function(){
					$(this).addClass('rightarrow');
				},function(){
					$(this).removeClass('rightarrow');
				});
			}
		},
        timeStamp:function (time) {
          let date = new Date(time * 1000);
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) ;
          let D = date.getDate() + ' ';
          let h = date.getHours() + ':';
          let m = date.getMinutes();
          let s = date.getSeconds();
          
          if(D < 10 ){
              D = "0" + D;
          }
          if(m < 10){
              m="0" + m
          }
          return M + '/' +D +' '+ h + m
          //h + m + s
 
      },
        initSlider:function() {
			let self = this;
			this.slider = $('#ex1').bootstrapSlider({  
				tooltip:'always',
				min:0,
				max:(self.imgTotalNum - 1),
				step:1,
				formatter: function(value) {
                   let time= self.timeValue ? self.timeStamp(self.timeValue[value][1]) : value
                   return time
				},
				value:(self.imgTotalNum - 1)
			}).on('change', function (e) {
				self.stop();
				if(self.option.orderBy == 'asc'){
					self.show(self.imgTotalNum - e.value.newValue - 1);
				} else {
					self.show(e.value.newValue);
				}
			}); 
		},
        show: function(idx) {
            if(this.slider != null) {
				if(this.option.orderBy == 'asc'){
					this.slider.bootstrapSlider('setValue', (this.imgTotalNum - idx - 1));
				} else {
					this.slider.bootstrapSlider('setValue', (idx));
				}
			}
            this.option.callback(idx);
            this.index = idx;
        },
        prev: function(){
            
			if(this.option.orderBy == 'asc') {
				let idx = (this.index - 1) >= 0 ? (this.index - 1) : (this.imgTotalNum - 1);
				this.show(idx);
			} else {
				let idx = (this.index + 1) >= this.imgTotalNum ? 0 : (this.index + 1);
				this.show(idx);
			}
		},
		next: function(){
			if(this.option.orderBy == 'asc'){
				let idx = (this.index + 1) >= this.imgTotalNum ? 0 : (this.index + 1);
				this.show(idx);
			} else {
				let idx = (this.index - 1) >= 0 ? (this.index - 1) : (this.imgTotalNum - 1);
				this.show(idx);
			}
		},
		player: function(){
			let self = this;
			$('#play').removeClass('icon-play').addClass('icon-stop');
			this.timer = setInterval(function(){
				self.prev();
				if(self.index == 0) {
					self.stop();
				}
			}, self.speed);
		},
		stop: function(){
			$('#play').removeClass('icon-stop').addClass('icon-play');
			if(this.timer != null) {
				clearInterval(this.timer);
				this.timer = null;
			}
		}
    }

export default ImagePlayer;