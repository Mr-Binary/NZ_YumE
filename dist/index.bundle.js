!function(e){function t(r){if(a[r])return a[r].exports;var n=a[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";var r=a(2),n=a(5),o=a(6),i=a(7),c=a(8),s=function(){function e(){this._app=new r.application,this._stateService=new n.StateService(this._app),this._templatingService=new o.TemplatingService(this._stateService),this._systemService=new i.SystemService(this._templatingService,this._stateService),this._actionService=new c.ActionService(this._systemService),this._app.injectActionService(this._actionService),this._app.startAddingPages()}return e.prototype.startEmulator=function(){this._systemService.startEmulator()},e}();t.emulator=s;var p=new s;p.startEmulator()},,function(e,t,a){"use strict";var r=a(3),n=a(4),o=a(9),i=function(){function e(){this.title="YumE",this.currentPageName="",this.startPageName="page1search",this.pages=[],this.CentralCallbackFunc=this.appCallback}return e.prototype.injectActionService=function(e){this._actionService=e},e.prototype.startAddingPages=function(){this.pages.push(new r.page1search),this.pages.push(new n.page2list),this.pages.push(new o.page3Map)},e.prototype.createPageArray=function(){},e.prototype.appCallback=function(e,t,a){var r=this;switch(t){case"page1button":var n;a?this._actionService.callYelpSearchAPI(a,function(o){for(var i=r.tailorYelpResult(o),c=0,s=r.pages;c<s.length;c++){var p=s[c];if("page2list"===p.name){for(var u=0,l=p.rawLayout;u<l.length;u++){var g=l[u];"text"===g.type&&"page2text"===g.name?g.define=i:"image"===g.type&&("undefined"!=typeof o&&"undefined"!=typeof o.image_url?g.define=o.image_url:g.define="assets/food.png")}r._actionService.reRenderPage(p);break}}(n=r.getMatchedFunction(e,t,a))(r._actionService,a)}):this.getMatchedFunction(e,t)(this._actionService);break;case"home":this.pages[1].callback[0].callbackFunction(this._actionService);break;case"mapButton":this._actionService.reRenderPage(this.pages[2]),this.pages[1].callback[1].callbackFunction(this._actionService)}},e.prototype.getMatchedFunction=function(e,t,a){for(var r,n,o=0,i=this.pages;o<i.length;o++){var c=i[o];if(c.name===e){n=c;break}}for(var s=0,p=n.callback;s<p.length;s++){var u=p[s];if(u.bindToName===t){r=u;break}}return r.callbackFunction},e.prototype.tailorYelpResult=function(e){console.log(e);var t;if(e){for(var a=e,r=a.name?a.name:"",o=a.phone?a.phone:"",i=a.rating?a.rating:"",c=a.categories?a.categories[0][0]:"",s=a.snippet_text?a.snippet_text:"",p=a.location.address[0]?a.location.address[0]:"",u=a.location.coordinate.latitude?a.location.coordinate.latitude:0,l=a.location.coordinate.longitude?a.location.coordinate.longitude:0,g=0,m=this.pages[2].rawLayout;g<m.length;g++){var h=m[g];if("image"===h.type){var f=""+u+","+l;h.define=this.googleMapsHelper(f);break}}t="<br/><strong>Title: </strong>"+r+"<br/><strong>Phone: </strong>"+o+"   |  <strong>Address: </strong>"+p+"<br/><strong>Rating: </strong>"+i+"   |  <strong>Category: </strong>"+c+"<br/><strong>Comment: </strong>"+s}else t="<br/>Sorry, Yelp can't recognize your keyword, please go back and search again.",this.pages[1]=new n.page2list;return t},e.prototype.googleMapsHelper=function(e){var t="https://maps.googleapis.com/maps/api/staticmap?&size=300x230&maptype=roadmap&visible=Octagon,Dunedin,NZ&markers=color:yellow%7Clabel:U%7C-45.8743,170.5036&markers=color:blue%7Clabel:F%7C",a="&key=AIzaSyDHTnM42xU_IGgOk0OGswZGOAtDRr8e66I";return t+e+a},e}();t.application=i},function(e,t){"use strict";var a=function(){function e(){this.name="page1search",this.rawLayout=this.returnRawLayout(),this.afterRenderLayout=null,this.callback=this.returnCallbackFuncs()}return e.prototype.returnRawLayout=function(){return[{type:"image",name:"page1image",define:"./assets/YuMe_logo.jpg"},{type:"text",name:"page1text",define:"Search better, eat fatter :)"},{type:"input",name:"page1input",define:"Enter the name"},{type:"button",name:"page1button",targetElementID:"page1input",define:"YumE it!"},{type:"text",name:"page1text1",define:" "}]},e.prototype.returnCallbackFuncs=function(){return[{bindToName:"page1button",targetID:"page1text",callbackFunction:this.searchButtonCallBack}]},e.prototype.searchButtonCallBack=function(e,t){t&&""!=t?e.goPage("page2list"):e.showNotification("Please enter the name of restaurant.")},e}();t.page1search=a},function(e,t){"use strict";var a=function(){function e(){this.name="page2list",this.rawLayout=this.returnRawLayout(),this.afterRenderLayout=null,this.callback=this.returnCallbackFuncs()}return e.prototype.returnRawLayout=function(){return[{type:"text",name:"page2placeholder",define:" "},{type:"button",name:"home",define:"go back"},{type:"text",name:"page2placeholder",define:" "},{type:"image",name:"page2image",define:"./assets/cry.png"},{type:"text",name:"page2text",define:"I really love it"},{type:"button",name:"mapButton",define:"map"}]},e.prototype.returnCallbackFuncs=function(){return[{bindToName:"home",callbackFunction:this.goBackButtonCallBack},{bindToName:"mapButton",callbackFunction:this.goMapCallBack}]},e.prototype.goBackButtonCallBack=function(e){e.goPage("page1search")},e.prototype.goMapCallBack=function(e){e.goPage("page3Map")},e}();t.page2list=a},function(e,t){"use strict";var a=function(){function e(e){this._app=e}return e.prototype.getStartPageName=function(){return this._app.startPageName},e.prototype.getCurrentPageName=function(){return this._app.currentPageName},e.prototype.setCurrentPageName=function(e){this._app.currentPageName=e},e.prototype.getCurrentPage=function(){for(var e,t=this._app.currentPageName,a=0,r=this._app.pages;a<r.length;a++){var n=r[a];if(n.name===t){e=n;break}}return e},e.prototype.getPage=function(e){for(var t,a=0,r=this._app.pages;a<r.length;a++){var n=r[a];if(n.name===e){t=n;break}}return t},e.prototype.getPages=function(){return this._app.pages},e.prototype.emulatorCentralCallBack=function(e,t){var a=this.getStartPageName();t?this._app.CentralCallbackFunc(a,e.name,t):this._app.CentralCallbackFunc(a,e.name)},e.prototype.getAppCallBack=function(){return this._app.CentralCallbackFunc},e}();t.StateService=a},function(e,t){"use strict";var a=function(){function e(e){this._stateService=e}return e.prototype.createPage=function(e){for(var t,a=this,r=this.createLayout(),n=function(e){var n=o.createjQueryItem("div",void 0,"row",void 0),i=e;switch(i.type){case"button":var c=o.createjQueryItem("button",[{key:"id",value:i.name}],"btn btn-primary btn-lg btn-block",i.define);if(i.targetElementID?$(".emulator").on("click","#"+i.name,function(){var e=$("#"+i.targetElementID).val();a._stateService.emulatorCentralCallBack(i,e)}):$(".emulator").on("click","#"+i.name,function(){a._stateService.emulatorCentralCallBack(i)}),$(".btn",r).length){t=$(".btn",r);var s=12/(t.length+1);console.log("length is"+s),t.after(c),t=$(".btn",r),t.removeClass("btn-block"),t.addClass("col-sm-"+s),console.log("got here")}else n.append(c);break;case"text":var p=o.createjQueryItem("p",[{key:"id",value:i.name}],void 0,i.define);n.append(p);break;case"image":var u=o.createjQueryItem("img",[{key:"id",value:i.name},{key:"src",value:i.define}],"img-fluid");n.append(u);break;case"input":var l=o.createjQueryItem("div",void 0,"form-group"),g=o.createjQueryItem("label",[{key:"for",value:i.name}],"sr-only",i.define);l.append(g);var m=o.createjQueryItem("input",[{key:"type",value:"text"},{key:"id",value:i.name},{key:"for",value:i.name},{key:"placeholder",value:i.define}],"form-control",i.define);l.append(m),n.append(l);break;case"list":for(var h=o.createjQueryItem("div",void 0,"list-group"),f=i.define,d=function(e){var t=o.createjQueryItem("a",void 0,"list-group-item list-group-item-action");$(".emulator").on("click","#"+i.name,function(){a._stateService.emulatorCentralCallBack(i,e.url)});var r=o.createjQueryItem("h5",void 0,"list-group-item-heading",e.title),n=o.createjQueryItem("p",void 0,"list-group-item-text",e.description);t.append(r),t.append(n),h.append(t)},v=0,y=f;v<y.length;v++){var k=y[v];d(k)}n.append(h)}r.append(n)},o=this,i=0,c=e.rawLayout;i<c.length;i++){var s=c[i];n(s)}return r},e.prototype.createPagesAndSave=function(){for(var e=0,t=this._stateService.getPages();e<t.length;e++){var a=t[e];a.afterRenderLayout=this.createPage(a)}},e.prototype.createLayout=function(){return this.createjQueryItem("div",void 0,"container-fluid")},e.prototype.removeElementFromDOM=function(e){$(e).remove()},e.prototype.createjQueryItem=function(e,t,a,r){var n=$(document.createElement(e));if(a&&n.addClass(a),t)for(var o=0,i=t;o<i.length;o++){var c=i[o];n.attr(c.key,c.value)}return r&&n.html(r),n},e}();t.TemplatingService=a},function(e,t){"use strict";var a=function(){function e(e,t){this._templatingService=e,this._stateService=t}return e.prototype.removeCurrentPageFromScreen=function(){this._templatingService.removeElementFromDOM(".container-fluid")},e.prototype.goPage=function(e){this.removeCurrentPageFromScreen();for(var t=0,a=this._stateService.getPages();t<a.length;t++){var r=a[t];r.name===e&&($(".emulator").prepend(r.afterRenderLayout),this.renewCurrentPage(r.name))}},e.prototype.renderAllPages=function(e){if(e){var t=this._templatingService.createPage(e);this._stateService.getPage(e.name).afterRenderLayout=t}else this._templatingService.createPagesAndSave()},e.prototype.goStartPage=function(){this.goPage(this._stateService.getStartPageName())},e.prototype.renewCurrentPage=function(e){this._stateService.setCurrentPageName(e)},e.prototype.startEmulator=function(){var e=this,t=this._templatingService.createjQueryItem("div",void 0,"splashScreen"),a=this._templatingService.createjQueryItem("p",void 0,"brand","Smartisan");$(".emulator").append(t),t.append(a),t.fadeIn("slow",function(){a.fadeIn("slow").fadeOut("slow").fadeIn("slow",function(){e.hideSplashScreen(),e.renderAllPages(),e.goStartPage()})})},e.prototype.hideSplashScreen=function(){$(".splashScreen").fadeOut("slow").remove()},e.prototype.showNotification=function(e){var t=this._templatingService.createjQueryItem("div",void 0,"bg-danger",e);$(".emulator").prepend(t),setTimeout(function(){t.fadeOut("slow").remove()},2e3)},e}();t.SystemService=a},function(e,t){"use strict";var a=function(){function e(e){this._systemService=e}return e.prototype.goPage=function(e){this._systemService.goPage(e)},e.prototype.showNotification=function(e){this._systemService.showNotification(e)},e.prototype.saveToLocalStorage=function(e,t){localStorage.setItem(e,t)},e.prototype.getFromLocalStorage=function(e){return localStorage.getItem(e)},e.prototype.reRenderPage=function(e){this._systemService.renderAllPages(e)},e.prototype.callYelpSearchAPI=function(e,t){var a={consumerKey:"sNul62e6H0We5KJLGYP_Bw",consumerSecret:"RxvIBp4BxRvNVxjaPlUWuiPFcYg",accessToken:"nguVll4te_e1oDcv2EkS4xKC6GOoQhcN",accessTokenSecret:"DrumlhFl5Kwb1ksCpRKEtiW6B58",serviceProvider:{signatureMethod:"HMAC-SHA1"}},r=e,n="Dunedin",o="restaurants,food,bars",i={consumerSecret:a.consumerSecret,tokenSecret:a.accessTokenSecret},c=[];c.push(["term",r]),c.push(["location",n]),c.push(["category_filter",o]),c.push(["callback","cb"]),c.push(["oauth_consumer_key",a.consumerKey]),c.push(["oauth_consumer_secret",a.consumerSecret]),c.push(["oauth_token",a.accessToken]),c.push(["oauth_signature_method","HMAC-SHA1"]);var s={action:"https://api.yelp.com/v2/search",method:"GET",parameters:c};OAuth.setTimestampAndNonce(s),OAuth.SignatureMethod.sign(s,i);var p=OAuth.getParameterMap(s.parameters);$.ajax({url:s.action,data:p,dataType:"jsonp",jsonpCallback:"cb",cache:!0}).done(function(e,a,r){t(e.businesses[0])}).fail(function(e,t,a){console.log("error["+a+"], status["+t+"], jqXHR["+JSON.stringify(e)+"]")})},e}();t.ActionService=a},function(e,t){"use strict";var a=function(){function e(){this.defaultMap="https://maps.googleapis.com/maps/api/staticmap?&size=300x230&maptype=roadmap&visible=Octagon,Dunedin,NZ&markers=color:yellow%7Clabel:U%7C-45.8743,170.5036&key=AIzaSyDHTnM42xU_IGgOk0OGswZGOAtDRr8e66I",this.name="page3Map",this.rawLayout=this.returnRawLayout(),this.afterRenderLayout=null,this.callback=this.returnCallbackFuncs()}return e.prototype.returnRawLayout=function(){return[{type:"text",name:"page2placeholder",define:" "},{type:"button",name:"home",define:"go back"},{type:"text",name:"page2placeholder",define:" "},{type:"image",name:"page3image",define:this.defaultMap}]},e.prototype.returnCallbackFuncs=function(){return[{bindToName:"home",callbackFunction:this.goBackButtonCallBack}]},e.prototype.goBackButtonCallBack=function(e){e.goPage("page1search")},e}();t.page3Map=a}]);
//# sourceMappingURL=index.bundle.js.map