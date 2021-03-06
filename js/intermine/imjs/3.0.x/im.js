/*! imjs - v3.0.0-pre - 2013-12-02 */

// This library is open source software according to the definition of the
// GNU Lesser General Public Licence, Version 3, (LGPLv3) a copy of which is
// included with this software. All use of this software is covered according to
// the terms of the LGPLv3.
// 
// The copyright is held by InterMine (www.intermine.org) and Alex Kalderimis (alex@intermine.org).

(function() {
  var HAS_CONSOLE, HAS_JSON, NOT_ENUM, hasDontEnumBug, hasOwnProperty, m, _fn, _i, _len, _ref, _ref1, _ref2, _ref3;

  HAS_CONSOLE = typeof console !== 'undefined';

  HAS_JSON = typeof JSON !== 'undefined';

  NOT_ENUM = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

  if (!HAS_JSON) {
    jQuery.getScript('http://cdn.intermine.org/js/json3/3.2.2/json3.min.js');
  }

  if (Object.keys == null) {
    hasOwnProperty = Object.prototype.hasOwnProperty;
    hasDontEnumBug = !{
      toString: null
    }.propertyIsEnumerable("toString");
    Object.keys = function(o) {
      var keys, name, nonEnum, _i, _len;
      if (typeof o !== "object" && typeof o !== "" || o === null) {
        throw new TypeError("Object.keys called on a non-object");
      }
      keys = (function() {
        var _results;
        _results = [];
        for (name in o) {
          if (hasOwnProperty.call(o, name)) {
            _results.push(name);
          }
        }
        return _results;
      })();
      if (hasDontEnumBug) {
        for (_i = 0, _len = NOT_ENUM.length; _i < _len; _i++) {
          nonEnum = NOT_ENUM[_i];
          if (hasOwnProperty.call(o, nonEnum)) {
            keys.push(nonEnum);
          }
        }
      }
      return keys;
    };
  }

  if (Array.prototype.map == null) {
    Array.prototype.map = function(f) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        x = this[_i];
        _results.push(f(x));
      }
      return _results;
    };
  }

  if (Array.prototype.filter == null) {
    Array.prototype.filter = function(f) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        x = this[_i];
        if (f(x)) {
          _results.push(x);
        }
      }
      return _results;
    };
  }

  if (Array.prototype.reduce == null) {
    Array.prototype.reduce = function(f, initValue) {
      var ret, x, xs, _i, _len;
      xs = this.slice();
      ret = arguments.length < 2 ? xs.pop() : initValue;
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        ret = f(ret, x);
      }
      return ret;
    };
  }

  if (Array.prototype.forEach == null) {
    Array.prototype.forEach = function(f, ctx) {
      var i, x, _i, _len, _results;
      if (!f) {
        throw new Error("No function provided");
      }
      _results = [];
      for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {
        x = this[i];
        _results.push(f.call(ctx != null ? ctx : this, x, i, this));
      }
      return _results;
    };
  }

  if (!HAS_CONSOLE) {
    this.console = {
      log: (function() {}),
      error: (function() {}),
      debug: (function() {})
    };
    if (typeof window !== "undefined" && window !== null) {
      window.console = this.console;
    }
  }

  if ((_ref = console.log) == null) {
    console.log = function() {};
  }

  if ((_ref1 = console.error) == null) {
    console.error = function() {};
  }

  if ((_ref2 = console.debug) == null) {
    console.debug = function() {};
  }

  if (console.log.apply == null) {
    console.log("Your console needs patching.");
    _ref3 = ['log', 'error', 'debug'];
    _fn = function(m) {
      var oldM;
      oldM = console[m];
      return console[m] = function(args) {
        return oldM(args);
      };
    };
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      m = _ref3[_i];
      _fn(m);
    }
  }

}).call(this);

