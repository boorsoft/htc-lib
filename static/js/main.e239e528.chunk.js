(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{14:function(e,t,a){},21:function(e,t,a){},25:function(e,t,a){e.exports=a(39)},30:function(e,t,a){},31:function(e,t,a){},33:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(23),c=a.n(r),s=a(4),l=a(5),i=a(7),u=a(6),m=(a(14),a(30),"https://htc-lib.herokuapp.com"),h=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).onChange=function(){var e=document.querySelector("#filter"),t=document.querySelector("#searchInput");"teacher"===e.value?t.placeholder="Enter the teacher name...":"book"===e.value?t.placeholder="Enter the book title...":"subject"===e.value&&(t.placeholder="Enter the subject name..."),n.setState({query:e.value})},n.onInputChange=function(){var e=document.querySelector("#searchInput");""!==e.value?fetch("".concat(m,"/api/books?").concat(n.state.query,"=").concat(e.value.trim())).then((function(e){return e.json()})).then((function(e){n.setState({books:e}),n.props.passBooks(e)})):n.setState({books:[]})},n.state={query:"book",books:[]},n}return Object(l.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:"SearchBar"},o.a.createElement("div",{className:"search-container"},o.a.createElement("input",{id:"searchInput",className:"search-input text-color-black",type:"text",placeholder:"Enter the book title...",onChange:this.onInputChange}),o.a.createElement("div",{className:"select-wrapper"},o.a.createElement("select",{name:"filter",id:"filter",onChange:this.onChange,defaultValue:"book"},o.a.createElement("option",{value:"book"},"Book"),o.a.createElement("option",{value:"teacher"},"Teacher"),o.a.createElement("option",{value:"subject"},"Subject")))))}}]),a}(o.a.Component),p=(a(21),function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:"SingleResult",title:this.props.book.title},o.a.createElement("div",{className:"TitlesBox"},o.a.createElement("h1",{className:"TitleName"},this.props.book.title),o.a.createElement("h1",{className:"AuthorName"},this.props.book.author)),o.a.createElement("div",{className:"Buttons"},o.a.createElement("a",{title:"Download the book",className:"ButtDownloadFile fas fa-cloud-download-alt",href:this.props.book.filename+"?export=download"}),o.a.createElement("a",{title:"Open in new TAB",className:"ButtOpenNewTab fas fa-external-link-square-alt",href:this.props.book.filename,target:"_blank"})))}}]),a}(o.a.Component)),d=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:"Results"},this.props.books.map((function(e){return o.a.createElement(p,{key:e.book_id,book:e})})))}}]),a}(o.a.Component),b=(a(31),a(12)),f=a.n(b),k=a(16),v=(a(33),a(1)),E=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).setToken=function(e){localStorage.setItem("token",e)},n.onInputChange=function(){var e=document.querySelector("#username"),t=document.querySelector("#password");n.setState({username:e.value,password:t.value})},n.submitUser=Object(k.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(m,"/user/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n.state.username,password:n.state.password})});case 2:return 401!==(t=e.sent).status&&404!==t.status||console.error("Authorization failed"),e.abrupt("return",t.json());case 5:case"end":return e.stop()}}),e)}))),n.onSubmit=function(){var e=Object(k.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),console.log("submiting"),n.submitUser().then((function(e){n.setToken(e.token),console.log("Token: ",e.token),n.setState({redirect:!0})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={username:"",password:"",redirect:!1},n}return Object(l.a)(a,[{key:"render",value:function(){return this.state.redirect?o.a.createElement(v.a,{to:"/admin"}):o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"LoginFormContainer"},o.a.createElement("form",{className:"loginForm",onSubmit:this.onSubmit},o.a.createElement("div",{className:"input-container"},o.a.createElement("input",{id:"username",className:"username text-input",type:"text",placeholder:"Enter your username...",onChange:this.onInputChange})),o.a.createElement("div",{className:"input-container"},o.a.createElement("input",{id:"password",className:"password text-input",type:"password",placeholder:"Enter your password...",onChange:this.onInputChange})),o.a.createElement("div",{className:"input-container"},o.a.createElement("input",{type:"submit",className:"submitButton",value:"Login"})))))}}]),a}(o.a.Component),y=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).getToken=function(){return localStorage.getItem("token")},n.logout=function(){localStorage.clear(),n.setState({redirect:!1})},n.onInputChange=function(){var e=document.querySelector("#title"),t=document.querySelector("#author"),a=document.querySelector("#teacher"),o=document.querySelector("#subject"),r=document.querySelector("#filename");n.setState({bookToAdd:{title:e.value,author:t.value,teacher:a.value,subject:o.value,filename:r.value}})},n.submitBook=function(e){e.preventDefault(),fetch("".concat(m,"/api/books"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:n.state.bookToAdd.title,author:n.state.bookToAdd.author,teacher:n.state.bookToAdd.teacher,subject:n.state.bookToAdd.subject,filename:n.state.bookToAdd.filename,token:n.state.token})}).then((function(e){return e.status})).then((function(e){return console.log(e)})).catch((function(e){return console.error(e)})),n.setState({formOpen:!1,bookToAdd:{title:"",author:"",teacher:"",subject:"",filename:""}})},n.updateBook=function(e){fetch("".concat(m,"/api/books/").concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:n.state.bookToAdd.title,author:n.state.bookToAdd.author,teacher:n.state.bookToAdd.teacher,subject:n.state.bookToAdd.subject,filename:n.state.bookToAdd.filename,token:n.state.token})}).then((function(e){return e.status})).then((function(e){return console.log(e)})).catch((function(e){return console.error(e)}))},n.deleteBook=function(e){fetch("".concat(m,"/api/books/").concat(e),{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:n.state.token})}).then((function(e){return e.status})).then((function(e){return console.log(e)})).catch((function(e){return console.error(e)}))},n.openForm=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};n.setState({formOpen:!0,updateForm:!1});var a=document.querySelector("#title"),o=document.querySelector("#author"),r=document.querySelector("#teacher"),c=document.querySelector("#subject"),s=document.querySelector("#filename");a.value="",o.value="",r.value="",c.value="",s.value="",e&&(a.value=t.title,o.value=t.author,r.value=t.teacher,c.value=t.subject,s.value=t.filename,n.setState({updateForm:!0,bookToUpdateID:t.book_id,bookToAdd:{title:a.value,author:o.value,teacher:r.value,subject:c.value,filename:s.value}}))},n.closeForm=function(){n.setState({formOpen:!1})},n.state={books:[],redirect:!1,token:"",formOpen:!1,updateForm:!1,bookToUpdateID:null,bookToAdd:{title:"",author:"",teacher:"",subject:"",filename:""}},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(m,"/api/books")).then((function(e){return e.json()})).then((function(t){e.setState({books:t})}));var t=this.getToken();this.setState({token:t}),console.log("State",this.state)}},{key:"render",value:function(){var e=this,t=this.getToken(),a=this.state.formOpen;return t?this.state.redirect?o.a.createElement(E,null):o.a.createElement("div",{className:"App"},o.a.createElement("div",{id:"closer",onClick:this.closeForm,style:{display:a?"block":"none"}}),o.a.createElement("div",{className:"dashboard-container flex-column"},o.a.createElement("div",{className:"header-container flex-row"},o.a.createElement("h1",{className:"header-text"},"Dashboard"),o.a.createElement("i",{className:"fas fa-plus icon",id:"addBooks",onClick:function(){return e.openForm()}}),o.a.createElement("i",{className:"fa fa-power-off icon",id:"logoutButton",onClick:this.logout})),o.a.createElement("div",{className:"container books-list flex-column"},o.a.createElement("div",{className:"books-list-header flex-row"},o.a.createElement("p",{className:"booklist-header-text"},"Title"),o.a.createElement("p",{className:"booklist-header-text"},"Author"),o.a.createElement("p",{className:"booklist-header-text"},"Subject"),o.a.createElement("p",{className:"booklist-header-text"},"Teacher"),o.a.createElement("p",{className:"booklist-header-text"},"Filename")),this.state.books.map((function(t){return o.a.createElement("div",{className:"book-element flex-row",key:t.book_id,book:t,onClick:function(){return e.openForm(!0,t)}},o.a.createElement("p",{className:"title-text"},t.title),o.a.createElement("p",{className:"title-text"},t.author),o.a.createElement("p",{className:"title-text"},t.subject),o.a.createElement("p",{className:"title-text"},t.teacher),o.a.createElement("p",{className:"title-text"},t.filename))}))),o.a.createElement("div",{className:"add-book-form-container",style:{display:a?"flex":"none"}},o.a.createElement("form",{className:"add-book-form flex-column",onSubmit:this.state.updateForm?this.updateBook(this.state.bookToUpdateID):this.submitBook},o.a.createElement("input",{type:"text",name:"title",id:"title",className:"input",placeholder:"Title",onChange:this.onInputChange}),o.a.createElement("input",{type:"text",name:"author",id:"author",className:"input",placeholder:"Author",onChange:this.onInputChange}),o.a.createElement("input",{type:"text",name:"teacher",id:"teacher",className:"input",placeholder:"Teacher",onChange:this.onInputChange}),o.a.createElement("input",{type:"text",name:"subject",id:"subject",className:"input",placeholder:"Subject",onChange:this.onInputChange}),o.a.createElement("input",{type:"text",name:"filename",id:"filename",className:"input",placeholder:"Filename",onChange:this.onInputChange}),o.a.createElement("div",{className:"flex-row buttons-container"},o.a.createElement("input",{type:"submit",className:"submitBook",value:this.state.updateForm?"Update":"Submit"}),this.state.updateForm?o.a.createElement("button",{className:"submitBook delete-book",onClick:this.deleteBook(this.state.bookToUpdateID)},"Delete"):null))))):o.a.createElement(E,{token:t})}}]),a}(o.a.Component),N=a(15),g=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).passBooks=function(e){n.setState({books:e}),console.log(n.state.books)},n.state={books:[]},n}return Object(l.a)(a,[{key:"render",value:function(){var e=this;return o.a.createElement(N.a,null,o.a.createElement(v.b,{path:"/",exact:!0,render:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(h,{passBooks:e.passBooks})," ",o.a.createElement(d,{books:e.state.books}))}}),o.a.createElement(v.b,{path:"/admin",component:y}))}}]),a}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[25,1,2]]]);
//# sourceMappingURL=main.e239e528.chunk.js.map