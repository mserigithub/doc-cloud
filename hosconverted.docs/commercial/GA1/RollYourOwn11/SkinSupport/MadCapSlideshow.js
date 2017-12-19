/// <reference path="jquery.js" />
/// <reference path="MadCapGlobal.js" />

/*!
* Copyright MadCap Software
* http://www.madcapsoftware.com/
*
* v10.0.0.0
*/

/*
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
* ------------------------------------------------------
* Used to allow responsive videos in BxSlider, compressed using JSMin.  Must be called AFTER the jQuery library, and BEFORE jquery.bxslider.js
*/
(function (e) { "use strict"; e.fn.fitVids = function (t) { var n = { customSelector: null }; var r = document.createElement("div"), i = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0]; r.className = "fit-vids-style"; r.innerHTML = "&shy;<style>.fluid-width-video-wrapper {width: 100%;position: relative;padding: 0;} .fluid-width-video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>"; i.parentNode.insertBefore(r, i); if (t) { e.extend(n, t) } return this.each(function () { var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.kickstarter.com']"]; if (n.customSelector) { t.push(n.customSelector) } var r = e(this).find(t.join(",")); r.each(function () { var t = e(this); if (t.parent(".fluid-width-video-wrapper").length) { return } var n = t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(), r = !isNaN(parseInt(t.attr("width"), 10)) ? parseInt(t.attr("width"), 10) : t.width(), i = n / r; if (!t.attr("id")) { var s = "fitvid" + Math.floor(Math.random() * 999999); t.attr("id", s) } t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", i * 100 + "%"); t.removeAttr("height").removeAttr("width") }) }) } })(jQuery)

/*
* BxSlider v4.1.1 - Fully loaded, responsive content slider
* http://bxslider.com
*
* Copyright 2013, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
* Written while drinking Belgian ales and listening to jazz
*
* Released under the MIT license - http://opensource.org/licenses/MIT
*/
!function (t) { var e = {}, s = { mode: "horizontal", slideSelector: "", infiniteLoop: !0, hideControlOnEnd: !1, speed: 500, easing: null, slideMargin: 0, startSlide: 0, randomStart: !1, captions: !1, ticker: !1, tickerHover: !1, adaptiveHeight: !1, adaptiveHeightSpeed: 500, video: !1, useCSS: !0, preloadImages: "visible", responsive: !0, touchEnabled: !0, swipeThreshold: 50, oneToOneTouch: !0, preventDefaultSwipeX: !0, preventDefaultSwipeY: !1, pager: !0, pagerType: "full", pagerShortSeparator: " / ", pagerSelector: null, buildPager: null, pagerCustom: null, controls: !0, nextText: "Next", prevText: "Prev", nextSelector: null, prevSelector: null, autoControls: !1, startText: "Start", stopText: "Stop", autoControlsCombine: !1, autoControlsSelector: null, auto: !1, pause: 4e3, autoStart: !0, autoDirection: "next", autoHover: !1, autoDelay: 0, minSlides: 1, maxSlides: 1, moveSlides: 0, slideWidth: 0, onSliderLoad: function () { }, onSlideBefore: function () { }, onSlideAfter: function () { }, onSlideNext: function () { }, onSlidePrev: function () { }, slideshowClass: "" }; t.fn.MCSlider = function (n) { if (0 == this.length) return this; if (this.length > 1) return this.each(function () { t(this).MCSlider(n) }), this; var o = {}, r = this; e.el = this; var a = t(window).width(), l = t(window).height(), d = function () { o.settings = t.extend({}, s, n), o.settings.slideWidth = parseInt(o.settings.slideWidth), o.children = r.children(o.settings.slideSelector), o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length), o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length), o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)), o.active = { index: o.settings.startSlide }, o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1, o.carousel && (o.settings.preloadImages = "all"), o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin, o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin, o.working = !1, o.controls = {}, o.interval = null, o.animProp = "vertical" == o.settings.mode ? "top" : "left", o.usingCSS = o.settings.useCSS && "fade" != o.settings.mode && function () { var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]; for (var i in e) if (void 0 !== t.style[e[i]]) return o.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), o.animProp = "-" + o.cssPrefix + "-transform", !0; return !1 }(), "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides), r.data("origStyle", r.attr("style")), r.children(o.settings.slideSelector).each(function () { t(this).data("origStyle", t(this).attr("style")) }), c() }, c = function () { r.wrap('<div class="mc-wrapper"><div class="mc-viewport ' + o.settings.slideshowClass + '"></div></div>'), o.viewport = r.parent(), o.loader = t('<div class="mc-loading" />'), o.viewport.prepend(o.loader), r.css({ width: "horizontal" == o.settings.mode ? 100 * o.children.length + 215 + "%" : "auto", position: "relative" }), o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"), f(), o.viewport.css({ width: "100%", overflow: "hidden", position: "relative" }), o.viewport.parent().css({ maxWidth: v() }), o.settings.pager || o.viewport.parent().css({ margin: "0 auto 0px" }), o.children.css({ "float": "horizontal" == o.settings.mode ? "left" : "none", listStyle: "none", position: "relative" }), o.children.css("width", u()), "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin), "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin), "fade" == o.settings.mode && (o.children.css({ position: "absolute", zIndex: 0, display: "none" }), o.children.eq(o.settings.startSlide).css({ zIndex: 50, display: "block" })), o.controls.el = t('<div class="mc-controls" />'), o.settings.captions && P(), o.active.last = o.settings.startSlide == x() - 1, o.settings.video && r.fitVids(); var e = o.children.eq(o.settings.startSlide); "all" == o.settings.preloadImages && (e = o.children), o.settings.ticker ? o.settings.pager = !1 : (o.settings.pager && T(), o.settings.controls && C(), o.settings.auto && o.settings.autoControls && E(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)), g(e, h) }, g = function (e, i) { var s = e.find("img, iframe").length; if (0 == s) return i(), void 0; var n = 0; e.find("img, iframe").each(function () { t(this).one("load", function () { ++n == s && i() }).each(function () { this.complete && t(this).load() }) }) }, h = function () { if (o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) { var e = "vertical" == o.settings.mode ? o.settings.minSlides : o.settings.maxSlides, i = o.children.slice(0, e).clone().addClass("mc-clone"), s = o.children.slice(-e).clone().addClass("mc-clone"); r.append(i).prepend(s) } o.loader.remove(), S(), "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0), o.viewport.height(p()), r.redrawSlider(), o.settings.onSliderLoad(o.active.index), o.initialized = !0, o.settings.responsive && t(window).bind("resize", B), o.settings.auto && o.settings.autoStart && H(), o.settings.ticker && L(), o.settings.pager && I(o.settings.startSlide), o.settings.controls && W(), o.settings.touchEnabled && !o.settings.ticker && O() }, p = function () { var e = 0, s = t(); if ("vertical" == o.settings.mode || o.settings.adaptiveHeight) if (o.carousel) { var n = 1 == o.settings.moveSlides ? o.active.index : o.active.index * m(); for (s = o.children.eq(n), i = 1; i <= o.settings.maxSlides - 1; i++) s = n + i >= o.children.length ? s.add(o.children.eq(i - 1)) : s.add(o.children.eq(n + i)) } else s = o.children.eq(o.active.index); else s = o.children; return "vertical" == o.settings.mode ? (s.each(function () { e += t(this).outerHeight() }), o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, s.map(function () { return t(this).outerHeight(!1) }).get()), e }, v = function () { var t = "100%"; return o.settings.slideWidth > 0 && (t = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), t }, u = function () { var t = o.settings.slideWidth, e = o.viewport.width(); return 0 == o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" == o.settings.mode ? t = e : o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (e > o.maxThreshold || e < o.minThreshold && (t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides)), t }, f = function () { var t = 1; if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0) if (o.viewport.width() < o.minThreshold) t = o.settings.minSlides; else if (o.viewport.width() > o.maxThreshold) t = o.settings.maxSlides; else { var e = o.children.first().width(); t = Math.floor(o.viewport.width() / e) } else "vertical" == o.settings.mode && (t = o.settings.minSlides); return t }, x = function () { var t = 0; if (o.settings.moveSlides > 0) if (o.settings.infiniteLoop) t = o.children.length / m(); else for (var e = 0, i = 0; e < o.children.length;)++t, e = i + f(), i += o.settings.moveSlides <= f() ? o.settings.moveSlides : f(); else t = Math.ceil(o.children.length / f()); return t }, m = function () { return o.settings.moveSlides > 0 && o.settings.moveSlides <= f() ? o.settings.moveSlides : f() }, S = function () { if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) { if ("horizontal" == o.settings.mode) { var t = o.children.last(), e = t.position(); b(-(e.left - (o.viewport.width() - t.width())), "reset", 0) } else if ("vertical" == o.settings.mode) { var i = o.children.length - o.settings.minSlides, e = o.children.eq(i).position(); b(-e.top, "reset", 0) } } else { var e = o.children.eq(o.active.index * m()).position(); o.active.index == x() - 1 && (o.active.last = !0), void 0 != e && ("horizontal" == o.settings.mode ? b(-e.left, "reset", 0) : "vertical" == o.settings.mode && b(-e.top, "reset", 0)) } }, b = function (t, e, i, s) { if (o.usingCSS) { var n = "vertical" == o.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)"; r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == e ? (r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () { r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), D() })) : "reset" == e ? r.css(o.animProp, n) : "ticker" == e && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () { r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(s.resetValue, "reset", 0), N() })) } else { var a = {}; a[o.animProp] = t, "slide" == e ? r.animate(a, i, o.settings.easing, function () { D() }) : "reset" == e ? r.css(o.animProp, t) : "ticker" == e && r.animate(a, speed, "linear", function () { b(s.resetValue, "reset", 0), N() }) } }, w = function () { for (var e = "", i = x(), s = 0; i > s; s++) { var n = ""; o.settings.buildPager && t.isFunction(o.settings.buildPager) ? (n = o.settings.buildPager(s), o.pagerEl.addClass("mc-custom-pager")) : (n = s + 1, o.pagerEl.addClass("mc-default-pager")), e += '<div class="mc-pager-item"><a data-slide-index="' + s + '" class="mc-pager-link">' + n + "</a></div>" } o.pagerEl.html(e) }, T = function () { o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="mc-pager" />'), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("mc-has-pager").append(o.pagerEl), w()), o.pagerEl.delegate("a", "click", q) }, C = function () { o.controls.next = t('<a class="mc-next">' + o.settings.nextText + "</a>"), o.controls.prev = t('<a class="mc-prev">' + o.settings.prevText + "</a>"), o.controls.next.bind("click", y), o.controls.prev.bind("click", z), o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next), o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev), o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="mc-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("mc-has-controls-direction").append(o.controls.directionEl)) }, E = function () { o.controls.start = t('<div class="mc-controls-auto-item"><a class="mc-start">' + o.settings.startText + "</a></div>"), o.controls.stop = t('<div class="mc-controls-auto-item"><a class="mc-stop">' + o.settings.stopText + "</a></div>"), o.controls.autoEl = t('<div class="mc-controls-auto" />'), o.controls.autoEl.delegate(".mc-start", "click", k), o.controls.autoEl.delegate(".mc-stop", "click", M), o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop), o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("mc-has-controls-auto").append(o.controls.autoEl), A(o.settings.autoStart ? "stop" : "start") }, P = function () { o.children.each(function () { var e = t(this).attr("title"); void 0 != e && ("" + e).length && t(this).append('<div class="mc-caption"><span>' + e + "</span></div>") }) }, y = function (t) { o.settings.auto && r.stopAuto(), r.goToNextSlide(), t.preventDefault() }, z = function (t) { o.settings.auto && r.stopAuto(), r.goToPrevSlide(), t.preventDefault() }, k = function (t) { r.startAuto(), t.preventDefault() }, M = function (t) { r.stopAuto(), t.preventDefault() }, q = function (e) { o.settings.auto && r.stopAuto(); var i = t(e.currentTarget), s = parseInt(i.attr("data-slide-index")); s != o.active.index && r.goToSlide(s), e.preventDefault() }, I = function (e) { var i = o.children.length; return "short" == o.settings.pagerType ? (o.settings.maxSlides > 1 && (i = Math.ceil(o.children.length / o.settings.maxSlides)), o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i), void 0) : (o.pagerEl.find("a").removeClass("active"), o.pagerEl.each(function (i, s) { t(s).find("a").eq(e).addClass("active") }), void 0) }, D = function () { if (o.settings.infiniteLoop) { var t = ""; 0 == o.active.index ? t = o.children.eq(0).position() : o.active.index == x() - 1 && o.carousel ? t = o.children.eq((x() - 1) * m()).position() : o.active.index == o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()), "horizontal" == o.settings.mode ? b(-t.left, "reset", 0) : "vertical" == o.settings.mode && b(-t.top, "reset", 0) } o.working = !1, o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index) }, A = function (t) { o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.mc-" + t + ")").addClass("active")) }, W = function () { 1 == x() ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 == o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index == x() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled"))) }, H = function () { o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(), o.settings.autoHover && r.hover(function () { o.interval && (r.stopAuto(!0), o.autoPaused = !0) }, function () { o.autoPaused && (r.startAuto(!0), o.autoPaused = null) }) }, L = function () { var e = 0; if ("next" == o.settings.autoDirection) r.append(o.children.clone().addClass("mc-clone")); else { r.prepend(o.children.clone().addClass("mc-clone")); var i = o.children.first().position(); e = "horizontal" == o.settings.mode ? -i.left : -i.top } b(e, "reset", 0), o.settings.pager = !1, o.settings.controls = !1, o.settings.autoControls = !1, o.settings.tickerHover && !o.usingCSS && o.viewport.hover(function () { r.stop() }, function () { var e = 0; o.children.each(function () { e += "horizontal" == o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0) }); var i = o.settings.speed / e, s = "horizontal" == o.settings.mode ? "left" : "top", n = i * (e - Math.abs(parseInt(r.css(s)))); N(n) }), N() }, N = function (t) { speed = t ? t : o.settings.speed; var e = { left: 0, top: 0 }, i = { left: 0, top: 0 }; "next" == o.settings.autoDirection ? e = r.find(".mc-clone").first().position() : i = o.children.first().position(); var s = "horizontal" == o.settings.mode ? -e.left : -e.top, n = "horizontal" == o.settings.mode ? -i.left : -i.top, a = { resetValue: n }; b(s, "ticker", speed, a) }, O = function () { o.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }, o.viewport.bind("touchstart", X) }, X = function (t) { if (o.working) t.preventDefault(); else { o.touch.originalPos = r.position(); var e = t.originalEvent; o.touch.start.x = e.changedTouches[0].pageX, o.touch.start.y = e.changedTouches[0].pageY, o.viewport.bind("touchmove", Y), o.viewport.bind("touchend", V) } }, Y = function (t) { var e = t.originalEvent, i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x), s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y); if (3 * i > s && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * s > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch) { var n = 0; if ("horizontal" == o.settings.mode) { var r = e.changedTouches[0].pageX - o.touch.start.x; n = o.touch.originalPos.left + r } else { var r = e.changedTouches[0].pageY - o.touch.start.y; n = o.touch.originalPos.top + r } b(n, "reset", 0) } }, V = function (t) { o.viewport.unbind("touchmove", Y); var e = t.originalEvent, i = 0; if (o.touch.end.x = e.changedTouches[0].pageX, o.touch.end.y = e.changedTouches[0].pageY, "fade" == o.settings.mode) { var s = Math.abs(o.touch.start.x - o.touch.end.x); s >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) } else { var s = 0; "horizontal" == o.settings.mode ? (s = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : (s = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top), !o.settings.infiniteLoop && (0 == o.active.index && s > 0 || o.active.last && 0 > s) ? b(i, "reset", 200) : Math.abs(s) >= o.settings.swipeThreshold ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : b(i, "reset", 200) } o.viewport.unbind("touchend", V) }, B = function () { var e = t(window).width(), i = t(window).height(); if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) { (a != e || l != i) && (a = e, l = i, r.redrawSlider()) } }; return r.goToSlide = function (e, i) { if (!o.working && o.active.index != e) if (o.working = !0, o.oldIndex = o.active.index, o.active.index = 0 > e ? x() - 1 : e >= x() ? 0 : e, o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index), "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index), o.active.last = o.active.index >= x() - 1, o.settings.pager && I(o.active.index), o.settings.controls && W(), "fade" == o.settings.mode) o.settings.adaptiveHeight && o.viewport.height() != p() && o.viewport.animate({ height: p() }, o.settings.adaptiveHeightSpeed), o.children.filter(":visible").fadeOut(o.settings.speed).css({ zIndex: 0 }), o.children.eq(o.active.index).css("zIndex", 51).fadeIn(o.settings.speed, function () { t(this).css("zIndex", 50), D() }); else { o.settings.adaptiveHeight && o.viewport.height() != p() && o.viewport.animate({ height: p() }, o.settings.adaptiveHeightSpeed); var s = 0, n = { left: 0, top: 0 }; if (!o.settings.infiniteLoop && o.carousel && o.active.last) if ("horizontal" == o.settings.mode) { var a = o.children.eq(o.children.length - 1); n = a.position(), s = o.viewport.width() - a.outerWidth() } else { var l = o.children.length - o.settings.minSlides; n = o.children.eq(l).position() } else if (o.carousel && o.active.last && "prev" == i) { var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (x() - 1) * m() - (o.children.length - o.settings.maxSlides), a = r.children(".mc-clone").eq(d); n = a.position() } else if ("next" == i && 0 == o.active.index) n = r.find("> .mc-clone").eq(o.settings.maxSlides).position(), o.active.last = !1; else if (e >= 0) { var c = e * m(); n = o.children.eq(c).position() } if ("undefined" != typeof n) { var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top; b(g, "slide", o.settings.speed) } } }, r.goToNextSlide = function () { if (o.settings.infiniteLoop || !o.active.last) { var t = parseInt(o.active.index) + 1; r.goToSlide(t, "next") } }, r.goToPrevSlide = function () { if (o.settings.infiniteLoop || 0 != o.active.index) { var t = parseInt(o.active.index) - 1; r.goToSlide(t, "prev") } }, r.startAuto = function (t) { o.interval || (o.interval = setInterval(function () { "next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide() }, o.settings.pause), o.settings.autoControls && 1 != t && A("stop")) }, r.stopAuto = function (t) { o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && 1 != t && A("start")) }, r.getCurrentSlide = function () { return o.active.index }, r.getSlideCount = function () { return o.children.length }, r.redrawSlider = function () { o.children.add(r.find(".mc-clone")).outerWidth(u()), o.viewport.css("height", p()), o.settings.ticker || S(), o.active.last && (o.active.index = x() - 1), o.active.index >= x() && (o.active.last = !0), o.settings.pager && !o.settings.pagerCustom && (w(), I(o.active.index)) }, r.destroySlider = function () { o.initialized && (o.initialized = !1, t(".mc-clone", this).remove(), o.children.each(function () { void 0 != t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style") }), void 0 != t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.pagerEl.remove(), t(".mc-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), o.settings.responsive && t(window).unbind("resize", B)) }, r.reloadSlider = function (t) { void 0 != t && (n = t), r.destroySlider(), d() }, d(), this } }(jQuery);

