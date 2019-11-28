/* =========================================================
 * bootstrap-timepicker.js
 * http://www.github.com/jdewit/bootstrap-timepicker
 * =========================================================
 * Copyright 2012
 *
 * Created By:
 * Joris de Wit @joris_dewit
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
    var CardTable = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.cardTable.defaults, options, this.$element.data());
        this.total = this.options.total;
        this.columns = this.options.columns;
        console.log(this.columns);
        this.list = this.options.list;
        this.buttons = this.options.buttons;
        this.init();
    };

    CardTable.prototype = {

        constructor: CardTable

        , init: function () {
            this.listRender(this.list);
        }
        , rowRender: function(item) {
            var temp = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"><div class="cardtable">' +
                '<div class="cardheader"><h5>'+item[this.columns.title]+'</h5></div>'+
                '<div class="rows center">';
            this.columns.center.forEach(function (val, num) {
                var center = '';
                if(num%2 ==0){
                    center = '<div class="card_data_left">'+val.title+':'+item[val.field]+'</div>';
                }else {
                    center = '<div class="card_data_right">'+val.title+':'+item[val.field]+'</div>';
                }
                temp = temp + center;
            });
            var foot =
                '</div>'+
                '<div class="cardfooter">';

            var end  = '</div></div>'+
                '</div>';
            var width = 100 / this.buttons.length;
            this.buttons.forEach(function (val, num) {
                var footer = '';
                if (val.img){
                    footer = '<div  style="width: '+width+'%" class="cardfooter_button '+val.code+'">'+
                        '<img class="button_img" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>'+val.title+
                        '</div>';
                } else {
                    footer = '<div style="width: '+width+'%"  class="cardfooter_button '+val.code+'">'+
                        val.title+
                        '</div>';
                }

                foot = foot + footer;
            });
            temp = temp + foot + end;
            return temp;
        }
        , listRender: function (list) {
            var _this = this;
            list.forEach(function (item, index) {
                var widget = $(_this.rowRender(item)).appendTo(_this.$element[0]);
                _this.buttons.forEach(function (val, num) {
                    widget.find('.'+val.code).on('click', function() { val.onClick(item); });
                })
            })
            if(this.list.length > this.total){
                console.log(this.$element.find('.card_pagination'));
            }
        }
        , clearRender: function(e) {
            $(this.$element).html('');
        }
    };


    /* TIMEPICKER PLUGIN DEFINITION
     * =========================== */

    $.fn.cardTable = function (option) {
        return this.each(function () {
            var $this = $(this)
            , data = $this.data('cardTable')
            , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('cardTable', (data = new CardTable(this, options)));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        })
    }

    $.fn.cardTable.defaults = {
    }

    $.fn.cardTable.Constructor = CardTable
}(window.jQuery);
