module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "2295cfb39e0178ec74d2";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:5001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/*!***************************!*\
  !*** ./build/assets.json ***!
  \***************************/
/*! exports provided: client, default */
/***/ (function(module) {

module.exports = {"client":{"js":"http://localhost:5001/static/js/bundle.js"}};

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + (err.stack || err.message));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log(
							"warning",
							"[HMR] Update failed: " + (err.stack || err.message)
						);
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?300"))

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled-base */ "@emotion/styled-base");
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom_Route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom/Route */ "react-router-dom/Route");
/* harmony import */ var react_router_dom_Route__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom_Route__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom/Switch */ "react-router-dom/Switch");
/* harmony import */ var react_router_dom_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/core */ "@emotion/core");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_emotion_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var emotion_reset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! emotion-reset */ "emotion-reset");
/* harmony import */ var emotion_reset__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(emotion_reset__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var components_Home__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Home */ "./src/components/Home.js");
/* harmony import */ var components_Route1__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! components/Route1 */ "./src/components/Route1.js");

var _jsxFileName = 'C:\\Users\\rchan\\Documents\\nodeplayground\\blue-coin\\client\\src\\App.js';










var Grid = /*#__PURE__*/_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()('div', {
  target: 'e1slvd9f0',
  label: 'Grid'
})( false ? undefined : {
  name: 'e06vnn',
  styles: 'display:grid;grid-template-columns:repeat(2,1fr);',
  map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcQXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdCMEIiLCJmaWxlIjoic3JjXFxBcHAuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvcmNoYW4vRG9jdW1lbnRzL25vZGVwbGF5Z3JvdW5kL2JsdWUtY29pbi9jbGllbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIFxyXG4gIHtcclxuICAgIC8vIGNyZWF0ZVJlZixcclxuICAgIEZyYWdtZW50LFxyXG4gICAgLy8gUHVyZUNvbXBvbmVudCxcclxuICAgIHVzZUVmZmVjdFxyXG59IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgUm91dGUgZnJvbSAncmVhY3Qtcm91dGVyLWRvbS9Sb3V0ZSdcclxuaW1wb3J0IFN3aXRjaCBmcm9tICdyZWFjdC1yb3V0ZXItZG9tL1N3aXRjaCdcclxuaW1wb3J0IHsgR2xvYmFsLCBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJ1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCdcclxuaW1wb3J0IGVtb3Rpb25SZXNldCBmcm9tICdlbW90aW9uLXJlc2V0J1xyXG5cclxuaW1wb3J0IEhvbWUgZnJvbSAnY29tcG9uZW50cy9Ib21lJ1xyXG5pbXBvcnQgUm91dGUxIGZyb20gJ2NvbXBvbmVudHMvUm91dGUxJ1xyXG5cclxuY29uc3QgR3JpZCA9IHN0eWxlZCgnZGl2JylgXHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xyXG5gXHJcblxyXG5jb25zdCBUaXRsZUNhcmQgPSBzdHlsZWQoJ2RpdicpYFxyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuYFxyXG4vLyB1c2VFZmZlY3QoKCkgPT4ge1xyXG4vLyAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZS1jYXJkLS1jYW52YXMnKVxyXG4vLyAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMlxyXG4vLyAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuLy8gICBjb25zdCB0aXRsZUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUtY2FyZCcpXHJcbi8vICAgdGl0bGVDYXJkLm9ubG9hZCA9ICgpID0+IHtcclxuLy8gICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcbi8vICAgICBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJ1xyXG4vLyAgICAgY29uc29sZS5sb2coY3R4LCBjdHguQ09MT1JfQlVGRkVSX0JJVClcclxuLy8gICB9XHJcbi8vICAgLy8gY3R4LmNsZWFyQ29sb3IoMi4wLCAxLjAsIDQuMCwgMS4wKVxyXG4vLyAgIC8vIGN0eC5jbGVhcihjdHguQ09MT1JfQlVGRkVSX0JJVCk7XHJcbi8vIH0pXHJcblxyXG4vLyBjbGFzcyBDYW52YXMgZXh0ZW5kcyBQdXJlQ29tcG9uZW50IHsgXHJcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuLy8gICAgIHN1cGVyKHByb3BzKVxyXG4vLyAgICAgdGhpcy5jYW52YXNSZWYgPSBjcmVhdGVSZWYoKVxyXG4vLyAgIH1cclxuXHJcblxyXG4vLyAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4vLyAgICAgLy8gRHJhd3MgYSBzcXVhcmUgaW4gdGhlIG1pZGRsZSBvZiB0aGUgY2FudmFzIHJvdGF0ZWRcclxuLy8gICAgIC8vIGFyb3VuZCB0aGUgY2VudHJlIGJ5IHRoaXMucHJvcHMuYW5nbGVcclxuLy8gICAgIC8vIGNvbnN0IHsgYW5nbGUgfSA9IHRoaXMucHJvcHM7XHJcbi8vICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhc1JlZi5jdXJyZW50O1xyXG4vLyAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLyAyXHJcbi8vICAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XHJcbi8vICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuLy8gICAgIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nXHJcbi8vICAgICBjdHguZmlsbFJlY3QoMTAsIDEwLCA1MCwgNTApXHJcbi8vICAgICAvLyBjb25zdCB3aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuLy8gICAgIC8vIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbi8vICAgICAvLyBjdHguc2F2ZSgpO1xyXG4vLyAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xyXG4vLyAgICAgLy8gY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuLy8gICAgIC8vIGN0eC50cmFuc2xhdGUod2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcclxuLy8gICAgIC8vIGN0eC5yb3RhdGUoKGFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xyXG4vLyAgICAgLy8gY3R4LmZpbGxTdHlsZSA9ICcjNDM5N0FDJztcclxuLy8gICAgIC8vIGN0eC5maWxsUmVjdCgtd2lkdGggLyA0LCAtaGVpZ2h0IC8gNCwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcclxuLy8gICAgIC8vIGN0eC5yZXN0b3JlKCk7XHJcbi8vICAgfVxyXG5cclxuLy8gICByZW5kZXIoKSB7XHJcbi8vICAgICByZXR1cm4gKFxyXG4vLyAgICAgICA8Y2FudmFzIHJlZj17dGhpcy5jYW52YXNSZWZ9IC8+XHJcbi8vICAgICApXHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5jb25zdCBBcHAgPSAoKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZS1jYXJkJylcclxuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMlxyXG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgLy8gY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nXHJcbiAgICAvLyBjdHguZmlsbFJlY3QoMTAsIDEwLCA1MCwgNTApXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wyJylcclxuICAgIGN0eC5jbGVhckNvbG9yKDIuMCwgMS4wLCA0LjAsIDEuMClcclxuICAgIGN0eC5jbGVhcihjdHguQ09MT1JfQlVGRkVSX0JJVClcclxuICAgIC8vIGN0eC5jbGVhckNvbG9yKDIuMCwgMS4wLCA0LjAsIDEuMClcclxuICAgIC8vIGN0eC5jbGVhcihjdHguQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgfSlcclxuICBcclxuICByZXR1cm4gKFxyXG4gICAgPEZyYWdtZW50PlxyXG4gICAgICA8R2xvYmFsIHN0eWxlcz17Y3NzYCR7ZW1vdGlvblJlc2V0fWB9Lz5cclxuICAgICAgPEdyaWQ+XHJcbiAgICAgICAgPFRpdGxlQ2FyZD5cclxuICAgICAgICAgIHsvKiA8Q2FudmFzIC8+ICovfVxyXG4gICAgICAgICAgPGNhbnZhcyBpZD0ndGl0bGUtY2FyZCcgLz5cclxuICAgICAgICA8L1RpdGxlQ2FyZD5cclxuICAgICAgICA8U3dpdGNoPlxyXG4gICAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy8nIGNvbXBvbmVudD17SG9tZX0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvcm91dGUxJyBjb21wb25lbnQ9e1JvdXRlMX0gLz5cclxuICAgICAgICA8L1N3aXRjaD5cclxuICAgICAgPC9HcmlkPlxyXG4gICAgPC9GcmFnbWVudD5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxyXG4iXX0= */'
});

