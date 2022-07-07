<template>
  <div class="col-lg-8 col-md-8 col-sm-12" name="lectureResult">
    <div class="myCard" v-for="(data, index) in currentArticlesData" @click="toArticle(data.index)">
      <div class="title">{{ data.title }}</div>
      <div class="info">Last edited: {{ data.modified_at }}</div>
      <div class="tags">Tags:&nbsp;
        <span class="tag draw" v-for="tagIdx in data.tags" @click.stop="changeTag(tagIdx)">
          <div class="m-0 p-0 d-inline-block flex-wrap">
            <font-awesome-icon icon="fa-solid fa-tag" /> 
            {{ $blog.tags[tagIdx] }}
          </div>
        </span>
      </div>
    </div>

    <div id="pageContainer">
      <button class="btn btn-info" id="prePage" @click="prePage"><</button>
      <select class="form-control-sm btn-secondary d-flex align-self-center" id="pageSelector" @change="selectorValueChange">
      </select>
      <button class="btn btn-info" id="nextPage" @click="nextPage">></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lectureResult',
  data () {
    return {
      allArticlesIndex: [],
      articlePerPage: 2,
      currentArticlesData: [],
      currentPage: 0,
      limit: "",
      pre: "",
      next: "",
      selector: "",
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
    prePage: function(){
      if(this.currentPage > 0){
        this.currentPage--;
        this.pageChange();
        this.visibilityCkeck();
        this.setSelectorValue();
      }
    },
    nextPage: function(){
      if(this.currentPage+1 < this.limit){
        this.currentPage++;
        this.pageChange();
        this.visibilityCkeck();
        this.setSelectorValue();
      }
    },
    pageChange: function(){
      // console.log(this.currentPage);
      var prePageCount = this.currentPage*this.articlePerPage;
      this.currentArticlesData = [];
      for(var i = 0; i < this.articlePerPage && i+prePageCount < this.allArticlesIndex.length; i++){
        this.currentArticlesData.push(
          this.$blog.article[this.allArticlesIndex[i + prePageCount]]
        );
      }
      // console.log(this.currentArticlesData);
    },
    visibilityCkeck: function(){
      if(this.currentPage < 1)
        this.pre.style.visibility = "hidden";
      else
        this.pre.style.visibility = "visible";
      if(this.limit <= this.currentPage+1)
        this.next.style.visibility = "hidden";
      else
        this.next.style.visibility = "visible";
    },
    loadSelector: function(){
      this.selector.options.length = 0;
      for (var i = 1; i <= this.limit; i++){
        var opt = document.createElement('option');
        opt.value = i-1;
        opt.innerHTML = i;
        this.selector.appendChild(opt);
      }
    },
    selectorValueChange: function(){
      this.currentPage = parseInt(this.selector.value);
      this.pageChange();
      this.visibilityCkeck();
    },
    setSelectorValue: function(){
      this.selector.options.selectedIndex = this.currentPage;
    },
    getQueryString: function(){
      var params = this.$route.params;
      // console.log(params);
      if(params.tagId != undefined){
        var id = parseInt(params.tagId);
        if(!isNaN(id)){
          this.allArticlesIndex = this.$blog.findTag(id);
        }
      }else if(params.title != undefined){
        this.allArticlesIndex = this.$blog.findTitle(params.title);
      }else if(params.folder != undefined){
        this.allArticlesIndex = this.$blog.findFolder(params.folder);
      }else{
        this.allArticlesIndex = this.$blog.getAll();
      }
    },
    changeTag: function(idx){
      if(idx == parseInt(this.$route.params.tagId))
        return;
      this.$router.push({ 
        name: 'Tag',
        params: { tagId: idx } 
      });
    },
    toArticle: function(index){
      this.$router.push({
        name: 'Article',
        params:{
          articleInd: index,
        }
      });
    },
    init: function(){
      this.currentPage = 0;
      this.getQueryString();
      this.limit = Math.ceil(1. * this.allArticlesIndex.length / this.articlePerPage);
      this.pre = document.getElementById("prePage");
      this.next = document.getElementById("nextPage");
      this.selector = document.getElementById("pageSelector");
      this.pageChange();
      this.visibilityCkeck();
      this.loadSelector();
    }
  },
  mounted: function(){
    this.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div[name=lectureResult]{
    background-color: #000000;
    /*height: 1000px;*/
    margin-left: 5%;
    width: 70%;
    display: inline;
    border-width: 2px;
    border-color: #FFF;
    border-style: solid;
    border-radius: 20px;
    /*padding-top: 5px;*/
  }
  @media only screen and (max-width: 768px) {
    div[name=lectureResult] {
      width: 100%;
      margin-left: 0%;
      margin-top: 20px
    }
  }
  .myCard{
    width: 95%;
    margin: 0 auto;
    /*height: 300px;*/
    border-radius: 20px;
    border-color: #442288;
    /*border-width: 3px;*/
    /*border-style: ;*/
    color: #FFFFFF;
    box-shadow: 0 0 4px 4px #333333;
    text-align: left;
    padding: 0 10px;
    -webkit-transition: all .1s ease;
    -moz-transition: all .1s ease;
    -ms-transition: all .1s ease;
    -o-transition: all .1s ease;
    transition: all .1s ease;
    margin-top: 20px;
  }
  .myCard:hover{
    box-shadow: 0 0 6px 6px #333333;
    /*border-width: 4px;*/
    /*padding: 0 9px;*/
  }
  .title{
    border-bottom: dotted;
    border-width: 2px;
    border-color: #FFFFFF;
    font-size: 32px;
    color: rgb(220, 210, 244);
    overflow: hidden;
    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    -ms-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
  }
  .title:hover{
    color: rgb(194, 124, 255);
  }
  .content{
    border-bottom: dotted;
    border-width: 2px;
    border-color: #FFFFFF;
    margin-bottom: 5px;
    height: 200px;
    overflow: hidden;
    padding-top: 10px;
  }
  .info{
    overflow: hidden;
  }
  .tag{
    border-radius: 5px;
    box-shadow: inset;
    background-color: #777777;
    padding: 0px 2px 0px 5px;
    margin-right: 10px;
    margin-top: 5px;
    z-index: 5;
  }
  #pageContainer{
    padding-top: 10px;
    position: absolute;
    bottom: 10px;
    margin: 0 auto;
    width: 95%;
    display: flex;
    justify-content: space-between;
  }
  .draw{
    position: relative;
    /*z-index: 3;*/
    font-size: 16px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
  .draw:hover{
    font-size: 18px;
  }
</style>
