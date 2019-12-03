/* =========================================================
 * dropdown.js
 * https://github.com/jiaochenxi/JQComponent/dropdown
 * =========================================================
 * Copyright 2019
 *
 * Created By:
 * Jiao chenxi
 *
 * Improved By:
 * Keenthemes for Bootstrap 3.0 Support
 *
 * Contributions By:
 * Gilbert @mindeavor
 * Koen Punt info@koenpunt.nl
 * Nek
 * Chris Martin
 * Dominic Barnes contact@dominicbarnes.us
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function($) {

    "use strict"; // jshint ;_;

    /* TIMEPICKER PUBLIC CLASS DEFINITION
     * ================================== */
    var Dropdown = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.dropdown.defaults, options, this.$element.data());
        this.callback = this.options.callback;
        this.dropMenuEle = null;
        this.init();
    };

    Dropdown.prototype = {

        constructor: Dropdown

        , init: function () {
            this.eleRender();
            var self = this;
            this.$element.find('button').on('click', function(e){
                self.clickItem(e, self)
            });
            this.callback();
            $(window).on('resize', function(e){
                self.rePos(e, self);
            });
        }, eleRender: function() {
            var pEle = $('<div></div>').appendTo($('body'));
            pEle.css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                display: 'none',
                zIndex: 999,
            });
            var dropMenu = this.$element.find('.dropdown-menu').clone().appendTo(pEle);
            this.dropMenuEle = pEle;
            this.$element.find('.dropdown-menu').remove();
            pEle.on('click',function(){
                $(this).hide();
            });
            dropMenu.on('click',function(e){
                e.stopPropagation();
            });
        }, clickItem: function(e, self) {
            e.stopPropagation();
            var btn = self.$element.find('button');
            var x = btn.offset().left;
            var y = btn.offset().top;
            self.dropMenuEle.find('.dropdown-menu').css({
                left: x,
                top: y + btn.height(),
            });
            self.dropMenuEle.show();
        }, rePos: function(e, self) {
            if(self.dropMenuEle.css('display') === 'none') return;
            var btn = self.$element.find('button');
            var x = btn.offset().left;
            var y = btn.offset().top;
            self.dropMenuEle.find('.dropdown-menu').css({
                left: x,
                top: y + btn.height(),
            });
        },
    };


    /* TIMEPICKER PLUGIN DEFINITION
     * =========================== */

    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this)
            , data = $this.data('dropdown')
            , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('dropdown', (data = new Dropdown(this, options)));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        })
    }

    $.fn.dropdown.defaults = {
        callback: function(){}
    }

    $.fn.dropdown.Constructor = Dropdown
}(window.jQuery);