var TitleCard = /*#__PURE__*/_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()('div', {
  target: 'e1slvd9f1',
  label: 'TitleCard'
})( false ? undefined : {
  name: 'dtw560',
  styles: 'align-items:center;display:flex;justify-content:center;',
  map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcQXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFCK0IiLCJmaWxlIjoic3JjXFxBcHAuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvcmNoYW4vRG9jdW1lbnRzL25vZGVwbGF5Z3JvdW5kL2JsdWUtY29pbi9jbGllbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIFxyXG4gIHtcclxuICAgIC8vIGNyZWF0ZVJlZixcclxuICAgIEZyYWdtZW50LFxyXG4gICAgLy8gUHVyZUNvbXBvbmVudCxcclxuICAgIHVzZUVmZmVjdFxyXG59IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgUm91dGUgZnJvbSAncmVhY3Qtcm91dGVyLWRvbS9Sb3V0ZSdcclxuaW1wb3J0IFN3aXRjaCBmcm9tICdyZWFjdC1yb3V0ZXItZG9tL1N3aXRjaCdcclxuaW1wb3J0IHsgR2xvYmFsLCBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJ1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCdcclxuaW1wb3J0IGVtb3Rpb25SZXNldCBmcm9tICdlbW90aW9uLXJlc2V0J1xyXG5cclxuaW1wb3J0IEhvbWUgZnJvbSAnY29tcG9uZW50cy9Ib21lJ1xyXG5pbXBvcnQgUm91dGUxIGZyb20gJ2NvbXBvbmVudHMvUm91dGUxJ1xyXG5cclxuY29uc3QgR3JpZCA9IHN0eWxlZCgnZGl2JylgXHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xyXG5gXHJcblxyXG5jb25zdCBUaXRsZUNhcmQgPSBzdHlsZWQoJ2RpdicpYFxyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuYFxyXG4vLyB1c2VFZmZlY3QoKCkgPT4ge1xyXG4vLyAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZS1jYXJkLS1jYW52YXMnKVxyXG4vLyAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMlxyXG4vLyAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuLy8gICBjb25zdCB0aXRsZUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUtY2FyZCcpXHJcbi8vICAgdGl0bGVDYXJkLm9ubG9hZCA9ICgpID0+IHtcclxuLy8gICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcbi8vICAgICBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJ1xyXG4vLyAgICAgY29uc29sZS5sb2coY3R4LCBjdHguQ09MT1JfQlVGRkVSX0JJVClcclxuLy8gICB9XHJcbi8vICAgLy8gY3R4LmNsZWFyQ29sb3IoMi4wLCAxLjAsIDQuMCwgMS4wKVxyXG4vLyAgIC8vIGN0eC5jbGVhcihjdHguQ09MT1JfQlVGRkVSX0JJVCk7XHJcbi8vIH0pXHJcblxyXG4vLyBjbGFzcyBDYW52YXMgZXh0ZW5kcyBQdXJlQ29tcG9uZW50IHsgXHJcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuLy8gICAgIHN1cGVyKHByb3BzKVxyXG4vLyAgICAgdGhpcy5jYW52YXNSZWYgPSBjcmVhdGVSZWYoKVxyXG4vLyAgIH1cclxuXHJcblxyXG4vLyAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4vLyAgICAgLy8gRHJhd3MgYSBzcXVhcmUgaW4gdGhlIG1pZGRsZSBvZiB0aGUgY2FudmFzIHJvdGF0ZWRcclxuLy8gICAgIC8vIGFyb3VuZCB0aGUgY2VudHJlIGJ5IHRoaXMucHJvcHMuYW5nbGVcclxuLy8gICAgIC8vIGNvbnN0IHsgYW5nbGUgfSA9IHRoaXMucHJvcHM7XHJcbi8vICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhc1JlZi5jdXJyZW50O1xyXG4vLyAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLyAyXHJcbi8vICAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XHJcbi8vICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuLy8gICAgIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nXHJcbi8vICAgICBjdHguZmlsbFJlY3QoMTAsIDEwLCA1MCwgNTApXHJcbi8vICAgICAvLyBjb25zdCB3aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuLy8gICAgIC8vIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbi8vICAgICAvLyBjdHguc2F2ZSgpO1xyXG4vLyAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xyXG4vLyAgICAgLy8gY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuLy8gICAgIC8vIGN0eC50cmFuc2xhdGUod2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcclxuLy8gICAgIC8vIGN0eC5yb3RhdGUoKGFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xyXG4vLyAgICAgLy8gY3R4LmZpbGxTdHlsZSA9ICcjNDM5N0FDJztcclxuLy8gICAgIC8vIGN0eC5maWxsUmVjdCgtd2lkdGggLyA0LCAtaGVpZ2h0IC8gNCwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcclxuLy8gICAgIC8vIGN0eC5yZXN0b3JlKCk7XHJcbi8vICAgfVxyXG5cclxuLy8gICByZW5kZXIoKSB7XHJcbi8vICAgICByZXR1cm4gKFxyXG4vLyAgICAgICA8Y2FudmFzIHJlZj17dGhpcy5jYW52YXNSZWZ9IC8+XHJcbi8vICAgICApXHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5jb25zdCBBcHAgPSAoKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZS1jYXJkJylcclxuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMlxyXG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgLy8gY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nXHJcbiAgICAvLyBjdHguZmlsbFJlY3QoMTAsIDEwLCA1MCwgNTApXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wyJylcclxuICAgIGN0eC5jbGVhckNvbG9yKDIuMCwgMS4wLCA0LjAsIDEuMClcclxuICAgIGN0eC5jbGVhcihjdHguQ09MT1JfQlVGRkVSX0JJVClcclxuICAgIC8vIGN0eC5jbGVhckNvbG9yKDIuMCwgMS4wLCA0LjAsIDEuMClcclxuICAgIC8vIGN0eC5jbGVhcihjdHguQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgfSlcclxuICBcclxuICByZXR1cm4gKFxyXG4gICAgPEZyYWdtZW50PlxyXG4gICAgICA8R2xvYmFsIHN0eWxlcz17Y3NzYCR7ZW1vdGlvblJlc2V0fWB9Lz5cclxuICAgICAgPEdyaWQ+XHJcbiAgICAgICAgPFRpdGxlQ2FyZD5cclxuICAgICAgICAgIHsvKiA8Q2FudmFzIC8+ICovfVxyXG4gICAgICAgICAgPGNhbnZhcyBpZD0ndGl0bGUtY2FyZCcgLz5cclxuICAgICAgICA8L1RpdGxlQ2FyZD5cclxuICAgICAgICA8U3dpdGNoPlxyXG4gICAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy8nIGNvbXBvbmVudD17SG9tZX0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvcm91dGUxJyBjb21wb25lbnQ9e1JvdXRlMX0gLz5cclxuICAgICAgICA8L1N3aXRjaD5cclxuICAgICAgPC9HcmlkPlxyXG4gICAgPC9GcmFnbWVudD5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxyXG4iXX0= */'
});
// useEffect(() => {
//   const canvas = document.querySelector('#title-card--canvas')
//   canvas.width = window.innerWidth / 2
//   canvas.height = window.innerHeight
//   const titleCard = document.querySelector('#title-card')
//   titleCard.onload = () => {
//     const ctx = canvas.getContext('2d')
//     ctx.fillStyle = 'green'
//     console.log(ctx, ctx.COLOR_BUFFER_BIT)
//   }
//   // ctx.clearColor(2.0, 1.0, 4.0, 1.0)
//   // ctx.clear(ctx.COLOR_BUFFER_BIT);
// })

