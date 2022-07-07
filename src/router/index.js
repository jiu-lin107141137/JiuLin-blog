import Vue from 'vue'
import Router from 'vue-router'
import Context from '@/components/Context'
import NavBar from '@/components/NavBar'
import FooterBox from '@/components/FooterBox'
import ArticleView from '@/components/ArticleView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        navBarView: NavBar,
        contextView: Context,
        footerView: FooterBox
      },
      alias:['/home','/homepage', '/index'],
    },
    {
      path: '/tag/:tagId',
      name: 'Tag',
      components: {
        navBarView: NavBar,
        contextView: Context,
        footerView: FooterBox
      },
    },
    {
      path: '/title/:title',
      name: 'Title',
      components: {
        navBarView: NavBar,
        contextView: Context,
        footerView: FooterBox
      },
    },
    {
      path: '/folder/:folder',
      name: 'Folder',
      components: {
        navBarView: NavBar,
        contextView: Context,
        footerView: FooterBox
      },
    },
    {
      path: '/article/:articleInd',
      name: 'Article',
      components: {
        navBarView: NavBar,
        contextView: ArticleView,
        footerView: FooterBox
      },
    }
  ]
})
