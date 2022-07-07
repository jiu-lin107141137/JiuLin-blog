<template>
  <div name="context">
    <center>
      <div id="hero">
        <div>
          <img id="avatar" src="../assets/avatar.jpeg">
          <div id="intro">
            {{ $t('GENERAL.DELAYS') }}<br>
            <font class="smallerText">{{ $t('GENERAL.CONTINUE') }}</font>
          </div>
        </div>
      </div>
      <div class="row" id="container">
        <AsideBox />
        <LectureResult />
      </div>
    </center>
  </div>
</template>

<script>
import AsideBox from '@/components/AsideBox'
import LectureResult from '@/components/LectureResult'

export default {
  name: 'context',
  components: {
    AsideBox,
    LectureResult
  },
  mounted: function(){
    document.getElementById("intro").onclick = function(){
      window.scroll({
        top: 700,
        left: 0,
        behavior: 'smooth'
      });
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div[name=context]{
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    height: auto;
    padding-top: 20px;
  }
  #avatar{
    width: 200px;
    height: 200px;
    clip-path: circle();
    border: 5px solid #555;
    border-radius: 50%;
  }
  @keyframes imageRotate{
    0%{ transform: rotate(0deg);}
    100%{ transform: rotate(360deg);}
  }
  #avatar:hover {
    animation: imageRotate 1.5s linear 0s infinite normal both;
    -webkit-animation: imageRotate 1.5s linear 0s infinite normal both;
    -moz-animation: imageRotate 1.5s linear 0s infinite normal both;
    -ms-animation: imageRotate 1.5s linear 0s infinite normal both;
    -o-animation: imageRotate 1.5s linear 0s infinite normal both;
  }
  #intro{
    margin-top: 10px;
    width: fit-content;
    background: #000;
    border: 2px solid #FFF;
    border-radius: 25px;
    font-size: 2em;
    text-align: center;
    color: #FFF;
    padding: 10px 10px;
    text-align-last: right;
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -ms-transition: all 1s ease;
    -o-transition: all 1s ease;
    transition: all 1s ease;
  }
  #intro:hover { 
    font-size: 2.5em;
  }
  #container{
    margin: 20px 0px 0px 0px;
    padding: 0px;
    width: 90%;
  }
  #hero{
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .smallerText{
    font-size: 0.5em;
  }
</style>