// class Canvas extends PureComponent { 
//   constructor(props) {
//     super(props)
//     this.canvasRef = createRef()
//   }


//   componentDidMount() {
//     // Draws a square in the middle of the canvas rotated
//     // around the centre by this.props.angle
//     // const { angle } = this.props;
//     const canvas = this.canvasRef.current;
//     canvas.width = window.innerWidth / 2
//     canvas.height = window.innerHeight
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = 'green'
//     ctx.fillRect(10, 10, 50, 50)
//     // const width = canvas.width;
//     // const height = canvas.height;
//     // ctx.save();
//     // ctx.beginPath();
//     // ctx.clearRect(0, 0, width, height);
//     // ctx.translate(width / 2, height / 2);
//     // ctx.rotate((angle * Math.PI) / 180);
//     // ctx.fillStyle = '#4397AC';
//     // ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
//     // ctx.restore();
//   }

//   render() {
//     return (
//       <canvas ref={this.canvasRef} />
//     )
//   }
// }

var App = function App() {
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var canvas = document.querySelector('#title-card');
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
    // const ctx = canvas.getContext('2d')
    // ctx.fillStyle = 'green'
    // ctx.fillRect(10, 10, 50, 50)
    var ctx = canvas.getContext('webgl2');
    ctx.clearColor(2.0, 1.0, 4.0, 1.0);
    ctx.clear(ctx.COLOR_BUFFER_BIT);
    // ctx.clearColor(2.0, 1.0, 4.0, 1.0)
    // ctx.clear(ctx.COLOR_BUFFER_BIT);
  });

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    react__WEBPACK_IMPORTED_MODULE_1__["Fragment"],
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 93
      }
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["Global"], { styles: /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["css"])(emotion_reset__WEBPACK_IMPORTED_MODULE_5___default.a, 'label:App;' + ( false ? undefined : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcQXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZGeUIiLCJmaWxlIjoic3JjXFxBcHAuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvcmNoYW4vRG9jdW1lbnRzL25vZGVwbGF5Z3JvdW5kL2JsdWUtY29pbi9jbGllbnQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIFxyXG4gIHtcclxuICAgIC8vIGNyZWF0ZVJlZixcclxuICAgIEZyYWdtZW50LFxyXG4gICAgLy8gUHVyZUNvbXBvbmVudCxcclxuICAgIHVzZUVmZmVjdFxyXG59IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgUm91dGUgZnJvbSAncmVhY3Qtcm91dGVyLWRvbS9Sb3V0ZSdcclxuaW1wb3J0IFN3aXRjaCBmcm9tICdyZWFjdC1yb3V0ZXItZG9tL1N3aXRjaCdcclxuaW1wb3J0IHsgR2xvYmFsLCBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJ1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCdcclxuaW1wb3J0IGVtb3Rpb25SZXNldCBmcm9tICdlbW90aW9uLXJlc2V0J1xyXG5cclxuaW1wb3J0IEhvbWUgZnJvbSAnY29tcG9uZW50cy9Ib21lJ1xyXG5pbXBvcnQgUm91dGUxIGZyb20gJ2NvbXBvbmVudHMvUm91dGUxJ1xyXG5cclxuY29uc3QgR3JpZCA9IHN0eWxlZCgnZGl2JylgXHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xyXG5gXHJcblxyXG5jb25zdCBUaXRsZUNhcmQgPSBzdHlsZWQoJ2RpdicpYFxyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuYFxyXG4vLyB1c2VFZmZlY3QoKCkgPT4ge1xyXG4vLyAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZS1jYXJkLS1jYW52YXMnKVxyXG4vLyAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMlxyXG4vLyAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcclxuLy8gICBjb25zdCB0aXRsZUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUtY2FyZCcpXHJcbi8vICAgdGl0bGVDYXJkLm9ubG9hZCA9ICgpID0+IHtcclxuLy8gICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcbi8vICAgICBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJ1xyXG4vLyAgICAgY29uc29sZS5sb2coY3R4LCBjdHguQ09MT1JfQlVGRkVSX0JJVClcclxuLy8gICB9XHJcbi8vICAgLy8gY3R4LmNsZWFyQ29sb3IoMi4wLCAxLjAsIDQuMCwgMS4wKVxyXG4vLyAgIC8vIGN0eC5jbGVhcihjdHguQ09MT1JfQlVGRkVSX0JJVCk7XHJcbi8vIH0pXHJcblxyXG4vLyBjbGFzcyBDYW52YXMgZXh0ZW5kcyBQdXJlQ29tcG9uZW50IHsgXHJcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuLy8gICAgIHN1cGVyKHByb3BzKVxyXG4vLyAgICAgdGhpcy5jYW52YXNSZWYgPSBjcmVhdGVSZWYoKVxyXG4vLyAgIH1cclxuXHJcblxyXG4vLyAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4vLyAgICAgLy8gRHJhd3MgYSBzcXVhcmUgaW4gdGhlIG1pZGRsZSBvZiB0aGUgY2FudmFzIHJvdGF0ZWRcclxuLy8gICAgIC8vIGFyb3VuZCB0aGUgY2VudHJlIGJ5IHRoaXMucHJvcHMuYW5nbGVcclxuLy8gICAgIC8vIGNvbnN0IHsgYW5nbGUgfSA9IHRoaXMucHJvcHM7XHJcbi8vICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhc1JlZi5jdXJyZW50O1xyXG4vLyAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLyAyXHJcbi8vICAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XHJcbi8vICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuLy8gICAgIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nXHJcbi8vICAgICBjdHguZmlsbFJlY3QoMTAsIDEwLCA1MCwgNTApXHJcbi8vICAgICAvLyBjb25zdCB3aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuLy8gICAgIC8vIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbi8vICAgICAvLyBjdHguc2F2ZSgpO1xyXG4vLyAgICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xyXG4vLyAgICAgLy8gY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuLy8gICAgIC8vIGN0eC50cmFuc2xhdGUod2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcclxuLy8gICAgIC8vIGN0eC5yb3RhdGUoKGFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xyXG4vLyAgICAgLy8gY3R4LmZpbGxTdHlsZSA9ICcjNDM5N0FDJztcclxuLy8gICAgIC8vIGN0eC5maWxsUmVjdCgtd2lkdGggLyA0LCAtaGVpZ2h0IC8gNCwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcclxuLy8gICAgIC8vIGN0eC5yZXN0b3JlKCk7XHJcbi8vICAgfVxyXG5cclxuLy8gICByZW5kZXIoKSB7XHJcbi8vICAgICByZXR1cm4gKFxyXG4vLyAgICAgICA8Y2FudmFzIHJlZj17dGhpcy5jYW52YXNSZWZ9IC8+XHJcbi8vICAgICApXHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5jb25zdCBBcHAgPSAoKSA9PiB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZS1jYXJkJylcclxuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMlxyXG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgLy8gY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nXHJcbiAgICAvLyBjdHguZmlsbFJlY3QoMTAsIDEwLCA1MCwgNTApXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wyJylcclxuICAgIGN0eC5jbGVhckNvbG9yKDIuMCwgMS4wLCA0LjAsIDEuMClcclxuICAgIGN0eC5jbGVhcihjdHguQ09MT1JfQlVGRkVSX0JJVClcclxuICAgIC8vIGN0eC5jbGVhckNvbG9yKDIuMCwgMS4wLCA0LjAsIDEuMClcclxuICAgIC8vIGN0eC5jbGVhcihjdHguQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgfSlcclxuICBcclxuICByZXR1cm4gKFxyXG4gICAgPEZyYWdtZW50PlxyXG4gICAgICA8R2xvYmFsIHN0eWxlcz17Y3NzYCR7ZW1vdGlvblJlc2V0fWB9Lz5cclxuICAgICAgPEdyaWQ+XHJcbiAgICAgICAgPFRpdGxlQ2FyZD5cclxuICAgICAgICAgIHsvKiA8Q2FudmFzIC8+ICovfVxyXG4gICAgICAgICAgPGNhbnZhcyBpZD0ndGl0bGUtY2FyZCcgLz5cclxuICAgICAgICA8L1RpdGxlQ2FyZD5cclxuICAgICAgICA8U3dpdGNoPlxyXG4gICAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy8nIGNvbXBvbmVudD17SG9tZX0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvcm91dGUxJyBjb21wb25lbnQ9e1JvdXRlMX0gLz5cclxuICAgICAgICA8L1N3aXRjaD5cclxuICAgICAgPC9HcmlkPlxyXG4gICAgPC9GcmFnbWVudD5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxyXG4iXX0= */')), __source: {
        fileName: _jsxFileName,
        lineNumber: 94
      }
    }),
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      Grid,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      },
      react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        TitleCard,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 96
          }
        },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('canvas', { id: 'title-card', __source: {
            fileName: _jsxFileName,
            lineNumber: 98
          }
        })
      ),
      react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
        react_router_dom_Switch__WEBPACK_IMPORTED_MODULE_3___default.a,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          }
        },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom_Route__WEBPACK_IMPORTED_MODULE_2___default.a, { exact: true, path: '/', component: components_Home__WEBPACK_IMPORTED_MODULE_6__["default"], __source: {
            fileName: _jsxFileName,
            lineNumber: 101
          }
        }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom_Route__WEBPACK_IMPORTED_MODULE_2___default.a, { exact: true, path: '/route1', component: components_Route1__WEBPACK_IMPORTED_MODULE_7__["default"], __source: {
            fileName: _jsxFileName,
            lineNumber: 102
          }
        })
      )
    )
  );
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/components/Home.js":
/*!********************************!*\
  !*** ./src/components/Home.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = 'C:\\Users\\rchan\\Documents\\nodeplayground\\blue-coin\\client\\src\\components\\Home.js';


// import logo from './koajs-logo.png'

var Home = function Home() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'div',
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      }
    },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"],
      { to: '/route1', __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      },
      'Route1'
    )
  );
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./src/components/Route1.js":
/*!**********************************!*\
  !*** ./src/components/Route1.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled-base */ "@emotion/styled-base");
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = 'C:\\Users\\rchan\\Documents\\nodeplayground\\blue-coin\\client\\src\\components\\Route1.js';




