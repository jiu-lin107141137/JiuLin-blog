<template>
  <div id="page-loader">
    <div class="cube first" style="background-color: #8CC721;"></div>
    <div class="cube" style="background-color: #69BEEB;"></div>
    <div class="cube" style="background-color: #F5AA39;"></div>
    <div class="cube last" style="background-color: #E9643B;"></div>
  </div>
</template>

<script>
export default {
  name: 'pageLoader',
  data () {
    return {
    }
  },
  mounted(){
    window.onload = function(){
      var timer = setTimeout(() => {
          clearTimeout(timer);
          var cleartimer = setTimeout(() => {
            document.getElementById("page-loader").style.width = "0";
          }, 1000);
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #page-loader{
    display: flex;
    justify-content: center;
    align-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #333;
    z-index: 9999;
  }
  .cube{
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  @keyframes left {
    40%{
      transform: translateX(-60px);
    }
    50%{
      transform: translateX(0);
    }
  }

  @keyframes right {
    40%{
      transform: translateX(60px);
    }
    50%{
      transform: translateX(0);
    }
  }

  .first{
    animation: left 1s linear 0s infinite normal both;
    -webkit-animation: left 1s linear 0s infinite normal both;
    -moz-animation: left 1s linear 0s infinite normal both;
    -ms-animation: left 1s linear 0s infinite normal both;
    -o-animation: left 1s linear 0s infinite normal both;
  }

  .last{
    animation: right 1s linear .5s infinite normal both;
    -webkit-animation: right 1s linear .5s infinite normal both;
    -moz-animation: right 1s linear .5s infinite normal both;
    -ms-animation: right 1s linear .5s infinite normal both;
    -o-animation: right 1s linear .5s infinite normal both;
  }
</style>
