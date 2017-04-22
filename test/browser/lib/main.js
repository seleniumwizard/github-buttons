// Generated by CoffeeScript 1.12.5
(function() {
  var ButtonAnchor, ButtonFrame, ButtonFrameContent, CONFIG_ANCHOR_CLASS, CONFIG_API, CONFIG_ICON_CLASS, CONFIG_ICON_DEFAULT, CONFIG_URL, CONFIG_UUID, Element, EventTarget, Frame, Hash, NumberHelper, ObjectHelper, QueryString, base1,
    slice = [].slice,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CONFIG_API = "https://api.github.com";

  CONFIG_ANCHOR_CLASS = "github-button";

  CONFIG_ICON_CLASS = "octicon";

  CONFIG_ICON_DEFAULT = CONFIG_ICON_CLASS + "-mark-github";

  CONFIG_URL = !{}.hasOwnProperty.call(document, "currentScript") && delete document.currentScript && document.currentScript ? document.currentScript.src.replace(/[^\/]*([?#].*)?$/, "") : (/^http:/.test(document.location) ? "http" : "https") + "://buttons.github.io/";

  CONFIG_UUID = "faa75404-3b97-5585-b449-4bc51338fbd1";

  if (window._phantom) {
    (base1 = HTMLElement.prototype).click || (base1.click = function() {
      var event;
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
      this.dispatchEvent(event);
    });
  }

  CONFIG_URL = "../../";

  document.head.appendChild(document.createElement("base"));

  ObjectHelper = (function() {
    function ObjectHelper() {}

    ObjectHelper.deepProperty = function(obj, path) {
      var key, key_path, match;
      if (path == null) {
        return obj;
      }
      key_path = path.split(/\.|(?=\[\d+\])/);
      while (key_path.length && (obj != null)) {
        key = key_path.shift();
        if (match = key.match(/^\[(\d+)\]$/)) {
          key = +match[1];
        }
        obj = obj[key];
      }
      return obj;
    };

    return ObjectHelper;

  })();

  NumberHelper = (function() {
    function NumberHelper() {}

    NumberHelper.numberWithDelimiter = function(number) {
      return ("" + number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return NumberHelper;

  })();

  QueryString = (function() {
    function QueryString() {}

    QueryString.stringify = function(obj) {
      var key, results, value;
      results = [];
      for (key in obj) {
        value = obj[key];
        results.push((encodeURIComponent(key)) + "=" + (value != null ? encodeURIComponent(value) : ""));
      }
      return results.join("&");
    };

    QueryString.parse = function(str) {
      var j, key, len, obj, pair, ref, ref1, value;
      obj = {};
      ref = str.split("&");
      for (j = 0, len = ref.length; j < len; j++) {
        pair = ref[j];
        if (!(pair !== "")) {
          continue;
        }
        ref1 = pair.split("="), key = ref1[0], value = 2 <= ref1.length ? slice.call(ref1, 1) : [];
        if (key !== "") {
          obj[decodeURIComponent(key)] = decodeURIComponent(value.join("="));
        }
      }
      return obj;
    };

    return QueryString;

  })();

  Hash = (function() {
    function Hash() {}

    Hash.encode = function(data) {
      return "#" + QueryString.stringify(data);
    };

    Hash.decode = function(data) {
      if (data == null) {
        data = document.location.hash;
      }
      return (QueryString.parse(data.replace(/^#/, ""))) || {};
    };

    return Hash;

  })();

  EventTarget = (function() {
    var addEventListener, removeEventListener;

    function EventTarget($) {
      this.$ = $;
    }

    EventTarget.prototype.on = function() {
      var callback, eventName, events, func, j, k, len;
      events = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), func = arguments[j++];
      callback = (function(_this) {
        return function(event) {
          return func.call(_this, event || window.event);
        };
      })(this);
      for (k = 0, len = events.length; k < len; k++) {
        eventName = events[k];
        addEventListener(this.$, eventName, callback);
      }
    };

    EventTarget.prototype.once = function() {
      var callback, eventName, events, func, j, k, len;
      events = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), func = arguments[j++];
      callback = (function(_this) {
        return function(event) {
          var eventName, k, len;
          for (k = 0, len = events.length; k < len; k++) {
            eventName = events[k];
            removeEventListener(_this.$, eventName, callback);
          }
          return func.call(_this, event || window.event);
        };
      })(this);
      for (k = 0, len = events.length; k < len; k++) {
        eventName = events[k];
        addEventListener(this.$, eventName, callback);
      }
    };

    addEventListener = function(element, event, func) {
      if (element.addEventListener) {
        element.addEventListener("" + event, func);
      } else {
        element.attachEvent("on" + event, func);
      }
    };

    removeEventListener = function(element, event, func) {
      if (element.removeEventListener) {
        element.removeEventListener("" + event, func);
      } else {
        element.detachEvent("on" + event, func);
      }
    };

    return EventTarget;

  })();

  Element = (function(superClass) {
    extend(Element, superClass);

    function Element(element, callback) {
      this.$ = element && element.nodeType === 1 ? element : document.createElement(element);
      if (callback) {
        callback.call(this, this.$);
      }
    }

    return Element;

  })(EventTarget);

  Frame = (function(superClass) {
    var devicePixelRatio, roundPixel;

    extend(Frame, superClass);

    function Frame(callback) {
      Frame.__super__.constructor.call(this, "iframe", function(iframe) {
        var key, ref, value;
        ref = {
          allowtransparency: true,
          scrolling: "no",
          frameBorder: 0
        };
        for (key in ref) {
          value = ref[key];
          iframe.setAttribute(key, value);
        }
        iframe.style.cssText = "width: 1px; height: 0; border: none";
        iframe.src = "javascript:0";
        if (callback) {
          callback.call(this, iframe);
        }
      });
    }

    Frame.prototype.html = function(html) {
      var contentDocument;
      try {
        contentDocument = this.$.contentWindow.document;
        contentDocument.open().write(html);
        contentDocument.close();
      } catch (error) {}
    };

    Frame.prototype.load = function(src) {
      this.$.src = src;
    };

    Frame.prototype.size = function() {
      var body, boundingClientRect, contentDocument, height, html, width;
      try {
        contentDocument = this.$.contentWindow.document;
        html = contentDocument.documentElement;
        body = contentDocument.body;
        width = html.scrollWidth;
        height = html.scrollHeight;
        if (body.getBoundingClientRect) {
          body.style.display = "inline-block";
          boundingClientRect = body.getBoundingClientRect();
          width = Math.max(width, roundPixel(boundingClientRect.width || boundingClientRect.right - boundingClientRect.left));
          height = Math.max(height, roundPixel(boundingClientRect.height || boundingClientRect.bottom - boundingClientRect.top));
          body.style.display = "";
        }
        return {
          width: width + "px",
          height: height + "px"
        };
      } catch (error) {}
    };

    Frame.prototype.resize = function(arg) {
      var height, ref, width;
      ref = arg != null ? arg : this.size() || {}, width = ref.width, height = ref.height;
      if (width) {
        this.$.style.width = width;
      }
      if (height) {
        this.$.style.height = height;
      }
    };

    devicePixelRatio = window.devicePixelRatio || 1;

    roundPixel = function(px) {
      return (devicePixelRatio > 1 ? Math.ceil(Math.round(px * devicePixelRatio) / devicePixelRatio * 2) / 2 : Math.ceil(px)) || 0;
    };

    return Frame;

  })(Element);

  ButtonAnchor = (function() {
    function ButtonAnchor() {}

    ButtonAnchor.parse = function(element) {
      var attribute, j, len, options, ref;
      options = {
        "href": element.href,
        "text": element.getAttribute("data-text") || element.textContent || element.innerText || ""
      };
      ref = ["data-show-count", "data-style", "data-icon", "aria-label"];
      for (j = 0, len = ref.length; j < len; j++) {
        attribute = ref[j];
        options[attribute] = element.getAttribute(attribute) || "";
      }
      if (element.getAttribute("data-count-api")) {
        options["data-show-count"] = 1;
      }
      return options;
    };

    return ButtonAnchor;

  })();

  ButtonFrame = (function(superClass) {
    extend(ButtonFrame, superClass);

    function ButtonFrame(hash, beforeload, callback) {
      var reload;
      ButtonFrame.__super__.constructor.call(this, beforeload);
      reload = (function(_this) {
        return function() {
          var size;
          reload = null;
          size = _this.size();
          _this.$.parentNode.removeChild(_this.$);
          _this.once("load", function() {
            this.resize(size);
          });
          _this.load(CONFIG_URL + "buttons.html" + hash);
          if (callback) {
            callback.call(_this, _this.$);
          }
        };
      })(this);
      this.once("load", function() {
        var jsonp_callback;
        if (jsonp_callback = this.$.contentWindow.callback) {
          new Element(jsonp_callback.script, function(script) {
            this.on("load", "error", function() {
              if (reload) {
                reload();
              }
            });
            if (script.readyState) {
              this.on("readystatechange", function() {
                if (!/i/.test(script.readyState) && reload) {
                  reload();
                }
              });
            }
          });
        } else {
          reload();
        }
      });
      this.html("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>" + CONFIG_UUID + "</title><base><!--[if lte IE 6]></base><![endif]--><link rel=\"stylesheet\" href=\"" + CONFIG_URL + "assets/css/buttons.css\"><script>document.location.hash = \"" + hash + "\";</script></head><body><script src=\"" + CONFIG_URL + "buttons.js\"></script></body></html>");
    }

    return ButtonFrame;

  })(Frame);

  ButtonFrameContent = (function() {
    var Anchor;

    function ButtonFrameContent(options) {
      if (options) {
        document.body.className = options["data-style"] || "";
        new Anchor(options.href, null, function(a) {
          var aria_label;
          a.className = "button";
          if (aria_label = options["aria-label"]) {
            a.setAttribute("aria-label", aria_label);
          }
          new Element("i", function(i) {
            i.className = CONFIG_ICON_CLASS + " " + (options["data-icon"] || CONFIG_ICON_DEFAULT);
            i.setAttribute("aria-hidden", "true");
            a.appendChild(i);
          });
          a.appendChild(document.createTextNode(" "));
          new Element("span", function(span) {
            if (options.text) {
              span.appendChild(document.createTextNode(options.text));
            }
            a.appendChild(span);
          });
          document.body.appendChild(a);
          if (!(a.hostname === "github.com" && /^true|1$/i.test(options["data-show-count"]))) {
            return;
          }
          (function() {
            var api, href, match, property;
            match = a.pathname.replace(/^(?!\/)/, "/").match(/^\/([^\/?#]+)(?:\/([^\/?#]+)(?:\/(?:(subscription)|(fork)|(issues)|([^\/?#]+)))?)?(?:[\/?#]|$)/);
            if (!(match && !match[6])) {
              return;
            }
            if (match[2]) {
              api = "/repos/" + match[1] + "/" + match[2];
              href = "/" + match[1] + "/" + match[2] + "/";
              if (match[3]) {
                property = "subscribers_count";
                href += "watchers";
              } else if (match[4]) {
                property = "forks_count";
                href += "network";
              } else if (match[5]) {
                property = "open_issues_count";
                href += "issues";
              } else {
                property = "stargazers_count";
                href += "stargazers";
              }
            } else {
              api = "/users/" + match[1];
              property = "followers";
              href = "/" + match[1] + "/" + property;
            }
            new Anchor(href, a.href, function(a) {
              a.className = "count";
              new Element("b", function(b) {
                a.appendChild(b);
              });
              new Element("i", function(i) {
                a.appendChild(i);
              });
              new Element("span", function(span) {
                new Element("script", function(script) {
                  var head;
                  script.async = true;
                  script.src = CONFIG_API + (function() {
                    var query;
                    query = QueryString.parse(api.split("?").slice(1).join("?"));
                    query.callback = "callback";
                    return (api.split("?")[0]) + "?" + (QueryString.stringify(query));
                  })();
                  window.callback = function(json) {
                    var data;
                    window.callback = null;
                    if (json.meta.status === 200) {
                      data = ObjectHelper.deepProperty(json.data, property);
                      if ("[object Number]" === {}.toString.call(data)) {
                        data = NumberHelper.numberWithDelimiter(data);
                      }
                      span.appendChild(document.createTextNode(data));
                      a.appendChild(span);
                      a.setAttribute("aria-label", data + " " + (property.replace(/_count$/, "").replace("_", " ")) + " on GitHub");
                      document.body.appendChild(a);
                    }
                  };
                  window.callback.script = script;
                  this.on("error", function() {
                    window.callback = null;
                  });
                  if (script.readyState) {
                    this.on("readystatechange", function() {
                      if (script.readyState === "loaded" && script.children && script.readyState === "loading") {
                        window.callback = null;
                      }
                    });
                  }
                  head = document.getElementsByTagName("head")[0];
                  if ("[object Opera]" === {}.toString.call(window.opera)) {
                    new EventTarget(document).on("DOMContentLoaded", function() {
                      head.appendChild(script);
                    });
                  } else {
                    head.appendChild(script);
                  }
                });
              });
            });
          })();
        });
      }
    }

    Anchor = (function(superClass) {
      var base, javascript, r_archive, r_hostname;

      extend(Anchor, superClass);

      function Anchor(urlString, baseURLstring, callback) {
        Anchor.__super__.constructor.call(this, "a", function(a) {
          if (base) {
            if ((a.href = baseURLstring) && a.protocol !== javascript) {
              try {
                a.href = new URL(urlString, baseURLstring).href;
              } catch (error) {
                base.href = baseURLstring;
                a.href = urlString;
                new Element("div", function(div) {
                  div.innerHTML = a.outerHTML;
                  a.href = div.lastChild.href;
                  div = null;
                });
                base.href = document.location.href;
                base.removeAttribute("href");
              }
            } else {
              a.href = urlString;
            }
            if (r_archive.test(a.href)) {
              a.target = "_top";
            }
            if (a.protocol === javascript || !r_hostname.test("." + a.hostname)) {
              a.href = "#";
              a.target = "_self";
            }
          }
          callback(a);
        });
      }

      base = document.getElementsByTagName("base")[0];

      javascript = "javascript:";

      r_hostname = /\.github\.com$/;

      r_archive = /^https?:\/\/((gist\.)?github\.com\/[^\/]+\/[^\/]+\/archive\/|github\.com\/[^\/]+\/[^\/]+\/releases\/download\/|codeload\.github\.com\/)/;

      return Anchor;

    })(Element);

    return ButtonFrameContent;

  })();

  describe('Element', function() {
    describe('#constructor()', function() {
      it('should use element when element is given', function() {
        var element;
        element = document.createElement("a");
        return expect(new Element(element).$).to.equal(element);
      });
      it('should create new element when tag name is given', function() {
        return expect(new Element("i").$.nodeType).to.equal(1);
      });
      it('should callback with this', function() {
        var _, _this;
        _this = null;
        _ = new Element("em", function(element) {
          return _this = this;
        });
        return expect(_this).to.equal(_);
      });
      return it('should callback with argument element', function(done) {
        var b;
        b = document.createElement("b");
        return new Element(b, function(element) {
          expect(element).to.equal(b);
          return done();
        });
      });
    });
    describe('#on()', function() {
      var input;
      input = null;
      beforeEach(function() {
        return input = new Element("input", function(element) {
          return document.body.appendChild(element);
        });
      });
      afterEach(function() {
        return document.body.removeChild(input.$);
      });
      it('should call the function on single event type', function() {
        var spy;
        spy = sinon.spy();
        input.on("click", spy);
        input.$.click();
        expect(spy).to.have.been.calledOnce;
        input.$.click();
        return expect(spy).to.have.been.calledTwice;
      });
      it('should call the function on multiple event types', function() {
        var spy;
        spy = sinon.spy();
        input.on("focus", "blur", "click", spy);
        input.$.focus();
        expect(spy).to.have.been.calledOnce;
        input.$.blur();
        expect(spy).to.have.been.calledTwice;
        input.$.click();
        return expect(spy).to.have.been.calledThrice;
      });
      it('should call the function with this', function(done) {
        var _this, a;
        a = document.createElement("a");
        _this = new Element(a);
        _this.on("click", function() {
          expect(this).to.equal(_this);
          return done();
        });
        return a.click();
      });
      return it('should call the function with event', function(done) {
        var b;
        b = document.createElement("b");
        new Element(b).on("click", function(event) {
          expect(event.type).to.equal("click");
          return done();
        });
        return b.click();
      });
    });
    return describe('#once()', function() {
      var input;
      input = null;
      beforeEach(function() {
        return input = new Element("input", function(element) {
          return document.body.appendChild(element);
        });
      });
      afterEach(function() {
        return document.body.removeChild(input.$);
      });
      it('should call the function on single event type only once', function() {
        var spy;
        spy = sinon.spy();
        input.once("click", spy);
        input.$.click();
        expect(spy).to.have.been.calledOnce;
        input.$.click();
        input.$.click();
        return expect(spy).to.have.been.calledOnce;
      });
      it('should call the function on multiple event types only once', function() {
        var spy;
        spy = sinon.spy();
        input.once("focus", "blur", spy);
        input.$.focus();
        expect(spy).to.have.been.calledOnce;
        input.$.blur();
        input.$.focus();
        return expect(spy).to.have.been.calledOnce;
      });
      it('should call the function with this', function(done) {
        var _this, a;
        a = document.createElement("a");
        _this = new Element(a);
        _this.once("click", function() {
          expect(this).to.equal(_this);
          return done();
        });
        return a.click();
      });
      return it('should call the function with event', function(done) {
        var b;
        b = document.createElement("b");
        new Element(b).once("click", function(event) {
          expect(event.type).to.equal("click");
          return done();
        });
        return b.click();
      });
    });
  });

  describe('Frame', function() {
    var frame, html;
    frame = null;
    html = "<!DOCTYPE html>\n<html lang=\"ja\">\n<head>\n  <meta charset=\"utf-8\">\n  <title></title>\n</head>\n<body style=\"margin: 0;\">\n  <div style=\"width: 200.49px; height: 100px;\"></div>\n</body>\n</html>";
    beforeEach(function() {
      return frame = new Frame(function(iframe) {
        return document.body.appendChild(iframe);
      });
    });
    afterEach(function() {
      return document.body.removeChild(frame.$);
    });
    describe('#constructor()', function() {
      return it('should callback with the new iframe', function() {
        expect(frame.$.nodeType).to.equal(1);
        return expect(frame.$.tagName).to.equal("IFRAME");
      });
    });
    describe('#html()', function() {
      return it('should write html when iframe is in same-origin', function(done) {
        frame.on("load", function() {
          expect(frame.$.contentWindow.document.documentElement.getAttribute("lang")).to.equal("ja");
          return done();
        });
        return frame.html(html);
      });
    });
    describe('#load()', function() {
      return it('should load the src url', function() {
        frame.load("../../buttons.html");
        return expect(frame.$.src).to.match(/buttons\.html$/);
      });
    });
    describe('#size()', function() {
      return it('should return the iframe content size', function(done) {
        frame.on("load", function() {
          switch (window.devicePixelRatio) {
            case 2:
              expect(this.size()).to.deep.equal({
                width: "200.5px",
                height: "100px"
              });
              break;
            case 3:
              expect(this.size()).to.deep.equal({
                width: "201px",
                height: "100px"
              });
          }
          return done();
        });
        return frame.html(html);
      });
    });
    return describe('#resize()', function() {
      return it('should resize the iframe', function(done) {
        frame.resize({
          width: "20px",
          height: "10px"
        });
        expect(frame.$.style.width).to.equal("20px");
        expect(frame.$.style.height).to.equal("10px");
        return done();
      });
    });
  });

  describe('ButtonAnchor', function() {
    var a;
    a = null;
    beforeEach(function() {
      return a = document.createElement("a");
    });
    return describe('.parse()', function() {
      it('should parse the anchor without attribute', function() {
        return expect(ButtonAnchor.parse(a)).to.deep.equal({
          "href": "",
          "text": "",
          "data-icon": "",
          "data-show-count": "",
          "data-style": "",
          "aria-label": ""
        });
      });
      it('should parse the attribute href', function() {
        a.href = "https://buttons.github.io/";
        return expect(ButtonAnchor.parse(a)).to.have.property("href").and.equal(a.href);
      });
      it('should parse the attribute data-text', function() {
        var text;
        text = "test";
        a.setAttribute("data-text", text);
        return expect(ButtonAnchor.parse(a)).to.have.property("text").and.equal(text);
      });
      it('should parse the text content', function() {
        var text;
        text = "something";
        a.appendChild(document.createTextNode(text));
        return expect(ButtonAnchor.parse(a)).to.have.property("text").and.equal(text);
      });
      it('should ignore the text content when the attribute data-text is given', function() {
        var text;
        text = "something";
        a.setAttribute("data-text", text);
        a.appendChild(document.createTextNode("something else"));
        return expect(ButtonAnchor.parse(a)).to.have.property("text").and.equal(text);
      });
      it('should parse the attribute data-count-api for backward compatibility', function() {
        var api;
        api = "/repos/:user/:repo#item";
        a.setAttribute("data-count-api", api);
        return expect(ButtonAnchor.parse(a)).to.have.property("data-show-count");
      });
      it('should parse the attribute data-style', function() {
        var style;
        style = "mega";
        a.setAttribute("data-style", style);
        return expect(ButtonAnchor.parse(a)).to.have.property("data-style").and.equal(style);
      });
      return it('should parse the attribute data-icon', function() {
        var icon;
        icon = "octicon";
        a.setAttribute("data-icon", icon);
        return expect(ButtonAnchor.parse(a)).to.have.property("data-icon").and.equal(icon);
      });
    });
  });

  describe('ButtonFrame', function() {
    return describe('#constructor()', function() {
      var hash;
      hash = Hash.encode(ButtonAnchor.parse(document.createElement("a")));
      it('should callback with this twice', function(done) {
        var _this;
        _this = null;
        return new ButtonFrame(hash, function(iframe) {
          document.body.appendChild(iframe);
          return _this = this;
        }, function(iframe) {
          expect(_this).to.equal(this);
          return done();
        });
      });
      it('should callback with the iframe as argument twice', function(done) {
        var frame;
        frame = null;
        return new ButtonFrame(hash, function(iframe) {
          document.body.appendChild(iframe);
          frame = iframe;
          return expect(iframe.tagName).to.equal("IFRAME");
        }, function(iframe) {
          expect(iframe).to.equal(frame);
          return done();
        });
      });
      it('should load the iframe twice after insert it into DOM', function(done) {
        var spy;
        spy = sinon.spy();
        return new ButtonFrame(hash, function(iframe) {
          document.body.appendChild(iframe);
          return this.on("load", function() {
            return spy();
          });
        }, function(iframe) {
          this.once("load", function() {
            expect(spy).to.have.been.calledTwice;
            iframe.parentNode.removeChild(iframe);
            return done();
          });
          return document.body.appendChild(iframe);
        });
      });
      it('should load the iframe the first time by writing html', function(done) {
        return new ButtonFrame(hash, function(iframe) {
          document.body.appendChild(iframe);
          return sinon.spy(this, "html");
        }, function(iframe) {
          expect(this.html).to.have.been.calledOnce;
          this.html.restore();
          return done();
        });
      });
      it('should set document.location.hash when load the first time by writing html', function(done) {
        var _hash;
        _hash = null;
        return new ButtonFrame(hash, function(iframe) {
          document.body.appendChild(iframe);
          return this.once("load", function() {
            return _hash = iframe.contentWindow.document.location.hash;
          });
        }, function(iframe) {
          expect(_hash).to.equal(hash);
          return done();
        });
      });
      it('should load the iframe the second time by setting the src attribute', function(done) {
        return new ButtonFrame(hash, function(iframe) {
          document.body.appendChild(iframe);
          sinon.spy(this, "html");
          return sinon.spy(this, "load");
        }, function(iframe) {
          expect(this.load).to.have.been.calledOnce;
          expect(this.load).to.have.been.calledAfter(this.html);
          this.html.restore();
          this.load.restore();
          return done();
        });
      });
      it('should set document.location.href when load the second time by setting the src attribute', function(done) {
        return new ButtonFrame(hash, function(iframe) {
          return document.body.appendChild(iframe);
        }, function(iframe) {
          this.once("load", function() {
            expect(iframe.contentWindow.document.location.hash).to.equal(hash);
            iframe.parentNode.removeChild(iframe);
            return done();
          });
          return document.body.appendChild(iframe);
        });
      });
      return it('should resize the iframe after the second load', function(done) {
        return new ButtonFrame(hash, function(iframe) {
          document.body.appendChild(iframe);
          sinon.spy(this, "html");
          sinon.spy(this, "load");
          sinon.spy(this, "size");
          return sinon.spy(this, "resize");
        }, function(iframe) {
          expect(this.size).to.have.been.calledOnce;
          expect(this.size).to.have.been.calledAfter(this.html);
          this.once("load", function() {
            expect(this.resize).to.have.been.calledOnce;
            expect(this.resize).to.have.been.calledAfter(this.load);
            expect(this.resize.args[0][0]).to.deep.equal(this.size.returnValues[0]);
            expect(iframe.style.width).to.equal(this.size.returnValues[0].width);
            expect(iframe.style.height).to.equal(this.size.returnValues[0].height);
            this.html.restore();
            this.load.restore();
            this.size.restore();
            this.resize.restore();
            iframe.parentNode.removeChild(iframe);
            return done();
          });
          return document.body.appendChild(iframe);
        });
      });
    });
  });

  describe('ButtonFrameContent', function() {
    var base, bodyClassName, data, head, javascript_protocals;
    head = document.getElementsByTagName("head")[0];
    base = null;
    bodyClassName = null;
    data = {
      "meta": {
        "X-RateLimit-Limit": "60",
        "X-RateLimit-Remaining": "59",
        "X-RateLimit-Reset": "1423391706",
        "Cache-Control": "public, max-age=60, s-maxage=60",
        "Last-Modified": "Sun, 08 Feb 2015 07:39:11 GMT",
        "Vary": "Accept",
        "X-GitHub-Media-Type": "github.v3",
        "status": 200
      },
      "data": {
        "login": "ntkme",
        "id": 899645,
        "avatar_url": "https://avatars.githubusercontent.com/u/899645?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/ntkme",
        "html_url": "https://github.com/ntkme",
        "followers_url": "https://api.github.com/users/ntkme/followers",
        "following_url": "https://api.github.com/users/ntkme/following{/other_user}",
        "gists_url": "https://api.github.com/users/ntkme/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/ntkme/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/ntkme/subscriptions",
        "organizations_url": "https://api.github.com/users/ntkme/orgs",
        "repos_url": "https://api.github.com/users/ntkme/repos",
        "events_url": "https://api.github.com/users/ntkme/events{/privacy}",
        "received_events_url": "https://api.github.com/users/ntkme/received_events",
        "type": "User",
        "site_admin": false,
        "name": "なつき",
        "company": "",
        "blog": "https://ntk.me",
        "location": "California",
        "email": "i@ntk.me",
        "hireable": true,
        "bio": null,
        "public_repos": 10,
        "public_gists": 0,
        "followers": 26,
        "following": 0,
        "created_at": "2011-07-07T03:26:58Z",
        "updated_at": "2015-02-08T07:39:11Z"
      }
    };
    javascript_protocals = ["javascript:", "JAVASCRIPT:", "JavaScript:", " javascript:", "   javascript:", "\tjavascript:", "\njavascript:", "\rjavascript:", "\fjavascript:"];
    beforeEach(function() {
      bodyClassName = document.body.getAttribute("class");
      base = document.getElementsByTagName("base")[0];
      return sinon.stub(document.body, "appendChild");
    });
    afterEach(function() {
      if (bodyClassName) {
        document.body.className = bodyClassName;
      } else {
        document.body.removeAttribute("class");
      }
      return document.body.appendChild.restore();
    });
    return describe('#constructor()', function() {
      it('should do nothing when options are missing', function() {
        new ButtonFrameContent();
        expect(base.getAttribute("href")).to.be["null"];
        return expect(document.body.appendChild).to.have.not.been.called;
      });
      it('should not set base.href', function() {
        var options;
        options = {
          "href": "https://github.com/"
        };
        new ButtonFrameContent(options);
        return expect(base.getAttribute("href")).to.be["null"];
      });
      it('should set document.body.className when a style is given', function() {
        var options;
        options = {
          "data-style": "mega"
        };
        new ButtonFrameContent(options);
        return expect(document.body.className).to.equal(options["data-style"]);
      });
      it('should append the button to document.body when the necessary options are given', function() {
        var button, options;
        options = {};
        new ButtonFrameContent(options);
        expect(document.body.appendChild).to.be.calledOnce;
        button = document.body.appendChild.args[0][0];
        return expect(button).to.have.property("className").and.equal("button");
      });
      it('should append the button with given href', function() {
        var button, options;
        options = {
          "href": "https://ntkme.github.com/"
        };
        new ButtonFrameContent(options);
        button = document.body.appendChild.args[0][0];
        return expect(button.getAttribute("href")).to.equal(options.href);
      });
      it('should filter javascript in the href', function() {
        var button, href, i, j, len, options, results1;
        results1 = [];
        for (i = j = 0, len = javascript_protocals.length; j < len; i = ++j) {
          href = javascript_protocals[i];
          options = {
            "href": href,
            "data-count-href": href
          };
          new ButtonFrameContent(options);
          button = document.body.appendChild.args[i][0];
          if (button.protocol) {
            results1.push(expect(button.protocol).to.not.equal("javascript:"));
          } else {
            results1.push(expect(button.href).to.not.match(/^javascript:/i));
          }
        }
        return results1;
      });
      it('should append the button with the default icon', function() {
        var button, options;
        options = {};
        new ButtonFrameContent(options);
        button = document.body.appendChild.args[0][0];
        return expect((" " + button.firstChild.className + " ").indexOf(" " + CONFIG_ICON_DEFAULT + " ")).to.be.at.least(0);
      });
      it('should append the button with given icon', function() {
        var button, options;
        options = {
          "data-icon": "octicon-star"
        };
        new ButtonFrameContent(options);
        button = document.body.appendChild.args[0][0];
        return expect((" " + button.firstChild.className + " ").indexOf(" " + options["data-icon"] + " ")).to.be.at.least(0);
      });
      it('should append the button with given text', function() {
        var button, options;
        options = {
          "text": "Follow"
        };
        new ButtonFrameContent(options);
        button = document.body.appendChild.args[0][0];
        return expect(button.lastChild.innerHTML).to.equal(options.text);
      });
      it('should append the button with given aria label', function() {
        var button, options;
        options = {
          "aria-label": "GitHub"
        };
        new ButtonFrameContent(options);
        button = document.body.appendChild.args[0][0];
        return expect(button.getAttribute("aria-label")).to.equal(options["aria-label"]);
      });
      it('should append the count to document.body when the necessary options are given', function() {
        var count, options;
        sinon.stub(head, "appendChild").callsFake(function() {
          return window.callback(data);
        });
        options = {
          "href": "https://github.com/ntkme",
          "data-show-count": true
        };
        new ButtonFrameContent(options);
        expect(document.body.appendChild).to.be.calledTwice;
        count = document.body.appendChild.args[1][0];
        head.appendChild.restore();
        expect(count).to.have.property("className").and.equal("count");
        expect(count.lastChild.innerHTML).to.equal("26");
        return expect(count.getAttribute("aria-label")).to.equal("26 followers on GitHub");
      });
      return it('should not append the count when it fails to pull api data', function() {
        var button, options;
        sinon.stub(head, "appendChild").callsFake(function() {
          return window.callback({
            meta: {
              status: 404
            }
          });
        });
        options = {
          "href": "https://github.com/ntkme",
          "data-show-count": true
        };
        new ButtonFrameContent(options);
        expect(document.body.appendChild).to.be.calledOnce;
        button = document.body.appendChild.args[0][0];
        head.appendChild.restore();
        return expect(button).to.have.property("className").and.equal("button");
      });
    });
  });

}).call(this);