var Wrapper = /*#__PURE__*/_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()('div', {
  target: 'eos9tg70',
  label: 'Wrapper'
})( false ? undefined : {
  name: 'lgj0h8',
  styles: 'display:grid;',
  map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcY29tcG9uZW50c1xcUm91dGUxLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUk2QiIsImZpbGUiOiJzcmNcXGNvbXBvbmVudHNcXFJvdXRlMS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9yY2hhbi9Eb2N1bWVudHMvbm9kZXBsYXlncm91bmQvYmx1ZS1jb2luL2NsaWVudCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnXG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQoJ2RpdicpYFxuICBkaXNwbGF5OiBncmlkO1xuYFxuXG5jb25zdCBHcmlkID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxXcmFwcGVyPlxuICAgICAgPExpbmsgdG89Jy8nPkhvbWU8L0xpbms+XG4gICAgPC9XcmFwcGVyPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdyaWRcbiJdfQ== */'
});

var Grid = function Grid() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    Wrapper,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
      react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"],
      { to: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      },
      'Home'
    )
  );
};

/* harmony default export */ __webpack_exports__["default"] = (Grid);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);


var app = __webpack_require__(/*! ./server */ "./src/server.js").default;

// Use `app#callback()` method here instead of directly
// passing `app` as an argument to `createServer` (or use `app#listen()` instead)
// @see https://github.com/koajs/koa/blob/master/docs/api/index.md#appcallback
var currentHandler = app.callback();
var server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(currentHandler);

