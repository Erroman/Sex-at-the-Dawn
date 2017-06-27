/*1374586117,173206321*/

if (self.CavalryLogger) { CavalryLogger.start_js(["oUgCC"]); }

__d("WindowComm",["URI"],function(a,b,c,d,e,f){var g=b('URI'),h={_callbacks:{},makeHandler:function(i,j){j=j||'opener';var k='f'+(Math.random()*(1<<30)).toString(16).replace('.','');h._callbacks[k]=i;return new g('/connect/window_comm.php').setQueryData({_id:k,_relation:j}).getQualifiedURI().toString();},_recv:function(i){var j=new g(i).getQueryData();h._callbacks[j._id](j);}};e.exports=h;a.WindowComm=h;});
__d("OpenIDRequest",["AsyncRequest","AsyncSignal","URI","UserAgent","coalesce","copyProperties","createArrayFrom"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('AsyncSignal'),i=b('URI'),j=b('UserAgent'),k=b('coalesce'),l=b('copyProperties'),m=b('createArrayFrom');function n(){var o=new g().setReadOnly(true).setHandler(this.asyncResponseHandler.bind(this)).setErrorHandler(this.asyncErrorHandler.bind(this));l(this,{openidUrl:null,requestId:n.maxRequestId++,successResponseHandler:null,cancelHandler:null,intermediateHandler:null,immediateMode:false,useExtensions:true,thirdPartyLogin:false,popupWindow:null,asyncRequest:o,retryCount:0});n.requests[this.requestId]=this;}n.getRequestById=function(o){return n.requests[o];};n.prototype.setOpenIDUrl=function(o){this.openidUrl=o;return this;};n.prototype.setSuccessHandler=function(o){this.successResponseHandler=o;return this;};n.prototype.setErrorHandler=function(o){this.errorHandler=o;return this;};n.prototype.setCancelHandler=function(o){this.cancelHandler=o;return this;};n.prototype.setImmediateMode=function(o){this.immediateMode=o;return this;};n.prototype.setUseExtensions=function(o){this.useExtensions=o;return this;};n.prototype.setIntermediateHandler=function(o){this.intermediateHandler=o;return this;};n.prototype.setThirdPartyLogin=function(o){this.thirdPartyLogin=o;return this;};n.prototype.send=function(){if(!this.openidUrl)throw "openidUrl is a required parameter. Call setOpenIDUrl()";var o=this.calculateRedirectUrl();if(!o){this.logMetrics('redirectUrlNotFound');return;}if(this.immediateMode){this.createHiddenIframe(o);}else{if(this.popupWindow)throw "OpenID popup is already in progress";this.showPopup(o);}this.logMetrics('requestSent');};n.prototype.calculateRedirectUrl=function(o){var p=this.immediateMode?'checkid_immediate':'checkid_setup',q={'openid.mode':p},r;if(!n.cache[this.openidUrl])return null;r=n.cache[this.openidUrl].url;var s=i(i(r).getQueryData()['openid.return_to']);s.addQueryData({context:n.context,request_id:this.requestId});q['openid.return_to']=s.toString();q.third_party_login=this.thirdPartyLogin;return i(r).addQueryData(q).getQualifiedURI();};n.prototype.createHiddenIframe=function(o){var p='openid_request_'+this.requestId,q=document.body.appendChild(document.createElement('div')),r=function(){q.innerHTML=('<iframe name="'+p+'"'+' src="'+o.toString()+'"'+' scrolling="no" '+' frameborder="0" class="hidden_elem"></iframe>');};if(j.ie()){q.innerHTML='<iframe src="javascript:false"></iframe>';r.defer();}else r();};n.prototype.showPopup=function(o){var p;if(n.cache[this.openidUrl])p=n.cache[this.openidUrl].popup_dimensions;if(!p||!p.height||!p.width)p={height:'580',width:'790'};var q={x:k(window.screenX,window.screenLeft),y:k(window.screenY,window.screenTop),width:k(window.outerWidth,document.body.clientWidth),height:k(window.outerHeight,document.body.clientHeight)},r=q.x+((q.width-p.width)/2),s=q.y+((q.height-p.height)/2),t=["location=yes","scrollbars=1","left="+r,"top="+s,"resizable=yes","height="+p.height,"width="+p.width].join(",");this.popupWindow=window.open(o.toString(),'_blank',t);this.popupPollInterval=setInterval(this.pollPopupWindow.bind(this),100);this.popupWindow.focus();};n.prototype.pollPopupWindow=function(){if(!(this.popupPollInterval&&this.popupWindow))return;if(this.popupWindow.closed){clearInterval(this.popupPollInterval);this.cancel();}};n.prototype.closePopupIfOpen=function(){if(this.popupWindow){if(this.popupPollInterval)clearInterval(this.popupPollInterval);this.popupWindow.close();}this.popupWindow=null;};n.prototype.cancel=function(){this.closePopupIfOpen();if(this.cancelHandler)this.cancelHandler();this.logMetrics('requestCanceled');};n.prototype.logMetrics=function(o){new h('/ajax/openid/metrics.php',{metric:o,immediate:this.immediateMode,context:n.context,openid_url:this.openidUrl}).send();};n.prototype.triggerCompleteAuthAsync=function(o){if(o.charAt(0)=='?'||o.charAt(0)=='&')o=o.substr(1);var p=i.explodeQuery(o);this.closePopupIfOpen();if(p['openid.mode']=='cancel'){this.cancel();return;}if(this.intermediateHandler)this.intermediateHandler();this.asyncRequest.setData({openid_params:p}).send();};n.prototype.asyncResponseHandler=function(o){var p=o.getPayload();if(this.successResponseHandler)this.successResponseHandler(p);this.closePopupIfOpen();};n.prototype.cleanHandleResponse=function(o){if(o.css)o.css=m(o.css);this.asyncRequest.handleResponse(o);};n.prototype.asyncErrorHandler=function(o){this.closePopupIfOpen();if(o.error==1428010||o.error==1428011){this.cancel();return;}if(this.errorHandler)this.errorHandler(o);};n.prototype.retry=function(){++this.retryCount;this.requestId=n.maxRequestId++;this.send();};n.prototype.setProviderCache=function(o){n.cache=o;return this;};n.cache={};n.requests=[];n.maxRequestId=0;n.context='default';e.exports=n;});
__d("WidgetArbiter",["createArrayFrom"],function(a,b,c,d,e,f){var g=b('createArrayFrom'),h={_findSiblings:function(){if(h._siblings)return;h._siblings=[];for(var i=parent.frames.length-1;i>=0;i--)try{if(parent.frames[i]&&parent.frames[i].Arbiter&&parent.frames[i].Arbiter.inform)h._siblings.push(parent.frames[i].Arbiter);}catch(j){}},inform:function(){h._findSiblings();var i=g(arguments);h._siblings.forEach(function(j){j.inform.apply(j,i);});}};e.exports=h;});
__d("PlatformOptInPopup",["PopupWindow","URI","copyProperties"],function(a,b,c,d,e,f){var g=b('PopupWindow'),h=b('URI'),i=b('copyProperties'),j=function(){};i(j,{DIALOG_URL:'/connect/uiserver.php',DIALOG_WIDTH:420,DIALOG_HEIGHT:450,APP_ID:127760087237610,open:function(k,l,m){if(!k)k='generic';if(!l)l='plugin.optin';var n=new h(j.DIALOG_URL);n.addQueryData({social_plugin:k,method:l,display:'popup',secure:h.getRequestURI().isSecure(),app_id:j.APP_ID});if(m)n.addQueryData(m);return g.open(n.toString(),j.DIALOG_WIDTH,j.DIALOG_HEIGHT);}});e.exports=j;});
__d("Feedback",["AsyncRequest","CSS","Dialog","DOM","Event","Input","LegacyContextualDialog","MentionsInput","Parent","PlatformOptInPopup","Style","Vector","$","tx"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('CSS'),i=b('Dialog'),j=b('DOM'),k=b('Event'),l=b('Input'),m=b('LegacyContextualDialog'),n=b('MentionsInput'),o=b('Parent'),p=b('PlatformOptInPopup'),q=b('Style'),r=b('Vector'),s=b('$'),t=b('tx'),u={comments:{},registerComment:function(v,w){u.comments[v]=w;return u;},getRegisteredComment:function(v){return u.comments[v];},deleteClickHandler:function(v,w,x,y,z,aa){var ba=new i().setTitle("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u044e?").setBody("\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435?").setButtons([i.newButton('delete',"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"),i.CANCEL]).setHandler(function(event){new g().setURI('/ajax/connect/feedback.php').setData({command:'delete',url:v,uniqid:y,owns_pages:z,controller_id:x,locale:aa,comment_id:w}).send();}.bind(this)).show();},resizeCommentas:function(v){var w=j.scry(v,'div.post')[0];if(w){var x=r.getElementDimensions(w).x;if(x){var y=j.find(w,'.commentas'),z=r.getElementDimensions(y).x;if((x-z)<190&&(x-190)>60){q.set(y,'width',x-190+'px');var aa=j.scry(y,'span.commentas_inner')[0];if(aa){var ba=r.getElementDimensions(aa).x;q.set(y,'width',ba+'px');}}}}},exposeContextualDialogReply:function(v){var w=s(v),x=w.parentNode.parentNode;h.show(j.find(x,"form"));j.find(x,"textarea").focus();return false;},concealContextualDialogReply:function(v){var w=s(v),x=w.parentNode.parentNode,y=j.find(x,"form"),z=j.find(x,"textarea"),aa=z.value.length;if(!l.getValue(z))h.hide(y);return false;},closeContextualDialog:function(v){var w=m.getInstance(s(v));w.hide();return false;},_clickLocked:false,attachOptInClickListener:function(v){k.listen(v,'click',function(w){k.kill(w);if(!this._clickLocked){this._clickLocked=true;setTimeout(function(){this._clickLocked=false;}.bind(this),1000);p.open('feedback','plugin.optin');}});},attachReplyListener:function(v){if(!v)return;var w=j.find(v,'textarea');v.suppressBlur=false;k.listen(v,'click',function(x){var y=x.getTarget(),z=o.byClass(y,'commentas')!==null,aa=o.byClass(y,'uiButton')!==null,ba=o.byClass(y,'uiSelector')!==null;v.suppressBlur=z||aa||ba;});k.listen(w,'blur',function(x,y){if(v.interval)return;v.interval=setInterval((function(z,aa){if(z.suppressBlur||l.getValue(aa)||aa==document.activeElement)return;h.hide(z);z.suppressBlur=false;clearInterval(z.interval);delete z.interval;}).curry(v,x),100);}.curry(w));},attachReplyClickListener:function(v,w,x){if(!v)return;var y=j.find(v,'textarea');k.listen(w,'click',function(z){h.show(v);y.focus();(function(){var aa=n.getInstance(y);if(!x.isViewer&&x.isReply)if(aa){var ba=aa.getMentions();if(!ba[x.uid]&&l.getValue(y)==='')aa.addMention(x);}else l.setValue(y,x.text+' ');z.preventDefault();}).bind(this).defer();});},resetInput:function(v){var w=n.getInstance(v);if(w){w.reset();}else l.setValue(v,'');}};e.exports=a.Feedback||u;});
__d("CommentAdminPanelController",["Arbiter","AsyncRequest","Button","ChannelConstants","CSS","DOM","Event","Feedback","Parent","Toggler","XD","URI","$","copyProperties","ge","startsWith","MultiLoginPopup"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('AsyncRequest'),i=b('Button'),j=b('ChannelConstants'),k=b('CSS'),l=b('DOM'),m=b('Event'),n=b('Feedback'),o=b('Parent'),p=b('Toggler'),q=b('XD').UnverifiedXD,r=b('URI'),s=b('$'),t=b('copyProperties'),u=b('ge'),v=b('startsWith'),w=function(x){t(this,{locale:x.locale,channel:x.channel,controllerID:x.controllerID,commentIDs:x.commentIDs,domIDs:x.domIDs,duplicateComments:[],fetchMoreCommentsIsPending:{},blacklistedActors:x.blacklistedActors,actorToCommentInfoMap:x.actorToCommentIDMap,commentInfoMap:x.commentInfoMap,inAggregatedView:x.inAggregatedView,inModerationQueue:x.inModerationQueue,inContextualDialog:x.inContextualDialog,isTopLevelCommentPollingEnabled:false,loggedIn:x.loggedIn,newestCommentTimestamp:x.newestCommentTimestamp,realTimePollingParams:{},userOwnsPages:x.userOwnsPages,recentlyBlacklistedActors:x.blacklistedActors});g.subscribe(j.getArbiterType('comments_plugin_new_post'),function(y,z){if(z.obj.target===this.realTimePollingParams.target){if(u(z.obj.comment_element_id))return;var aa=t({},this.realTimePollingParams);aa.post_fbid=z.obj.post_fbid;var ba=z.obj.parent_comment_id;if(ba){var ca=u(ba);if(!ca)return;var da=l.scry(ca,'.fbFeedbackPager.uiMorePager');if(da.length>0)return;aa.parent_comment_id=ba;aa.is_reply_thread=true;}else{if(!this.isTopLevelCommentPollingEnabled)return;aa.is_reply_thread=false;}this.pollForComments(aa);}}.bind(this));this.controlledRegion=s(this.controllerID);this.attachClickHandlers();if(this.inModerationQueue)this.registerModeratorQueueHandlers(true);if(this.inContextualDialog)this.attachContextualDialogHandlers();if(!this.inAggregatedView)q.init({autoResize:true,channelUrl:x.channel,hideOverflow:true,resizeWidth:false});};t(w,{allControllers:{},mainController:null,contextualControllers:{},initController:function(x){var y=new w(x),z=x.controllerID;w.allControllers[z]=y;if(y.inContextualDialog){w.contextualControllers[z]=y;}else w.mainController=y;},syncController:function(x,y){var z=w.allControllers[x];z.attachClickHandlers();if(!z.isControllingModerationQueue())return;z.deselectComments(y);z.registerModeratorQueueHandlers(false);z.synchronizeModeratorQueueUI();},resetController:function(x){var y=w.allControllers[x];y.resetController();},appendComments:function(x,y,z){var aa=w.allControllers[x];aa.appendComments(y,z);},prependComments:function(x,y,z){var aa=w.allControllers[x];aa.prependComments(y,z);},updateController:function(x,y,z,aa,ba,ca,da){var ea=w.allControllers[x];ea.updateController(y,z,aa,ba,ca,da);if(!w.mainController.loggedIn)b('MultiLoginPopup').reattachLoginInterceptors();if(!ea.isControllingModerationQueue())return;ea.registerModeratorQueueHandlers(false);ea.synchronizeModeratorQueueUI();},updatePollingParamsCommentas:function(x,y){var z=w.allControllers[x];z.updatePollingParamsCommentas(y);},registerMoreCommentsLinkHandler:function(x,y){var z=w.allControllers[x];z.registerMoreCommentsLinkHandler(y);},replaceContentMaybe:function(x,y){var z=l.scry(document.documentElement,x)[0];if(z)l.replace(z,y);},notifyCommentCreated:function(x){if(!w.mainController.channel)return;q.send({type:'commentCreated',href:x.href,parentCommentID:x.parentCommentID,commentID:x.commentID});},notifyCommentRemoved:function(x){if(!w.mainController.channel)return;q.send({type:'commentRemoved',href:x.href,commentID:x.commentID});},markAsShowingAllReplies:function(x){var y=x+' a.fbUpDownVoteOption',z=l.scry(document.documentElement,y),aa=x+' li.fbUpDownVoteOption a.itemAnchor',ba=l.scry(document.documentElement,aa),ca=z.concat(ba);for(var da=0;da<ca.length;da++){var ea=ca[da],fa=new r(ea.getAttribute('ajaxify'));fa.addQueryData({show_all_replies:1});ea.setAttribute('ajaxify',fa.toString());}},setLoggedIn:function(x){w.mainController.loggedIn=x;}});t(w.prototype,{isControllingModerationQueue:function(){var x=this==w.mainController&&this.inModerationQueue;return x;},resetController:function(){this.commentIDs=[];this.domIDs=[];},updateController:function(x,y,z,aa,ba,ca){x.forEach(function(ea){this.commentIDs.push(ea);},this);y.forEach(function(ea){this.domIDs.push(ea);},this);t(this.blacklistedActors,aa);for(var da in ba){if(!this.actorToCommentInfoMap[da])this.actorToCommentInfoMap[da]=[];ba[da].forEach(function(ea){this.actorToCommentInfoMap[da].push(ea);},this);}this.newestCommentTimestamp=Math.max(this.newestCommentTimestamp,z);t(this.commentInfoMap,ca);this.attachClickHandlers();},updatePollingParamsCommentas:function(x){this.realTimePollingParams.commentas=x;},attachClickHandlers:function(){for(var x=0;x<this.domIDs.length;x++){var y='li[id="'+this.domIDs[x]+'"]',z=l.scry(this.controlledRegion,y);if(z.length===0)continue;var aa=z[0],ba=l.scry(aa,'a.uiCloseButton');m.listen(aa,'mouseleave',this.closeStickyMenuFlyouts.bind(this,ba));var ca=l.scry(aa,'.fbModerateDropdownContainer');if(ca.length>0){var da=ca[0],ea=l.find(da,'.fbModerateDropdownLink');m.listen(ea,'mouseover',function(na,event){k.addClass(na,'fbUnderlineText');}.curry(ea));m.listen(ea,'mouseout',function(na,event){k.removeClass(na,'fbUnderlineText');}.curry(ea));var fa=l.find(da,'.fbModerationDropdownList');m.listen(ea,'click',this.exposeDropDownMenu.bind(this,ea,fa));m.listen(fa.parentNode,'mouseleave',this.concealDropDownMenu.bind(this,ea,fa));this.attachDropDownHandlers(aa,this.commentIDs[x],fa);}var ga=this.commentInfoMap[this.commentIDs[x]].actor,ha=!!this.recentlyBlacklistedActors[ga];if(ha){var ia=l.scry(aa,'.fbUndoBlacklistLink');if(ia.length>0){var ja=ia[0];m.listen(ja,'click',this.toggleBlackListAndSync.bind(this,this.commentIDs[x]));}}}var ka=l.scry(this.controlledRegion,'.fbReplyButton'),la=l.scry(this.controlledRegion,'.fbReplyAfterLoginButton');for(var ma=0;ma<ka.length;ma++)if(this.loggedIn){k.show(ka[ma]);k.hide(la[ma]);}else{k.hide(ka[ma]);k.show(la[ma]);}},closeStickyMenuFlyouts:function(x,event){p.hide();for(var y=0;y<x.length;y++)x[y].blur();},attachDropDownHandlers:function(x,y,z){var aa=l.scry(z,'.fbBanUser');if(aa.length>0){var ba=aa[0],ca=l.find(ba,'^.fbFeedbackPost');if(v(ca.id,y))m.listen(ba,'click',this.toggleBlackListAndSync.bind(this,y));}},exposeDropDownMenu:function(x,y,event){if(k.shown(y))return this.concealDropDownMenu(x,y,event);m.stop(event);k.show(y);y.focus();x.blur();return false;},concealDropDownMenu:function(x,y,event){m.stop(event);k.removeClass(x,'fbUnderlineText');k.hide(y);x.blur();return false;},registerMoreCommentsLinkHandler:function(x){var y=x.pager_id;if(!u(y))return;var z=s(y);m.listen(z,'click',this.fetchMoreComments.bind(this,x,z));},deselectComments:function(x){for(var y=0;y<x.length;y++)delete this.selectedCommentsMap[x[y]];},registerModeratorQueueHandlers:function(x){if(x)this.selectedCommentsMap={};this.selectableComments=this.findSelectableComments();this.selectableCheckboxes=[];this.selectAllCheckBoxes=l.scry(this.controlledRegion,'.fbSelectAllCheckbox');this.approveButtons=l.scry(this.controlledRegion,'.fbApproveButton');this.removeButtons=l.scry(this.controlledRegion,'.fbRemoveButton');for(var y=0;y<this.selectableComments.length;y++){var z=this.selectableComments[y].id,aa=!!this.selectedCommentsMap[z];this.setCommentSelection(this.selectableComments[y],aa);var ba=l.find(this.selectableComments[y],'.fbCommentCheckbox');m.listen(ba,'click',this.toggleCommentSelection.bind(this));m.listen(this.selectableComments[y],'click',this.toggleCommentSelection.bind(this));ba.checked=aa;this.selectableCheckboxes.push(ba);}for(var ca=0;ca<this.selectAllCheckBoxes.length;ca++){this.selectAllCheckBoxes[ca].checked=false;this.selectAllCheckBoxes[ca].disabled=this.selectableComments.length===0;m.listen(this.selectAllCheckBoxes[ca],'click',this.toggleSelectAllCheckbox.bind(this,this.selectAllCheckBoxes[ca]));}for(var da=0;da<this.approveButtons.length;da++)m.listen(this.approveButtons[da],'click',this.setBulkPrivacy.bind(this,false));for(var ea=0;ea<this.removeButtons.length;ea++)m.listen(this.removeButtons[ea],'click',this.setBulkPrivacy.bind(this,true));},findSelectableComments:function(){var x=l.scry(this.controlledRegion,'.fbTopLevelComment'),y=[];for(var z=0;z<x.length;z++)if((l.scry(x[z],'.fbCommentCheckbox').length===1)&&(l.scry(x[z],'.fbCommentOverlay').length===0))y.push(x[z]);return y;},toggleCommentSelection:function(event){var x={a:true},y=event.getTarget(),z=y.tagName.toLowerCase(),aa=y.parentNode.tagName.toLowerCase();if(x[z]||x[aa])return;var ba=k.hasClass(y,'fbFeedbackPost')?y:l.find(y,'^.fbFeedbackPost'),ca=this.commentIsSelected(ba),da=!ca;this.setCommentSelection(ba,da);this.synchronizeModeratorQueueUI();if(k.hasClass(y,'fbCommentCheckbox'))m.stop(event);},commentIsSelected:function(x){return k.hasClass(x,'fbCommentSelected');},setCommentSelection:function(x,y){if(y){this.selectComment(x);}else this.deselectComment(x);},selectComment:function(x){k.addClass(x,'fbCommentSelected');this.selectedCommentsMap[x.id]=true;l.find(x,'.fbCommentCheckbox').checked=true;},deselectComment:function(x){k.removeClass(x,'fbCommentSelected');delete this.selectedCommentsMap[x.id];l.find(x,'.fbCommentCheckbox').checked=false;},toggleSelectAllCheckbox:function(x,event){m.stop(event);var y=x.checked;for(var z=0;z<this.selectableComments.length;z++){this.setCommentSelection(this.selectableComments[z],x.checked);this.selectableCheckboxes[z].checked=y;}this.synchronizeBulkModerationCheckboxes(y);this.synchronizeBulkModerationButtons(y);},synchronizeModeratorQueueUI:function(){var x=0;for(var y=0;y<this.selectableCheckboxes.length;y++)if(this.selectableCheckboxes[y].checked)x++;var z=this.selectableCheckboxes.length>0&&x==this.selectableCheckboxes.length;this.synchronizeBulkModerationCheckboxes(z);this.synchronizeBulkModerationButtons(x>0);},synchronizeBulkModerationCheckboxes:function(x){for(var y=0;y<this.selectAllCheckBoxes.length;y++)this.selectAllCheckBoxes[y].checked=x;},synchronizeBulkModerationButtons:function(x){for(var y=0;y<this.approveButtons.length;y++)i.setEnabled(this.approveButtons[y],x);for(var z=0;z<this.removeButtons.length;z++)i.setEnabled(this.removeButtons[z],x);},setBulkPrivacy:function(x,event){m.stop(event);this.synchronizeBulkModerationButtons(false);var y=[];for(var z in this.selectedCommentsMap)y.push(z);var aa={is_private:x,in_moderation_queue:true,comment_ids:y,uniqids:y,controller_id:this.controllerID,locale:this.locale,owns_pages:this.userOwnsPages,in_aggregated_view:this.inAggregatedView,in_contextual_dialog:this.inContextualDialog};new h().setURI('/ajax/connect/comments/set_bulk_private.php').setData(aa).send();return false;},toggleBlackListAndSync:function(x,event){m.stop(event);var y=this.commentInfoMap[x].actor,z={blacklist:!this.blacklistedActors[y],in_moderation_queue:this.inModerationQueue,comment_id:x,other_comment_ids:this.getOtherCommentsByActor(y,x),uniqid:x,controller_id:this.controllerID,locale:this.locale,owns_pages:this.userOwnsPages,in_aggregated_view:this.inAggregatedView,in_contextual_dialog:this.inContextualDialog};new h().setURI('/ajax/connect/comments/set_blacklist.php').setData(z).setHandler(function(aa){this.blacklistedActors[y]=!this.blacklistedActors[y];if(this.blacklistedActors[y]){this.recentlyBlacklistedActors[y]=true;}else delete this.recentlyBlacklistedActors[y];}.bind(this)).send();return false;},getOtherCommentsByActor:function(x,y){return this.actorToCommentInfoMap[x].filter(function(z){return z!=y;});},fetchMoreComments:function(x,y,event){m.kill(event);k.addClass(y,'async_saving');if(this.fetchMoreCommentsIsPending[x.pager_id]===true)return;this.fetchMoreCommentsIsPending[x.pager_id]=true;var z={is_reply_thread:false,in_moderation_queue:false,view_as_moderator:false};t(z,x);z.offset=this.getVisibleCommentCount(z);if(!z.aggregate_view)delete z.aggregate_view;if(!z.comment_id)delete z.comment_id;if(!z.is_reply_thread)z.comment_ids=this.commentIDs;if(!z.commentas){var aa=w.allControllers[z.controller_id];z.commentas=aa.realTimePollingParams.commentas;}new h().setURI('/ajax/connect/feedback.php').setReadOnly(true).setData(z).setHandler(function(ba){this.fetchMoreCommentsIsPending[x.pager_id]=false;}.bind(this)).send();},getVisibleCommentCount:function(x){var y=this.getCommentsSelector(x),z=this.getCollapsedCommentsSelector(x),aa=l.scry(s(x.controller_id),y);aa=aa.concat(l.scry(s(x.controller_id),z));var ba=0;for(var ca=0;ca<aa.length;ca++)if(!k.hasClass(aa[ca],'fbCommentIgnored'))ba++;return ba;},getCommentsSelector:function(x){var y=x.is_reply_thread?'li.fbCommentReply':'li.fbTopLevelComment';if(x.controller_id!=x.uniqid)y='div[id="'+x.uniqid+'"] '+y;return y;},getCollapsedCommentsSelector:function(x){var y=x.is_reply_thread?'div.fbCommentReply':'div.fbTopLevelComment';if(x.controller_id!=x.uniqid)y='div[id="'+x.uniqid+'"] '+y;return y;},getRecentlyBlacklistedActors:function(){var x=[];for(var y in this.recentlyBlacklistedActors)x.push(y);return x;},attachContextualDialogHandlers:function(){this.documentClickListener=m.listen(document.documentElement,'click',this.closeContextualDialog.bind(this));},closeContextualDialog:function(event){var x=event.getTarget(),y=o.byClass(x,'fbCommentContext');if(!y)this.destroyContextualDialog();},destroyContextualDialog:function(){this.documentClickListener.remove();delete this.documentClickListener;var x=this.controllerID;n.closeContextualDialog(x);},appendComments:function(x,y){var z=u(x);if(!z)return;var aa=l.scry(z,'.fbFeedbackReplies')[0];if(!aa)return;l.appendContent(aa,y);},prependComments:function(x,y){var z=l.scry(document.documentElement,x)[0];if(!z)return;var aa=y.getNodes(),ba=[];for(var ca=aa.length;ca-->0;){var da={id:l.getID(aa[ca]),element:aa[ca]};ba.push(da);var ea=u(da.id);if(ea){k.hide(da.element);this.duplicateComments.push(da.element);for(var fa=0;fa<ba.length;++fa)l.insertAfter(ea,ba[fa].element);ba=[];}}for(ca=0;ca<ba.length;++ca)l.prependContent(z,ba[ca].element);setTimeout(this.removeDuplicateComments.bind(this),0);},removeDuplicateComments:function(){for(var x=0;x<this.duplicateComments.length;++x)l.remove(this.duplicateComments[x]);this.duplicateComments=[];},pollForComments:function(x){var y={locale:this.locale};t(y,x);if(!y.is_reply_thread)y.comment_ids=this.commentIDs;y.newest_comment_timestamp=this.newestCommentTimestamp;var z=this.handlePollResponse.bind(this),aa=this.handlePollError.bind(this),ba=this.handlePollFinally.bind(this);new h().setURI('/plugins/comments/poll').setReadOnly(true).setData(y).setMethod('GET').setHandler(z).setErrorHandler(aa).setFinallyHandler(ba).send();},handlePollResponse:function(x){},handlePollError:function(x){},handlePollFinally:function(x){}});e.exports=window.CommentAdminPanelController||w;});
__d("legacy:developer-comments-js",["CommentAdminPanelController"],function(a,b,c,d){a.CommentAdminPanelController=b('CommentAdminPanelController');},3);
__d("ConnectLogin",["PopupWindow","URI","WindowComm","XD"],function(a,b,c,d,e,f){var g=b('PopupWindow'),h=b('URI'),i=b('WindowComm'),j=b('XD').XD,k={init:function(l){this.appID=l.appID;this.addToProfile=l.addToProfile;this.channelUrl=l.channelUrl;j.init(l);},login:function(l,m,n){this._openPopup(l,m,n);},logout:function(){j.send({type:'logout'});},_openPopup:function(l,m,n){n=n||{};var o=i.makeHandler(function(s){k._closePopup();if(k.appID)k._refreshLoginStatus();l&&l();}),p=i.makeHandler(function(s){k._closePopup();}),q=new h('/login.php');q.setQueryData({api_key:this.appID,next:o,channel_url:p,cancel_url:p,req_perms:m,v:'1.0',fbconnect:1,add_to_profile:this.addToProfile,display:'popup'});q.addQueryData(n);var r=this._getSize(n);this._popup=g.open(q.toString(),r.height,r.width);},_closePopup:function(){if(this._popup){this._popup.close();this._popup=null;}},_refreshLoginStatus:function(){if(this.channelUrl){j.send({type:'refreshLoginStatus'});}else window.location.reload();},_getSize:function(l){if(l.social_plugin=='registration'){return {width:640,height:370};}else return {width:610,height:280};}};e.exports=k;});
__d("legacy:connect-login",["ConnectLogin"],function(a,b,c,d){a.ConnectLogin=b('ConnectLogin');},3);
__d("legacy:feedback",["Feedback"],function(a,b,c,d){a.Feedback=b('Feedback');},3);
__d("SubscriptionFlyoutController",["Arbiter","CSS","DataStore","EditSubscriptions","Hovercard","HoverFlyout","$","cx","emptyFunction"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('CSS'),i=b('DataStore'),j=b('EditSubscriptions'),k=b('Hovercard'),l=b('HoverFlyout'),m=b('$'),n=b('cx'),o=b('emptyFunction'),p=null,q,r,s,t=['uiButtonConfirm','uiButtonSpecial',"_42gz","_42g-","_4jy2","_51tl","_4jy1"];function u(y){for(var z=0;z<t.length;z++)if(h.hasClass(y,t[z]))return false;return true;}function v(y,z){s=i.get(z,'profile_id');var aa=i.get(z,'loc');j.init(r,s,aa);if(u(z)){h.addClass(z,"_52nd");if(h.hasClass(z,'uiButton')||h.hasClass(z,"_42fu"))h.addClass(z,'selected');}if(i.get(z,'onclose'))clearTimeout(i.remove(z,'onclosetimeout'));}function w(y,z){s=null;if(u(z)){h.removeClass(z,'uiButtonHover');if(h.hasClass(z,'uiButton')||h.hasClass(z,"_42fu"))h.removeClass(z,'selected');}if(i.get(z,'onclose'))i.set(z,'onclosetimeout',function(){var aa=i.remove(z,'onclose');aa&&aa();}.defer(1500));}var x={init:function(y,z){x.init=o;q=y;r=m(z);p=new l();p.init(y);p.setShowDelay(100).setHideDelay(150);p.subscribe('show',v);p.subscribe('hide',w);g.subscribe(['UnfollowUser','UnfollowingUser'],function(aa,ba){if(!ba.from_hide_flyout&&ba.profile_id==s){if(k.contains&&q)if(k.contains(q.getContext()))k.hide();p.hideFlyout(true);}});},initNode:function(y,z,aa){i.set(y,'profile_id',z);i.set(y,'loc',aa);p.initNode(y);h.addClass(y,"_52nf");},setActiveNode:function(y){p.setActiveNode(y);},show:function(y){p.showFlyout(y,true);},setCloseListener:function(y,z){if(p.getActiveNode()!==y){z();}else i.set(y,'onclose',z);}};e.exports=a.SubscriptionFlyoutController||x;});
__d("FollowButton",["Event","Arbiter","AsyncRequest","Button","CSS","DOM","FriendListFlyoutController","SubscriptionFlyoutController","SubscriptionLevels","URI","copyProperties"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Arbiter'),i=b('AsyncRequest'),j=b('Button'),k=b('CSS'),l=b('DOM'),m=b('FriendListFlyoutController'),n=b('SubscriptionFlyoutController'),o=b('SubscriptionLevels'),p=b('URI'),q=b('copyProperties'),r=14;function s(w,x,y){k.conditionShow(x,y);k.conditionShow(w,!y);}function t(w,x){if(x&&k.hasClass(w,'enableFriendListFlyout')){m.show(w);}else m.hide();}function u(w,x,y){var z=l.scry(w,'.lowIcon')[0],aa=l.scry(w,'.medIcon')[0],ba=l.scry(w,'.highIcon')[0];if(!z||!aa||!ba)return;h.subscribe('SubscriptionLevelUpdated',function(ca,da){if(y===da.profile_id)switch(da.level){case o.ALL:j.setIcon(x,ba);break;case o.DEFAULT:j.setIcon(x,aa);break;case o.TOP:j.setIcon(x,z);break;}});}function v(w,x,y,z,aa,ba){this.init(w,x,y,z,aa,ba);}q(v.prototype,{init:function(w,x,y,z,aa,ba){if(!k.hasClass(y,'enableFriendListFlyout'))n.initNode(y,z,aa);if(aa==r&&k.shown(y))n.show(y);g.listen(x,'click',function(){s(x,y,true);n.setActiveNode(y);var ea=new p(x.getAttribute('ajaxify')),fa={profile_id:z,location:aa,source:'follow-button',subscribed_button_id:y.id,xids:ea.getQueryData().xids};new i().setURI(ba).setData(fa).setRelativeTo(y).send();});w&&u(w,y,z);h.subscribe(['FollowUser','FollowingUser','UnfollowUser','UnfollowingUser'],function(ea,fa){if(fa.profile_id==z)s(x,y,ea=='FollowUser'||ea=='FollowingUser');t(y,ea=='FollowUser');});var ca=false;h.subscribe('UnfollowingUser',function(ea,fa){if(fa.profile_id==z){ca=k.shown(y);ca&&s(x,y,false);}});h.subscribe('UnfollowUserFail',function(ea,fa){if(fa.profile_id==z&&ca)s(x,y,true);});h.subscribe('FollowUserFail',function(ea,fa){if(fa.profile_id==z&&ca)s(x,y,false);});var da=false;h.subscribe(['FriendRequest/sending','FriendRequest/confirming'],function(ea,fa){if(fa.uid==z){da=k.shown(x);da&&s(x,y,true);}});h.subscribe(['FriendRequest/sendFail','FriendRequest/confirmFail'],function(ea,fa){if(fa.uid==z&&da)s(x,y,false);});h.subscribe('FriendRequest/unfriend',function(ea,fa){(fa.uid==z)&&s(x,y,false);});}});e.exports=a.FollowButton||v;});