!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.intermine=e():"undefined"!=typeof global?global.intermine=e():"undefined"!=typeof self&&(self.intermine=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var constants;

  constants = exports;

  constants.ACCEPT_HEADER = {
    'json': 'application/json',
    'jsonobjects': 'application/json;type=objects',
    'jsontable': 'application/json;type=table',
    'jsonrows': 'application/json;type=rows',
    'jsoncount': 'application/json;type=count',
    'jsonp': 'application/javascript',
    'jsonpobjects': 'application/javascript;type=objects',
    'jsonptable': 'application/javascript;type=table',
    'jsonprows': 'application/javascript;type=rows',
    'jsonpcount': 'application/javascript;type=count'
  };

}).call(this);

},{}],"zlU5Ni":[function(require,module,exports){
(function() {
  var ACCEPT_HEADER, CHARSET, CONVERTERS, IE_VERSION, PESKY_COMMA, Promise, URLENC, check, error, httpinvoke, matches, merge, re, streaming, success, ua, utils, withCB, _ref;

  Promise = require('promise');

  httpinvoke = require('httpinvoke');

  ACCEPT_HEADER = require('./constants').ACCEPT_HEADER;

  _ref = utils = require('./util'), withCB = _ref.withCB, success = _ref.success, error = _ref.error, merge = _ref.merge;

  PESKY_COMMA = /,\s*$/;

  URLENC = "application/x-www-form-urlencoded";

  IE_VERSION = -1;

  if (navigator.appName === 'Microsoft Internet Explorer') {
    ua = navigator.userAgent;
    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (matches = ua.match(re)) {
      IE_VERSION = parseFloat(matches[1]);
    }
  }

  exports.getMethod = function(x) {
    switch (x) {
      case "PUT":
        return "POST";
      case "DELETE":
        return "GET";
      default:
        return x;
    }
  };

  exports.supports = function(x) {
    if ((0 < IE_VERSION && IE_VERSION < 10) && x === 'PUT' || x === 'DELETE') {
      return false;
    } else {
      return true;
    }
  };

  streaming = function(data) {
    return {
      resume: (function() {}),
      pause: (function() {}),
      on: function(evt, cb) {
        var res, _i, _len, _ref1, _results;
        switch (evt) {
          case 'data':
            _ref1 = data.results;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              res = _ref1[_i];
              _results.push(cb(res));
            }
            return _results;
          case 'end':
            return cb();
        }
      }
    };
  };

  exports.iterReq = function(method, path, format) {
    return function(q, page, cb, eb, onEnd) {
      var attach, req, _ref1;
      if (page == null) {
        page = {};
      }
      if (utils.isFunction(page)) {
        _ref1 = [{}, page, cb, eb], page = _ref1[0], cb = _ref1[1], eb = _ref1[2], onEnd = _ref1[3];
      }
      req = merge({
        format: format
      }, page, {
        query: q.toXML()
      });
      attach = function(stream) {
        console.log("Attaching");
        if (cb != null) {
          stream.on('data', cb);
        }
        if (onEnd != null) {
          stream.on('end', onEnd);
        }
        return stream;
      };
      return withCB(eb, this.makeRequest(method, path, req, null, true).then(attach));
    };
  };

  check = function(response) {
    var e, err, msg, sc, _ref1, _ref2;
    sc = response.statusCode;
    if ((200 <= sc && sc < 400)) {
      return response.body;
    } else {
      msg = "Bad response: " + sc;
      err = ((_ref1 = response.body) != null ? _ref1.error : void 0) ? response.body.error : (e = (_ref2 = response.body) != null ? typeof _ref2.match === "function" ? _ref2.match(/\[ERROR\] (\d+)([\s\S]*)/) : void 0 : void 0) ? e[2] : void 0;
      if (err != null) {
        msg += ": " + err;
      }
      return error(new Error(msg));
    }
  };

  CHARSET = "; charset=UTF-8";

  CONVERTERS = {
    'text json': JSON.parse
  };

  exports.doReq = function(opts, iter) {
    var headers, isJSON, method, options, postdata, resp, url, _ref1;
    method = opts.type;
    url = opts.url;
    headers = {
      'Accept': ACCEPT_HEADER[opts.dataType]
    };
    isJSON = /json/.test(opts.dataType) || /json/.test((_ref1 = opts.data) != null ? _ref1.format : void 0);
    if (opts.data != null) {
      postdata = typeof opts.data === 'string' ? opts.data : "application/json" === opts.contentType ? JSON.stringify(opts.data) : utils.querystring(opts.data);
      if ((method === 'GET' || method === 'DELETE') && (postdata != null ? postdata.length : void 0)) {
        url += '?' + postdata;
        postdata = void 0;
      } else {
        headers['Content-Type'] = (opts.contentType || URLENC) + CHARSET;
      }
    }
    options = {
      timeout: opts.timeout,
      headers: headers,
      outputType: isJSON ? 'json' : 'text',
      corsExposedHeaders: ['Content-Type'],
      converters: CONVERTERS
    };
    if (postdata != null) {
      options.inputType = 'text';
      options.input = postdata;
    }
    resp = Promise.from(httpinvoke(url, method, options)).then(check);
    resp.then(opts.success, opts.error);
    if (iter) {
      return resp.then(streaming);
    }
    return resp;
  };

}).call(this);

},{"./constants":1,"./util":12,"httpinvoke":17,"promise":19}],"./http":[function(require,module,exports){
module.exports=require('zlU5Ni');
},{}],4:[function(require,module,exports){
(function() {
  var CategoryResults, IDResolutionJob, IdResults, ONE_MINUTE, concatMap, defer, difference, fold, funcutils, get, id, intermine, uniqBy, withCB,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  funcutils = require('./util');

  intermine = exports;

  uniqBy = funcutils.uniqBy, difference = funcutils.difference, defer = funcutils.defer, withCB = funcutils.withCB, id = funcutils.id, get = funcutils.get, fold = funcutils.fold, concatMap = funcutils.concatMap;

  ONE_MINUTE = 60 * 1000;

  CategoryResults = (function() {
    var getIssueMatches;

    function CategoryResults(results) {
      var k, v;
      for (k in results) {
        if (!__hasProp.call(results, k)) continue;
        v = results[k];
        this[k] = v;
      }
    }

    CategoryResults.prototype.getStats = function(type) {
      if (type != null) {
        return this.stats[type];
      } else {
        return this.stats;
      }
    };

    getIssueMatches = concatMap(get('matches'));

    CategoryResults.prototype.getMatches = function(k) {
      var _ref;
      if (k === 'MATCH') {
        return this.matches[k];
      } else {
        return (_ref = getIssueMatches(this.matches[k])) != null ? _ref : [];
      }
    };

    CategoryResults.prototype.getMatchIds = function(k) {
      if (k != null) {
        return this.getMatches(k).map(get('id'));
      } else {
        return this.allMatchIds();
      }
    };

    CategoryResults.prototype.goodMatchIds = function() {
      return this.getMatchIds('MATCH');
    };

    CategoryResults.prototype.allMatchIds = function() {
      var combineIds,
        _this = this;
      combineIds = fold(function(res, issueSet) {
        return res.concat(_this.getMatchIds(issueSet));
      });
      return combineIds(this.goodMatchIds(), ['DUPLICATE', 'WILDCARD', 'TYPE_CONVERTED', 'OTHER']);
    };

    return CategoryResults;

  })();

  IdResults = (function() {
    var flatten, getReasons, isGood, unique;

    unique = uniqBy(id);

    flatten = concatMap(id);

    getReasons = function(match) {
      var k, vals;
      return flatten((function() {
        var _ref, _results;
        _ref = match.identifiers;
        _results = [];
        for (k in _ref) {
          vals = _ref[k];
          _results.push(vals);
        }
        return _results;
      })());
    };

    isGood = function(match, k) {
      return !(k != null) || __indexOf.call(getReasons(match), k) >= 0;
    };

    function IdResults(results) {
      var k, v;
      for (k in results) {
        if (!__hasProp.call(results, k)) continue;
        v = results[k];
        this[k] = v;
      }
    }

    IdResults.prototype.getStats = function(type) {
      switch (type) {
        case 'objects':
          return this.getObjectStats();
        case 'identifiers':
          return this.getIdentifierStats();
        default:
          return {
            objects: this.getObjectStats(),
            identifiers: this.getIdentifierStats()
          };
      }
    };

    IdResults.prototype.getIdentifierStats = function() {
      var all, allIdents, issues, matchIdents, matches, toIdents;
      toIdents = function(ms) {
        var ident, match;
        return unique(flatten((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = ms.length; _i < _len; _i++) {
            match = ms[_i];
            _results.push((function() {
              var _results1;
              _results1 = [];
              for (ident in match != null ? match.identifiers : void 0) {
                _results1.push(ident);
              }
              return _results1;
            })());
          }
          return _results;
        })()));
      };
      matchIdents = toIdents(this.getMatches('MATCH'));
      allIdents = toIdents(this.getMatches());
      matches = matchIdents.length;
      all = allIdents.length;
      issues = (difference(allIdents, matchIdents)).length;
      return {
        matches: matches,
        all: all,
        issues: issues
      };
    };

    IdResults.prototype.getObjectStats = function() {
      var all, issues, match, matches;
      matches = this.goodMatchIds().length;
      all = this.allMatchIds().length;
      issues = ((function() {
        var _results;
        _results = [];
        for (id in this) {
          if (!__hasProp.call(this, id)) continue;
          match = this[id];
          if (__indexOf.call(getReasons(match), 'MATCH') < 0) {
            _results.push(id);
          }
        }
        return _results;
      }).call(this)).length;
      return {
        matches: matches,
        all: all,
        issues: issues
      };
    };

    IdResults.prototype.getMatches = function(k) {
      var match, _results;
      _results = [];
      for (id in this) {
        if (!__hasProp.call(this, id)) continue;
        match = this[id];
        if (isGood(match, k)) {
          _results.push(match);
        }
      }
      return _results;
    };

    IdResults.prototype.getMatchIds = function(k) {
      var match, _results;
      _results = [];
      for (id in this) {
        if (!__hasProp.call(this, id)) continue;
        match = this[id];
        if (isGood(match, k)) {
          _results.push(id);
        }
      }
      return _results;
    };

    IdResults.prototype.goodMatchIds = function() {
      return this.getMatchIds('MATCH');
    };

    IdResults.prototype.allMatchIds = function() {
      return this.getMatchIds();
    };

    return IdResults;

  })();

  IDResolutionJob = (function() {

    function IDResolutionJob(uid, service) {
      this.uid = uid;
      this.service = service;
      this.del = __bind(this.del, this);

      this.fetchResults = __bind(this.fetchResults, this);

      this.fetchErrorMessage = __bind(this.fetchErrorMessage, this);

      this.fetchStatus = __bind(this.fetchStatus, this);

    }

    IDResolutionJob.prototype.fetchStatus = function(cb) {
      return withCB(cb, this.service.get("ids/" + this.uid + "/status").then(get('status')));
    };

    IDResolutionJob.prototype.fetchErrorMessage = function(cb) {
      return withCB(cb, this.service.get("ids/" + this.uid + "/status").then(get('message')));
    };

    IDResolutionJob.prototype.fetchResults = function(cb) {
      var gettingRes, gettingVer;
      gettingRes = this.service.get("ids/" + this.uid + "/result").then(get('results'));
      gettingVer = this.service.fetchVersion();
      return gettingVer.then(function(v) {
        return gettingRes.then(function(results) {
          if (v >= 16) {
            return new CategoryResults(results);
          } else {
            return new IdResults(results);
          }
        });
      });
    };

    IDResolutionJob.prototype.del = function(cb) {
      return this.service.makeRequest('DELETE', "ids/" + this.uid, {}, cb);
    };

    IDResolutionJob.prototype.decay = 50;

    IDResolutionJob.prototype.poll = function(onSuccess, onError, onProgress) {
      var backOff, notify, promise, reject, resolve, resp, _ref,
        _this = this;
      _ref = defer(), promise = _ref.promise, resolve = _ref.resolve, reject = _ref.reject;
      promise.then(onSuccess, onError);
      notify = onProgress != null ? onProgress : (function() {});
      resp = this.fetchStatus();
      resp.then(null, reject);
      backOff = this.decay;
      this.decay = Math.min(ONE_MINUTE, backOff * 1.25);
      resp.then(function(status) {
        notify(status);
        switch (status) {
          case 'SUCCESS':
            return _this.fetchResults().then(resolve, reject);
          case 'ERROR':
            return _this.fetchErrorMessage().then(reject, reject);
          default:
            return setTimeout((function() {
              return _this.poll(resolve, reject, notify);
            }), backOff);
        }
      });
      return promise;
    };

    return IDResolutionJob;

  })();

  IDResolutionJob.prototype.wait = IDResolutionJob.prototype.poll;

  IDResolutionJob.create = function(service) {
    return function(uid) {
      return new IDResolutionJob(uid, service);
    };
  };

  intermine.IDResolutionJob = IDResolutionJob;

  intermine.CategoryResults = CategoryResults;

  intermine.IdResults = IdResults;

}).call(this);

},{"./util":12}],5:[function(require,module,exports){
(function() {
  var INVITES, List, REQUIRES_VERSION, SHARES, TAGS_PATH, dejoin, get, getFolderName, intermine, invoke, isFolder, merge, set, utils, withCB,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  utils = require('./util');

  intermine = exports;

  merge = utils.merge, withCB = utils.withCB, get = utils.get, invoke = utils.invoke, REQUIRES_VERSION = utils.REQUIRES_VERSION, set = utils.set, dejoin = utils.dejoin;

  TAGS_PATH = "list/tags";

  SHARES = "lists/shares";

  INVITES = 'lists/invitations';

  isFolder = function(t) {
    return t.substr(0, t.indexOf(':')) === '__folder__';
  };

  getFolderName = function(t) {
    return t.substr(t.indexOf(':') + 1);
  };

  List = (function() {
    var getTags;

    function List(properties, service) {
      var k, v;
      this.service = service;
      this._updateTags = __bind(this._updateTags, this);

      this.hasTag = __bind(this.hasTag, this);

      for (k in properties) {
        if (!__hasProp.call(properties, k)) continue;
        v = properties[k];
        this[k] = v;
      }
      this.dateCreated = (this.dateCreated != null) ? new Date(this.dateCreated) : null;
      this.folders = this.tags.filter(isFolder).map(getFolderName);
    }

    List.prototype.hasTag = function(t) {
      return __indexOf.call(this.tags, t) >= 0;
    };

    List.prototype.query = function(view) {
      if (view == null) {
        view = ['*'];
      }
      return this.service.query({
        select: view,
        from: this.type,
        where: [[this.type, 'IN', this.name]]
      });
    };

    List.prototype.del = function(cb) {
      return this.service.makeRequest('DELETE', 'lists', {
        name: this.name
      }, cb);
    };

    getTags = function(_arg) {
      var tags;
      tags = _arg.tags;
      return tags;
    };

    List.prototype._updateTags = function(err, tags) {
      if (err != null) {
        return;
      }
      this.tags = tags.slice();
      return this.folders = this.tags.filter(isFolder).map(getFolderName);
    };

    List.prototype.fetchTags = function(cb) {
      return withCB(this._updateTags, cb, this.service.makeRequest('GET', 'list/tags', {
        name: this.name
      }).then(getTags));
    };

    List.prototype.addTags = function(tags, cb) {
      var req;
      req = {
        name: this.name,
        tags: tags
      };
      return withCB(this._updateTags, cb, this.service.makeRequest('POST', 'list/tags', req).then(getTags));
    };

    List.prototype.removeTags = function(tags, cb) {
      var req;
      req = {
        name: this.name,
        tags: tags
      };
      return withCB(this._updateTags, cb, this.service.makeRequest('DELETE', 'list/tags', req).then(getTags));
    };

    List.prototype.contents = function(cb) {
      return withCB(cb, this.query().then(dejoin).then(invoke('records')));
    };

    List.prototype.rename = function(newName, cb) {
      var req,
        _this = this;
      req = {
        oldname: this.name,
        newname: newName
      };
      return withCB(cb, this.service.post('lists/rename', req).then(get('listName')).then(function(n) {
        return _this.name = n;
      }).then(this.service.fetchList));
    };

    List.prototype.copy = function(opts, cb) {
      var baseName, name, query, tags, _ref, _ref1, _ref2,
        _this = this;
      if (opts == null) {
        opts = {};
      }
      if (cb == null) {
        cb = (function() {});
      }
      if (arguments.length === 1 && utils.isFunction(opts)) {
        _ref = [{}, opts], opts = _ref[0], cb = _ref[1];
      }
      if (typeof opts === 'string') {
        opts = {
          name: opts
        };
      }
      name = baseName = (_ref1 = opts.name) != null ? _ref1 : "" + this.name + "_copy";
      tags = this.tags.concat((_ref2 = opts.tags) != null ? _ref2 : []);
      query = this.query(['id']);
      return withCB(cb, this.service.fetchLists().then(invoke('map', get('name'))).then(function(names) {
        var c;
        c = 1;
        while (__indexOf.call(names, name) >= 0) {
          name = "" + baseName + "-" + (c++);
        }
        return query.then(invoke('saveAsList', {
          name: name,
          tags: tags,
          description: _this.description
        }));
      }));
    };

    List.prototype.enrichment = function(opts, cb) {
      return this.service.enrichment(merge({
        list: this.name
      }, opts), cb);
    };

    List.prototype.shareWithUser = function(recipient, cb) {
      return withCB(cb, this.service.post(SHARES, {
        'list': this.name,
        'with': recipient
      }));
    };

    List.prototype.inviteUserToShare = function(recipient, notify, cb) {
      if (notify == null) {
        notify = true;
      }
      if (cb == null) {
        cb = (function() {});
      }
      return withCB(cb, this.service.post(INVITES, {
        list: this.name,
        to: recipient,
        notify: !!notify
      }));
    };

    return List;

  })();

  intermine.List = List;

}).call(this);

},{"./util":12}],6:[function(require,module,exports){
(function() {
  var Model, PathInfo, Table, error, find, flatten, intermine, liftToTable, omap, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Table = require('./table').Table;

  PathInfo = require('./path').PathInfo;

  _ref = require('./util'), flatten = _ref.flatten, find = _ref.find, error = _ref.error, omap = _ref.omap;

  intermine = exports;

  liftToTable = omap(function(k, v) {
    return [k, new Table(v)];
  });

  Model = (function() {

    function Model(_arg) {
      var classes;
      this.name = _arg.name, classes = _arg.classes;
      this.findCommonType = __bind(this.findCommonType, this);

      this.findSharedAncestor = __bind(this.findSharedAncestor, this);

      this.getAncestorsOf = __bind(this.getAncestorsOf, this);

      this.getSubclassesOf = __bind(this.getSubclassesOf, this);

      this.getPathInfo = __bind(this.getPathInfo, this);

      this.classes = liftToTable(classes);
    }

    Model.prototype.getPathInfo = function(path, subcls) {
      return PathInfo.parse(this, path, subcls);
    };

    Model.prototype.getSubclassesOf = function(cls) {
      var cd, clazz, ret, _, _ref1, _ref2;
      clazz = cls && cls.name ? cls : this.classes[cls];
      if (clazz == null) {
        throw new Error("" + cls + " is not a table");
      }
      ret = [clazz.name];
      _ref1 = this.classes;
      for (_ in _ref1) {
        cd = _ref1[_];
        if (_ref2 = clazz.name, __indexOf.call(cd.parents(), _ref2) >= 0) {
          ret = ret.concat(this.getSubclassesOf(cd));
        }
      }
      return ret;
    };

    Model.prototype.getAncestorsOf = function(cls) {
      var ancestors, clazz, superC, _i, _len;
      clazz = cls && cls.name ? cls : this.classes[cls];
      if (clazz == null) {
        throw new Error("" + cls + " is not a table");
      }
      ancestors = clazz.parents();
      for (_i = 0, _len = ancestors.length; _i < _len; _i++) {
        superC = ancestors[_i];
        ancestors.push(this.getAncestorsOf(superC));
      }
      return flatten(ancestors);
    };

    Model.prototype.findSharedAncestor = function(classA, classB) {
      var a_ancestry, b_ancestry, firstCommon;
      if (classB === null || classA === null) {
        return null;
      }
      if (classA === classB) {
        return classA;
      }
      a_ancestry = this.getAncestorsOf(classA);
      if (__indexOf.call(a_ancestry, classB) >= 0) {
        return classB;
      }
      b_ancestry = this.getAncestorsOf(classB);
      if (__indexOf.call(b_ancestry, classA) >= 0) {
        return classA;
      }
      firstCommon = find(a_ancestry, function(a) {
        return __indexOf.call(b_ancestry, a) >= 0;
      });
      return firstCommon;
    };

    Model.prototype.findCommonType = function(xs) {
      if (xs == null) {
        xs = [];
      }
      return xs.reduce(this.findSharedAncestor);
    };

    return Model;

  })();

  Model.prototype.makePath = Model.prototype.getPathInfo;

  Model.prototype.findCommonTypeOfMultipleClasses = Model.prototype.findCommonType;

  Model.load = function(data) {
    try {
      return new Model(data);
    } catch (e) {
      throw new Error("Error loading model: " + e);
    }
  };

  Model.INTEGRAL_TYPES = ["int", "Integer", "long", "Long"];

  Model.FRACTIONAL_TYPES = ["double", "Double", "float", "Float"];

  Model.NUMERIC_TYPES = Model.INTEGRAL_TYPES.concat(Model.FRACTIONAL_TYPES);

  Model.BOOLEAN_TYPES = ["boolean", "Boolean"];

  intermine.Model = Model;

}).call(this);

},{"./path":7,"./table":10,"./util":12}],7:[function(require,module,exports){
(function() {
  var NAMES, PARSED, PathInfo, any, concatMap, copy, error, get, intermine, makeKey, set, success, utils, withCB,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  intermine = exports;

  utils = require('./util');

  withCB = utils.withCB, concatMap = utils.concatMap, get = utils.get, any = utils.any, set = utils.set, copy = utils.copy, success = utils.success, error = utils.error;

  NAMES = {};

  PARSED = {};

  makeKey = function(model, path, subclasses) {
    var k, v, _ref;
    return "" + (model != null ? model.name : void 0) + "|" + (model != null ? (_ref = model.service) != null ? _ref.root : void 0 : void 0) + "|" + path + ":" + ((function() {
      var _results;
      _results = [];
      for (k in subclasses) {
        v = subclasses[k];
        _results.push("" + k + "=" + v);
      }
      return _results;
    })());
  };

  PathInfo = (function() {

    function PathInfo(_arg) {
      var _ref;
      this.root = _arg.root, this.model = _arg.model, this.descriptors = _arg.descriptors, this.subclasses = _arg.subclasses, this.displayName = _arg.displayName, this.ident = _arg.ident;
      this.allDescriptors = __bind(this.allDescriptors, this);

      this.getChildNodes = __bind(this.getChildNodes, this);

      this.getDisplayName = __bind(this.getDisplayName, this);

      this.isa = __bind(this.isa, this);

      this.append = __bind(this.append, this);

      this.getParent = __bind(this.getParent, this);

      this.getEndClass = __bind(this.getEndClass, this);

      this.containsCollection = __bind(this.containsCollection, this);

      this.isCollection = __bind(this.isCollection, this);

      this.isReference = __bind(this.isReference, this);

      this.isClass = __bind(this.isClass, this);

      this.isAttribute = __bind(this.isAttribute, this);

      this.isRoot = __bind(this.isRoot, this);

      this.end = this.descriptors[this.descriptors.length - 1];
      if ((_ref = this.ident) == null) {
        this.ident = makeKey(this.model, this, this.subclasses);
      }
    }

    PathInfo.prototype.isRoot = function() {
      return this.descriptors.length === 0;
    };

    PathInfo.prototype.isAttribute = function() {
      return (this.end != null) && !(this.end.referencedType != null);
    };

    PathInfo.prototype.isClass = function() {
      return this.isRoot() || (this.end.referencedType != null);
    };

    PathInfo.prototype.isReference = function() {
      var _ref;
      return ((_ref = this.end) != null ? _ref.referencedType : void 0) != null;
    };

    PathInfo.prototype.isCollection = function() {
      var _ref, _ref1;
      return (_ref = (_ref1 = this.end) != null ? _ref1.isCollection : void 0) != null ? _ref : false;
    };

    PathInfo.prototype.containsCollection = function() {
      return any(this.descriptors, function(x) {
        return x.isCollection;
      });
    };

    PathInfo.prototype.getEndClass = function() {
      var _ref;
      return this.model.classes[this.subclasses[this.toString()] || ((_ref = this.end) != null ? _ref.referencedType : void 0)] || this.root;
    };

    PathInfo.prototype.getParent = function() {
      var data;
      if (this.isRoot()) {
        throw new Error("Root paths do not have parents");
      }
      data = {
        root: this.root,
        model: this.model,
        descriptors: this.descriptors.slice(0, this.descriptors.length - 1),
        subclasses: this.subclasses
      };
      return new PathInfo(data);
    };

    PathInfo.prototype.append = function(attr) {
      var data, fld;
      if (this.isAttribute()) {
        throw new Error("" + this + " is an attribute.");
      }
      fld = typeof attr === 'string' ? this.getType().fields[attr] : attr;
      if (fld == null) {
        throw new Error("" + attr + " is not a field of " + (this.getType()));
      }
      data = {
        root: this.root,
        model: this.model,
        descriptors: this.descriptors.concat([fld]),
        subclasses: this.subclasses
      };
      return new PathInfo(data);
    };

    PathInfo.prototype.isa = function(clazz) {
      var name, type;
      if (this.isAttribute()) {
        return this.getType() === clazz;
      } else {
        name = clazz.name ? clazz.name : '' + clazz;
        type = this.getType();
        return (name === type.name) || (__indexOf.call(this.model.getAncestorsOf(type), name) >= 0);
      }
    };

    PathInfo.prototype.getDisplayName = function(cb) {
      var cached, custom, params, path, _ref,
        _this = this;
      if (custom = this.displayName) {
        return success(custom);
      }
      if ((_ref = this.namePromise) == null) {
        this.namePromise = (cached = NAMES[this.ident]) ? success(cached) : !(this.model.service != null) ? error("No service") : (path = 'model' + (concatMap(function(d) {
          return '/' + d.name;
        }))(this.allDescriptors()), params = (set({
          format: 'json'
        }))(copy(this.subclasses)), this.model.service.get(path, params).then(get('display')).then(function(n) {
          var _name, _ref1;
          return (_ref1 = NAMES[_name = _this.ident]) != null ? _ref1 : NAMES[_name] = n;
        }));
      }
      return withCB(cb, this.namePromise);
    };

    PathInfo.prototype.getChildNodes = function() {
      var fld, name, _ref, _ref1, _results;
      _ref1 = ((_ref = this.getEndClass()) != null ? _ref.fields : void 0) || {};
      _results = [];
      for (name in _ref1) {
        fld = _ref1[name];
        _results.push(this.append(fld));
      }
      return _results;
    };

    PathInfo.prototype.allDescriptors = function() {
      return [this.root].concat(this.descriptors);
    };

    PathInfo.prototype.toString = function() {
      return this.allDescriptors().map(get('name')).join('.');
    };

    PathInfo.prototype.equals = function(other) {
      return other && (other.ident != null) && this.ident === other.ident;
    };

    PathInfo.prototype.getType = function() {
      var _ref, _ref1;
      return ((_ref = this.end) != null ? (_ref1 = _ref.type) != null ? _ref1.replace(/java\.lang\./, '') : void 0 : void 0) || this.getEndClass();
    };

    return PathInfo;

  })();

  PathInfo.prototype.toPathString = PathInfo.prototype.toString;

  PathInfo.parse = function(model, path, subclasses) {
    var cached, cd, descriptors, fld, ident, keyPath, part, parts, root;
    if (subclasses == null) {
      subclasses = {};
    }
    ident = makeKey(model, path, subclasses);
    if (cached = PARSED[ident]) {
      return cached;
    }
    parts = (path + '').split('.');
    root = cd = model.classes[parts.shift()];
    keyPath = root.name;
    descriptors = (function() {
      var _i, _len, _ref, _results;
      _results = [];
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        fld = (cd != null ? cd.fields[part] : void 0) || ((_ref = (cd = model.classes[subclasses[keyPath]])) != null ? _ref.fields[part] : void 0);
        if (!fld) {
          throw new Error("Could not find " + part + " in " + cd + " when parsing " + path);
        }
        keyPath += "." + part;
        cd = model.classes[fld.type || fld.referencedType];
        _results.push(fld);
      }
      return _results;
    })();
    return PARSED[ident] = new PathInfo({
      root: root,
      model: model,
      descriptors: descriptors,
      subclasses: subclasses,
      ident: ident
    });
  };

  PathInfo.flushCache = function() {
    PARSED = {};
    return NAMES = {};
  };

  intermine.PathInfo = PathInfo;

}).call(this);

},{"./util":12}],8:[function(require,module,exports){
(function() {
  var BASIC_ATTRS, CODES, LIST_PIPE, Query, RESULTS_METHODS, SIMPLE_ATTRS, conAttrs, conStr, conToJSON, conValStr, concatMap, copyCon, decapitate, didntRemove, f, filter, fold, get, get_canonical_op, headLess, id, idConStr, intermine, interpretConArray, interpretConstraint, invoke, merge, mth, multiConStr, noUndefVals, noValueConStr, pairsToObj, partition, removeIrrelevantSortOrders, simpleConStr, stringToSortOrder, take, toQueryString, typeConStr, union, utils, withCB, _fn, _get_data_fetcher, _i, _j, _len, _len1, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  intermine = exports;

  intermine.xml = require('./xml');

  utils = require('./util');

  withCB = utils.withCB, merge = utils.merge, pairsToObj = utils.pairsToObj, filter = utils.filter, partition = utils.partition, fold = utils.fold, take = utils.take, concatMap = utils.concatMap, id = utils.id, get = utils.get, invoke = utils.invoke;

  toQueryString = utils.querystring;

  get_canonical_op = function(orig) {
    var canonical;
    canonical = (orig != null ? orig.toLowerCase : void 0) != null ? Query.OP_DICT[orig.toLowerCase()] : null;
    if (!canonical) {
      throw new Error("Illegal constraint operator: " + orig);
    }
    return canonical;
  };

  BASIC_ATTRS = ['path', 'op', 'code'];

  SIMPLE_ATTRS = BASIC_ATTRS.concat(['value', 'extraValue']);

  RESULTS_METHODS = ['rowByRow', 'eachRow', 'recordByRecord', 'eachRecord', 'records', 'rows', 'table', 'tableRows', 'values'];

  LIST_PIPE = function(service) {
    return utils.compose(service.fetchList, get('listName'));
  };

  CODES = [null, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  decapitate = function(x) {
    if (x == null) {
      x = '';
    }
    return x.substr(x.indexOf('.'));
  };

  conValStr = function(v) {
    if (v != null) {
      return "<value>" + (utils.escape(v)) + "</value>";
    } else {
      return "<nullValue/>";
    }
  };

  conAttrs = function(c, names) {
    var k, v;
    return ((function() {
      var _results;
      _results = [];
      for (k in c) {
        v = c[k];
        if ((__indexOf.call(names, k) >= 0)) {
          _results.push("" + k + "=\"" + (utils.escape(v)) + "\" ");
        }
      }
      return _results;
    })()).join('');
  };

  noValueConStr = function(c) {
    return "<constraint " + (conAttrs(c, BASIC_ATTRS)) + "/>";
  };

  typeConStr = function(c) {
    return "<constraint " + (conAttrs(c, ['path', 'type'])) + "/>";
  };

  simpleConStr = function(c) {
    return "<constraint " + (conAttrs(c, SIMPLE_ATTRS)) + "/>";
  };

  multiConStr = function(c) {
    return "<constraint " + (conAttrs(c, BASIC_ATTRS)) + ">" + (concatMap(conValStr)(c.values)) + "</constraint>";
  };

  idConStr = function(c) {
    return "<constraint " + (conAttrs(c, BASIC_ATTRS)) + "ids=\"" + (c.ids.join(',')) + "\"/>";
  };

  conStr = function(c) {
    var _ref;
    if (c.values != null) {
      return multiConStr(c);
    } else if (c.ids != null) {
      return idConStr(c);
    } else if (!(c.op != null)) {
      return typeConStr(c);
    } else if (_ref = c.op, __indexOf.call(Query.NULL_OPS, _ref) >= 0) {
      return noValueConStr(c);
    } else {
      return simpleConStr(c);
    }
  };

  headLess = function(path) {
    return path.replace(/^[^\.]+\./, '');
  };

  copyCon = function(con) {
    var code, extraValue, ids, op, path, type, value, values;
    path = con.path, type = con.type, op = con.op, value = con.value, values = con.values, extraValue = con.extraValue, ids = con.ids, code = con.code;
    ids = ids != null ? ids.slice() : void 0;
    values = values != null ? values.slice() : void 0;
    return noUndefVals({
      path: path,
      type: type,
      op: op,
      value: value,
      values: values,
      extraValue: extraValue,
      ids: ids,
      code: code
    });
  };

  conToJSON = function(con) {
    var copy;
    copy = copyCon(con);
    copy.path = headLess(copy.path);
    return copy;
  };

  noUndefVals = function(x) {
    var k, v;
    for (k in x) {
      v = x[k];
      if (v == null) {
        delete x[k];
      }
    }
    return x;
  };

  didntRemove = function(orig, reduced) {
    return "Did not remove a single constraint. original = " + orig + ", reduced = " + reduced;
  };

  interpretConstraint = function(path, con) {
    var constraint, k, keys, v, x, _ref, _ref1;
    constraint = {
      path: path
    };
    if (con === null) {
      constraint.op = 'IS NULL';
    } else if (utils.isArray(con)) {
      constraint.op = 'ONE OF';
      constraint.values = con;
    } else if ((_ref = typeof con) === 'string' || _ref === 'number') {
      if (_ref1 = typeof con.toUpperCase === "function" ? con.toUpperCase() : void 0, __indexOf.call(Query.NULL_OPS, _ref1) >= 0) {
        constraint.op = con;
      } else {
        constraint.op = '=';
        constraint.value = con;
      }
    } else {
      keys = (function() {
        var _results;
        _results = [];
        for (k in con) {
          x = con[k];
          _results.push(k);
        }
        return _results;
      })();
      if (__indexOf.call(keys, 'isa') >= 0) {
        if (utils.isArray(con.isa)) {
          constraint.op = k;
          constraint.values = con.isa;
        } else {
          constraint.type = con.isa;
        }
      } else {
        if (__indexOf.call(keys, 'extraValue') >= 0) {
          constraint.extraValue = con.extraValue;
        }
        for (k in con) {
          v = con[k];
          if (!(k !== 'extraValue')) {
            continue;
          }
          constraint.op = k;
          if (utils.isArray(v)) {
            constraint.values = v;
          } else {
            constraint.value = v;
          }
        }
      }
    }
    return constraint;
  };

  interpretConArray = function(conArgs) {
    var a0, constraint, v, _ref;
    conArgs = conArgs.slice();
    constraint = {
      path: conArgs.shift()
    };
    if (conArgs.length === 1) {
      a0 = conArgs[0];
      if (_ref = typeof a0.toUpperCase === "function" ? a0.toUpperCase() : void 0, __indexOf.call(Query.NULL_OPS, _ref) >= 0) {
        constraint.op = a0;
      } else {
        constraint.type = a0;
      }
    } else if (conArgs.length >= 2) {
      constraint.op = conArgs[0];
      v = conArgs[1];
      if (utils.isArray(v)) {
        constraint.values = v;
      } else {
        constraint.value = v;
      }
      if (conArgs.length === 3) {
        constraint.extraValue = conArgs[2];
      }
    }
    return constraint;
  };

  stringToSortOrder = function(str) {
    var i, parts, pathIndices, x, _i, _len, _results;
    if (str == null) {
      return [];
    }
    parts = str.split(/\s+/);
    pathIndices = (function() {
      var _i, _ref, _results;
      _results = [];
      for (x = _i = 0, _ref = parts.length / 2; 0 <= _ref ? _i < _ref : _i > _ref; x = 0 <= _ref ? ++_i : --_i) {
        _results.push(x * 2);
      }
      return _results;
    })();
    _results = [];
    for (_i = 0, _len = pathIndices.length; _i < _len; _i++) {
      i = pathIndices[_i];
      _results.push([parts[i], parts[i + 1]]);
    }
    return _results;
  };

  removeIrrelevantSortOrders = function() {
    var oe, oldOrder;
    oldOrder = this.sortOrder;
    this.sortOrder = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = oldOrder.length; _i < _len; _i++) {
        oe = oldOrder[_i];
        if (this.isRelevant(oe.path)) {
          _results.push(oe);
        }
      }
      return _results;
    }).call(this);
    if (oldOrder.length !== this.sortOrder.length) {
      return this.trigger('change:sortorder change:orderby', this.sortOrder.slice());
    }
  };

  Query = (function() {
    var addPI, cAttrs, kids, parseSummary, qAttrs, scFold, toAttrPairs, toPathAndType, xmlAttr;

    Query.JOIN_STYLES = ['INNER', 'OUTER'];

    Query.BIO_FORMATS = ['gff3', 'fasta', 'bed'];

    Query.NULL_OPS = ['IS NULL', 'IS NOT NULL'];

    Query.ATTRIBUTE_VALUE_OPS = ["=", "!=", ">", ">=", "<", "<=", "CONTAINS", "LIKE", "NOT LIKE"];

    Query.MULTIVALUE_OPS = ['ONE OF', 'NONE OF'];

    Query.TERNARY_OPS = ['LOOKUP'];

    Query.LOOP_OPS = ['=', '!='];

    Query.LIST_OPS = ['IN', 'NOT IN'];

    Query.OP_DICT = {
      '=': '=',
      '==': '==',
      'eq': '=',
      'eqq': '==',
      '!=': '!=',
      'ne': '!=',
      '>': '>',
      'gt': '>',
      '>=': '>=',
      'ge': '>=',
      '<': '<',
      'lt': '<',
      '<=': '<=',
      'le': '<=',
      'contains': 'CONTAINS',
      'CONTAINS': 'CONTAINS',
      'like': 'LIKE',
      'LIKE': 'LIKE',
      'not like': 'NOT LIKE',
      'NOT LIKE': 'NOT LIKE',
      'lookup': 'LOOKUP',
      'IS NULL': 'IS NULL',
      'is null': 'IS NULL',
      'IS NOT NULL': 'IS NOT NULL',
      'is not null': 'IS NOT NULL',
      'ONE OF': 'ONE OF',
      'one of': 'ONE OF',
      'NONE OF': 'NONE OF',
      'none of': 'NONE OF',
      'in': 'IN',
      'not in': 'NOT IN',
      'IN': 'IN',
      'NOT IN': 'NOT IN',
      'WITHIN': 'WITHIN',
      'within': 'WITHIN',
      'OVERLAPS': 'OVERLAPS',
      'overlaps': 'OVERLAPS',
      'ISA': 'ISA',
      'isa': 'ISA'
    };

    Query.prototype.on = function(events, callback, context) {
      var calls, ev, list, tail, _ref, _ref1, _ref2;
      events = events.split(/\s+/);
      calls = ((_ref = this._callbacks) != null ? _ref : this._callbacks = {});
      while (ev = events.shift()) {
        list = ((_ref1 = calls[ev]) != null ? _ref1 : calls[ev] = {});
        tail = ((_ref2 = list.tail) != null ? _ref2 : list.tail = (list.next = {}));
        tail.callback = callback;
        tail.context = context;
        list.tail = tail.next = {};
      }
      return this;
    };

    Query.prototype.bind = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.on.apply(this, args);
    };

    Query.prototype.off = function(events, callback, context) {
      var calls, current, ev, last, linkedList, node, remove, _i, _len, _ref;
      if (events == null) {
        this._callbacks = {};
        return this;
      }
      events = events.split(/\s+/);
      calls = ((_ref = this._callbacks) != null ? _ref : this._callbacks = {});
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        ev = events[_i];
        if (callback != null) {
          current = linkedList = calls[ev] || {};
          last = linkedList.tail;
          while ((node = current.next) !== last) {
            remove = (!(context != null) || node.context === context) && (callback === node.callback);
            if (remove) {
              current.next = node.next || last;
              node = current;
            } else {
              current = node;
            }
          }
        } else {
          delete calls[ev];
        }
      }
      return this;
    };

    Query.prototype.unbind = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.off.apply(this, args);
    };

    Query.prototype.once = function(events, callback, context) {
      var f,
        _this = this;
      f = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        callback.apply(context, args);
        return _this.off(events, f);
      };
      return this.on(events, f);
    };

    Query.prototype.emit = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.trigger.apply(this, args);
    };

    Query.prototype.trigger = function() {
      var all, args, calls, event, events, node, rest, tail;
      events = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      calls = this._callbacks;
      if (!calls) {
        return this;
      }
      all = calls['all'];
      (events = events.split(/\s+/)).push(null);
      while (event = events.shift()) {
        if (all) {
          events.push({
            next: all.next,
            tail: all.tail,
            event: event
          });
        }
        if (!(node = calls[event])) {
          continue;
        }
        events.push({
          next: node.next,
          tail: node.tail
        });
      }
      while (node = events.pop()) {
        tail = node.tail;
        args = node.event ? [node.event].concat(rest) : rest;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
      return this;
    };

    qAttrs = ['name', 'view', 'sortOrder', 'constraintLogic', 'title', 'description', 'comment'];

    cAttrs = ['path', 'type', 'op', 'code', 'value', 'ids'];

    toAttrPairs = function(el, attrs) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = attrs.length; _i < _len; _i++) {
        x = attrs[_i];
        if (el.hasAttribute(x)) {
          _results.push([x, el.getAttribute(x)]);
        }
      }
      return _results;
    };

    kids = function(el, name) {
      var kid, _i, _len, _ref, _results;
      _ref = el.getElementsByTagName(name);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        kid = _ref[_i];
        _results.push(kid);
      }
      return _results;
    };

    xmlAttr = function(name) {
      return function(el) {
        return el.getAttribute(name);
      };
    };

    Query.fromXML = function(xml) {
      var con, dom, j, pathOf, q, query, styleOf;
      dom = intermine.xml.parse(xml);
      query = kids(dom, 'query')[0] || kids(dom, 'template')[0];
      if (!query) {
        throw new Error("no query in xml");
      }
      pathOf = xmlAttr('path');
      styleOf = xmlAttr('style');
      q = pairsToObj(toAttrPairs(query, qAttrs));
      q.view = q.view.split(/\s+/);
      q.sortOrder = stringToSortOrder(q.sortOrder);
      q.joins = (function() {
        var _i, _len, _ref, _results;
        _ref = kids(query, 'join');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          j = _ref[_i];
          if (styleOf(j) === 'OUTER') {
            _results.push(pathOf(j));
          }
        }
        return _results;
      })();
      q.constraints = (function() {
        var _i, _len, _ref, _results;
        _ref = kids(query, 'constraint');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          con = _ref[_i];
          _results.push((function(con) {
            var c, tn, v, values, x;
            c = pairsToObj(toAttrPairs(con, cAttrs));
            if (c.ids != null) {
              c.ids = (function() {
                var _j, _len1, _ref1, _results1;
                _ref1 = c.ids.split(',');
                _results1 = [];
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                  x = _ref1[_j];
                  _results1.push(parseInt(x, 10));
                }
                return _results1;
              })();
            }
            values = kids(con, 'value');
            if (values.length) {
              c.values = (function() {
                var _j, _len1, _results1;
                _results1 = [];
                for (_j = 0, _len1 = values.length; _j < _len1; _j++) {
                  v = values[_j];
                  _results1.push(((function() {
                    var _k, _len2, _ref1, _results2;
                    _ref1 = v.childNodes;
                    _results2 = [];
                    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                      tn = _ref1[_k];
                      _results2.push(tn.data);
                    }
                    return _results2;
                  })()).join(''));
                }
                return _results1;
              })();
            }
            return c;
          })(con));
        }
        return _results;
      })();
      return q;
    };

    Query.prototype.constraints = [];

    Query.prototype.views = [];

    Query.prototype.joins = {};

    Query.prototype.constraintLogic = '';

    Query.prototype.sortOrder = '';

    Query.prototype.name = null;

    Query.prototype.title = null;

    Query.prototype.comment = null;

    Query.prototype.description = null;

    function Query(properties, service) {
      this.addConstraint = __bind(this.addConstraint, this);

      this.expandStar = __bind(this.expandStar, this);

      this.adjustPath = __bind(this.adjustPath, this);

      this.select = __bind(this.select, this);

      var prop, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      if (properties == null) {
        properties = {};
      }
      this.constraints = [];
      this.views = [];
      this.joins = {};
      this.displayNames = utils.copy((_ref = (_ref1 = properties.displayNames) != null ? _ref1 : properties.aliases) != null ? _ref : {});
      _ref2 = ['name', 'title', 'comment', 'description'];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        prop = _ref2[_i];
        if (properties[prop] != null) {
          this[prop] = properties[prop];
        }
      }
      this.service = service != null ? service : {};
      this.model = (_ref3 = properties.model) != null ? _ref3 : {};
      this.summaryFields = (_ref4 = properties.summaryFields) != null ? _ref4 : {};
      this.root = (_ref5 = properties.root) != null ? _ref5 : properties.from;
      this.maxRows = (_ref6 = (_ref7 = properties.size) != null ? _ref7 : properties.limit) != null ? _ref6 : properties.maxRows;
      this.start = (_ref8 = (_ref9 = properties.start) != null ? _ref9 : properties.offset) != null ? _ref8 : 0;
      this.select(properties.views || properties.view || properties.select || []);
      this.addConstraints(properties.constraints || properties.where || []);
      this.addJoins(properties.joins || properties.join || []);
      this.orderBy(properties.sortOrder || properties.orderBy || []);
      if (properties.constraintLogic != null) {
        this.constraintLogic = properties.constraintLogic;
      }
      this.on('change:views', removeIrrelevantSortOrders, this);
    }

    Query.prototype.removeFromSelect = function(unwanted) {
      var mapFn, so, uw, v;
      if (unwanted == null) {
        unwanted = [];
      }
      unwanted = utils.stringList(unwanted);
      mapFn = utils.compose(this.expandStar, this.adjustPath);
      unwanted = utils.flatten((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = unwanted.length; _i < _len; _i++) {
          uw = unwanted[_i];
          _results.push(mapFn(uw));
        }
        return _results;
      })());
      this.sortOrder = (function() {
        var _i, _len, _ref, _ref1, _results;
        _ref = this.sortOrder;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          so = _ref[_i];
          if (!(_ref1 = so.path, __indexOf.call(unwanted, _ref1) >= 0)) {
            _results.push(so);
          }
        }
        return _results;
      }).call(this);
      this.views = (function() {
        var _i, _len, _ref, _results;
        _ref = this.views;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          if (!(__indexOf.call(unwanted, v) >= 0)) {
            _results.push(v);
          }
        }
        return _results;
      }).call(this);
      this.trigger('remove:view', unwanted);
      return this.trigger('change:views', this.views);
    };

    Query.prototype.removeConstraint = function(con, silent) {
      var c, iscon, orig, reduced;
      if (silent == null) {
        silent = false;
      }
      orig = this.constraints;
      iscon = typeof con === 'string' ? (function(c) {
        return c.code === con;
      }) : (function(c) {
        var _ref, _ref1;
        return (c.path === con.path) && (c.op === con.op) && (c.value === con.value) && (c.extraValue === con.extraValue) && (con.type === c.type) && (((_ref = c.values) != null ? _ref.join('%%') : void 0) === ((_ref1 = con.values) != null ? _ref1.join('%%') : void 0));
      });
      reduced = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = orig.length; _i < _len; _i++) {
          c = orig[_i];
          if (!iscon(c)) {
            _results.push(c);
          }
        }
        return _results;
      })();
      if (reduced.length !== orig.length - 1) {
        throw new Error(didntRemove(orig, reduced));
      }
      this.constraints = reduced;
      if (!silent) {
        this.trigger('change:constraints');
        return this.trigger('removed:constraint', utils.find(orig, iscon));
      }
    };

    Query.prototype.addToSelect = function(views) {
      var dups, mapFn, p, toAdd, v, x, _ref;
      if (views == null) {
        views = [];
      }
      views = utils.stringList(views);
      mapFn = utils.compose(this.expandStar, this.adjustPath);
      toAdd = utils.flatten((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = views.length; _i < _len; _i++) {
          v = views[_i];
          _results.push(mapFn(v));
        }
        return _results;
      })());
      dups = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = toAdd.length; _i < _len; _i++) {
          p = toAdd[_i];
          if (__indexOf.call(this.views, p) >= 0) {
            _results.push(p);
          }
        }
        return _results;
      }).call(this);
      if (dups.length) {
        throw new Error("" + dups + " already in the select list");
      }
      dups = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = toAdd.length; _i < _len; _i++) {
          p = toAdd[_i];
          if (((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = toAdd.length; _j < _len1; _j++) {
              x = toAdd[_j];
              if (x === p) {
                _results1.push(x);
              }
            }
            return _results1;
          })()).length > 1) {
            _results.push(p);
          }
        }
        return _results;
      })();
      if (dups.length) {
        throw new Error("" + dups + " specified multiple times as arguments to addToSelect");
      }
      (_ref = this.views).push.apply(_ref, toAdd);
      return this.trigger('add:view change:views', toAdd);
    };

    Query.prototype.select = function(views) {
      var oldViews;
      oldViews = this.views.slice();
      try {
        this.views = [];
        this.addToSelect(views);
      } catch (e) {
        this.views = oldViews;
        utils.error(e);
      }
      return this;
    };

    Query.prototype.adjustPath = function(path) {
      path = path && path.name ? path.name : "" + path;
      if (this.root != null) {
        if (!path.match("^" + this.root)) {
          path = this.root + "." + path;
        }
      } else {
        this.root = path.split('.')[0];
      }
      return path;
    };

    Query.prototype.getPossiblePaths = function(depth) {
      var getPaths, _base, _ref, _ref1,
        _this = this;
      if (depth == null) {
        depth = 3;
      }
      getPaths = function(root, d) {
        var cd, field, name, others, path, ret, subPaths;
        ret = [root];
        path = _this.getPathInfo(root);
        if (path.isAttribute()) {
          return ret;
        } else {
          cd = _this.getPathInfo(root).getType();
          subPaths = concatMap(function(ref) {
            return getPaths("" + root + "." + ref.name, d - 1);
          });
          others = cd && (d > 0) ? subPaths((function() {
            var _ref, _results;
            _ref = cd.fields;
            _results = [];
            for (name in _ref) {
              field = _ref[name];
              _results.push(field);
            }
            return _results;
          })()) : [];
          return ret.concat(others);
        }
      };
      if ((_ref = this._possiblePaths) == null) {
        this._possiblePaths = {};
      }
      return (_ref1 = (_base = this._possiblePaths)[depth]) != null ? _ref1 : _base[depth] = getPaths(this.root, depth);
    };

    Query.prototype.getPathInfo = function(path) {
      var adjusted, pi, _ref;
      adjusted = this.adjustPath(path);
      pi = (_ref = this.model) != null ? typeof _ref.getPathInfo === "function" ? _ref.getPathInfo(adjusted, this.getSubclasses()) : void 0 : void 0;
      if (pi && adjusted in this.displayNames) {
        pi.displayName = this.displayNames[adjusted];
      }
      return pi;
    };

    Query.prototype.makePath = Query.prototype.getPathInfo;

    toPathAndType = function(c) {
      return [c.path, c.type];
    };

    scFold = utils.compose(pairsToObj, utils.map(toPathAndType), filter(get('type')));

    Query.prototype.getSubclasses = function() {
      return scFold(this.constraints);
    };

    Query.prototype.getType = function(path) {
      return this.getPathInfo(path).getType();
    };

    Query.prototype.getViewNodes = function() {
      var p, toParentNode,
        _this = this;
      toParentNode = function(v) {
        return _this.getPathInfo(v).getParent();
      };
      return utils.uniqBy(String, (function() {
        var _i, _len, _ref, _results;
        _ref = this.views;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(toParentNode(p));
        }
        return _results;
      }).call(this));
    };

    Query.prototype.isInView = function(path) {
      var pi, pstr, _ref;
      pi = this.getPathInfo(path);
      if (!pi) {
        throw new Error("Invalid path: " + path);
      }
      if (pi.isAttribute()) {
        return _ref = pi.toString(), __indexOf.call(this.views, _ref) >= 0;
      } else {
        pstr = pi.toString();
        return utils.any(this.getViewNodes(), function(n) {
          return n.toString() === pstr;
        });
      }
    };

    Query.prototype.isConstrained = function(path, includeAttrs) {
      var pi, test,
        _this = this;
      if (includeAttrs == null) {
        includeAttrs = false;
      }
      pi = this.getPathInfo(path);
      if (!pi) {
        throw new Error("Invalid path: " + path);
      }
      test = function(c) {
        return (c.op != null) && c.path === pi.toString();
      };
      if ((!pi.isAttribute()) && includeAttrs) {
        test = function(c) {
          return (c.op != null) && (c.path === pi.toString() || pi.equals(_this.getPathInfo(c.path).getParent()));
        };
      }
      return utils.any(this.constraints, test);
    };

    Query.prototype.canHaveMultipleValues = function(path) {
      return this.getPathInfo(path).containsCollection();
    };

    Query.prototype.getQueryNodes = function() {
      var c, constrainedNodes, pi, viewNodes;
      viewNodes = this.getViewNodes();
      constrainedNodes = (function() {
        var _i, _len, _ref, _results;
        _ref = this.constraints;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          if (!(!(c.type != null))) {
            continue;
          }
          pi = this.getPathInfo(c.path);
          if (pi.isAttribute()) {
            _results.push(pi.getParent());
          } else {
            _results.push(pi);
          }
        }
        return _results;
      }).call(this);
      return utils.uniqBy(String, viewNodes.concat(constrainedNodes));
    };

    Query.prototype.isInQuery = function(p) {
      var c, pi, pstr, _i, _len, _ref;
      pi = this.getPathInfo(p);
      if (pi) {
        pstr = pi.toPathString();
        _ref = this.views.concat((function() {
          var _j, _len, _ref, _results;
          _ref = this.constraints;
          _results = [];
          for (_j = 0, _len = _ref.length; _j < _len; _j++) {
            c = _ref[_j];
            if (!(c.type != null)) {
              _results.push(c.path);
            }
          }
          return _results;
        }).call(this));
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (0 === p.indexOf(pstr)) {
            return true;
          }
        }
        return false;
      }
      return true;
    };

    Query.prototype.isRelevant = function(path) {
      var nodes, pi, sought;
      pi = this.getPathInfo(path);
      if (pi.isAttribute()) {
        pi = pi.getParent();
      }
      sought = pi.toString();
      nodes = this.getViewNodes();
      return utils.any(nodes, function(n) {
        return n.toPathString() === sought;
      });
    };

    Query.prototype.expandStar = function(path) {
      var attrViews, cd, expand, fn, n, name, pathStem, starViews;
      if (/\*$/.test(path)) {
        pathStem = path.substr(0, path.lastIndexOf('.'));
        expand = function(x) {
          return pathStem + x;
        };
        cd = this.getType(pathStem);
        if (/\.\*$/.test(path)) {
          if (cd && this.summaryFields[cd.name]) {
            fn = utils.compose(expand, decapitate);
            return (function() {
              var _i, _len, _ref, _results;
              _ref = this.summaryFields[cd.name];
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                n = _ref[_i];
                if (!this.hasView(n)) {
                  _results.push(fn(n));
                }
              }
              return _results;
            }).call(this);
          }
        } else if (/\.\*\*$/.test(path)) {
          starViews = this.expandStar(pathStem + '.*');
          attrViews = (function() {
            var _results;
            _results = [];
            for (name in cd.attributes) {
              _results.push(expand("." + name));
            }
            return _results;
          })();
          return utils.uniqBy(id, starViews.concat(attrViews));
        }
      }
      return path;
    };

    Query.prototype.isOuterJoin = function(p) {
      return this.joins[this.adjustPath(p)] === 'OUTER';
    };

    Query.prototype.hasView = function(v) {
      var _ref;
      return this.views && (_ref = this.adjustPath(v), __indexOf.call(this.views, _ref) >= 0);
    };

    Query.prototype.count = function(cont) {
      if (this.service.count) {
        return this.service.count(this, cont);
      } else {
        throw new Error("This query has no service with count functionality attached.");
      }
    };

    Query.prototype.appendToList = function(target, cb) {
      var name, processor, req, toRun, updateTarget;
      if (target != null ? target.name : void 0) {
        name = target.name;
        updateTarget = function(err, list) {
          if (err == null) {
            return target.size = list.size;
          }
        };
      } else {
        name = String(target);
        updateTarget = null;
      }
      toRun = this.makeListQuery();
      req = {
        listName: name,
        query: toRun.toXML()
      };
      processor = LIST_PIPE(this.service);
      return withCB(updateTarget, cb, this.service.post('query/append/tolist', req).then(processor));
    };

    Query.prototype.makeListQuery = function() {
      var n, toRun, _i, _len, _ref;
      toRun = this.clone();
      if (toRun.views.length !== 1 || toRun.views[0] === null || !toRun.views[0].match(/\.id$/)) {
        toRun.select(['id']);
      }
      _ref = this.getViewNodes();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (!this.isOuterJoined(n)) {
          if (!(toRun.isInView(n || toRun.isConstrained(n))) && (n.getEndClass().fields.id != null)) {
            toRun.addConstraint([n.append('id'), 'IS NOT NULL']);
          }
        }
      }
      return toRun;
    };

    Query.prototype.saveAsList = function(options, cb) {
      var req, toRun;
      toRun = this.makeListQuery();
      req = utils.copy(options);
      req.listName = req.listName || req.name;
      req.query = toRun.toXML();
      if (options.tags) {
        req.tags = options.tags.join(';');
      }
      return withCB(cb, this.service.post('query/tolist', req).then(LIST_PIPE(this.service)));
    };

    Query.prototype.summarise = function(path, limit, cont) {
      return this.filterSummary(path, '', limit, cont);
    };

    Query.prototype.summarize = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.summarise.apply(this, args);
    };

    parseSummary = function(data) {
      var isNumeric, r, stats, _i, _len, _ref, _ref1;
      isNumeric = ((_ref = data.results[0]) != null ? _ref.max : void 0) != null;
      _ref1 = data.results;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        r = _ref1[_i];
        r.count = parseInt(r.count, 10);
      }
      stats = {
        uniqueValues: data.uniqueValues,
        filteredCount: data.filteredCount
      };
      if (isNumeric) {
        stats = merge(stats, data.results[0]);
      }
      data.stats = stats;
      return data;
    };

    Query.prototype.filterSummary = function(path, term, limit, cont) {
      var req, toRun, _ref;
      if (cont == null) {
        cont = (function() {});
      }
      if (utils.isFunction(limit)) {
        _ref = [limit, null], cont = _ref[0], limit = _ref[1];
      }
      path = this.adjustPath(path);
      toRun = this.clone();
      if (__indexOf.call(toRun.views, path) < 0) {
        toRun.views.push(path);
      }
      req = {
        query: toRun.toXML(),
        summaryPath: path,
        format: 'jsonrows'
      };
      if (limit) {
        req.size = limit;
      }
      if (term) {
        req.filterTerm = term;
      }
      return withCB(cont, this.service.post('query/results', req).then(parseSummary));
    };

    Query.prototype.clone = function(cloneEvents) {
      var cloned, k, v, _ref, _ref1;
      cloned = new Query(this, this.service);
      if ((_ref = cloned._callbacks) == null) {
        cloned._callbacks = {};
      }
      if (cloneEvents) {
        _ref1 = this._callbacks;
        for (k in _ref1) {
          if (!__hasProp.call(_ref1, k)) continue;
          v = _ref1[k];
          cloned._callbacks[k] = v;
        }
        cloned.off('change:views', removeIrrelevantSortOrders, this);
      }
      return cloned;
    };

    Query.prototype.next = function() {
      var clone;
      clone = this.clone();
      if (this.maxRows) {
        clone.start = this.start + this.maxRows;
      }
      return clone;
    };

    Query.prototype.previous = function() {
      var clone;
      clone = this.clone();
      if (this.maxRows) {
        clone.start = this.start - this.maxRows;
      } else {
        clone.start = 0;
      }
      return clone;
    };

    Query.prototype.getSortDirection = function(path) {
      var dir, so, _i, _len, _ref;
      path = this.adjustPath(path);
      _ref = this.sortOrder;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        so = _ref[_i];
        if (so.path === path) {
          dir = so.direction;
        }
      }
      return dir;
    };

    Query.prototype.isOuterJoined = function(path) {
      var dir, jp, _ref;
      path = this.adjustPath(path);
      _ref = this.joins;
      for (jp in _ref) {
        dir = _ref[jp];
        if (dir === 'OUTER' && path.indexOf(jp) === 0) {
          return true;
        }
      }
      return false;
    };

    Query.prototype.getOuterJoin = function(path) {
      var joinPaths, k,
        _this = this;
      path = this.adjustPath(path);
      joinPaths = ((function() {
        var _results;
        _results = [];
        for (k in this.joins) {
          _results.push(k);
        }
        return _results;
      }).call(this)).sort(function(a, b) {
        return b.length - a.length;
      });
      return utils.find(joinPaths, function(p) {
        return _this.joins[p] === 'OUTER' && path.indexOf(p) === 0;
      });
    };

    Query.prototype._parse_sort_order = function(input) {
      var direction, k, path, so, v, _ref;
      so = input;
      if (typeof input === 'string') {
        so = {
          path: input,
          direction: 'ASC'
        };
      } else if (utils.isArray(input)) {
        path = input[0], direction = input[1];
        so = {
          path: path,
          direction: direction
        };
      } else if (!(input.path != null)) {
        for (k in input) {
          v = input[k];
          _ref = [k, v], path = _ref[0], direction = _ref[1];
        }
        so = {
          path: path,
          direction: direction
        };
      }
      so.path = this.adjustPath(so.path);
      so.direction = so.direction.toUpperCase();
      return so;
    };

    Query.prototype.addOrSetSortOrder = function(so) {
      var currentDirection, oe, _i, _len, _ref;
      so = this._parse_sort_order(so);
      currentDirection = this.getSortDirection(so.path);
      if (!(currentDirection != null)) {
        return this.addSortOrder(so);
      } else if (currentDirection !== so.direction) {
        _ref = this.sortOrder;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          oe = _ref[_i];
          if (oe.path === so.path) {
            oe.direction = so.direction;
          }
        }
        return this.trigger('change:sortorder', this.sortOrder);
      }
    };

    Query.prototype.addSortOrder = function(so) {
      this.sortOrder.push(this._parse_sort_order(so));
      this.trigger('add:sortorder', so);
      return this.trigger('change:sortorder', this.sortOrder);
    };

    Query.prototype.orderBy = function(oes) {
      var oe, _i, _len;
      this.sortOrder = [];
      for (_i = 0, _len = oes.length; _i < _len; _i++) {
        oe = oes[_i];
        this.addSortOrder(this._parse_sort_order(oe));
      }
      return this.trigger('set:sortorder change:sortorder', this.sortOrder);
    };

    Query.prototype.addJoins = function(joins) {
      var j, k, v, _i, _len, _results, _results1;
      if (utils.isArray(joins)) {
        _results = [];
        for (_i = 0, _len = joins.length; _i < _len; _i++) {
          j = joins[_i];
          _results.push(this.addJoin(j));
        }
        return _results;
      } else {
        _results1 = [];
        for (k in joins) {
          v = joins[k];
          _results1.push(this.addJoin({
            path: k,
            style: v
          }));
        }
        return _results1;
      }
    };

    Query.prototype.addJoin = function(join) {
      var _ref, _ref1, _ref2;
      if (typeof join === 'string') {
        join = {
          path: join,
          style: 'OUTER'
        };
      }
      join.path = this.adjustPath(join.path);
      join.style = (_ref = (_ref1 = join.style) != null ? _ref1.toUpperCase() : void 0) != null ? _ref : join.style;
      if (_ref2 = join.style, __indexOf.call(Query.JOIN_STYLES, _ref2) < 0) {
        throw new Error("Invalid join style: " + join.style);
      }
      this.joins[join.path] = join.style;
      return this.trigger('set:join', join.path, join.style);
    };

    Query.prototype.setJoinStyle = function(path, style) {
      if (style == null) {
        style = 'OUTER';
      }
      path = this.adjustPath(path);
      style = style.toUpperCase();
      if (this.joins[path] !== style) {
        this.joins[path] = style;
        this.trigger('change:joins', {
          path: path,
          style: style
        });
      }
      return this;
    };

    Query.prototype.addConstraints = function(constraints) {
      var c, con, path, _fn, _i, _len,
        _this = this;
      this.__silent__ = true;
      if (utils.isArray(constraints)) {
        for (_i = 0, _len = constraints.length; _i < _len; _i++) {
          c = constraints[_i];
          this.addConstraint(c);
        }
      } else {
        _fn = function(path, con) {
          return _this.addConstraint(interpretConstraint(path, con));
        };
        for (path in constraints) {
          con = constraints[path];
          _fn(path, con);
        }
      }
      this.__silent__ = false;
      this.trigger('add:constraint');
      return this.trigger('change:constraints');
    };

    Query.prototype.addConstraint = function(constraint) {
      if (utils.isArray(constraint)) {
        constraint = interpretConArray(constraint);
      } else {
        constraint = copyCon(constraint);
      }
      constraint.path = this.adjustPath(constraint.path);
      if (constraint.type == null) {
        try {
          constraint.op = get_canonical_op(constraint.op);
        } catch (error) {
          throw new Error("Illegal operator: " + constraint.op);
        }
      }
      this.constraints.push(constraint);
      if ((this.constraintLogic != null) && this.constraintLogic !== '') {
        this.constraintLogic = "(" + this.constraintLogic + ") and " + CODES[this.constraints.length];
      }
      if (!this.__silent__) {
        this.trigger('add:constraint', constraint);
        this.trigger('change:constraints');
      }
      return this;
    };

    Query.prototype.getSorting = function() {
      var oe;
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = this.sortOrder;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          oe = _ref[_i];
          _results.push("" + oe.path + " " + oe.direction);
        }
        return _results;
      }).call(this)).join(' ');
    };

    Query.prototype.getConstraintXML = function() {
      var c, toSerialise;
      toSerialise = (function() {
        var _i, _len, _ref, _results;
        _ref = this.constraints;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          if (!(c.type != null) || this.isInQuery(c.path)) {
            _results.push(c);
          }
        }
        return _results;
      }).call(this);
      if (toSerialise.length) {
        return concatMap(conStr)(concatMap(id)(partition(function(c) {
          return c.type != null;
        })(toSerialise)));
      } else {
        return '';
      }
    };

    Query.prototype.getJoinXML = function() {
      var p, s, strs;
      strs = (function() {
        var _ref, _results;
        _ref = this.joins;
        _results = [];
        for (p in _ref) {
          s = _ref[p];
          if (this.isInQuery(p) && s === 'OUTER') {
            _results.push("<join path=\"" + p + "\" style=\"OUTER\"/>");
          }
        }
        return _results;
      }).call(this);
      return strs.join('');
    };

    Query.prototype.toXML = function() {
      var attrs, headAttrs, k, v;
      attrs = {
        model: this.model.name,
        view: this.views.join(' '),
        sortOrder: this.getSorting(),
        constraintLogic: this.constraintLogic
      };
      if (this.name != null) {
        attrs.name = this.name;
      }
      headAttrs = ((function() {
        var _results;
        _results = [];
        for (k in attrs) {
          v = attrs[k];
          if (v) {
            _results.push(k + '="' + v + '"');
          }
        }
        return _results;
      })()).join(' ');
      return "<query " + headAttrs + " >" + (this.getJoinXML()) + (this.getConstraintXML()) + "</query>";
    };

    Query.prototype.toJSON = function() {
      var c, direction, path, style, v;
      return noUndefVals({
        name: this.name,
        title: this.title,
        comment: this.comment,
        description: this.description,
        constraintLogic: this.constraintLogic,
        from: this.root,
        select: (function() {
          var _i, _len, _ref, _results;
          _ref = this.views;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            v = _ref[_i];
            _results.push(headLess(v));
          }
          return _results;
        }).call(this),
        orderBy: (function() {
          var _i, _len, _ref, _ref1, _results;
          _ref = this.sortOrder;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            _ref1 = _ref[_i], path = _ref1.path, direction = _ref1.direction;
            _results.push({
              path: headLess(path),
              direction: direction
            });
          }
          return _results;
        }).call(this),
        joins: (function() {
          var _ref, _results;
          _ref = this.joins;
          _results = [];
          for (path in _ref) {
            style = _ref[path];
            if (style === 'OUTER') {
              _results.push(headLess(path));
            }
          }
          return _results;
        }).call(this),
        where: (function() {
          var _i, _len, _ref, _results;
          _ref = this.constraints;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            _results.push(conToJSON(c));
          }
          return _results;
        }).call(this)
      });
    };

    Query.prototype.fetchCode = function(lang, cb) {
      var req;
      req = {
        query: this.toXML(),
        lang: lang
      };
      return withCB(cb, this.service.post('query/code', req).then(this.service.VERIFIER).then(get('code')));
    };

    Query.prototype.save = function(name, cb) {
      var req, setName,
        _this = this;
      if (name != null) {
        this.name = name;
      }
      req = {
        data: this.toXML(),
        contentType: "application/xml; charset=UTF-8",
        url: this.service.root + 'query',
        type: 'POST',
        dataType: 'json'
      };
      setName = function(name) {
        return _this.name = name;
      };
      return withCB(cb, setName, this.service.doReq(req).then(this.service.VERIFIER).then(get('name')));
    };

    Query.prototype.getCodeURI = function(lang) {
      var req, _ref;
      req = {
        query: this.toXML(),
        lang: lang,
        format: 'text'
      };
      if (((_ref = this.service) != null ? _ref.token : void 0) != null) {
        req.token = this.service.token;
      }
      return "" + this.service.root + "query/code?" + (toQueryString(req));
    };

    Query.prototype.getExportURI = function(format) {
      var req, _ref;
      if (format == null) {
        format = 'tab';
      }
      if (__indexOf.call(Query.BIO_FORMATS, format) >= 0) {
        return this["get" + (format.toUpperCase()) + "URI"]();
      }
      req = {
        query: this.toXML(),
        format: format
      };
      if (((_ref = this.service) != null ? _ref.token : void 0) != null) {
        req.token = this.service.token;
      }
      return "" + this.service.root + "query/results?" + (toQueryString(req));
    };

    Query.prototype.fetchQID = function(cb) {
      return withCB(cb, this.service.post('queries', {
        query: this.toXML()
      }).then(get('id')));
    };

    addPI = function(p) {
      return p.append('primaryIdentifier').toString();
    };

    Query.prototype.__bio_req = function(types, n) {
      var isSuitable, toRun;
      toRun = this.makeListQuery();
      isSuitable = function(p) {
        return utils.any(types, function(t) {
          return p.isa(t);
        });
      };
      toRun.views = take(n)((function() {
        var _i, _len, _ref, _results;
        _ref = this.getViewNodes();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          n = _ref[_i];
          if (isSuitable(n)) {
            _results.push(addPI(n));
          }
        }
        return _results;
      }).call(this));
      return {
        query: toRun.toXML(),
        format: 'text'
      };
    };

    Query.prototype._fasta_req = function() {
      return this.__bio_req(["SequenceFeature", 'Protein'], 1);
    };

    Query.prototype._gff3_req = function() {
      return this.__bio_req(['SequenceFeature']);
    };

    Query.prototype._bed_req = Query.prototype._gff3_req;

    return Query;

  })();

  union = fold(function(xs, ys) {
    return xs.concat(ys);
  });

  Query.ATTRIBUTE_OPS = union([Query.ATTRIBUTE_VALUE_OPS, Query.MULTIVALUE_OPS, Query.NULL_OPS]);

  Query.REFERENCE_OPS = union([Query.TERNARY_OPS, Query.LOOP_OPS, Query.LIST_OPS]);

  _ref = Query.BIO_FORMATS;
  _fn = function(f) {
    var getMeth, reqMeth, uriMeth;
    reqMeth = "_" + f + "_req";
    getMeth = "get" + (f.toUpperCase());
    uriMeth = getMeth + "URI";
    Query.prototype[getMeth] = function(opts, cb) {
      var req, v, _ref1;
      if (opts == null) {
        opts = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      if (utils.isFunction(opts)) {
        _ref1 = [{}, opts], opts = _ref1[0], cb = _ref1[1];
      }
      if ((opts != null ? opts.view : void 0) != null) {
        opts.view = (function() {
          var _j, _len1, _ref2, _results;
          _ref2 = opts.view;
          _results = [];
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            v = _ref2[_j];
            _results.push(this.getPathInfo(v).toString());
          }
          return _results;
        }).call(this);
      }
      req = merge(this[reqMeth](), opts);
      return withCB(cb, this.service.post('query/results/' + f, req));
    };
    return Query.prototype[uriMeth] = function(opts, cb) {
      var req, v, _ref1;
      if (opts == null) {
        opts = {};
      }
      if (utils.isFunction(opts)) {
        _ref1 = [{}, opts], opts = _ref1[0], cb = _ref1[1];
      }
      if ((opts != null ? opts.view : void 0) != null) {
        opts.view = (function() {
          var _j, _len1, _ref2, _results;
          _ref2 = opts.view;
          _results = [];
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            v = _ref2[_j];
            _results.push(this.getPathInfo(v).toString());
          }
          return _results;
        }).call(this);
      }
      req = merge(this[reqMeth](), opts);
      if (this.service.token != null) {
        req.token = this.service.token;
      }
      return "" + this.service.root + "query/results/" + f + "?" + (toQueryString(req));
    };
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    f = _ref[_i];
    _fn(f);
  }

  _get_data_fetcher = function(server_fn) {
    return function() {
      var cbs, page, x, _ref1;
      page = arguments[0], cbs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.service[server_fn]) {
        if (!(page != null)) {
          page = {};
        } else if (utils.isFunction(page)) {
          page = {};
          cbs = (function() {
            var _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = arguments.length; _j < _len1; _j++) {
              x = arguments[_j];
              _results.push(x);
            }
            return _results;
          }).apply(this, arguments);
        }
        page = noUndefVals(merge({
          start: this.start,
          size: this.maxRows
        }, page));
        return (_ref1 = this.service)[server_fn].apply(_ref1, [this, page].concat(__slice.call(cbs)));
      } else {
        throw new Error("Service does not provide '" + server_fn + "'.");
      }
    };
  };

  for (_j = 0, _len1 = RESULTS_METHODS.length; _j < _len1; _j++) {
    mth = RESULTS_METHODS[_j];
    Query.prototype[mth] = _get_data_fetcher(mth);
  }

  intermine.Query = Query;

}).call(this);

},{"./util":12,"./xml":14}],9:[function(require,module,exports){
(function() {
  var DEFAULT_ERROR_HANDLER, DEFAULT_PROTOCOL, ENRICHMENT_PATH, HAS_PROTOCOL, HAS_SUFFIX, IDResolutionJob, LISTS_PATH, LIST_OPERATION_PATHS, LIST_PIPE, List, MODELS, MODEL_PATH, Model, PATH_VALUES_PATH, PREF_PATH, Promise, QUERY_RESULTS_PATH, QUICKSEARCH_PATH, Query, REQUIRES_VERSION, SUBTRACT_PATH, SUFFIX, SUMMARYFIELDS_PATH, SUMMARY_FIELDS, Service, TABLE_ROW_PATH, TEMPLATES_PATH, TO_NAMES, User, VERSIONS, VERSION_PATH, WHOAMI_PATH, WIDGETS, WIDGETS_PATH, WITH_OBJ_PATH, dejoin, error, get, getListFinder, http, intermine, invoke, map, merge, set, success, to_query_string, utils, version, withCB, _get_or_fetch,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  Promise = require('promise');

  Model = require('./model').Model;

  Query = require('./query').Query;

  List = require('./lists').List;

  User = require('./user').User;

  IDResolutionJob = require('./id-resolution-job').IDResolutionJob;

  version = require('./version');

  utils = require('./util');

  to_query_string = utils.querystring;

  http = require('./http');

  intermine = exports;

  withCB = utils.withCB, map = utils.map, merge = utils.merge, get = utils.get, set = utils.set, invoke = utils.invoke, success = utils.success, error = utils.error, REQUIRES_VERSION = utils.REQUIRES_VERSION, dejoin = utils.dejoin;

  VERSIONS = {};

  MODELS = {};

  SUMMARY_FIELDS = {};

  WIDGETS = {};

  DEFAULT_PROTOCOL = "http://";

  VERSION_PATH = "version";

  TEMPLATES_PATH = "templates";

  LISTS_PATH = "lists";

  MODEL_PATH = "model";

  SUMMARYFIELDS_PATH = "summaryfields";

  QUERY_RESULTS_PATH = "query/results";

  QUICKSEARCH_PATH = "search";

  WIDGETS_PATH = "widgets";

  ENRICHMENT_PATH = "list/enrichment";

  WITH_OBJ_PATH = "listswithobject";

  LIST_OPERATION_PATHS = {
    union: "lists/union",
    intersection: "lists/intersect",
    difference: "lists/diff"
  };

  SUBTRACT_PATH = 'lists/subtract';

  WHOAMI_PATH = "user/whoami";

  TABLE_ROW_PATH = QUERY_RESULTS_PATH + '/tablerows';

  PREF_PATH = 'user/preferences';

  PATH_VALUES_PATH = 'path/values';

  HAS_PROTOCOL = /^https?:\/\//i;

  HAS_SUFFIX = /service\/?$/i;

  SUFFIX = "/service/";

  DEFAULT_ERROR_HANDLER = function(e) {
    var f, _ref;
    f = (_ref = console.error) != null ? _ref : console.log;
    return f(e);
  };

  _get_or_fetch = function(propName, store, path, key, cb) {
    var promise, root, useCache, value, _ref;
    root = this.root, useCache = this.useCache;
    promise = (_ref = this[propName]) != null ? _ref : this[propName] = useCache && (value = store[root]) ? success(value) : this.get(path).then(function(x) {
      return store[root] = x[key];
    });
    return withCB(cb, promise);
  };

  getListFinder = function(name) {
    return function(lists) {
      return new Promise(function(resolve, reject) {
        var list;
        if (list = utils.find(lists, function(l) {
          return l.name === name;
        })) {
          return resolve(list);
        } else {
          return reject("List \"" + name + "\" not found among: " + (lists.map(get('name'))));
        }
      });
    };
  };

  LIST_PIPE = function(service, prop) {
    if (prop == null) {
      prop = 'listName';
    }
    return utils.compose(service.fetchList, get(prop));
  };

  TO_NAMES = function(xs) {
    var x, _i, _len, _ref, _ref1, _results;
    if (xs == null) {
      xs = [];
    }
    _ref = (utils.isArray(xs) ? xs : [xs]);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      x = _ref[_i];
      _results.push((_ref1 = x.name) != null ? _ref1 : x);
    }
    return _results;
  };

  Service = (function() {
    var toMapByName;

    Service.prototype.doReq = http.doReq;

    function Service(_arg) {
      var noCache, _ref, _ref1,
        _this = this;
      this.root = _arg.root, this.token = _arg.token, this.errorHandler = _arg.errorHandler, this.DEBUG = _arg.DEBUG, this.help = _arg.help, noCache = _arg.noCache;
      this.createList = __bind(this.createList, this);

      this.resolveIds = __bind(this.resolveIds, this);

      this.query = __bind(this.query, this);

      this.fetchVersion = __bind(this.fetchVersion, this);

      this.fetchSummaryFields = __bind(this.fetchSummaryFields, this);

      this.fetchModel = __bind(this.fetchModel, this);

      this.fetchWidgetMap = __bind(this.fetchWidgetMap, this);

      this.fetchWidgets = __bind(this.fetchWidgets, this);

      this.complement = __bind(this.complement, this);

      this.fetchListsContaining = __bind(this.fetchListsContaining, this);

      this.fetchList = __bind(this.fetchList, this);

      this.findLists = __bind(this.findLists, this);

      this.fetchLists = __bind(this.fetchLists, this);

      this.fetchTemplates = __bind(this.fetchTemplates, this);

      this.tableRows = __bind(this.tableRows, this);

      this.values = __bind(this.values, this);

      this.rows = __bind(this.rows, this);

      this.records = __bind(this.records, this);

      this.table = __bind(this.table, this);

      this.pathValues = __bind(this.pathValues, this);

      this.fetchUser = __bind(this.fetchUser, this);

      this.whoami = __bind(this.whoami, this);

      this.findById = __bind(this.findById, this);

      this.count = __bind(this.count, this);

      this.enrichment = __bind(this.enrichment, this);

      if (this.root == null) {
        throw new Error("No service root provided. This is required");
      }
      if (!HAS_PROTOCOL.test(this.root)) {
        this.root = DEFAULT_PROTOCOL + this.root;
      }
      if (!HAS_SUFFIX.test(this.root)) {
        this.root = this.root + SUFFIX;
      }
      this.root = this.root.replace(/ice$/, "ice/");
      if ((_ref = this.errorHandler) == null) {
        this.errorHandler = DEFAULT_ERROR_HANDLER;
      }
      if ((_ref1 = this.help) == null) {
        this.help = 'no.help.available@dev.null';
      }
      this.useCache = !noCache;
      this.getFormat = function(intended) {
        if (intended == null) {
          intended = 'json';
        }
        return intended;
      };
    }

    Service.prototype.post = function(path, data) {
      if (data == null) {
        data = {};
      }
      return this.makeRequest('POST', path, data);
    };

    Service.prototype.get = function(path, data) {
      return this.makeRequest('GET', path, data);
    };

    Service.prototype.makeRequest = function(method, path, data, cb, indiv) {
      var dataType, errBack, opts, timeout, url, _ref, _ref1, _ref2;
      if (method == null) {
        method = 'GET';
      }
      if (path == null) {
        path = '';
      }
      if (data == null) {
        data = {};
      }
      if (cb == null) {
        cb = (function() {});
      }
      if (indiv == null) {
        indiv = false;
      }
      if (utils.isArray(cb)) {
        _ref = cb, cb = _ref[0], errBack = _ref[1];
      }
      if (utils.isArray(data)) {
        data = utils.pairsToObj(data);
      }
      url = this.root + path;
      if (errBack == null) {
        errBack = this.errorHandler;
      }
      if (this.token) {
        data.token = this.token;
      }
      data.format = this.getFormat(data.format);
      if (/jsonp/.test(data.format)) {
        data.method = method;
        method = 'GET';
        url += '?callback=?';
      }
      dataType = /json/.test(data.format) ? 'json' : 'text';
      if (!http.supports(method)) {
        _ref1 = [method, http.getMethod(method)], data.method = _ref1[0], method = _ref1[1];
      }
      if (method === 'DELETE') {
        url += '?' + to_query_string(data);
      }
      opts = {
        data: data,
        dataType: dataType,
        success: cb,
        error: errBack,
        url: url,
        type: method
      };
      if (timeout = (_ref2 = data.timeout) != null ? _ref2 : this.timeout) {
        opts.timeout = timeout;
        delete data.timeout;
      }
      return this.doReq(opts, indiv);
    };

    Service.prototype.enrichment = function(opts, cb) {
      var _this = this;
      return REQUIRES_VERSION(this, 8, function() {
        var req;
        req = merge({
          maxp: 0.05,
          correction: 'Holm-Bonferroni'
        }, opts);
        return _this.get(ENRICHMENT_PATH, req).then(get('results')).nodeify(cb);
      });
    };

    Service.prototype.search = function(options, cb) {
      var _this = this;
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = (function() {});
      }
      return REQUIRES_VERSION(this, 9, function() {
        var k, req, v, _ref;
        if (utils.isFunction(options)) {
          _ref = [options, {}], cb = _ref[0], options = _ref[1];
        }
        if (typeof options === 'string') {
          req = {
            q: options
          };
        } else {
          req = {
            q: options.q
          };
          for (k in options) {
            if (!__hasProp.call(options, k)) continue;
            v = options[k];
            if (k !== 'q') {
              req["facet_" + k] = v;
            }
          }
        }
        return withCB(cb, _this.post(QUICKSEARCH_PATH, req));
      });
    };

    Service.prototype.count = function(q, cb) {
      var p, req;
      if (cb == null) {
        cb = (function() {});
      }
      return withCB(cb, !q ? error("Not enough arguments") : q.toPathString != null ? (p = q.isClass() ? q.append('id') : q, this.pathValues(p, 'count')) : q.toXML != null ? (req = {
        query: q.toXML(),
        format: 'jsoncount'
      }, this.post(QUERY_RESULTS_PATH, req).then(get('count'))) : typeof q === 'string' ? this.fetchModel().then(invoke('makePath', q.replace(/\.\*$/, '.id'))).then(this.count) : this.query(q).then(this.count));
    };

    Service.prototype.findById = function(type, id, cb) {
      return withCB(cb, this.query({
        from: type,
        select: ['**'],
        where: {
          id: id
        }
      }).then(dejoin).then(invoke('records')).then(get(0)));
    };

    Service.prototype.lookup = function(type, term, context, cb) {
      var _ref;
      if (utils.isFunction(context)) {
        _ref = [null, context], context = _ref[0], cb = _ref[1];
      }
      return withCB(cb, this.query({
        from: type,
        select: ['**'],
        where: [[type, 'LOOKUP', term, context]]
      }).then(dejoin).then(invoke('records')));
    };

    Service.prototype.find = function(type, term, context, cb) {
      var _ref;
      if (utils.isFunction(context)) {
        _ref = [null, context], context = _ref[0], cb = _ref[1];
      }
      return withCB(cb, this.lookup(type, term, context).then(function(found) {
        if (!(found != null) || found.length === 0) {
          return error("Nothing found");
        } else if (found.length > 1) {
          return error("Multiple items found: " + (found.slice(0, 3)) + "...");
        } else {
          return success(found[0]);
        }
      }));
    };

    Service.prototype.whoami = function(cb) {
      var _this = this;
      return REQUIRES_VERSION(this, 9, function() {
        return withCB(cb, _this.get(WHOAMI_PATH).then(get('user')).then(function(x) {
          return new User(_this, x);
        }));
      });
    };

    Service.prototype.fetchUser = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.whoami.apply(this, args);
    };

    Service.prototype.pathValues = function(path, typeConstraints, cb) {
      var _this = this;
      if (typeConstraints == null) {
        typeConstraints = {};
      }
      return REQUIRES_VERSION(this, 6, function() {
        var wanted, _pathValues, _ref, _ref1;
        if (typeof typeConstraints === 'string') {
          wanted = typeConstraints;
          typeConstraints = {};
        }
        if (utils.isFunction(typeConstraints)) {
          _ref = [cb, typeConstraints], typeConstraints = _ref[0], cb = _ref[1];
        }
        if (wanted !== 'count') {
          wanted = 'results';
        }
        _pathValues = function(path) {
          var format, req;
          format = wanted === 'count' ? 'jsoncount' : 'json';
          req = {
            format: format,
            path: path.toString(),
            typeConstraints: JSON.stringify(path.subclasses)
          };
          return _this.post(PATH_VALUES_PATH, req).then(get(wanted));
        };
        try {
          return withCB(cb, _this.fetchModel().then(invoke('makePath', path, (_ref1 = path.subclasses) != null ? _ref1 : typeConstraints)).then(_pathValues));
        } catch (e) {
          return error(e);
        }
      });
    };

    Service.prototype.doPagedRequest = function(q, path, page, format, cb) {
      var req, _ref,
        _this = this;
      if (page == null) {
        page = {};
      }
      if (cb == null) {
        cb = (function() {});
      }
      if (q.toXML != null) {
        if (utils.isFunction(page)) {
          _ref = [page, {}], cb = _ref[0], page = _ref[1];
        }
        req = merge(page, {
          query: q.toXML(),
          format: format
        });
        return withCB(cb, this.post(path, req).then(get('results')));
      } else {
        return this.query(q).then(function(query) {
          return _this.doPagedRequest(query, path, page, format, cb);
        });
      }
    };

    Service.prototype.table = function(q, page, cb) {
      return this.doPagedRequest(q, QUERY_RESULTS_PATH, page, 'jsontable', cb);
    };

    Service.prototype.records = function(q, page, cb) {
      return this.doPagedRequest(q, QUERY_RESULTS_PATH, page, 'jsonobjects', cb);
    };

    Service.prototype.rows = function(q, page, cb) {
      return this.doPagedRequest(q, QUERY_RESULTS_PATH, page, 'json', cb);
    };

    Service.prototype.values = function(q, opts, cb) {
      var resp, _ref,
        _this = this;
      if (utils.isFunction(opts)) {
        _ref = [opts, cb], cb = _ref[0], opts = _ref[1];
      }
      resp = !(q != null) ? error("No query term supplied") : (q.descriptors != null) || typeof q === 'string' ? this.pathValues(q, opts).then(map(get('value'))) : q.toXML != null ? q.views.length !== 1 ? error("Expected one column, got " + q.views.length) : this.rows(q, opts).then(map(get(0))) : this.query(q).then(function(query) {
        return _this.values(query, opts);
      });
      return withCB(cb, resp);
    };

    Service.prototype.tableRows = function(q, page, cb) {
      return this.doPagedRequest(q, TABLE_ROW_PATH, page, 'json', cb);
    };

    Service.prototype.fetchTemplates = function(cb) {
      return this.get(TEMPLATES_PATH).then(get('templates')).done(cb);
    };

    Service.prototype.fetchLists = function(cb) {
      return this.findLists('', cb);
    };

    Service.prototype.findLists = function(name, cb) {
      var _this = this;
      if (name == null) {
        name = '';
      }
      if (cb == null) {
        cb = (function() {});
      }
      return this.fetchVersion().then(function(v) {
        var fn;
        return withCB(cb, name && v < 13 ? error("Finding lists by name on the server requires version 13. This is only " + v) : (fn = function(ls) {
          var data, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = ls.length; _i < _len; _i++) {
            data = ls[_i];
            _results.push(new List(data, _this));
          }
          return _results;
        }, _this.get(LISTS_PATH, {
          name: name
        }).then(get('lists')).then(fn)));
      });
    };

    Service.prototype.fetchList = function(name, cb) {
      var _this = this;
      return this.fetchVersion().then(function(v) {
        return withCB(cb, v < 13 ? _this.findLists().then(getListFinder(name)) : _this.findLists(name).then(get(0)));
      });
    };

    Service.prototype.fetchListsContaining = function(opts, cb) {
      var fn,
        _this = this;
      fn = function(xs) {
        var x, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = xs.length; _i < _len; _i++) {
          x = xs[_i];
          _results.push(new List(x, _this));
        }
        return _results;
      };
      return withCB(cb, this.get(WITH_OBJ_PATH, opts).then(get('lists')).then(fn));
    };

    Service.prototype.combineLists = function(operation, options, cb) {
      var description, lists, name, req, tags, _ref, _ref1;
      _ref = merge({
        lists: [],
        tags: []
      }, options), name = _ref.name, lists = _ref.lists, tags = _ref.tags, description = _ref.description;
      req = {
        name: name,
        description: description
      };
      if ((_ref1 = req.description) == null) {
        req.description = "" + operation + " of " + (lists.join(', '));
      }
      req.tags = tags.join(';');
      req.lists = lists.join(';');
      return withCB(cb, this.get(LIST_OPERATION_PATHS[operation], req).then(LIST_PIPE(this)));
    };

    Service.prototype.merge = function() {
      return this.combineLists.apply(this, ['union'].concat(__slice.call(arguments)));
    };

    Service.prototype.intersect = function() {
      return this.combineLists.apply(this, ['intersection'].concat(__slice.call(arguments)));
    };

    Service.prototype.diff = function() {
      return this.combineLists.apply(this, ['difference'].concat(__slice.call(arguments)));
    };

    Service.prototype.complement = function(options, cb) {
      var defaultDesc, description, exclude, from, lists, name, references, req, tags;
      if (options == null) {
        options = {};
      }
      if (cb == null) {
        cb = function() {};
      }
      from = options.from, exclude = options.exclude, name = options.name, description = options.description, tags = options.tags;
      defaultDesc = function() {
        return "Relative complement of " + (lists.join(' and ')) + " in " + (references.join(' and '));
      };
      references = TO_NAMES(from);
      lists = TO_NAMES(exclude);
      if (name == null) {
        name = defaultDesc();
      }
      if (description == null) {
        description = defaultDesc();
      }
      if (tags == null) {
        tags = [];
      }
      req = {
        name: name,
        description: description,
        tags: tags,
        lists: lists,
        references: references
      };
      return withCB(cb, this.post(SUBTRACT_PATH, req).then(LIST_PIPE(this)));
    };

    Service.prototype.fetchWidgets = function(cb) {
      var _this = this;
      return REQUIRES_VERSION(this, 8, function() {
        return _get_or_fetch.call(_this, 'widgets', WIDGETS, WIDGETS_PATH, 'widgets', cb);
      });
    };

    toMapByName = utils.omap(function(w) {
      return [w.name, w];
    });

    Service.prototype.fetchWidgetMap = function(cb) {
      var _this = this;
      return REQUIRES_VERSION(this, 8, function() {
        var _ref;
        return withCB(cb, ((_ref = _this.__wmap__) != null ? _ref : _this.__wmap__ = _this.fetchWidgets().then(toMapByName)));
      });
    };

    Service.prototype.fetchModel = function(cb) {
      return _get_or_fetch.call(this, 'model', MODELS, MODEL_PATH, 'model').then(Model.load).then(set({
        service: this
      })).nodeify(cb);
    };

    Service.prototype.fetchSummaryFields = function(cb) {
      return _get_or_fetch.call(this, 'summaryFields', SUMMARY_FIELDS, SUMMARYFIELDS_PATH, 'classes', cb);
    };

    Service.prototype.fetchVersion = function(cb) {
      return _get_or_fetch.call(this, 'version', VERSIONS, VERSION_PATH, 'version', cb);
    };

    Service.prototype.query = function(options, cb) {
      var buildQuery, deps,
        _this = this;
      deps = [this.fetchModel(), this.fetchSummaryFields()];
      buildQuery = function(_arg) {
        var model, summaryFields;
        model = _arg[0], summaryFields = _arg[1];
        return new Query(merge(options, {
          model: model,
          summaryFields: summaryFields
        }), _this);
      };
      return Promise.all(deps).then(buildQuery).nodeify(cb);
    };

    Service.prototype.manageUserPreferences = function(method, data, cb) {
      var _this = this;
      return REQUIRES_VERSION(this, 11, function() {
        return withCB(cb, _this.makeRequest(method, PREF_PATH, data).then(get('preferences')));
      });
    };

    Service.prototype.resolveIds = function(opts, cb) {
      var _this = this;
      return REQUIRES_VERSION(this, 10, function() {
        var req;
        req = {
          type: 'POST',
          url: _this.root + 'ids',
          contentType: 'application/json',
          data: JSON.stringify(opts),
          dataType: 'json'
        };
        return withCB(cb, _this.doReq(req).then(get('uid')).then(IDResolutionJob.create(_this)));
      });
    };

    Service.prototype.createList = function(opts, ids, cb) {
      var adjust, req,
        _this = this;
      if (opts == null) {
        opts = {};
      }
      if (ids == null) {
        ids = '';
      }
      if (cb == null) {
        cb = function() {};
      }
      adjust = function(x) {
        return merge(x, {
          token: _this.token,
          tags: opts.tags || []
        });
      };
      req = {
        data: utils.isArray(ids) ? ids.map(function(x) {
          return "\"" + x + "\"";
        }).join("\n") : ids,
        dataType: 'json',
        url: "" + this.root + "lists?" + (to_query_string(adjust(opts))),
        type: 'POST',
        contentType: 'text/plain'
      };
      return withCB(cb, this.doReq(req).then(LIST_PIPE(this)));
    };

    return Service;

  })();

  Service.prototype.rowByRow = function() {
    var args, f, q,
      _this = this;
    q = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    f = http.iterReq('POST', QUERY_RESULTS_PATH, 'json');
    if (q.toXML != null) {
      return f.apply(this, arguments);
    } else {
      return this.query(q).then(function(query) {
        return _this.rowByRow.apply(_this, [query].concat(__slice.call(args)));
      });
    }
  };

  Service.prototype.eachRow = Service.prototype.rowByRow;

  Service.prototype.recordByRecord = function() {
    var args, f, q,
      _this = this;
    q = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    f = http.iterReq('POST', QUERY_RESULTS_PATH, 'jsonobjects');
    if (q.toXML != null) {
      return f.apply(this, arguments);
    } else {
      return this.query(q).then(function(query) {
        return _this.recordByRecord.apply(_this, [query].concat(__slice.call(args)));
      });
    }
  };

  Service.prototype.eachRecord = Service.prototype.recordByRecord;

  Service.prototype.union = Service.prototype.merge;

  Service.prototype.difference = Service.prototype.diff;

  Service.prototype.symmetricDifference = Service.prototype.diff;

  Service.prototype.relativeComplement = Service.prototype.complement;

  Service.prototype.subtract = Service.prototype.complement;

  Service.flushCaches = function() {
    MODELS = {};
    VERSIONS = {};
    SUMMARY_FIELDS = {};
    return WIDGETS = {};
  };

  Service.connect = function(opts) {
    if ((opts != null ? opts.root : void 0) == null) {
      throw new Error("Invalid options provided: " + (JSON.stringify(opts)));
    }
    return new Service(opts);
  };

  intermine.Service = Service;

  intermine.Model = Model;

  intermine.Query = Query;

  intermine.imjs = version;

}).call(this);

},{"./http":"zlU5Ni","./id-resolution-job":4,"./lists":5,"./model":6,"./query":8,"./user":11,"./util":12,"./version":13,"promise":19}],10:[function(require,module,exports){
(function() {
  var Table, merge, properties;

  merge = function(src, dest) {
    var k, v, _results;
    _results = [];
    for (k in src) {
      v = src[k];
      _results.push(dest[k] = v);
    }
    return _results;
  };

  properties = ['attributes', 'references', 'collections'];

  Table = (function() {

    function Table(_arg) {
      var c, prop, _, _i, _len, _ref, _ref1;
      this.name = _arg.name, this.attributes = _arg.attributes, this.references = _arg.references, this.collections = _arg.collections;
      this.fields = {};
      this.__parents__ = (_ref = arguments[0]['extends']) != null ? _ref : [];
      for (_i = 0, _len = properties.length; _i < _len; _i++) {
        prop = properties[_i];
        if (this[prop] == null) {
          throw new Error("Bad model data: missing " + prop);
        }
        merge(this[prop], this.fields);
      }
      _ref1 = this.collections;
      for (_ in _ref1) {
        c = _ref1[_];
        c.isCollection = true;
      }
    }

    Table.prototype.toString = function() {
      var n, _;
      return "[Table name=" + this.name + ", fields=[" + ((function() {
        var _ref, _results;
        _ref = this.fields;
        _results = [];
        for (n in _ref) {
          _ = _ref[n];
          _results.push(n);
        }
        return _results;
      }).call(this)) + "]]";
    };

    Table.prototype.parents = function() {
      var _ref;
      return ((_ref = this.__parents__) != null ? _ref : []).slice();
    };

    return Table;

  })();

  exports.Table = Table;

}).call(this);

},{}],11:[function(require,module,exports){
(function() {
  var User, do_pref_req, error, intermine, isFunction, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ref = require('./util'), isFunction = _ref.isFunction, error = _ref.error;

  intermine = exports;

  do_pref_req = function(user, data, method, cb) {
    return user.service.manageUserPreferences(method, data, cb).then(function(prefs) {
      return user.preferences = prefs;
    });
  };

  User = (function() {

    function User(service, _arg) {
      var _ref1;
      this.service = service;
      this.username = _arg.username, this.preferences = _arg.preferences;
      this.refresh = __bind(this.refresh, this);

      this.clearPreferences = __bind(this.clearPreferences, this);

      this.clearPreference = __bind(this.clearPreference, this);

      this.setPreferences = __bind(this.setPreferences, this);

      this.setPreference = __bind(this.setPreference, this);

      this.hasPreferences = this.preferences != null;
      if ((_ref1 = this.preferences) == null) {
        this.preferences = {};
      }
    }

    User.prototype.setPreference = function(key, value, cb) {
      var data, _ref1;
      if (isFunction(value)) {
        _ref1 = [null, value], value = _ref1[0], cb = _ref1[1];
      }
      if (typeof key === 'string') {
        data = {};
        data[key] = value;
      } else if (!(value != null)) {
        data = key;
      } else {
        return withCB(cb, error("Incorrect arguments to setPreference"));
      }
      return this.setPreferences(data, cb);
    };

    User.prototype.setPreferences = function(prefs, cb) {
      return do_pref_req(this, prefs, 'POST', cb);
    };

    User.prototype.clearPreference = function(key, cb) {
      return do_pref_req(this, {
        key: key
      }, 'DELETE', cb);
    };

    User.prototype.clearPreferences = function(cb) {
      return do_pref_req(this, {}, 'DELETE', cb);
    };

    User.prototype.refresh = function(cb) {
      return do_pref_req(this, {}, 'GET', cb);
    };

    return User;

  })();

  intermine.User = User;

}).call(this);

},{"./util":12}],12:[function(require,module,exports){
(function() {
  var Promise, REQUIRES, comp, curry, entities, error, flatten, fold, id, invoke, invokeWith, isArray, merge, pairFold, qsFromList, root, success, thenFold, _ref,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty;

  Promise = require('promise');

  root = exports;

  root.defer = function() {
    var deferred;
    deferred = {};
    deferred.promise = new Promise(function(resolve, reject) {
      deferred.resolve = resolve;
      return deferred.reject = reject;
    });
    return deferred;
  };

  qsFromList = function(pairs) {
    var pair;
    return ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = pairs.length; _i < _len; _i++) {
        pair = pairs[_i];
        _results.push(pair.map(encodeURIComponent).join('='));
      }
      return _results;
    })()).join('&');
  };

  root.querystring = function(obj) {
    var k, p, pairs, subList, sv, v;
    if (isArray(obj)) {
      pairs = obj.slice();
    } else {
      pairs = [];
      for (k in obj) {
        v = obj[k];
        if (isArray(v)) {
          subList = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = v.length; _i < _len; _i++) {
              sv = v[_i];
              _results.push([k, sv]);
            }
            return _results;
          })();
          pairs = pairs.concat(subList);
        } else {
          pairs.push([k, v]);
        }
      }
    }
    return qsFromList((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = pairs.length; _i < _len; _i++) {
        p = pairs[_i];
        if (p[1] != null) {
          _results.push(p);
        }
      }
      return _results;
    })());
  };

  root.curry = curry = function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return function() {
      var rest;
      rest = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return f.apply(null, args.concat(rest));
    };
  };

  root.error = error = function(e) {
    return new Promise(function(_, reject) {
      return reject(new Error(e));
    });
  };

  root.success = success = Promise.from;

  root.parallel = Promise.all;

  root.withCB = function() {
    var f, fs, p, _i, _j, _len;
    fs = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), p = arguments[_i++];
    for (_j = 0, _len = fs.length; _j < _len; _j++) {
      f = fs[_j];
      if (f != null) {
        (function(f) {
          var onErr, onSucc;
          onSucc = function(res) {
            return f(null, res);
          };
          onErr = function(err) {
            return f(err);
          };
          return p.then(onSucc, onErr);
        })(f);
      }
    }
    return p;
  };

  root.fold = fold = function(f) {
    return function(init, xs) {
      var k, ret, v;
      if (arguments.length === 1) {
        xs = (init != null ? init.slice() : void 0) || init;
        init = (xs != null ? xs.shift() : void 0) || {};
      }
      if (xs == null) {
        throw new Error("xs is null");
      }
      if (xs.reduce != null) {
        return xs.reduce(f, init);
      } else {
        ret = init;
        for (k in xs) {
          v = xs[k];
          ret = ret != null ? f(ret, k, v) : {
            k: v
          };
        }
        return ret;
      }
    };
  };

  root.take = function(n) {
    return function(xs) {
      if (n != null) {
        return xs.slice(0, (n - 1) + 1 || 9e9);
      } else {
        return xs.slice();
      }
    };
  };

  root.filter = function(f) {
    return function(xs) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        if (f(x)) {
          _results.push(x);
        }
      }
      return _results;
    };
  };

  root.uniqBy = function(f, xs) {
    var k, keys, values, x, _i, _len;
    if (arguments.length === 1) {
      return curry(root.uniqBy, f);
    }
    keys = [];
    values = [];
    if (xs == null) {
      return values;
    }
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      k = f(x);
      if (__indexOf.call(keys, k) < 0) {
        keys.push(k);
        values.push(x);
      }
    }
    return values;
  };

  root.find = function(xs, f) {
    var x, _i, _len;
    if (arguments.length === 1) {
      f = xs;
      return function(xs) {
        return root.find(xs, f);
      };
    }
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      if (f(x)) {
        return x;
      }
    }
    return null;
  };

  isArray = (_ref = Array.isArray) != null ? _ref : function(xs) {
    return ((xs != null ? xs.splice : void 0) != null) && ((xs != null ? xs.push : void 0) != null) && ((xs != null ? xs.pop : void 0) != null) && ((xs != null ? xs.slice : void 0) != null);
  };

  root.isArray = isArray;

  root.isFunction = typeof /./ !== 'function' ? function(f) {
    return typeof f === 'function';
  } : function(f) {
    return (f != null) && (f.call != null) && (f.apply != null) && f.toString() === '[object Function]';
  };

  entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };

  root.escape = function(str) {
    if (!(str != null)) {
      return '';
    }
    return String(str).replace(/[&<>"']/g, function(entity) {
      return entities[entity];
    });
  };

  root.omap = function(f) {
    var merger;
    merger = fold(function(a, oldk, oldv) {
      var newk, newv, _ref1;
      _ref1 = f(oldk, oldv), newk = _ref1[0], newv = _ref1[1];
      a[newk] = newv;
      return a;
    });
    return function(xs) {
      return merger({}, xs);
    };
  };

  root.copy = root.omap(function(k, v) {
    return [k, v];
  });

  root.partition = function(f) {
    return function(xs) {
      var divide;
      divide = fold(function(_arg, x) {
        var falses, trues;
        trues = _arg[0], falses = _arg[1];
        if (f(x)) {
          return [trues.concat([x]), falses];
        } else {
          return [trues, falses.concat([x])];
        }
      });
      return divide([[], []], xs);
    };
  };

  root.id = id = function(x) {
    return x;
  };

  root.concatMap = function(f) {
    return function(xs) {
      var fx, ret, x, _i, _len;
      ret = void 0;
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        fx = f(x);
        ret = ret === void 0 ? fx : typeof ret === 'number' ? ret + fx : ret.concat != null ? ret.concat(fx) : merge(ret, fx);
      }
      return ret;
    };
  };

  root.map = function(f) {
    return invoke('map', f);
  };

  comp = fold(function(f, g) {
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return f(g.apply(null, args));
    };
  });

  root.compose = function() {
    var fs;
    fs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return comp(fs);
  };

  root.flatMap = root.concatMap;

  root.difference = function(xs, remove) {
    var x, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      if (__indexOf.call(remove, x) < 0) {
        _results.push(x);
      }
    }
    return _results;
  };

  root.stringList = function(x) {
    if (typeof x === 'string') {
      return [x];
    } else {
      return x;
    }
  };

  root.flatten = flatten = function() {
    var ret, x, xs, xx, _i, _j, _len, _len1, _ref1;
    xs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    ret = [];
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      if (isArray(x)) {
        _ref1 = flatten.apply(null, x);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          xx = _ref1[_j];
          ret.push(xx);
        }
      } else {
        ret.push(x);
      }
    }
    return ret;
  };

  root.sum = root.concatMap(id);

  root.merge = merge = function() {
    var k, newObj, o, objs, v, _i, _len;
    objs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    newObj = {};
    for (_i = 0, _len = objs.length; _i < _len; _i++) {
      o = objs[_i];
      for (k in o) {
        if (!__hasProp.call(o, k)) continue;
        v = o[k];
        newObj[k] = v;
      }
    }
    return newObj;
  };

  root.any = function(xs, f) {
    var x, _i, _len;
    if (f == null) {
      f = id;
    }
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      if (f(x)) {
        return true;
      }
    }
    return false;
  };

  root.invoke = invoke = function() {
    var args, name;
    name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return invokeWith(name, args);
  };

  root.invokeWith = invokeWith = function(name, args, ctx) {
    if (args == null) {
      args = [];
    }
    if (ctx == null) {
      ctx = null;
    }
    return function(o) {
      if (!(o != null)) {
        throw new Error("Cannot call method \"" + name + "\" of null");
      }
      if (!o[name]) {
        throw new Error("Cannot call undefined method \"" + name + " of " + o);
      } else {
        return o[name].apply(ctx || o, args);
      }
    };
  };

  root.get = function(name) {
    return function(obj) {
      return obj[name];
    };
  };

  root.set = function(name, value) {
    return function(obj) {
      var k, v;
      if (arguments.length === 2) {
        obj[name] = value;
      } else {
        for (k in name) {
          if (!__hasProp.call(name, k)) continue;
          v = name[k];
          obj[k] = v;
        }
      }
      return obj;
    };
  };

  REQUIRES = function(required, got) {
    return "This service requires a service at version " + required + " or above. This one is at " + got;
  };

  root.REQUIRES_VERSION = function(s, n, f) {
    return s.fetchVersion().then(function(v) {
      if (v >= n) {
        return f();
      } else {
        return error(REQUIRES(n, v));
      }
    });
  };

  root.dejoin = function(q) {
    var parts, view, _i, _len, _ref1;
    _ref1 = q.views;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      view = _ref1[_i];
      parts = view.split('.');
      if (parts.length > 2) {
        q.addJoin(parts.slice(1, -1).join('.'));
      }
    }
    return q;
  };

  thenFold = fold(function(p, f) {
    return p.then(f);
  });

  root.sequence = function() {
    var fns;
    fns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return thenFold(success(), fns);
  };

  pairFold = fold(function(o, _arg) {
    var k, v;
    k = _arg[0], v = _arg[1];
    if (o[k] != null) {
      throw new Error("Duplicate key: " + k);
    }
    o[k] = v;
    return o;
  });

  root.pairsToObj = function(pairs) {
    return pairFold({}, pairs);
  };

}).call(this);

},{"promise":19}],13:[function(require,module,exports){
(function() {
  var imjs, pkg;

  imjs = exports;

  pkg = require("../package.json");

  imjs.VERSION = pkg.version;

}).call(this);

},{"../package.json":21}],14:[function(require,module,exports){
(function() {
  var DOMParser, sanitize;

  try {
    DOMParser = window.DOMParser;
  } catch (e) {
    DOMParser = require('xmldom').DOMParser;
  }

  sanitize = function(xml) {
    xml = xml.replace(/^\s*/g, '');
    xml = xml.replace(/\s$/g, '');
    if (xml.length === 0) {
      return xml;
    } else if (xml[xml.length - 1] !== '>') {
      return xml + '>';
    } else {
      return xml;
    }
  };

  exports.parse = function(xml) {
    var dom, parser;
    if (typeof xml !== 'string') {
      throw new Error("Expected a string - got " + xml);
    }
    xml = sanitize(xml);
    if (!xml) {
      throw new Error("Expected content - got empty string");
    }
    dom = (function() {
      try {
        parser = new DOMParser();
        return parser.parseFromString(xml, 'text/xml');
      } catch (_error) {}
    })();
    if ((!dom) || (!dom.documentElement) || dom.getElementsByTagName('parsererror').length) {
      throw new Error("Invalid XML: " + xml);
    }
    return dom;
  };

}).call(this);

},{"xmldom":15}],15:[function(require,module,exports){

},{}],16:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],17:[function(require,module,exports){
if(typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.node !== 'undefined') {
;var http = require('http');
var url = require('url');
var zlib = require('zlib');

;;var isArrayBufferView = function(input) {
    return typeof input === 'object' && input !== null && (
        (global.ArrayBufferView && input instanceof ArrayBufferView) ||
        (global.Int8Array && input instanceof Int8Array) ||
        (global.Uint8Array && input instanceof Uint8Array) ||
        (global.Uint8ClampedArray && input instanceof Uint8ClampedArray) ||
        (global.Int16Array && input instanceof Int16Array) ||
        (global.Uint16Array && input instanceof Uint16Array) ||
        (global.Int32Array && input instanceof Int32Array) ||
        (global.Uint32Array && input instanceof Uint32Array) ||
        (global.Float32Array && input instanceof Float32Array) ||
        (global.Float64Array && input instanceof Float64Array)
    );
}, isArray = function(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
}, isByteArray = function(input) {
    return typeof input === 'object' && input !== null && (
        (global.Buffer && input instanceof Buffer) ||
        (global.Blob && input instanceof Blob) ||
        (global.File && input instanceof File) ||
        (global.ArrayBuffer && input instanceof ArrayBuffer) ||
        isArrayBufferView(input) ||
        isArray(input)
    );
}, bytearrayMessage = 'an instance of Buffer, nor Blob, nor File, nor ArrayBuffer, nor ArrayBufferView, nor Int8Array, nor Uint8Array, nor Uint8ClampedArray, nor Int16Array, nor Uint16Array, nor Int32Array, nor Uint32Array, nor Float32Array, nor Float64Array, nor Array', supportedMethods = ',GET,HEAD,PATCH,POST,PUT,DELETE,', pass = function(value) {
    return value;
}, nextTick = (global.process && global.process.nextTick) || global.setImmediate || global.setTimeout, _undefined;
;

var decompress = function(output, encoding, cb) {
    if(encoding === 'gzip') {
        zlib.gunzip(output, cb);
    } else if(encoding === 'deflate') {
        zlib.inflate(output, function(err, out) {
            if(err) {
                return zlib.inflateRaw(output, cb);
            }
            cb(null, out);
        });
    } else if(encoding === 'identity') {
        process.nextTick(function() {
            cb(null, output);
        });
    } else {
        process.nextTick(function() {
            cb(new Error('unsupported encoding ' + encoding));
        });
    }
};

// http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
var forbiddenInputHeaders = ['accept-charset', 'accept-encoding', 'access-control-request-headers', 'access-control-request-method', 'connection', 'content-length', 'content-transfer-encoding', 'cookie', 'cookie2', 'date', 'dnt', 'expect', 'host', 'keep-alive', 'origin', 'referer', 'te', 'trailer', 'transfer-encoding', 'upgrade', 'user-agent', 'via'];
var validateInputHeaders = function(headers) {
    for(var header in headers) {
        if(headers.hasOwnProperty(header)) {
            var headerl = header.toLowerCase();
            if(forbiddenInputHeaders.indexOf(headerl) >= 0) {
                throw new Error('Input header ' + header + ' is forbidden to be set programmatically');
            }
            if(headerl.substr(0, 'proxy-'.length) === 'proxy-') {
                throw new Error('Input header ' + header + ' (to be precise, all Proxy-*) is forbidden to be set programmatically');
            }
            if(headerl.substr(0, 'sec-'.length) === 'sec-') {
                throw new Error('Input header ' + header + ' (to be precise, all Sec-*) is forbidden to be set programmatically');
            }
        }
    }
};

var copy = function(from, to) {
    Object.keys(from).forEach(function(key) {
        to[key] = from[key];
    });
    return to;
};

var httpinvoke = function(uri, method, options, cb) {
    ;var mixInPromise, promise, failWithoutRequest, uploadProgressCb, inputLength, noData, timeout, inputHeaders, statusCb, initDownload, updateDownload, outputHeaders, exposedHeaders, status, outputBinary, input, outputLength, outputConverter;
/*************** COMMON initialize parameters **************/
if(!method) {
    // 1 argument
    // method, options, cb skipped
    method = 'GET';
    options = {};
} else if(!options) {
    // 2 arguments
    if(typeof method === 'string') {
        // options. cb skipped
        options = {};
    } else if(typeof method === 'object') {
        // method, cb skipped
        options = method;
        method = 'GET';
    } else {
        // method, options skipped
        options = {
            finished: method
        };
        method = 'GET';
    }
} else if(!cb) {
    // 3 arguments
    if(typeof method === 'object') {
        // method skipped
        method.finished = options;
        options = method;
        method = 'GET';
    } else if(typeof options === 'function') {
        // options skipped
        options = {
            finished: options
        };
    }
    // cb skipped
} else {
    // 4 arguments
    options.finished = cb;
}
var safeCallback = function(name, aspect) {
    if(name in options) {
        return function(a, b, c, d) {
            try {
                options[name](a, b, c, d);
            } catch(_) {
            }
            aspect(a, b, c, d);
        };
    }
    return aspect;
};
var chain = function(a, b) {
    a && a.then && a.then(function() {
        b[resolve].apply(null, arguments);
    }, function() {
        b[reject].apply(null, arguments);
    }, function() {
        b[progress].apply(null, arguments);
    });
};
var resolve = 0, reject = 1, progress = 2;
mixInPromise = function(o) {
    var value, queue = [], state = progress;
    var makeState = function(newstate) {
        o[newstate] = function(newvalue) {
            var i, p;
            if(queue) {
                value = newvalue;
                state = newstate;

                for(i = 0; i < queue.length; i++) {
                    if(typeof queue[i][state] === 'function') {
                        try {
                            p = queue[i][state].call(null, value);
                            if(state < progress) {
                                chain(p, queue[i]._);
                            }
                        } catch(err) {
                            queue[i]._[reject](err);
                        }
                    } else if(state < progress) {
                        queue[i]._[state](value);
                    }
                }
                if(state < progress) {
                    queue = null;
                }
            }
        };
    };
    makeState(progress);
    makeState(resolve);
    makeState(reject);
    o.then = function() {
        var item = [].slice.call(arguments);
        item._ = mixInPromise({});
        if(queue) {
            queue.push(item);
        } else if(typeof item[state] === 'function') {
            nextTick(function() {
                chain(item[state](value), item._);
            });
        }
        return item._;
    };
    return o;
};
failWithoutRequest = function(cb, err) {
    nextTick(function() {
        if(cb === null) {
            return;
        }
        cb(err);
    });
    promise = function() {
    };
    return mixInPromise(promise);
};

uploadProgressCb = safeCallback('uploading', function(current, total) {
    promise[progress]({
        type: 'upload',
        current: current,
        total: total
    });
});
var downloadProgressCb = safeCallback('downloading', function(current, total) {
    promise[progress]({
        type: 'download',
        current: current,
        total: total
    });
});
statusCb = safeCallback('gotStatus', function(statusCode, headers) {
    promise[progress]({
        type: 'headers',
        statusCode: statusCode,
        headers: headers
    });
});
cb = safeCallback('finished', function(err, body, statusCode, headers) {
    if(err) {
        return promise[reject](err);
    }
    promise[resolve]({
        body: body,
        statusCode: statusCode,
        headers: headers
    });
});
timeout = options.timeout || 0;
var converters = options.converters || {};
var inputConverter;
inputLength = 0;
inputHeaders = options.headers || {};
outputHeaders = {};
exposedHeaders = options.corsExposedHeaders || [];
exposedHeaders.push.apply(exposedHeaders, ['Cache-Control', 'Content-Language', 'Content-Type', 'Content-Length', 'Expires', 'Last-Modified', 'Pragma', 'Content-Range']);
/*************** COMMON convert and validate parameters **************/
if(method.indexOf(',') >= 0 || supportedMethods.indexOf(',' + method + ',') < 0) {
    return failWithoutRequest(cb, new Error('Unsupported method ' + method));
}
outputBinary = options.outputType === 'bytearray';
if(!options.outputType || options.outputType === 'text' || outputBinary) {
    outputConverter = pass;
} else if(converters['text ' + options.outputType]) {
    outputConverter = converters['text ' + options.outputType];
    outputBinary = false;
} else if(converters['bytearray ' + options.outputType]) {
    outputConverter = converters['bytearray ' + options.outputType];
    outputBinary = true;
} else {
    return failWithoutRequest(cb, new Error('Unsupported outputType ' + options.outputType));
}
inputConverter = pass;
if('input' in options) {
    input = options.input;
    if(!options.inputType || options.inputType === 'auto') {
        if(typeof input !== 'string' && !isByteArray(input)) {
            return failWithoutRequest(cb, new Error('inputType is undefined or auto and input is neither string, nor ' + bytearrayMessage));
        }
    } else if(options.inputType === 'text') {
        if(typeof input !== 'string') {
            return failWithoutRequest(cb, new Error('inputType is text, but input is not a string'));
        }
    } else if (options.inputType === 'bytearray') {
        if(!isByteArray(input)) {
            return failWithoutRequest(cb, new Error('inputType is bytearray, but input is neither ' + bytearrayMessage));
        }
    } else if(converters[options.inputType + ' text']) {
        inputConverter = converters[options.inputType + ' text'];
    } else if(converters[options.inputType + ' bytearray']) {
        inputConverter = converters[options.inputType + ' bytearray'];
    } else {
        return failWithoutRequest(cb, new Error('There is no converter for specified inputType'));
    }
    if(typeof input === 'object') {
        if(global.ArrayBuffer && input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        } else if(isArrayBufferView(input)) {
            input = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
        }
    }
    try {
        input = inputConverter(input);
    } catch(err) {
        return failWithoutRequest(cb, err);
    }
} else {
    if(options.inputType) {
        return failWithoutRequest(cb, new Error('"input" is undefined, but inputType is defined'));
    }
    if(inputHeaders['Content-Type']) {
        return failWithoutRequest(cb, new Error('"input" is undefined, but Content-Type request header is defined'));
    }
}

/*************** COMMON initialize helper variables **************/
var downloaded;
initDownload = function(total) {
    if(typeof outputLength === 'undefined') {
        downloadProgressCb(downloaded, outputLength = total);
    }
};
updateDownload = function(value) {
    if(value !== downloaded) {
        downloadProgressCb(downloaded = value, outputLength);
    }
};
noData = function() {
    initDownload(0);
    if(cb) {
        cb(null, _undefined, status, outputHeaders);
        cb = null;
    }
};
;
    /*************** initialize helper variables **************/
    try {
        validateInputHeaders(inputHeaders);
    } catch(err) {
        return failWithoutRequest(cb, err);
    }
    inputHeaders = copy(inputHeaders, {});
    inputHeaders['Accept-Encoding'] = 'gzip, deflate, identity';

    var ignorantlyConsume = function(res) {
        res.on('data', pass);
        res.on('end', pass);
    };
    uri = url.parse(uri);
    if(timeout > 0) {
        setTimeout(function() {
            cb(new Error('Timeout of ' + timeout + 'ms exceeded'));
            cb = null;
        }, timeout);
    }
    var req = http.request({
        hostname: uri.hostname,
        port: Number(uri.port),
        path: uri.path,
        method: method,
        headers: inputHeaders
    }, function(res) {
        var contentEncoding;
        if(cb === null) {
            ignorantlyConsume(res);
            return;
        }

        outputHeaders = res.headers;
        if('content-encoding' in outputHeaders) {
            contentEncoding = outputHeaders['content-encoding'];
            delete outputHeaders['content-encoding'];
        } else {
            contentEncoding = 'identity';
        }

        status = res.statusCode;

        uploadProgressCb(inputLength, inputLength);
        if(cb === null) {
            ignorantlyConsume(res);
            return;
        }

        statusCb(status, outputHeaders);
        if(cb === null) {
            ignorantlyConsume(res);
            return;
        }

        updateDownload(0);
        if(cb === null) {
            ignorantlyConsume(res);
            return;
        }
        if(typeof outputHeaders['content-length'] !== 'undefined') {
            initDownload(Number(outputHeaders['content-length']));
            if(cb === null) {
                ignorantlyConsume(res);
                return;
            }
        }
        if(method === 'HEAD' || typeof outputHeaders['content-type'] === 'undefined') {
            ignorantlyConsume(res);
            return noData();
        }

        var output = [], downloaded = 0;
        res.on('data', function(chunk) {
            if(cb === null) {
                return;
            }
            downloaded += chunk.length;
            output.push(chunk);
            updateDownload(downloaded);
            if(cb === null) {
                return;
            }
        });
        res.on('end', function() {
            if(cb === null) {
                return;
            }
            updateDownload(downloaded);
            if(cb === null) {
                return;
            }

            if(typeof outputLength === 'undefined') {
                outputLength = downloaded;
            }

            decompress(Buffer.concat(output, downloaded), contentEncoding, function(err, output) {
                if(!cb) {
                    return;
                }
                if(err) {
                    cb(err);
                    cb = null;
                    return;
                }
                if(!outputBinary) {
                    output = output.toString('utf8');
                }
                try {
                    cb(null, outputConverter(output), status, outputHeaders);
                } catch(err) {
                    cb(err);
                }
                cb = null;
            });
        });
    });

    nextTick(function() {
        if(cb === null) {
            return;
        }
        uploadProgressCb(0, inputLength);
    });
    if(typeof input !== 'undefined') {
        input = new Buffer(input);
        inputLength = input.length;
        req.write(input);
    }
    req.on('error', function(e) {
        if(cb === null) {
            return;
        }
        cb(e);
        cb = null;
    });
    req.end();
    promise = function() {
        if(cb === null) {
            return;
        }

        // these statements are in case "abort" is called in "finished" callback
        var _cb = cb;
        cb = null;
        _cb(new Error('abort'));
    };
    return mixInPromise(promise);
};
httpinvoke.corsResponseContentTypeOnly = false;
httpinvoke.corsRequestHeaders = true;
httpinvoke.corsCredentials = true;
httpinvoke.cors = true;
httpinvoke.corsDELETE = true;
httpinvoke.corsHEAD = true;
httpinvoke.corsPATCH = true;
httpinvoke.corsPUT = true;
httpinvoke.corsStatus = true;
httpinvoke.corsResponseTextOnly = false;
httpinvoke.requestTextOnly = false;

module.exports = httpinvoke;
;
} else {
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.httpinvoke = factory();
  }
}(this, function () {
    var global;
    ;global = window;;var isArrayBufferView = function(input) {
    return typeof input === 'object' && input !== null && (
        (global.ArrayBufferView && input instanceof ArrayBufferView) ||
        (global.Int8Array && input instanceof Int8Array) ||
        (global.Uint8Array && input instanceof Uint8Array) ||
        (global.Uint8ClampedArray && input instanceof Uint8ClampedArray) ||
        (global.Int16Array && input instanceof Int16Array) ||
        (global.Uint16Array && input instanceof Uint16Array) ||
        (global.Int32Array && input instanceof Int32Array) ||
        (global.Uint32Array && input instanceof Uint32Array) ||
        (global.Float32Array && input instanceof Float32Array) ||
        (global.Float64Array && input instanceof Float64Array)
    );
}, isArray = function(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
}, isByteArray = function(input) {
    return typeof input === 'object' && input !== null && (
        (global.Buffer && input instanceof Buffer) ||
        (global.Blob && input instanceof Blob) ||
        (global.File && input instanceof File) ||
        (global.ArrayBuffer && input instanceof ArrayBuffer) ||
        isArrayBufferView(input) ||
        isArray(input)
    );
}, bytearrayMessage = 'an instance of Buffer, nor Blob, nor File, nor ArrayBuffer, nor ArrayBufferView, nor Int8Array, nor Uint8Array, nor Uint8ClampedArray, nor Int16Array, nor Uint16Array, nor Int32Array, nor Uint32Array, nor Float32Array, nor Float64Array, nor Array', supportedMethods = ',GET,HEAD,PATCH,POST,PUT,DELETE,', pass = function(value) {
    return value;
}, nextTick = (global.process && global.process.nextTick) || global.setImmediate || global.setTimeout, _undefined;
;
    // this could be a simple map, but with this "compression" we save about 100 bytes, if minified (50 bytes, if also gzipped)
    var statusTextToCode = (function() {
        for(var group = arguments.length, map = {};group--;) {
            for(var texts = arguments[group].split(','), index = texts.length;index--;) {
                map[texts[index]] = (group + 1) * 100 + index;
            }
        }
        return map;
    })(
        'Continue,Switching Protocols',
        'OK,Created,Accepted,Non-Authoritative Information,No Content,Reset Content,Partial Content',
        'Multiple Choices,Moved Permanently,Found,See Other,Not Modified,Use Proxy,_,Temporary Redirect',
        'Bad Request,Unauthorized,Payment Required,Forbidden,Not Found,Method Not Allowed,Not Acceptable,Proxy Authentication Required,Request Timeout,Conflict,Gone,Length Required,Precondition Failed,Request Entity Too Large,Request-URI Too Long,Unsupported Media Type,Requested Range Not Satisfiable,Expectation Failed',
        'Internal Server Error,Not Implemented,Bad Gateway,Service Unavailable,Gateway Time-out,HTTP Version Not Supported'
    );
    var bufferSlice = function(buffer, begin, end) {
        if(begin === 0 && end === buffer.byteLength) {
            return buffer;
        }
        return buffer.slice ? buffer.slice(begin, end) : new Uint8Array(Array.prototype.slice.call(new Uint8Array(buffer), begin, end)).buffer;
    };
    var responseBodyToBytes, responseBodyLength;
    try {
        execScript('Function httpinvoke0(B,A)\r\nDim i\r\nFor i=1 to LenB(B)\r\nA.push(AscB(MidB(B,i,1)))\r\nNext\r\nEnd Function\r\nFunction httpinvoke1(B)\r\nhttpinvoke1=LenB(B)\r\nEnd Function', 'vbscript');
        responseBodyToBytes = function(binary) {
            var bytes = [];
            httpinvoke0(binary, bytes);
            return bytes;
        };
        // cannot just assign the function, because httpinvoke1 is not a javascript 'function'
        responseBodyLength = function(binary) {
            return httpinvoke1(binary);
        };
    } catch(err) {
    }
    var getOutputText = function(xhr) {
        return xhr.response || xhr.responseText;
    };
    var binaryStringToByteArray = function(str) {
        for(var n = str.length, bytearray = new Array(n);n--;) {
            bytearray[n] = str.charCodeAt(n) & 255;
        }
        return bytearray;
    };
    var getOutputBinary = function(xhr) {
        if('response' in xhr) {
            return new Uint8Array(xhr.response || []);
        }
        // responseBody must be checked this way, because otherwise
        // it is falsy and then accessing responseText for binary data
        // results in the "c00ce514" error
        if('responseBody' in xhr) {
            return responseBodyToBytes(xhr.responseBody);
        }
        var bytearray = binaryStringToByteArray(xhr.responseText);
        // firefox 4 supports typed arrays but not xhr2
        return global.Uint8Array ? new global.Uint8Array(bytearray) : bytearray;
    };
    var getOutputLengthText = function(xhr) {
        return countStringBytes(getOutputText(xhr));
    };
    var getOutputLengthBinary = function(xhr) {
        if('response' in xhr) {
            return xhr.response ? xhr.response.byteLength : 0;
        }
        // responseBody must be checked this way, because otherwise
        // it is falsy and then accessing responseText for binary data
        // results in the "c00ce514" error
        if('responseBody' in xhr) {
            return responseBodyLength(xhr.responseBody);
        }
        return xhr.responseText.length;
    };

    var countStringBytes = function(string) {
        for(var c, n = 0, i = string.length;i--;) {
            c = string.charCodeAt(i);
            n += c < 128 ? 1 : (c < 2048 ? 2 : 3);
        }
        return n;
    };

    var fillOutputHeaders = function(xhr, outputHeaders) {
        var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
        var atLeastOne = false;
        for(var i = headers.length, colon, header; i--;) {
            if((colon = headers[i].indexOf(':')) >= 0) {
                outputHeaders[headers[i].substr(0, colon).toLowerCase()] = headers[i].substr(colon + 2);
                atLeastOne = true;
            }
        }
        return atLeastOne;
    };

    var urlPartitioningRegExp = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
    var isCrossDomain = function(location, uri) {
        uri = urlPartitioningRegExp.exec(uri.toLowerCase());
        location = urlPartitioningRegExp.exec(location.toLowerCase()) || [];
        return !!(uri && (uri[1] !== location[1] || uri[2] !== location[2] || (uri[3] || (uri[1] === 'http:' ? '80' : '443')) !== (location[3] || (location[1] === 'http:' ? '80' : '443'))));
    };
    var createXHR;
    var httpinvoke = function(uri, method, options, cb) {
        ;var mixInPromise, promise, failWithoutRequest, uploadProgressCb, inputLength, noData, timeout, inputHeaders, statusCb, initDownload, updateDownload, outputHeaders, exposedHeaders, status, outputBinary, input, outputLength, outputConverter;
/*************** COMMON initialize parameters **************/
if(!method) {
    // 1 argument
    // method, options, cb skipped
    method = 'GET';
    options = {};
} else if(!options) {
    // 2 arguments
    if(typeof method === 'string') {
        // options. cb skipped
        options = {};
    } else if(typeof method === 'object') {
        // method, cb skipped
        options = method;
        method = 'GET';
    } else {
        // method, options skipped
        options = {
            finished: method
        };
        method = 'GET';
    }
} else if(!cb) {
    // 3 arguments
    if(typeof method === 'object') {
        // method skipped
        method.finished = options;
        options = method;
        method = 'GET';
    } else if(typeof options === 'function') {
        // options skipped
        options = {
            finished: options
        };
    }
    // cb skipped
} else {
    // 4 arguments
    options.finished = cb;
}
var safeCallback = function(name, aspect) {
    if(name in options) {
        return function(a, b, c, d) {
            try {
                options[name](a, b, c, d);
            } catch(_) {
            }
            aspect(a, b, c, d);
        };
    }
    return aspect;
};
var chain = function(a, b) {
    a && a.then && a.then(function() {
        b[resolve].apply(null, arguments);
    }, function() {
        b[reject].apply(null, arguments);
    }, function() {
        b[progress].apply(null, arguments);
    });
};
var resolve = 0, reject = 1, progress = 2;
mixInPromise = function(o) {
    var value, queue = [], state = progress;
    var makeState = function(newstate) {
        o[newstate] = function(newvalue) {
            var i, p;
            if(queue) {
                value = newvalue;
                state = newstate;

                for(i = 0; i < queue.length; i++) {
                    if(typeof queue[i][state] === 'function') {
                        try {
                            p = queue[i][state].call(null, value);
                            if(state < progress) {
                                chain(p, queue[i]._);
                            }
                        } catch(err) {
                            queue[i]._[reject](err);
                        }
                    } else if(state < progress) {
                        queue[i]._[state](value);
                    }
                }
                if(state < progress) {
                    queue = null;
                }
            }
        };
    };
    makeState(progress);
    makeState(resolve);
    makeState(reject);
    o.then = function() {
        var item = [].slice.call(arguments);
        item._ = mixInPromise({});
        if(queue) {
            queue.push(item);
        } else if(typeof item[state] === 'function') {
            nextTick(function() {
                chain(item[state](value), item._);
            });
        }
        return item._;
    };
    return o;
};
failWithoutRequest = function(cb, err) {
    nextTick(function() {
        if(cb === null) {
            return;
        }
        cb(err);
    });
    promise = function() {
    };
    return mixInPromise(promise);
};

uploadProgressCb = safeCallback('uploading', function(current, total) {
    promise[progress]({
        type: 'upload',
        current: current,
        total: total
    });
});
var downloadProgressCb = safeCallback('downloading', function(current, total) {
    promise[progress]({
        type: 'download',
        current: current,
        total: total
    });
});
statusCb = safeCallback('gotStatus', function(statusCode, headers) {
    promise[progress]({
        type: 'headers',
        statusCode: statusCode,
        headers: headers
    });
});
cb = safeCallback('finished', function(err, body, statusCode, headers) {
    if(err) {
        return promise[reject](err);
    }
    promise[resolve]({
        body: body,
        statusCode: statusCode,
        headers: headers
    });
});
timeout = options.timeout || 0;
var converters = options.converters || {};
var inputConverter;
inputLength = 0;
inputHeaders = options.headers || {};
outputHeaders = {};
exposedHeaders = options.corsExposedHeaders || [];
exposedHeaders.push.apply(exposedHeaders, ['Cache-Control', 'Content-Language', 'Content-Type', 'Content-Length', 'Expires', 'Last-Modified', 'Pragma', 'Content-Range']);
/*************** COMMON convert and validate parameters **************/
if(method.indexOf(',') >= 0 || supportedMethods.indexOf(',' + method + ',') < 0) {
    return failWithoutRequest(cb, new Error('Unsupported method ' + method));
}
outputBinary = options.outputType === 'bytearray';
if(!options.outputType || options.outputType === 'text' || outputBinary) {
    outputConverter = pass;
} else if(converters['text ' + options.outputType]) {
    outputConverter = converters['text ' + options.outputType];
    outputBinary = false;
} else if(converters['bytearray ' + options.outputType]) {
    outputConverter = converters['bytearray ' + options.outputType];
    outputBinary = true;
} else {
    return failWithoutRequest(cb, new Error('Unsupported outputType ' + options.outputType));
}
inputConverter = pass;
if('input' in options) {
    input = options.input;
    if(!options.inputType || options.inputType === 'auto') {
        if(typeof input !== 'string' && !isByteArray(input)) {
            return failWithoutRequest(cb, new Error('inputType is undefined or auto and input is neither string, nor ' + bytearrayMessage));
        }
    } else if(options.inputType === 'text') {
        if(typeof input !== 'string') {
            return failWithoutRequest(cb, new Error('inputType is text, but input is not a string'));
        }
    } else if (options.inputType === 'bytearray') {
        if(!isByteArray(input)) {
            return failWithoutRequest(cb, new Error('inputType is bytearray, but input is neither ' + bytearrayMessage));
        }
    } else if(converters[options.inputType + ' text']) {
        inputConverter = converters[options.inputType + ' text'];
    } else if(converters[options.inputType + ' bytearray']) {
        inputConverter = converters[options.inputType + ' bytearray'];
    } else {
        return failWithoutRequest(cb, new Error('There is no converter for specified inputType'));
    }
    if(typeof input === 'object') {
        if(global.ArrayBuffer && input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        } else if(isArrayBufferView(input)) {
            input = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
        }
    }
    try {
        input = inputConverter(input);
    } catch(err) {
        return failWithoutRequest(cb, err);
    }
} else {
    if(options.inputType) {
        return failWithoutRequest(cb, new Error('"input" is undefined, but inputType is defined'));
    }
    if(inputHeaders['Content-Type']) {
        return failWithoutRequest(cb, new Error('"input" is undefined, but Content-Type request header is defined'));
    }
}

/*************** COMMON initialize helper variables **************/
var downloaded;
initDownload = function(total) {
    if(typeof outputLength === 'undefined') {
        downloadProgressCb(downloaded, outputLength = total);
    }
};
updateDownload = function(value) {
    if(value !== downloaded) {
        downloadProgressCb(downloaded = value, outputLength);
    }
};
noData = function() {
    initDownload(0);
    if(cb) {
        cb(null, _undefined, status, outputHeaders);
        cb = null;
    }
};
;
        /*************** initialize helper variables **************/
        var xhr, i, j, currentLocation, crossDomain, output,
            getOutput = outputBinary ? getOutputBinary : getOutputText,
            getOutputLength = outputBinary ? getOutputLengthBinary : getOutputLengthText,
            uploadProgressCbCalled = false;
        var uploadProgress = function(uploaded) {
            if(!uploadProgressCb) {
                return;
            }
            if(!uploadProgressCbCalled) {
                uploadProgressCbCalled = true;
                uploadProgressCb(0, inputLength);
                if(!cb) {
                    return;
                }
            }
            uploadProgressCb(uploaded, inputLength);
            if(uploaded === inputLength) {
                uploadProgressCb = null;
            }
        };
        try {
            // IE may throw an exception when accessing
            // a field from location if document.domain has been set
            currentLocation = location.href;
        } catch(_) {
            // Use the href attribute of an A element
            // since IE will modify it given document.location
            currentLocation = document.createElement('a');
            currentLocation.href = '';
            currentLocation = currentLocation.href;
        }
        crossDomain = isCrossDomain(currentLocation, uri);
        /*************** start XHR **************/
        if(typeof input === 'object' && httpinvoke.requestTextOnly) {
            return failWithoutRequest(cb, new Error('bytearray inputType is not supported on this platform, please always test using requestTextOnly feature flag'));
        }
        if(crossDomain && !httpinvoke.cors) {
            return failWithoutRequest(cb, new Error('Cross-origin requests are not supported'));
        }
        for(j = ['DELETE', 'PATCH', 'PUT', 'HEAD'], i = j.length;i-- > 0;) {
            if(crossDomain && method === j[i] && !httpinvoke['cors' + j[i]]) {
                return failWithoutRequest(cb, new Error(j[i] + ' method in cross-origin requests is not supported in this browser'));
            }
        }
        if(!createXHR) {
            return failWithoutRequest(cb, new Error('unable to construct XMLHttpRequest object'));
        }
        xhr = createXHR(crossDomain);
        xhr.open(method, uri, true);
        if(timeout > 0) {
            if('timeout' in xhr) {
                xhr.timeout = timeout;
            } else {
                setTimeout(function() {
                    cb(new Error('download timeout'));
                    cb = null;
                }, timeout);
            }
        }
        if(options.corsCredentials && httpinvoke.corsCredentials && typeof xhr.withCredentials === 'boolean') {
            xhr.withCredentials = true;
        }
        if(crossDomain && options.corsOriginHeader) {
            // on some Android devices CORS implementations are buggy
            // that is why there needs to be two workarounds:
            // 1. custom header with origin has to be passed, because they do not send Origin header on the actual request
            // 2. caching must be avoided, because of unknown reasons
            // read more: http://www.kinvey.com/blog/107/how-to-build-a-service-that-supports-every-android-browser

            // workaraound for #1: sending origin in custom header, also see the server-side part of the workaround in dummyserver.js
            inputHeaders[options.corsOriginHeader] = location.protocol + '//' + location.host;
        }

        /*************** bind XHR event listeners **************/
        var makeErrorCb = function(message) {
            return function() {
                // must check, because some callbacks are called synchronously, thus throwing exceptions and breaking code
                if(cb) {
                    cb(new Error(message));
                    cb = null;
                }
            };
        };
        var onuploadprogress = function(progressEvent) {
            if(cb && progressEvent.lengthComputable) {
                uploadProgress(progressEvent.loaded);
            }
        };
        if('upload' in xhr) {
            xhr.upload.ontimeout = makeErrorCb('upload timeout');
            xhr.upload.onerror = makeErrorCb('upload error');
            xhr.upload.onprogress = onuploadprogress;
        } else if('onuploadprogress' in xhr) {
            xhr.onuploadprogress = onuploadprogress;
        }

        if('ontimeout' in xhr) {
            xhr.ontimeout = makeErrorCb('download timeout');
        }
        if('onerror' in xhr) {
            xhr.onerror = function() {
                //inspect('onerror', arguments[0]);
                //dbg('onerror');
                // For 4XX and 5XX response codes Firefox 3.6 cross-origin request ends up here, but has correct statusText, but no status and headers
                onLoad();
            };
        }
        if('onloadstart' in xhr) {
            xhr.onloadstart = function() {
                //dbg('onloadstart');
                onHeadersReceived(false);
            };
        }
        if('onloadend' in xhr) {
            xhr.onloadend = function() {
                //dbg('onloadend');
                onHeadersReceived(false);
            };
        }
        if('onprogress' in xhr) {
            xhr.onprogress = function(progressEvent) {
                //dbg('onprogress');
                if(!cb) {
                    return;
                }
                onHeadersReceived(false);
                if(statusCb) {
                    return;
                }
                // There is a bug in Chrome 10 on 206 response with Content-Range=0-4/12 - total must be 5
                // 'total', 12, 'totalSize', 12, 'loaded', 5, 'position', 5, 'lengthComputable', true, 'status', 206
                // console.log('total', progressEvent.total, 'totalSize', progressEvent.totalSize, 'loaded', progressEvent.loaded, 'position', progressEvent.position, 'lengthComputable', progressEvent.lengthComputable, 'status', status);
                // httpinvoke does not work around this bug, because Chrome 10 is practically not used at all, as Chrome agressively auto-updates itself to latest version
                var total = progressEvent.total || progressEvent.totalSize || 0,
                    current = progressEvent.loaded || progressEvent.position || 0;
                if(progressEvent.lengthComputable) {
                    initDownload(total);
                }
                if(!cb) {
                    return;
                }
                if(current > total) {
                    // Opera 12 progress events has a bug - .loaded can be higher than .total
                    // see http://dev.opera.com/articles/view/xhr2/#comment-96081222
                    return;
                }
                updateDownload(current);
            };
        }
        /*
        var inspect = function(name, obj) {
            return;
            console.log('INSPECT ----- ', name, uri);
            for(var i in obj) {
                try {
                    console.log(name, 'PASS', i, typeof obj[i], typeof obj[i] === 'function' ? '[code]' : obj[i]);
                } catch(_) {
                    console.log(name, 'FAIL', i);
                }
            }
        };
        var dbg = function(name) {
            console.log('DBG ----- ', name, uri);
            inspect('xhr', xhr);
            try {
                console.log('PASS', 'headers', xhr.getAllResponseHeaders());
            } catch(_) {
                console.log('FAIL', 'headers');
            }
            try {
                console.log('PASS', 'cache-control', xhr.getResponseHeader('Cache-Control'));
            } catch(_) {
                console.log('FAIL', 'cache-control');
            }
        };
        */
        var received = {
            success: false,
            status: false,
            entity: false,
            headers: false
        };
        var onHeadersReceived = function(lastTry) {
            if(!cb) {
                return;
            }

            try {
                if(xhr.status) {
                    received.status = true;
                }
            } catch(_) {
            }
            try {
                if(xhr.statusText) {
                    received.status = true;
                }
            } catch(_) {
            }
            try {
                if(xhr.responseText) {
                    received.entity = true;
                }
            } catch(_) {
            }
            try {
                if(xhr.response) {
                    received.entity = true;
                }
            } catch(_) {
            }

            if(!statusCb) {
                return;
            }

            if(received.status || received.entity || received.success || lastTry) {
                if(typeof xhr.contentType === 'string') {
                    if(xhr.contentType !== 'text/html' || xhr.responseText !== '') {
                        // When no entity body and/or no Content-Type header is sent,
                        // XDomainRequest on IE-8 defaults to text/html xhr.contentType.
                        // Also, empty string is not a valid 'text/html' entity.
                        outputHeaders['content-type'] = xhr.contentType;
                        received.headers = true;
                    }
                }
                for(var i = 0; i < exposedHeaders.length; i += 1) {
                    var header;
                    try {
                        if(header = xhr.getResponseHeader(exposedHeaders[i])) {
                            outputHeaders[exposedHeaders[i].toLowerCase()] = header;
                            received.headers = true;
                        }
                    } catch(err) {
                    }
                }
                try {
                    // note - on Opera 11.10 and 11.50 calling getAllResponseHeaders may introduce side effects on xhr and responses will timeout when server responds with some HTTP status codes
                    if(fillOutputHeaders(xhr, outputHeaders)) {
                        received.headers = true;
                    }
                } catch(err) {
                }

                if(!status && (!crossDomain || httpinvoke.corsStatus)) {
                    // Sometimes on IE 9 accessing .status throws an error, but .statusText does not.
                    try {
                        if(xhr.status) {
                            status = xhr.status;
                        }
                    } catch(_) {
                    }
                    if(!status) {
                        try {
                            status = statusTextToCode[xhr.statusText];
                        } catch(_) {
                        }
                    }
                    // sometimes IE returns 1223 when it should be 204
                    if(status === 1223) {
                        status = 204;
                    }
                }
            }

            if(!lastTry && !(received.status && received.headers)) {
                return;
            }

            uploadProgress(inputLength);
            if(!cb) {
                return;
            }

            statusCb(status, outputHeaders);
            statusCb = null;
            if(!cb) {
                return;
            }

            if(method === 'HEAD') {
                return noData();
            }

            updateDownload(0);
            if(!cb) {
                return;
            }

            if('content-length' in outputHeaders && (!crossDomain || 'content-encoding' in outputHeaders) && (!outputHeaders['content-encoding'] || outputHeaders['content-encoding'] === 'identity')) {
                initDownload(Number(outputHeaders['content-length']));
                if(!cb) {
                    return;
                }
            }
        };
        var onLoad = function() {
            if(!cb) {
                return;
            }

            onHeadersReceived(true);
            if(!cb) {
                return;
            }

            if(!received.success && !status) {
                // 'finished in onerror and status code is undefined'
                cb(new Error('download error'));
                cb = null;
                return;
            }

            var length;
            try {
                length = getOutputLength(xhr);
            } catch(_) {
                return noData();
            }
            if(!outputLength) {
                initDownload(length);
            } else if(length !== outputLength) {
                // 'output length ' + outputLength + ' is not equal to actually received entity length ' + length
                cb(new Error('download error'));
                cb = null;
            }
            if(!cb) {
                return;
            }

            updateDownload(outputLength);
            if(!cb) {
                return;
            }

            try {
                cb(null, !received.entity && outputLength === 0 && typeof outputHeaders['content-type'] === 'undefined' ? _undefined : outputConverter(getOutput(xhr)), status, outputHeaders);
            } catch(err) {
                cb(err);
            }
            cb = null;
        };
        var onloadBound = false;
        if(typeof xhr.onload !== 'undefined') {
            onloadBound = true;
            xhr.onload = function() {
                received.success = true;
                //dbg('onload');
                onLoad();
            };
        }
        if(typeof xhr.onreadystatechange !== 'undefined') {
            xhr.onreadystatechange = function() {
                //dbg('onreadystatechange ' + xhr.readyState);
                if(xhr.readyState === 2) {
                    // HEADERS_RECEIVED
                    onHeadersReceived(false);
                } else if(xhr.readyState === 3) {
                    // LOADING
                    received.success = true;
                    onHeadersReceived(false);
                    if(statusCb) {
                        return;
                    }
                    try {
                        updateDownload(getOutputLength(xhr));
                    } catch(err) {
                    }
                // Instead of 'typeof xhr.onload === "undefined"', we must use
                // onloadBound variable, because otherwise Firefox 3.5 synchronously
                // throws a "Permission denied for <> to create wrapper for
                // object of class UnnamedClass" error
                } else if(xhr.readyState === 4 && !onloadBound) {
                    // DONE
                    onLoad();
                }
            };
        }

        /*************** set XHR request headers **************/
        if(!crossDomain || httpinvoke.corsRequestHeaders) {
            for(var inputHeaderName in inputHeaders) {
                if(inputHeaders.hasOwnProperty(inputHeaderName)) {
                    try {
                        xhr.setRequestHeader(inputHeaderName, inputHeaders[inputHeaderName]);
                    } catch(err) {
                        return failWithoutRequest(cb, err);
                    }
                }
            }
        }
        /*************** invoke XHR request process **************/
        nextTick(function() {
            if(!cb) {
                return;
            }
            if('response' in xhr) {
                try {
                    xhr.responseType = outputBinary ? 'arraybuffer' : 'text';
                } catch(err) {
                }
            } else {
                try {
                    // mime type override must be done before receiving headers - at least for Safari 5.0.4
                    if(outputBinary) {
                        xhr.overrideMimeType('text/plain; charset=x-user-defined');
                    }
                } catch(err) {
                }
            }
            if(typeof input === 'object') {
                var triedSendArrayBufferView = false;
                var triedSendBlob = false;
                var triedSendBinaryString = false;

                var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MozBlobBuilder || global.MSBlobBuilder;
                if(isArray(input)) {
                    input = global.Uint8Array ? new Uint8Array(input) : String.fromCharCode.apply(String, input);
                }
                var toBlob = BlobBuilder ? function() {
                    var bb = new BlobBuilder();
                    bb.append(input);
                    input = bb.getBlob(inputHeaders['Content-Type'] || 'application/octet-stream');
                } : function() {
                    try {
                        input = new Blob([input], {
                            type: inputHeaders['Content-Type'] || 'application/octet-stream'
                        });
                    } catch(_) {
                        triedSendBlob = true;
                    }
                };
                var go = function() {
                    var reader;
                    if(triedSendBlob && triedSendArrayBufferView && triedSendBinaryString) {
                        return failWithoutRequest(cb, new Error('Unable to send'));
                    }
                    if(isArrayBufferView(input)) {
                        if(triedSendArrayBufferView) {
                            if(!triedSendBinaryString) {
                                try {
                                    input = String.fromCharCode.apply(String, input);
                                } catch(_) {
                                    triedSendBinaryString = true;
                                }
                            } else if(!triedSendBlob) {
                                toBlob();
                            }
                        } else {
                            try {
                                inputLength = input.byteLength;
                                // if there is ArrayBufferView, then the browser supports sending instances of subclasses of ArayBufferView, otherwise we must send an ArrayBuffer
                                xhr.send(global.ArrayBufferView ? input : bufferSlice(input.buffer, input.byteOffset, input.byteOffset + input.byteLength));
                                return;
                            } catch(_) {
                                triedSendArrayBufferView = true;
                            }
                        }
                    } else if(global.Blob && input instanceof Blob) {
                        if(triedSendBlob) {
                            if(!triedSendArrayBufferView) {
                                try {
                                    reader = new FileReader();
                                    reader.onerror = function() {
                                        triedSendArrayBufferView = true;
                                        go();
                                    };
                                    reader.onload = function() {
                                        try {
                                            input = new Uint8Array(reader.result);
                                        } catch(_) {
                                            triedSendArrayBufferView = true;
                                        }
                                        go();
                                    };
                                    reader.readAsArrayBuffer(input);
                                    return;
                                } catch(_) {
                                    triedSendArrayBufferView = true;
                                }
                            } else if(!triedSendBinaryString) {
                                try {
                                    reader = new FileReader();
                                    reader.onerror = function() {
                                        triedSendBinaryString = true;
                                        go();
                                    };
                                    reader.onload = function() {
                                        input = reader.result;
                                        go();
                                    };
                                    reader.readAsBinaryString(input);
                                    return;
                                } catch(_) {
                                    triedSendBinaryString = true;
                                }
                            }
                        } else {
                            try {
                                inputLength = input.size;
                                xhr.send(input);
                                return;
                            } catch(_) {
                                triedSendBlob = true;
                            }
                        }
                    } else {
                        if(triedSendBinaryString) {
                            if(!triedSendArrayBufferView) {
                                try {
                                    input = binaryStringToByteArray(input);
                                } catch(_) {
                                    triedSendArrayBufferView = true;
                                }
                            } else if(!triedSendBlob) {
                                toBlob();
                            }
                        } else {
                            try {
                                inputLength = input.length;
                                xhr.sendAsBinary(input);
                                return;
                            } catch(_) {
                                triedSendBinaryString = true;
                            }
                        }
                    }
                    nextTick(go);
                };
                go();
            } else {
                try {
                    if(typeof input === 'string') {
                        inputLength = countStringBytes(input);
                        xhr.send(input);
                    } else {
                        xhr.send(null);
                    }
                } catch(err) {
                    var _cb = cb;
                    cb = null;
                    return failWithoutRequest(cb, new Error('Unable to send'));
                }
            }
            uploadProgress(0);
        });

        /*************** return "abort" function **************/
        promise = function() {
            if(!cb) {
                return;
            }

            // these statements are in case "abort" is called in "finished" callback
            var _cb = cb;
            cb = null;
            _cb(new Error('abort'));

            try {
                xhr.abort();
            } catch(err){
            }
        };
        return mixInPromise(promise);
    };
    httpinvoke.corsResponseContentTypeOnly = false;
    httpinvoke.corsRequestHeaders = false;
    httpinvoke.corsCredentials = false;
    httpinvoke.cors = false;
    httpinvoke.corsDELETE = false;
    httpinvoke.corsHEAD = false;
    httpinvoke.corsPATCH = false;
    httpinvoke.corsPUT = false;
    httpinvoke.corsStatus = false;
    httpinvoke.corsResponseTextOnly = false;
    httpinvoke.requestTextOnly = false;
    (function() {
        try {
            createXHR = function() {
                return new XMLHttpRequest();
            };
            var tmpxhr = createXHR();
            httpinvoke.requestTextOnly = typeof Uint8Array === 'undefined' && typeof tmpxhr.sendAsBinary === 'undefined';
            httpinvoke.cors = 'withCredentials' in tmpxhr;
            if(httpinvoke.cors) {
                httpinvoke.corsRequestHeaders = true;
                httpinvoke.corsCredentials = true;
                httpinvoke.corsDELETE = true;
                httpinvoke.corsPATCH = true;
                httpinvoke.corsPUT = true;
                httpinvoke.corsHEAD = true;
                httpinvoke.corsStatus = true;
                return;
            }
        } catch(err) {
        }
        try {
            if(typeof XDomainRequest === 'undefined') {
                createXHR = function() {
                    return new XMLHttpRequest();
                };
                createXHR();
            } else {
                createXHR = function(cors) {
                    return cors ? new XDomainRequest() : new XMLHttpRequest();
                };
                createXHR(true);
                httpinvoke.cors = true;
                httpinvoke.corsResponseContentTypeOnly = true;
                httpinvoke.corsResponseTextOnly = true;
            }
            return;
        } catch(err) {
        }
        try {
            createXHR();
            return;
        } catch(err) {
        }
        var candidates = ['Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP'];
        for(var i = candidates.length; i--;) {
            try {
                createXHR = function() {
                    return new ActiveXObject(candidates[i]);
                };
                createXHR();
                httpinvoke.requestTextOnly = true;
                return;
            } catch(err) {
            }
            i -= 1;
        }
        createXHR = _undefined;
    })();

    return httpinvoke;
}));
;
}

},{}],18:[function(require,module,exports){
'use strict'

var nextTick = require('./lib/next-tick')

module.exports = Promise
function Promise(fn) {
  if (!(this instanceof Promise)) return new Promise(fn)
  if (typeof fn !== 'function') throw new TypeError('not a function')
  var state = null
  var delegating = false
  var value = null
  var deferreds = []
  var self = this

  this.then = function(onFulfilled, onRejected) {
    return new Promise(function(resolve, reject) {
      handle(new Handler(onFulfilled, onRejected, resolve, reject))
    })
  }

  function handle(deferred) {
    if (state === null) {
      deferreds.push(deferred)
      return
    }
    nextTick(function() {
      var cb = state ? deferred.onFulfilled : deferred.onRejected
      if (cb === null) {
        (state ? deferred.resolve : deferred.reject)(value)
        return
      }
      var ret
      try {
        ret = cb(value)
      }
      catch (e) {
        deferred.reject(e)
        return
      }
      deferred.resolve(ret)
    })
  }

  function resolve(newValue) {
    if (delegating)
      return
    resolve_(newValue)
  }

  function resolve_(newValue) {
    if (state !== null)
      return
    try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.')
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then
        if (typeof then === 'function') {
          delegating = true
          then.call(newValue, resolve_, reject_)
          return
        }
      }
      state = true
      value = newValue
      finale()
    } catch (e) { reject_(e) }
  }

  function reject(newValue) {
    if (delegating)
      return
    reject_(newValue)
  }

  function reject_(newValue) {
    if (state !== null)
      return
    state = false
    value = newValue
    finale()
  }

  function finale() {
    for (var i = 0, len = deferreds.length; i < len; i++)
      handle(deferreds[i])
    deferreds = null
  }

  try { fn(resolve, reject) }
  catch(e) { reject(e) }
}


