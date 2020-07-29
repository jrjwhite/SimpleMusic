var app = new Vue({
  el:"#app",
  data:{
    song:'',
    musicList:[],
    musicId:[],
    musicUrl:'',
    musicCover:'',
    hotComments:[],
    mvUrl: ''
  },
  methods: {
     searchSong:function(){

      var that = this
      axios.get('https://autumnfish.cn/search?keywords='+this.song)
        .then(function(response){

          console.log(response.data.result.songs)
          that.musicList = response.data.result.songs
        })
        .catch(function(err){})
    },

    playMusic: function (musicId) {
      var that = this
      axios.get('https://autumnfish.cn/song/url?id='+musicId)
        .then(function (response) {
          console.log(response)
         that.musicUrl = response.data.data[0].url
        })
        .catch(function (err) {

        })
      axios.get('https://autumnfish.cn/song/detail?ids='+musicId)
        .then(function (response) {
          console.log(response)
          that.musicCover = response.data.songs[0].al.picUrl
        })
        .catch(function (err) {

        })
      axios.get('https://autumnfish.cn/comment/hot?type=0&id='+musicId)
        .then(function (response) {
          console.log(response.data.hotComments)
          that.hotComments = response.data.hotComments
        })
      var bar = document.querySelector('.bar')
      bar.style.transform= 'rotate(0deg)'
      var audio = document.querySelector("audio");
      audio.addEventListener("playing", function(){
        bar.style.transform= 'rotate(0deg)'
      })
      audio.addEventListener("pause", function(){
        bar.style.transform= 'rotate(-25deg)'
      })


    },
    hide: function () {
      var video_icon = document.querySelector('.video_icon')
      var video = document.querySelector('video')
      video_icon.style.display = 'none'
      video.pause()
    },
    playMv: function (mvid) {
      var that = this
      axios.get('https://autumnfish.cn/mv/url?id='+mvid)
        .then(function (response) {
          console.log(response.data.data)
          that.mvUrl = response.data.data.url
        })
        .catch(function (err) {

        })
      var video_icon = document.querySelector('.video_icon')
      video_icon.style.display = 'block'
    }
  },
})