(function () {
    var Slideshow = MadCap.CreateNamespace("Slideshow");

    Slideshow.Init = function () {
        var getDataAttribute;

        if ($('html').attr('data-mc-target-type'))
            getDataAttribute = function ($el, attr) {
                return $el.attr('data-mc-' + attr);
            };
        else
            getDataAttribute = function ($el, attr) {
                return $el.attr('madcap:' + attr.replace('-', ''));
            };

        // Add slideshows
        $('.MCSlider').each(function (index, el) {
            var $el = $(el);

            var options = {};

            var slideshowClass = el.className;

            // General
            var randomStart = getDataAttribute($el, 'random-start');
            var infiniteLoop = getDataAttribute($el, 'infinite-loop');
            var showCaptions = getDataAttribute($el, 'show-captions');
            var controls = getDataAttribute($el, 'controls');
            var width = getDataAttribute($el, 'slide-width');
            var height = getDataAttribute($el, 'adaptive-height');
            var responsive = getDataAttribute($el, 'responsive');

            var navigation = getDataAttribute($el, 'navigation');
            var pager = true;
            var thumbnails = false;           

            options.pagerCustom = null;

            if (navigation) {
                if (navigation == "Thumbnails") {
                    thumbnails = true;
                    options.pagerCustom = "#mc-pager" + (index + 1).toString();
                }
                if (navigation == "None") {
                    pager = false;                   
                }
            }

            // Playback
            var autoHover = getDataAttribute($el, 'auto-hover');
            var autoStart = getDataAttribute($el, 'auto-start');
            var autoControls = getDataAttribute($el, 'auto-controls');
            var combineControls = getDataAttribute($el, 'combine-controls');
            var autoDirection = getDataAttribute($el, 'auto-direction');
            var autoDelay = getDataAttribute($el, 'auto-delay');
            var mode = getDataAttribute($el, 'mode');
            var speed = getDataAttribute($el, 'speed');
            var pause = getDataAttribute($el, 'pause'); 
            
            var video = getDataAttribute($el, 'video');

            // General
            if (slideshowClass)
                options.slideshowClass = slideshowClass;

            if (randomStart) {
                if ("true" == randomStart.toString().toLowerCase())
                    options.randomStart = true;
                else if ("false" == randomStart.toString().toLowerCase())
                    options.randomStart = false;
            }
            if (infiniteLoop) {
                if ("true" == infiniteLoop.toString().toLowerCase()) {
                    options.infiniteLoop = true;
                }
                else if ("false" == infiniteLoop.toString().toLowerCase()) {
                    options.infiniteLoop = false;
                    options.hideControlOnEnd = true;
                }
            }
            if (showCaptions) {
                if ("true" == showCaptions.toString().toLowerCase())
                    options.captions = true;
                else if ("false" == showCaptions.toString().toLowerCase())
                    options.captions = false;
            }
            if (controls) {
                if ("true" == controls.toString().toLowerCase())
                    options.controls = true;
                else if ("false" == controls.toString().toLowerCase())
                    options.controls = false;
            }
            options.pager = pager;
            options.thumbnails = thumbnails;
            if (width)
                options.slideWidth = width;
            if (height) {
                if ("true" == height.toString().toLowerCase())
                    options.adaptiveHeight = true;
                else if ("false" == height.toString().toLowerCase())
                    options.adaptiveHeight = false;
            }
            if (responsive) {
                if ("true" == responsive.toString().toLowerCase())
                    options.responsive = true;
                else if ("false" == responsive.toString().toLowerCase())
                    options.responsive = false;
            }

            // Playback
            var auto = false;

            if (autoHover) {
                if ("true" == autoHover.toString().toLowerCase()) {
                    options.autoHover = true;
                    auto = true;
                }
                else if ("false" == autoHover.toString().toLowerCase())
                    options.autoHover = false;
            }
            if (autoStart) {
                if ("true" == autoStart.toString().toLowerCase()) {
                    options.autoStart = true;
                    auto = true;
                }
                else if ("false" == autoStart.toString().toLowerCase())
                    options.autoStart = false;
            }
            if (autoControls) {
                if ("true" == autoControls.toString().toLowerCase()) {
                    options.autoControls = true;
                    options.autoControlsCombine = true;
                    auto = true;
                }
                else if ("false" == autoControls.toString().toLowerCase()) {
                    options.autoControls = false;
                    options.autoControlsCombine = false;
                }
            }
            if (auto) {
                options.auto = true;
            }
            if (autoDirection)
                options.autoDirection = autoDirection;
            if (autoDelay)
                options.autoDelay = autoDelay;
            if (mode)
                options.mode = mode;
            if (speed)
                options.speed = speed;
            if (pause)
                options.pause = pause;           

            // preload all images when viewing output in IE to avoid occupied process error when rebuilding output
            if (navigator.userAgent.indexOf('MSIE') !== -1) {
                options.preloadImages = 'all';
            }

            // Set Default
            options.video = true;
            options.useCSS = false;           

            if (video)
                options.video = false;

            $el.MCSlider(options);
        });
    };
})();
