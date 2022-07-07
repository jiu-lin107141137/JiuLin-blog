import { locale as en } from '../lang/locales/en.js';
import { locale as tw } from '../lang/locales/tw.js';
export default {
  install(Vue, options) {
		Vue.prototype.$blog = {
			article: [
				{
					index: 0,
					folder: 2,
					fileName: "blogDesignReflection",
					title: "",
					modified_at: "2022/07/04 15:34",
					tags: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ]
				},
				{
					index: 1,
					folder: 1,
					fileName: "MCDesignFinalExam",
					title: "",
					modified_at: "2022/07/03 15:34",
					tags: [6, ]
				},
				{
					index: 2,
					folder: 0,
					fileName: "zeroJudgeG352",
					title: "",
					modified_at: "2022/07/02 15:34",
					tags: [0, ]
				},
			],
			tags: [
				'Java',
				'C#',
				'C++',
				'Android',
				'Arduino',
				'Web',
				'Bluetooth',
				'English',
				'Math',
				'Data Structure',
				'Reflection'
			],
			folder: [
				"OnlineJudge",
				"Project",
				"Others"
			],
			dividedByFolder: function(list){
				var rtBlog = {
					"OnlineJudge": [],
					"Project": [],
					"Others": [],
				}
				for(var i = 0; i < list.length; i++){
					switch(this.folder[this.article[list[i]].folder]){
						case "OnlineJudge":
							rtBlog.OnlineJudge.push(list[i]);
							break;
						case "Project":
							rtBlog.Project.push(list[i]);
							break;
						case "Others":
							rtBlog.Others.push(list[i]);
							break;
					}
				}
				return rtBlog;
			},
			sortByTime: function(list){
				return this.quickSort(list).reverse();
			},
			quickSort: function (arr) {
			  if (arr.length <= 1) {
			    return arr;
			  }

			  var pivot = arr[arr.length -1];
			  // var pivot = arr[arr.length -1];
			  var left = [];
			  var right = [];

			  for(let i = 0; i < arr.length - 1; i++) {
			    if (this.article[arr[i]].modified_at < this.article[pivot].modified_at) {
			    // if (arr[i] < pivot) {
			      left.push(arr[i])
			    } else {
			      right.push(arr[i])
			    }
			  }
			  return [...this.quickSort(left), pivot, ...this.quickSort(right)]
			},
			findTag: function(tagId){
				var rtList = [];
				for(var i = 0; i < this.article.length; i++)
					if(this.article[i].tags.includes(tagId))
						rtList.push(i);
				return this.sortByTime(rtList);
			},
			findTitle: function(titleString){
				titleString = titleString.toLowerCase().trim();
				var rtList = [];
				for(var i = 0; i < this.article.length; i++)
					if(this.article[i].title.toLowerCase().trim().includes(titleString))
						rtList.push(i);
				return this.sortByTime(rtList);
			},
			findFolder: function(folderName){
				var rtList = [];
				var folderIndex = this.folder.indexOf(folderName.trim());
				for(var i = 0; i < this.article.length; i++)
					if(this.article[i].folder == folderIndex)
						rtList.push(i);
				return this.sortByTime(rtList);
			},
			getAll: function(){
				return this.sortByTime(this.generator(0, this.article.length));
			},
			getAllDividedByFolder: function(){
				return this.dividedByFolder(this.getAll());
			},
			generator: function(start, end, interval = 1){
				var rtList = [];
				for(; start < end; start += interval)
					rtList.push(start);
				return rtList;
			},
			setTitle: function(){
				var f = (localStorage.getItem('language') || 'en') == 'en';
				for(var i = 0; i < this.article.length; i++){
					this.article[i].title = f ? en.BLOG_TITLE[i] : tw.BLOG_TITLE[i];
				}
			},
		};
  }
}
