<template>
  <div class="col-lg-3 col-md-3 col-12" name="asideBox">
    <img id="avater" src="../assets/avatar.jpeg">
    <font name="name">{{ $t('GENERAL.NAME') }}</font>
    <div id="linkBox">
      <a href="https://github.com/jiu-lin107141137" target="_blank">
        <font-awesome-icon icon="fa-brands fa-github" />
      </a>
      <a href="mailto:jam930725@gmail.com?subject=Msg from blog." target="_blank">
        <font-awesome-icon icon="fa-solid fa-envelope" />
      </a>
    </div>
    <div id="intro" class="borderChange">
      {{ $t('GENERAL.INTRO') }}
    </div>
    <div id="foldersBox" class="borderChange">
      <ul id="folderList" class="ulClass">
        {{ $t("GENERAL.FOLDER") }}:
        <li v-for="item in pairs" @click="search(item.name)" class="liForFolder">
          {{ item.name+": "+item.count }}
        </li>
      </ul>
    </div>
    <div id="tagBox" class="borderChange">
      {{ $t("GENERAL.TAG") }}:<br>
      <span v-for="item in (tagCount)" class="tag draw">
        <div class="m-0 p-0 d-inline text-nowrap pl-1" @click="changeTag(item-1)">
           <font-awesome-icon icon="fa-solid fa-tag" /> 
          {{ $blog.tags[item-1] }}&nbsp;
          <font class="fileNumber">{{tagFileCount[item-1]}}</font>
        </div>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'asideBox',
  data () {
    return {
      folderName: Array.from(this.$blog.folder),
      pairs: [],
      tagCount: this.$blog.tags.length,
      tagFileCount: [],
    }
  },
  methods: {
    search: function(f){
      if(f == this.$route.params.folder)
        return;
      this.$router.push({
        name: "Folder",
        params: {
          folder: f,
        }
      });
    },
    changeTag: function(idx){
      if(idx == parseInt(this.$route.params.tagId))
        return;
      this.$router.push({ 
        name: 'Tag',
        params: { tagId: idx } 
      })
    },
  },
  created(){
    var folder = this.$blog.getAllDividedByFolder();
    for (const [key, value] of Object.entries(folder)) {
      this.pairs.push({
        name: key,
        count: value.length,
      });
    }
    for(var i = 0; i < this.tagCount; i++)
      this.tagFileCount.push(0);
    for(var i = 0; i < this.$blog.article.length; i++){
      for(var j = 0; j < this.$blog.article[i].tags.length; j++)
        this.tagFileCount[this.$blog.article[i].tags[j]]++;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div[name=asideBox]{
    background-color: #000000;
    height: 100%;
    width: 25%;
    display: inline;
    border-width: 2px;
    border-color: #FFFFFF;
    border-style: solid;
    border-radius: 20px;
    padding: 20px;
  }
  @media only screen and (max-width: 768px) {
    div[name=asideBox] {
      margin-right: 100%;
    }
  }
  #avater{
    width: 90%;
    margin-bottom: 10px;
    margin-top: 0px;
    max-width: 200px;
    display: block;
  }
  font[name=name]{
    font: 32px sans-serif;
    color: #FFFFFF;
  }
  #intro{
    margin-top: 10px;
    color: rgb(239, 156, 225);
    font-size: 18px;
  }
  .borderChange{
    position: relative;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
    box-shadow: inset 0 0 0 2px #f45e61;
    border-radius: 20px;
  }
  .borderChange::before, .borderChange::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    -webkit-transform-origin: center;
            transform-origin: center;
       -moz-transform-origin: center;
         -o-transform-origin: center;
        -ms-transform-origin: center;
  }
  .borderChange::before {
    border-top: 2px solid #6477b9;
    border-bottom: 2px solid #6477b9;
    -webkit-transform: scale3d(0, 1, 1);
            transform: scale3d(0, 1, 1);
       -moz-transform: scale3d(0, 1, 1);
         -o-transform: scale3d(0, 1, 1);
        -ms-transform: scale3d(0, 1, 1);
  }
  .borderChange::after {
    border-left: 2px solid #6477b9;
    border-right: 2px solid #6477b9;
    -webkit-transform: scale3d(1, 0, 1);
            transform: scale3d(1, 0, 1);
       -moz-transform: scale3d(1, 0, 1);
         -o-transform: scale3d(1, 0, 1);
        -ms-transform: scale3d(1, 0, 1);
  }
  #intro:hover, #foldersBox:hover{
    /*color: #FFAAAA;*/
    box-shadow: none;
  }
  .borderChange:hover::before, .borderChange:hover::after {
    border-radius: 20px;
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
       -moz-transform: scale3d(1, 1, 1);
         -o-transform: scale3d(1, 1, 1);
        -ms-transform: scale3d(1, 1, 1);
    transition: transform 0.5s, -webkit-transform 0.5s, -moz-transform 0.5s, -ms-transform 0.5s, -o-transform 0.5s;
  }
  #foldersBox{
    margin-top: 10px;
    text-align: left;
    color: #FFFFFF;
    font-size: 20px;
    display: flex;
    justify-items: left;
    padding-top: 5px;
    padding-left: 5px;
  }
  .ulClass{
    padding: 0px;
    width: 100%;
    z-index: 10;
  }
  .liForFolder{
    margin-left: 30px;
    list-style-type: square;
    -webkit-transition: all .25s ease;
    -moz-transition: all .25s ease;
    -ms-transition: all .25s ease;
    -o-transition: all .25s ease;
    transition: all .25s ease;
    cursor: pointer;
  }
  .liForFolder:hover{
    color: #AAAAAA;
    text-decoration: underline;
  }
  #linkBox{
    color: #FFFFFF;
    font-size: 30px;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }
  #linkBox > a, #linkBox > a:hover, #linkBox > a:visited{
    color: inherit;
    text-decoration: none;
  }
  #linkBox > a{
    transition: all .5s ease;
    position: relative;
    z-index: 5;
  }
  #linkBox > a:hover{
    color: #3333FF;
  }
  #tagBox{
    margin-top: 10px;
    padding: 5px 10px;
    text-align: left;
    color: #FFFFFF;
    font-size: 20px;
  }
  #tagBox:hover{
    box-shadow: none;
    color: #FFAAAA;
  }
  .tag{
    position: relative;
    border-radius: 4px;
    box-shadow: inset;
    background-color: #777777;
    /*padding: 0px 2px 0px 5px;*/
    margin-right: 10px;
    margin-top: 5px;
    z-index: 10;
    font-size: 16px;
    color: #FFFFFF;
  }
  .fileNumber{
    padding: 0 5px;
    background: #555555;
  }
</style>