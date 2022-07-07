<template>
  <div id="footer">
    <div id="container">
      <div id="leftFooter">
        Copyright © 2022 JiuLin's Blog All right reserved.
      </div>
      <div id="rightFooter">
        <a href="https://github.com/jiu-lin107141137">
          <font-awesome-icon icon="fa-brands fa-github" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footerBox',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #footer{
    width: 100%;
    background-color: #555555;
    height: 50px;
    position: relative;
    bottom: 0px;
    margin-top: 20px;
  }
  #container{
    width: 87%;
    height: 100%;
    margin: 0% 8% 0% 5%;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #leftFooter, #rightFooter{
    font-size: 20px;
    color: #FFFFFF;
  }
  a, a:visited, a:hover{
    text-decoration: none;
    color: #FFFFFF;
  }
</style>
