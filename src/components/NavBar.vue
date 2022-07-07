<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light myNav">
    <h1 class="mr-auto" name="title"><router-link to="/">{{ $t('GENERAL.BLOG_NAME') }}</router-link></h1>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarToggler">
      <div class="form-inline my-2 my-lg-0 boxes" id="searchBox">
        <input id="textInput" class="form-control mr-sm-2 keyInput" type="text" :placeholder="$t('GENERAL.SEARCH')" v-model="keyWord" aria-label="Search" @keyup="keyUp($event)">
        <button id="searchBtn" class="btn btn-outline-light my-2 my-sm-0" @click="search">{{ $t('GENERAL.SEARCH') }}</button>
      </div>
      <div class="dropdown dropDownList boxes mt-2 mt-lg-0 mb-2 mb-lg-0">
        <a class="btn btn-info dropdown-toggle drop" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
          {{ $t('GENERAL.LANGUAGE') }}
        </a>
        <div class="dropdown-menu mt-2 mt-lg-0" aria-labelledby="dropdownMenuLink">
          <button class="dropdown-item" data-lang="tw" @click="setLang">繁體中文</button>
          <button class="dropdown-item" data-lang="en" @click="setLang">English</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {
      keyWord: '',
    }
  },
  methods: {
    setActiveLanguage(lang) {
      localStorage.setItem('language', lang)
    },
    setLang(evt) {
      const lang = evt.target.dataset.lang
      this.setActiveLanguage(lang)
      return history.go(0)
    },
    search(){
      if(this.keyWord.trim() == '')
        this.keyWord = ' ';
      if(this.keyWord == this.$route.params.title)
        return;
      this.$router.push({ 
        name: 'Title',
        params: { title: this.keyWord } 
      })
    },
    keyUp(e){
      if(e.which == 13)
        this.search();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .myNav{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 50px;
    background-color: #555555 !important;
    display: flex;
    /*align-items: center;*/
    z-index: 100;
    padding: 0 !important;
    color: white;
  }
  h1[name="title"]{
    text-align: left;
    margin: 0px 10px;
    color: #FFFFFF;
    font-weight: bold;
    text-shadow: 0px 0px 8px #FF88FF;
  }
  a:visited, a:link, a:hover {
    color: #FFFFFF;
    text-decoration: none;
  }
  .dropDownList{
    display: inline;
    width: 120px;
  }
  #searchBox{
    margin-right: 20px;
  }
  .keyInput{
    margin-right: 5px !important;
  }
  .boxes{
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
  }
  #navbarToggler{
    justify-content: right;
    background-color: #555555 !important;
  }
</style>
