!function(e){function t(r){if(a[r])return a[r].exports;var n=a[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";var r=a(2),n=a(5),i=a(6),o=a(7),c=a(8),s=function(){function e(){this._app=new r.application,this._stateService=new n.StateService(this._app),this._templatingService=new i.TemplatingService(this._stateService),this._systemService=new o.SystemService(this._templatingService,this._stateService),this._actionService=new c.ActionService(this._systemService),this._app.injectActionService(this._actionService),this._app.startAddingPages()}return e.prototype.startEmulator=function(){this._systemService.startEmulator()},e}();t.emulator=s;var u=new s;u.startEmulator()},,function(e,t,a){"use strict";var r=a(3),n=a(4),i=function(){function e(){this.title="YumE",this.currentPageName="",this.startPageName="page1search",this.pages=[],this.CentralCallbackFunc=this.appCallback}return e.prototype.injectActionService=function(e){this._actionService=e},e.prototype.startAddingPages=function(){this.pages.push(new r.page1search),this.pages.push(new n.page2list)},e.prototype.createPageArray=function(){},e.prototype.appCallback=function(e,t,a){var r=this;switch(t){case"page1button":var n;a?this._actionService.callYelpSearchAPI(a,function(i){for(var o=r.tailorYelpResult(i),c=0,s=r.pages;c<s.length;c++){var u=s[c];if("page2list"===u.name){for(var p=0,l=u.rawLayout;p<l.length;p++){var g=l[p];"text"===g.type&&"page2text"===g.name?g.define=o:"image"===g.type&&"undefined"!=typeof i&&(g.define=i.snippet_image_url)}r._actionService.reRenderPage(u);break}}(n=r.getMatchedFunction(e,t,a))(r._actionService,a)}):this.getMatchedFunction(e,t)(this._actionService);break;case"page2button":this.pages[1].callback[0].callbackFunction(this._actionService)}},e.prototype.getMatchedFunction=function(e,t,a){for(var r,n,i=0,o=this.pages;i<o.length;i++){var c=o[i];if(c.name===e){n=c;break}}for(var s=0,u=n.callback;s<u.length;s++){var p=u[s];if(p.bindToName===t){r=p;break}}return r.callbackFunction},e.prototype.tailorYelpResult=function(e){console.log(e);var t;if(e){var a=e,r=a.name?a.name:"",n=a.phone?a.phone:"",i=a.rating?a.rating:"",o=a.categories?a.categories[0][0]:"",c=a.snippet_text?a.snippet_text:"";t="<br/><strong>Title: </strong>"+r+"<br/><strong>Phone: </strong>"+n+"<br/><strong>Rating: </strong>"+i+"   |  <strong>Category: </strong>"+o+"<br/><strong>Comment: </strong>"+c}else t="<br/>sorry, Yelp can't recognize your keyword, please go back and search again.";return t},e}();t.application=i},function(e,t){"use strict";var a=function(){function e(){this.name="page1search",this.rawLayout=this.returnRawLayout(),this.afterRenderLayout=null,this.callback=this.returnCallbackFuncs()}return e.prototype.returnRawLayout=function(){return[{type:"image",name:"page1image",define:"./assets/YuMe_logo.jpg"},{type:"text",name:"page1text",define:"Search better, eat fatter :)"},{type:"input",name:"page1input",define:"Enter the name"},{type:"button",name:"page1button",targetElementID:"page1input",define:"YumE it!"},{type:"text",name:"page1text1",define:" "}]},e.prototype.returnCallbackFuncs=function(){return[{bindToName:"page1button",targetID:"page1text",callbackFunction:this.searchButtonCallBack}]},e.prototype.searchButtonCallBack=function(e,t){t&&""!=t?e.goPage("page2list"):e.showNotification("Please enter the name of restaurant.")},e}();t.page1search=a},function(e,t){"use strict";var a=function(){function e(){this.name="page2list",this.rawLayout=this.returnRawLayout(),this.afterRenderLayout=null,this.callback=this.returnCallbackFuncs()}return e.prototype.returnRawLayout=function(){return[{type:"text",name:"page2placeholder",define:" "},{type:"button",name:"page2button",define:"go back"},{type:"text",name:"page2placeholder",define:" "},{type:"image",name:"page2image",define:"./assets/cry.png"},{type:"text",name:"page2text",define:"I really love it"}]},e.prototype.returnCallbackFuncs=function(){return[{bindToName:"page2button",callbackFunction:this.goBackButtonCallBack}]},e.prototype.goBackButtonCallBack=function(e){e.goPage("page1search")},e}();t.page2list=a},function(e,t){"use strict";var a=function(){function e(e){this._app=e}return e.prototype.getStartPageName=function(){return this._app.startPageName},e.prototype.getCurrentPageName=function(){return this._app.currentPageName},e.prototype.setCurrentPageName=function(e){this._app.currentPageName=e},e.prototype.getCurrentPage=function(){for(var e,t=this._app.currentPageName,a=0,r=this._app.pages;a<r.length;a++){var n=r[a];if(n.name===t){e=n;break}}return e},e.prototype.getPage=function(e){for(var t,a=0,r=this._app.pages;a<r.length;a++){var n=r[a];if(n.name===e){t=n;break}}return t},e.prototype.getPages=function(){return this._app.pages},e.prototype.emulatorCentralCallBack=function(e,t){var a=this.getStartPageName();t?this._app.CentralCallbackFunc(a,e.name,t):this._app.CentralCallbackFunc(a,e.name)},e.prototype.getAppCallBack=function(){return this._app.CentralCallbackFunc},e}();t.StateService=a},function(e,t){"use strict";var a=function(){function e(e){this._stateService=e}return e.prototype.createPage=function(e){for(var t=this,a=this.createLayout(),r=function(e){var r=n.createjQueryItem("div",void 0,"row",void 0),i=e;switch(i.type){case"button":var o=n.createjQueryItem("button",[{key:"id",value:i.name}],"btn btn-primary btn-lg btn-block",i.define);i.targetElementID?$(".emulator").on("click","#"+i.name,function(){var e=$("#"+i.targetElementID).val();t._stateService.emulatorCentralCallBack(i,e)}):$(".emulator").on("click","#"+i.name,function(){t._stateService.emulatorCentralCallBack(i)}),r.append(o);break;case"text":var c=n.createjQueryItem("p",[{key:"id",value:i.name}],void 0,i.define);r.append(c);break;case"image":var s=n.createjQueryItem("img",[{key:"id",value:i.name},{key:"src",value:i.define}],"img-fluid");r.append(s);break;case"input":var u=n.createjQueryItem("div",void 0,"form-group"),p=n.createjQueryItem("label",[{key:"for",value:i.name}],"sr-only",i.define);u.append(p);var l=n.createjQueryItem("input",[{key:"type",value:"text"},{key:"id",value:i.name},{key:"for",value:i.name},{key:"placeholder",value:i.define}],"form-control",i.define);u.append(l),r.append(u);break;case"list":for(var g=n.createjQueryItem("div",void 0,"list-group"),m=i.define,h=function(e){var a=n.createjQueryItem("a",void 0,"list-group-item list-group-item-action");$(".emulator").on("click","#"+i.name,function(){t._stateService.emulatorCentralCallBack(i,e.url)});var r=n.createjQueryItem("h5",void 0,"list-group-item-heading",e.title),o=n.createjQueryItem("p",void 0,"list-group-item-text",e.description);a.append(r),a.append(o),g.append(a)},v=0,f=m;v<f.length;v++){var y=f[v];h(y)}}a.append(r)},n=this,i=0,o=e.rawLayout;i<o.length;i++){var c=o[i];r(c)}return a},e.prototype.createPagesAndSave=function(){for(var e=0,t=this._stateService.getPages();e<t.length;e++){var a=t[e];a.afterRenderLayout=this.createPage(a)}},e.prototype.createLayout=function(){return this.createjQueryItem("div",void 0,"container-fluid")},e.prototype.removeElementFromDOM=function(e){$(e).remove()},e.prototype.createjQueryItem=function(e,t,a,r){var n=$(document.createElement(e));if(a&&n.addClass(a),t)for(var i=0,o=t;i<o.length;i++){var c=o[i];n.attr(c.key,c.value)}return r&&n.html(r),n},e}();t.TemplatingService=a},function(e,t){"use strict";var a=function(){function e(e,t){this._templatingService=e,this._stateService=t}return e.prototype.removeCurrentPageFromScreen=function(){this._templatingService.removeElementFromDOM(".container-fluid")},e.prototype.goPage=function(e){this.removeCurrentPageFromScreen();for(var t=0,a=this._stateService.getPages();t<a.length;t++){var r=a[t];r.name===e&&($(".emulator").prepend(r.afterRenderLayout),this.renewCurrentPage(r.name))}},e.prototype.renderAllPages=function(e){if(e){var t=this._templatingService.createPage(e);this._stateService.getPage(e.name).afterRenderLayout=t}else this._templatingService.createPagesAndSave()},e.prototype.goStartPage=function(){this.goPage(this._stateService.getStartPageName())},e.prototype.renewCurrentPage=function(e){this._stateService.setCurrentPageName(e)},e.prototype.startEmulator=function(){var e=this,t=this._templatingService.createjQueryItem("div",void 0,"splashScreen"),a=this._templatingService.createjQueryItem("p",void 0,"brand","Smartisan");$(".emulator").append(t),t.append(a),t.fadeIn("slow",function(){a.fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){e.hideSplashScreen(),e.renderAllPages(),e.goStartPage()})})},e.prototype.hideSplashScreen=function(){$(".splashScreen").fadeOut("slow").remove()},e.prototype.showNotification=function(e){var t=this._templatingService.createjQueryItem("div",void 0,"bg-danger",e);$(".emulator").prepend(t),setTimeout(function(){t.fadeOut("slow").remove()},2e3)},e}();t.SystemService=a},function(e,t){"use strict";var a=function(){function e(e){this._systemService=e}return e.prototype.goPage=function(e){this._systemService.goPage(e)},e.prototype.showNotification=function(e){this._systemService.showNotification(e)},e.prototype.saveToLocalStorage=function(e,t){localStorage.setItem(e,t)},e.prototype.getFromLocalStorage=function(e){return localStorage.getItem(e)},e.prototype.reRenderPage=function(e){this._systemService.renderAllPages(e)},e.prototype.callYelpSearchAPI=function(e,t){var a={consumerKey:"sNul62e6H0We5KJLGYP_Bw",consumerSecret:"RxvIBp4BxRvNVxjaPlUWuiPFcYg",accessToken:"nguVll4te_e1oDcv2EkS4xKC6GOoQhcN",accessTokenSecret:"DrumlhFl5Kwb1ksCpRKEtiW6B58",serviceProvider:{signatureMethod:"HMAC-SHA1"}},r=e,n="Dunedin",i={consumerSecret:a.consumerSecret,tokenSecret:a.accessTokenSecret},o=[];o.push(["term",r]),o.push(["location",n]),o.push(["callback","cb"]),o.push(["oauth_consumer_key",a.consumerKey]),o.push(["oauth_consumer_secret",a.consumerSecret]),o.push(["oauth_token",a.accessToken]),o.push(["oauth_signature_method","HMAC-SHA1"]);var c={action:"https://api.yelp.com/v2/search",method:"GET",parameters:o};OAuth.setTimestampAndNonce(c),OAuth.SignatureMethod.sign(c,i);var s=OAuth.getParameterMap(c.parameters);$.ajax({url:c.action,data:s,dataType:"jsonp",jsonpCallback:"cb",cache:!0}).done(function(e,a,r){t(e.businesses[0])}).fail(function(e,t,a){console.log("error["+a+"], status["+t+"], jqXHR["+JSON.stringify(e)+"]")})},e}();t.ActionService=a}]);
//# sourceMappingURL=index.bundle.js.map