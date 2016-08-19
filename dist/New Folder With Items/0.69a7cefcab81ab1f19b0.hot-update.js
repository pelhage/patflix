webpackHotUpdate(0,{

/***/ 474:
/*!*************************************!*\
  !*** ./src/js/components/header.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(/*! ./~/react-hot-loader/~/react-hot-api/modules/index.js */ 3), RootInstanceProvider = __webpack_require__(/*! ./~/react-hot-loader/RootInstanceProvider.js */ 11), ReactMount = __webpack_require__(/*! react/lib/ReactMount */ 13), React = __webpack_require__(/*! react */ 79); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 79);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 210);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 184);
	
	var _actions = __webpack_require__(/*! ../actions */ 475);
	
	var actions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Header = function (_Component) {
	  _inherits(Header, _Component);
	
	  function Header() {
	    _classCallCheck(this, Header);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
	  }
	
	  _createClass(Header, [{
	    key: 'authButton',
	    value: function authButton() {
	      if (this.props.authenticated) {
	        return _react2.default.createElement(
	          _reactRouter.Link,
	          { to: '/signout', className: 'nav__item' },
	          'Sign Out'
	        );
	      }
	      return [_react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/about', className: 'nav__item' },
	        'About Patflix'
	      ), _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/signin', className: 'nav__item' },
	        'Sign In'
	      ), _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/signup', className: 'nav__item' },
	        'Sign Up'
	      )];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'nav',
	        { className: 'nav' },
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { to: '/', className: 'nav__item nav__item--brand' },
	          'PATFLIX'
	        ),
	        _react2.default.createElement(
	          'span',
	          { className: 'nav__item--pull-right' },
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/dashboard', className: 'nav__item' },
	            'Create Library!'
	          ),
	          this.authButton()
	        )
	      );
	    }
	  }]);
	
	  return Header;
	}(_react.Component);
	
	function mapStateToProps(state) {
	  return { authenticated: state.auth.authenticated };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, actions)(Header);
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(/*! ./~/react-hot-loader/makeExportsHot.js */ 275); if (makeExportsHot(module, __webpack_require__(/*! react */ 79))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "header.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../~/webpack/buildin/module.js */ 2)(module)))

/***/ }

})
//# sourceMappingURL=0.69a7cefcab81ab1f19b0.hot-update.js.map