'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Bla bla bla causality bla bla
 */

var Session = function (self) {

	self.user = '';
	self.type = '';
	self.token = '';

	return {

		getUsername : function () {

			return self.user;
		},

		init: function (data) {

			data = new window.Identificable( data.split('|') );

			try {

				self.user = atob( data.name );
				self.type = 'admin';//FIXME for display certains modules
				self.token = atob( data.id );
				window.setCookie('session', data.id + '|' + data.name );

				return true;
			}
			catch (e) {
			}

			return false;
		},

		destroy : function () {//rename to destroy

			self.user = '';
			self.type = '';
			self.token = '';

			window.setCookie('session', '', 7);
		},

		validate : function () {

			//TODO validate from server
			if ( (self.token + self.type + self.user) === '' ) {

				var cookie = window.getCookie('session');

				if ( cookie !== '' ) {

					this.destroy();
					this.init(cookie);
					return this.validate();
				}
			}
			else {

				return true;
			}

			return false;
		}
	};
};

Session = new Session({});