server.listen("5000" || false, function (error) {
  if (error) {
    console.log(error);
  }

  console.log('\uD83D\uDE80 started on ' + "localhost" + "5000");
});

if (true) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept(/*! ./server */ "./src/server.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function () {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      var newHandler = __webpack_require__(/*! ./server */ "./src/server.js").default.callback();
      server.removeListener('request', currentHandler);
      server.on('request', newHandler);
      currentHandler = newHandler;
    } catch (error) {
      console.error(error);
    }
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-static */ "koa-static");
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var koa_helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! koa-helmet */ "koa-helmet");
/* harmony import */ var koa_helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(koa_helmet__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var emotion_server__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! emotion-server */ "emotion-server");
/* harmony import */ var emotion_server__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(emotion_server__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = 'C:\\Users\\rchan\\Documents\\nodeplayground\\blue-coin\\client\\src\\server.js';










var assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");

var router = new koa_router__WEBPACK_IMPORTED_MODULE_6___default.a();
router.get('/*', function (ctx, next) {
  var context = {};
  var markup = Object(emotion_server__WEBPACK_IMPORTED_MODULE_8__["renderStylesToString"])(Object(react_dom_server__WEBPACK_IMPORTED_MODULE_7__["renderToString"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
    react_router_dom__WEBPACK_IMPORTED_MODULE_2__["StaticRouter"],
    { context: context, location: ctx.url, __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      }
    },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_0__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      }
    })
  )));
  ctx.state.markup = markup;
  return context.url ? ctx.redirect(context.url) : next();
}, function (ctx) {
  ctx.status = 200;
  ctx.body = '\n    <!doctype html>\n      <html lang="">\n      <head>\n          <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n          <meta charset="utf-8" />\n          <title>Welcome to Razzle + Koa</title>\n          <meta name="viewport" content="width=device-width, initial-scale=1">\n          ' + (assets.client.css ? '<link rel="stylesheet" href="' + assets.client.css + '">' : '') + '\n          ' + ( false ? undefined : '<script src="' + assets.client.js + '" defer crossorigin></script>') + '\n      </head>\n      <body>\n          <div id="root">' + ctx.state.markup + '</div>\n      </body>\n    </html>';
});

