<template>
    <div>
        <baidu-map class="map m-0-auo" :style="{width: map.width,height: map.height}"
                   ak="WA04dSnUBs4DCPPAlX0H0wGTT8zCqjsV"
                   @ready="handler"
                   :center="map.center" :zoom="map.zoom"
                   :mapStyle="mapStyle">
            <bm-navigation  anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-city-list  anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
            <bm-geolocation  anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        </baidu-map>
    </div>
</template>
<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'
    import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
    import BmCityList from 'vue-baidu-map/components/controls/CityList.vue'
    export default {
        name: 'Map',
        components: {
            BaiduMap,
            BmGeolocation,
            BmNavigation,
            BmCityList,
        },
        data(){
            return{
                data:null,
                map:{
                    center: '西安',
                    zoom: 15,
                    width:'1000px',
                    height:'710px'
                },
                shopname:'',
                address:'',
                mapStyle: {
                    styleJson: [
                        {
                            "featureType": "all",
                            "elementType": "geometry",
                            "stylers": {
                                "hue": "#007fff",
                                "saturation": 89
                            }
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": {
                                "color": "#ffffff"
                            }
                        }
                    ]
                }
            }
        },
        created(){
            let lng = Number(this.$route.query.lng)
            let lat = Number(this.$route.query.lat)
            this.address = this.$route.query.address
            let data = this.JCutils.Wgs84togcj02tobd09(lng,lat)
            this.data = data
            this.map.center = {lng:lng,lat:lat}
        },
        methods: {
            handler({BMap, map}){
                map.setMapStyle({
                    style: 'bluish'
                });
                map.enableScrollWheelZoom()
                let _this = this
                var point = new BMap.Point(_this.data[0],_this.data[1]);
                var marker = new BMap.Marker(point);        // 创建标注
                map.addOverlay(marker);
                const label = new BMap.Label(
                    this.address,
                    { offset: new BMap.Size( 20, 20 ) }
                )
                label.setStyle({
                    color : "red",
                    fontSize : "12px",
                    height : "20px",
                    lineHeight : "20px",
                    fontFamily:"微软雅黑"
                });
                marker.setLabel(label);
            },
        }
    }
</script>
<style scoped lang="scss">

</style>