function Handler(onFulfilled, onRejected, resolve, reject){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.resolve = resolve
  this.reject = reject
}

},{"./lib/next-tick":20}],19:[function(require,module,exports){
'use strict'

//This file contains then/promise specific extensions to the core promise API

var Promise = require('./core.js')
var nextTick = require('./lib/next-tick')

module.exports = Promise

/* Static Functions */

Promise.from = function (value) {
  if (value instanceof Promise) return value
  return new Promise(function (resolve) { resolve(value) })
}
Promise.denodeify = function (fn) {
  return function () {
    var self = this
    var args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      args.push(function (err, res) {
        if (err) reject(err)
        else resolve(res)
      })
      fn.apply(self, args)
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null
    try {
      return fn.apply(this, arguments).nodeify(callback)
    } catch (ex) {
      if (callback == null) {
        return new Promise(function (resolve, reject) { reject(ex) })
      } else {
        nextTick(function () {
          callback(ex)
        })
      }
    }
  }
}

Promise.all = function () {
  var args = Array.prototype.slice.call(arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments)

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([])
    var remaining = args.length
    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then
          if (typeof then === 'function') {
            then.call(val, function (val) { res(i, val) }, reject)
            return
          }
        }
        args[i] = val
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex)
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i])
    }
  })
}

