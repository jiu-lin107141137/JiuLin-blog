<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.js" integrity="sha512-Mcz+Mt8k23j06ycA5EJGfyXbtzB6xqEoJxjGftQQoed/zQzem9Lt21LRymjlcm+NUsbF0LOHgfdN8LO8GtKDOw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<template>
  <div id="app">
    <!-- <PageLoader /> -->
    <div class="filter" id="filter"></div>
    <canvas id="canvas"></canvas>
    <router-view name="navBarView"/>
    <router-view name="contextView"/>
    <router-view name="footerView"/>
    <div id="toTop">
      <font-awesome-icon icon="fa-solid fa-arrow-up" />
    </div>
  </div>
</template>

<script>
// import PageLoader from '@/components/PageLoader'
export default {
  name: 'App',
  components: {
    // PageLoader
  },
}
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    width: 100%;
    height: auto;
  }

  .filter {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background:  #fe5757;
    animation: colorChange 30s ease-in-out infinite;
    animation-fill-mode: both;
    mix-blend-mode: overlay;
  }

  canvas{
    position: fixed;
    top: 0;
    left: 0;
  }

  @keyframes colorChange {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: .9;
    }
  }

  .cir {
    position: absolute;
    border-radius: 50%;
    z-index: 2;
  }
  .shape {
    position: absolute;
    width: 50px;
    height: 50px;
    transform: scale(0.8);    
    z-index: 2;
  }

  #toTop{
    color: #FFFFFF;
    background: #000000;
    position: fixed;
    border-radius: 15px;
    width: 50px;
    height: 50px;
    z-index: 20;
    bottom: 10px;
    right: 10px;
    font-size: 40px;
    opacity: 1;
    -webkit-transition: all 1.5s ease;
    -moz-transition: all 1.5s ease;
    -ms-transition: all 1.5s ease;
    -o-transition: all 1.5s ease;
    transition: all 1.5s ease;
  }

</style>