var server = new koa__WEBPACK_IMPORTED_MODULE_3___default.a();
server.use(koa_helmet__WEBPACK_IMPORTED_MODULE_5___default()()).use(koa_static__WEBPACK_IMPORTED_MODULE_4___default()("C:\\Users\\rchan\\Documents\\nodeplayground\\blue-coin\\client\\public")).use(router.routes()).use(router.allowedMethods());

/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi razzle-dev-utils/prettyNodeErrors webpack/hot/poll?300 ./src ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! razzle-dev-utils/prettyNodeErrors */"razzle-dev-utils/prettyNodeErrors");
__webpack_require__(/*! webpack/hot/poll?300 */"./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__(/*! C:\Users\rchan\Documents\nodeplayground\blue-coin\client\src */"./src/index.js");


/***/ }),

/***/ "@emotion/core":
/*!********************************!*\
  !*** external "@emotion/core" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@emotion/core");

/***/ }),

/***/ "@emotion/styled-base":
/*!***************************************!*\
  !*** external "@emotion/styled-base" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@emotion/styled-base");

/***/ }),

/***/ "emotion-reset":
/*!********************************!*\
  !*** external "emotion-reset" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("emotion-reset");

/***/ }),

/***/ "emotion-server":
/*!*********************************!*\
  !*** external "emotion-server" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("emotion-server");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-helmet":
/*!*****************************!*\
  !*** external "koa-helmet" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-helmet");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ "razzle-dev-utils/prettyNodeErrors":
/*!****************************************************!*\
  !*** external "razzle-dev-utils/prettyNodeErrors" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("razzle-dev-utils/prettyNodeErrors");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-router-dom/Route":
/*!*****************************************!*\
  !*** external "react-router-dom/Route" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom/Route");

/***/ }),

/***/ "react-router-dom/Switch":
/*!******************************************!*\
  !*** external "react-router-dom/Switch" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom/Switch");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map