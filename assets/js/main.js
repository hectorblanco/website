// Generated by CoffeeScript 1.12.5
(function() {
  $(function() {
    var activityIndicatorOff, activityIndicatorOn, captionOff, captionOn, closeNavigations, contactSection, contactSectionScene, enableContactSection, enableGallerySection, enableHomeSection, gallery, galleryMenuScene, gallerySection, gallerySectionScene, getContactHeight, getGalleryHeight, getHomeHeight, goToUrl, highlightSection, homeSection, homeSectionScene, lazySource, loadImage, menuHeightOffset, overlayOff, overlayOn, paintFrame, placeholder, sceneHeights, scrollController, scrollToTarget, topMenuScene, updateContactHeight, updateGalleryHeight, updateHomeHeight, updateScenes, w;
    w = $(window);
    Modernizr.addTest('highresdisplay', function() {
      var mq;
      if (!window.matchMedia) {
        return;
      }
      mq = window.matchMedia("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
      if (mq && mq.matches) {
        return true;
      }
    });
    homeSection = $("#home");
    gallerySection = $("#gallery");
    contactSection = $("#contact");
    menuHeightOffset = $("#navbar-menu").outerHeight() * -1;
    $("body").removeClass("preload");
    lazySource = Modernizr.highresdisplay ? "original-rd" : "original";
    placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC";
    $(".img-lazy").each(function() {
      var imgSource, ref, self;
      self = $(this);
      if (self.parent().is(":visible")) {
        if (self.is("img")) {
          self.attr("src", placeholder);
        }
        imgSource = (ref = self.data(lazySource)) != null ? ref : self.data("original");
        return self.one("appear", function() {
          return $("<img />").bind("load", function() {
            return loadImage(self, imgSource);
          }).attr("src", imgSource);
        });
      }
    });
    loadImage = function(self, imgSource) {
      self.hide();
      if (self.is("img")) {
        self.attr("src", imgSource);
        paintFrame(self);
      } else {
        self.css("background-image", "url('" + imgSource + "')");
      }
      self.fadeIn("slow");
      return self.removeClass("img-lazy").removeAttr("data-original").removeAttr("data-original-rd");
    };
    homeSection.find(".img-lazy").trigger("appear");
    setTimeout((function() {
      return gallerySection.find(".img-lazy").trigger("appear");
    }), 200);
    setTimeout((function() {
      return contactSection.find(".img-lazy").trigger("appear");
    }), 400);
    gallery = $("#gallery .gallery").isotope({
      layoutMode: 'masonry',
      itemSelector: '.gallery-item',
      masonry: {
        isFitWidth: true
      }
    });
    $("#navbar-gallery .gallery-filter a").click(function() {
      var filter;
      scrollToTarget(gallerySection);
      filter = $(this).data("filter");
      gallery.isotope({
        filter: "." + filter
      });
      updateScenes();
      gallerySection.find(".img-lazy").trigger("appear");
      $("#navbar-gallery .gallery-filter .navbar-item").removeClass("active");
      $(this).parent(".navbar-item").addClass("active");
      closeNavigations();
      return false;
    });
    activityIndicatorOn = function() {
      return $("#lightbox-loading").show();
    };
    activityIndicatorOff = function() {
      return $("#lightbox-loading").hide();
    };
    overlayOn = function() {
      return $("#lightbox-overlay").show();
    };
    overlayOff = function() {
      return $("#lightbox-overlay").fadeOut("fast");
    };
    captionOn = function() {
      var body, caption, image, selectedImage, title;
      selectedImage = $("#imagelightbox").attr("src");
      image = $("a[href='" + selectedImage + "'] img");
      title = image.attr("alt");
      body = image.data("caption");
      caption = $("#lightbox-caption");
      caption.find(".title").text(title);
      caption.find(".body").text(body);
      caption.find(".fullscreen, .download").attr("href", selectedImage);
      return caption.show();
    };
    captionOff = function() {
      return $("#lightbox-caption").fadeOut("fast");
    };
    $("#gallery a.gallery-item-link").imageLightbox({
      onStart: function() {
        return overlayOn();
      },
      onEnd: function() {
        captionOff();
        overlayOff();
        return activityIndicatorOff();
      },
      onLoadStart: function() {
        captionOff();
        return activityIndicatorOn();
      },
      onLoadEnd: function() {
        captionOn();
        return activityIndicatorOff();
      }
    });
    paintFrame = function(img) {
      var color;
      color = img.data("frame");
      if (color.length > 0) {
        return img.siblings(".gallery-item-border").css("border-color", color);
      }
    };
    closeNavigations = function() {
      return $(".navbar-collapse.in").slideUp("fast", function() {
        return $(this).removeClass("in");
      });
    };
    $(".navbar .navbar-item").click(function() {
      return closeNavigations();
    });
    $(".navbar .navbar-toggle").click(function() {
      var collapsedNavId;
      collapsedNavId = $(this).data("target");
      return $(collapsedNavId).slideToggle("fast", function() {
        return $(this).toggleClass("in");
      });
    });
    scrollController = new ScrollMagic();
    sceneHeights = {};
    getHomeHeight = function() {
      return sceneHeights.home;
    };
    updateHomeHeight = function() {
      return sceneHeights.home = homeSection.outerHeight();
    };
    getGalleryHeight = function() {
      return sceneHeights.gallery;
    };
    updateGalleryHeight = function() {
      return sceneHeights.gallery = gallerySection.outerHeight();
    };
    getContactHeight = function() {
      return sceneHeights.contact;
    };
    updateContactHeight = function() {
      return sceneHeights.contact = contactSection.outerHeight();
    };
    updateScenes = function() {
      updateHomeHeight();
      updateGalleryHeight();
      return updateContactHeight();
    };
    updateScenes();
    w.on("resize", updateScenes);
    topMenuScene = new ScrollScene({
      triggerElement: "#navbar-menu",
      triggerHook: 0,
      offset: 0
    });
    topMenuScene.setPin("#navbar-menu", {
      pinnedClass: "navbar-stuck"
    }).addTo(scrollController);
    galleryMenuScene = new ScrollScene({
      triggerElement: "#navbar-gallery",
      triggerHook: 0,
      offset: menuHeightOffset,
      duration: getGalleryHeight
    });
    galleryMenuScene.setPin("#navbar-gallery", {
      pinnedClass: "navbar-stuck",
      pushFollowers: false
    }).addTo(scrollController);
    highlightSection = function(sectionId) {
      var menuSections;
      menuSections = $("#navbar-menu li.navbar-item");
      menuSections.removeClass("active");
      return menuSections.has("a[href~='" + sectionId + "']").addClass("active");
    };
    enableHomeSection = function() {
      return highlightSection(homeSection.attr("id"));
    };
    enableGallerySection = function() {
      return highlightSection(gallerySection.attr("id"));
    };
    enableContactSection = function() {
      return highlightSection(contactSection.attr("id"));
    };
    homeSectionScene = new ScrollScene({
      triggerElement: "#" + (homeSection.attr("id")),
      triggerHook: 0,
      offset: menuHeightOffset,
      duration: getHomeHeight
    });
    homeSectionScene.on("enter", enableHomeSection).addTo(scrollController);
    gallerySectionScene = new ScrollScene({
      triggerElement: "#" + (gallerySection.attr("id")),
      triggerHook: 0,
      offset: menuHeightOffset,
      duration: getGalleryHeight
    });
    gallerySectionScene.on("enter", enableGallerySection).addTo(scrollController);
    contactSectionScene = new ScrollScene({
      triggerElement: "#" + (contactSection.attr("id")),
      triggerHook: 0,
      offset: menuHeightOffset,
      duration: getContactHeight
    });
    contactSectionScene.on("enter", enableContactSection).addTo(scrollController);
    goToUrl = function(url, e) {
      var target;
      if (url == null) {
        return;
      }
      target = $("#" + url);
      if (target.length > 0) {
        if (e == null) {
          e.preventDefault();
        }
        scrollToTarget(target);
        return false;
      }
    };
    scrollToTarget = function(target, offset) {
      var targetId, targetOffset;
      if (offset == null) {
        offset = 0;
      }
      if (!(target && target.length > 0)) {
        return;
      }
      targetOffset = target.offset().top + menuHeightOffset + offset;
      targetId = target.attr("id");
      if (targetOffset !== w.scrollTop()) {
        return $("html,body").animate({
          scrollTop: targetOffset
        }, {
          duration: 500,
          complete: function() {
            return highlightSection(target.attr("id"));
          }
        });
      }
    };
    return $(document).on("click", "*[data-navigate=true]", function(e) {
      return goToUrl($(this).attr("href"), e);
    });
  });

}).call(this);
