<template>
  <div id="articleView">
    <nav id="nav" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/"> {{ $t("GENERAL.HOME") }} </router-link></li>
        <li class="breadcrumb-item"><router-link :to="'/folder/'+$blog.folder[articleData.folder]"> {{ $t("FOLDER."+$blog.folder[articleData.folder]) }} </router-link></li>
        <li class="breadcrumb-item active" aria-current="page"> {{ $t("BLOG_TITLE."+this.$route.params.articleInd) }} </li>
      </ol>
    </nav>
    <center class="w-100">
      <div class="row p-0 my-container">
        <div class="col-lg-2 col-md-2 col-12 accordion" id="fileExplorer">
          <div class="card fileContainer border-0" v-for="(folder, index) in fileStructure">
            <div class="card-header p-0 my-border-bottom" :id="'heading'+index">
              <button class="folder text-left bg-dark text-light border-0" type="button" data-toggle="collapse" :data-target="'#collapse'+index" aria-expanded="true" :aria-controls="'collapse'+index">
                {{ $t("FOLDER."+index) }}&nbsp;({{ folder.length }})
              </button>
            </div>
            <div v-if="index == $blog.folder[articleData.folder]">
              <div :id="'collapse'+index" class="collapse show" :aria-labelledby="'heading'+index" data-parent="#fileExplorer" :aria-expanded="true">
                <div class="card-body p-0">
                  <div v-for="file in folder" class="file my-border-bottom-thin">
                    {{ $t("BLOG_TITLE."+file) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div :id="'collapse'+index" class="collapse" :aria-labelledby="'heading'+index" data-parent="#fileExplorer" :aria-expanded="false">
                <div class="card-body p-0">
                  <div v-for="file in folder" class="file my-border-bottom-thin" @click="toArticle(file)">
                    {{ $t("BLOG_TITLE."+file) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-7 col-md-7 col-12" id="main">
          <div id="mainHtml" v-html="currentArticleContent"></div>
          <div id="mainFooter">
            <button v-if="!(articleData.folder == 0 && indexInFolder == 0)" class="btn btn-outline-info" @click="preArticle()">← {{ $t("BLOG_TITLE."+preIndex) }}</button>
            <div v-else></div>
            <button v-if="!(articleData.folder == $blog.folder.length-1 && indexInFolder == fileStructure[$blog.folder[articleData.folder]].length-1)" class="btn btn-outline-info" @click="nextArticle()">{{ $t("BLOG_TITLE."+nextIndex) }} →</button>
            <div v-else></div>
          </div>
        </div>

        <div class="col-lg-2 col-md-2" id="toc">
          <ul id="tocUl">
            <li v-for="item in toc" @click="toTarget(item.id)" :style="{'margin-left':item.tag-maxTitle+'em'}" v-html="item.text">
            </li>
          </ul>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  name: 'articleView',
  data () {
    return {
      articleData: {},
      fileStructure: this.$blog.getAllDividedByFolder(),
      currentArticleContent: "",
      toc: [],
      maxTitle:6,
      indexInFolder: 0,
      preIndex: -1,
      nextIndex: -1,
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.init();
      }
    )
  },
  methods: {
    init: function(){
      this.maxTitle = 6;
      this.toc = [];
      this.articleData = this.$blog.article[parseInt(this.$route.params.articleInd)];
      this.indexInFolder = this.fileStructure[this.$blog.folder[this.articleData.folder]].indexOf(this.articleData.index);
      this.preIndex = this.indexInFolder-1;
      if(this.preIndex == -1 && !(this.articleData.folder == 0 && this.indexInFolder == 0))
        this.preIndex = this.fileStructure[this.$blog.folder[this.articleData.folder-1]][this.fileStructure[this.$blog.folder[this.articleData.folder-1]].length-1];

      this.nextIndex = this.indexInFolder+1;
      if(this.nextIndex == this.fileStructure[this.$blog.folder[this.articleData.folder]].length && !(this.articleData.folder == this.$blog.folder.length-1 && this.indexInFolder == this.fileStructure[this.$blog.folder[this.articleData.folder]].length-1))
        this.nextIndex = this.fileStructure[this.$blog.folder[this.articleData.folder+1]][0];
      this.md2Html(this.articleData.folder, this.articleData.fileName);
    },
    toArticle(id){
      if(id == this.articleData.index)
        return;
      console.log(id+" "+this.articleData.index)
      this.$router.push({
        name: 'Article',
        params:{ 'articleInd': id }
      });
    },
    md2Html: async function(folder, fileName){
      var lang = localStorage.getItem('language') || 'en';
      var path = (`./static/articles/${ this.$blog.folder[folder] }/${ lang }/${fileName}.md`);
      await this.$http.get(path).then(
        response => {
          this.currentArticleContent = (marked(response.body));
          // console.log(this.toc);
        },
        response => {
          // error callback
          this.currentArticleContent = ("An error ocurred");
        }
      );
    },
    setRenderer: function(){
      var rendererMD = new marked.Renderer();
      var that = this;
      var anchor = 0;
      rendererMD.heading = function(text, level, raw) {
        console.log(text+" "+level);
        //儲存這篇文章的最大標籤 
        if(level < that.maxTitle){
          that.maxTitle = level;
        }
        anchor += 1;
        /* 
        toc:陣列用於儲存標題，
        id:標題id,用於點選目錄滾動到改標題
        tag:記錄屬於那個標籤（h1……h6）
        test:標籤內容
        */
        that.toc.push(
          {
            'id':anchor,
            'tag':level,
            'text':text
          }
        )
        return `<h${level} id="toc-nav${anchor}">${text}</h${level}>`;
      };
      //重寫a標籤，在新標籤開啟
      rendererMD.link = function(href,title,text){
        return '<a href="'+href+'" title="'+text+'" target="_blank">'+text+'</a>';
      }

      marked.setOptions({
        renderer: rendererMD,
        gfm: true,//預設為true。 允許 Git Hub標準的markdown.
        tables: true,//預設為true。 允許支援表格語法。該選項要求 gfm 為true。
        breaks: false,//預設為false。 允許回車換行。該選項要求 gfm 為true。
        pedantic: false,//預設為false。 儘可能地相容markdown.pl的晦澀部分。不糾正原始模型任何的不良行為和錯誤。
        sanitize: false,//對輸出進行過濾（清理）
        smartLists: true,
        smartypants: false//使用更為時髦的標點，比如在引用語法中加入破折號。
      });
    },
    toTarget(target){
      target='#toc-nav'+target
      var toElement = document.querySelector(target);
      toElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
      })
    },
    preArticle(){
      this.$router.push({
        name: 'Article',
        params:{
          'articleInd': this.preIndex
        }
      });
    },
    nextArticle(){
      this.$router.push({
        name: 'Article',
        params:{
          'articleInd': this.nextIndex
        }
      });
    }
  },
  mounted: function() {
    this.setRenderer();
    this.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #articleView{
    min-height: 650px;
    padding-top: 10px;
  }
  #nav{
    width: 90%;
    margin: 0 auto;
    opacity: 0.8;
    padding: 0;
    box-shadow: 0 0 3px 3px #777777;
  }
  a, a:visited, a:hover{
    text-decoration: none;
    color: inherit;
  }
  #nav > ol{
    margin: 0;
    padding: 12px;
  }
  li{
    font-size: 18px;
    font-weight: bold;
  }
  a{
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }
  a:hover{
    color: #AA22FF;
  }
  .my-container{
    margin: 30px 30px 0px 30px;
    display: flex;
    justify-content: space-between;
  }
  #fileExplorer{
    max-height: 500px;
    height: fit-content;
    margin-bottom: 20px;
    background: #000000;
    color: #FFFFFF;
    padding: 5px;
    border-color: #FFFFFF;
    border-style: solid;
    border-width: 3px;
    border-radius: 10px;
  }
  .fileContainer{
    margin-bottom: 10px;
  }
  .folder{
    padding-left: 10px;
    width: 100%;
    font-size: 20px;
    text-align: left;
  }
  .file{
    width: 100%;
    font-size: 16px;
    padding-left: 20px;
    background: #222222;
  }
  .my-border-bottom{
    border-color: #AAAAAA !important;
    border-bottom: solid;
    border-width: 2px;
  }
  .my-border-bottom-thin{
    border-color: #AAAAAA !important;
    border-bottom: solid;
    border-width: 1px;
    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    -ms-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
  }
  .my-border-bottom-thin:hover{
    background-color: #555555;
  }
  #main{
    text-align: left;
    color: #FFFFFF;
    background: #000;
    border-radius: 20px;
    border-color: #FFFFFF;
    border-width: 2px;
    border-style: solid;
    overflow: hidden;
    min-height: 500px;
    height: fit-content;
  }
  #toc{
    text-align: left;
    color: #FFFFFF;
    background-color: #000000;
    padding: 0;
    height: fit-content;
    border-radius: 10px;
    border-color: #FFFFFF;
    border-width: 2px;
    border-style: solid;
  }
  #tocUl{
    padding-left: 20px;
  }
  @media only screen and (max-width: 768px) {
    #toc {
      display: none;
    }
  }
  #mainFooter{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50px;
    margin: 0px 0px 10px 0px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    border-color: #FFFFFF;
    border-top: solid;
    border-width: 3px;
  }
  #mainFooter > button{
    margin: 0 10px;
  }
</style>