/* Prototype Methods */

Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this
  self.then(null, function (err) {
    nextTick(function () {
      throw err
    })
  })
}
Promise.prototype.nodeify = function (callback) {
  if (callback == null) return this

  this.then(function (value) {
    nextTick(function () {
      callback(null, value)
    })
  }, function (err) {
    nextTick(function () {
      callback(err)
    })
  })
}
},{"./core.js":18,"./lib/next-tick":20}],20:[function(require,module,exports){
var process=require("__browserify_process");'use strict'

if (typeof setImmediate === 'function') { // IE >= 10 & node.js >= 0.10
  module.exports = function(fn){ setImmediate(fn) }
} else if (typeof process !== 'undefined' && process && typeof process.nextTick === 'function') { // node.js before 0.10
  module.exports = function(fn){ process.nextTick(fn) }
} else {
  module.exports = function(fn){ setTimeout(fn, 0) }
}

},{"__browserify_process":16}],21:[function(require,module,exports){
module.exports={
  "name": "imjs",
  "version": "3.0.0-pre",
  "description": "Client library for communication with InterMine web-services",
  "main": "js/main",
  "keywords": [
    "javascript",
    "webservice",
    "InterMine",
    "Bio-Informatics"
  ],
  "author": {
    "name": "Alex Kalderimis",
    "email": "alex@intermine.org",
    "twitter": "alexkalderimis"
  },
  "license": "LGPL",
  "repository": {
    "type": "git",
    "url": "git://github.com/alexkalderimis/imjs.git"
  },
  "dependencies": {
    "JSONStream": "~0.7.1",
    "promise": "~3.2.0",
    "xmldom": "~0.1.16"
  },
  "engines": {
    "node": ">= 0.8.0"
  },
  "directories": {
    "tests": "test"
  },
  "scripts": {
    "prepublish": "make",
    "test": "grunt test"
  },
  "devDependencies": {
    "bower": "latest",
    "codo": "~1.6.0",
    "coffee-script": "~1.3.3",
    "grunt": "~0.4.1",
    "grunt-browserify": "~1.2.11",
    "grunt-bump": "0.0.11",
    "grunt-cli": "~0.1.11",
    "grunt-coffeelint": "0.0.7",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-contrib-copy": "~0.4.1",
    "grunt-contrib-jshint": "~0.7.1",
    "grunt-contrib-symlink": "~0.2.0",
    "grunt-contrib-uglify": "~0.2.7",
    "grunt-mocha-phantomjs": "~0.3.1",
    "grunt-simple-mocha": "~0.4.0",
    "httpinvoke": "~1.0.4",
    "mocha": "latest",
    "oboe": "~1.11.0",
    "should": "latest",
    "coffeeify": "~0.5.2",
    "grunt-jscoverage": "0.0.3"
  }
}

},{}]},{},[9])
(9)
});
;