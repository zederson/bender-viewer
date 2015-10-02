var bender;
(function (bender) {
  'use strict';

  function init() {
    register();
    condigureColorPick();

    var socket = io.connect('http://ederson.jelasticlw.com.br/');
    socket.on('sensors/temperature', function (data) {
      $('#temperature').text(data.value + 'ºC');
    });

    socket.on('sensors/luminosity', function (data) {
      var val = (parseInt(data.value) / 1023) * 100;
      val = val.toFixed(0);
      $('#luminosity').text(val + ' %');
    });
  }
  bender.init = init;

  function register() {
    $('.luminosity').on({click: luminosity});
    $('.off_all').on({click: offAll});
  }

  function bulb() {
    var color  = $('#bulb_target').val();
    var target = $('#bulb_target').data('target');

    var uri    = '/api/bulb';
    var data = JSON.stringify({lamp: target, color: color});

    $.ajax({
          url: uri,
          type: 'PUT',
          data: data,
          contentType: "application/json",
          dataType: 'json'
    });

    $('#bulb_target').val('');
    $('#bulb_target').data('target', '');
  }

  function offAll() {
    var uri    = '/api/luminosity/off_all';
    var data = JSON.stringify({});

    $.ajax({
          url: uri,
          type: 'PUT',
          data: data,
          contentType: "application/json",
          dataType: 'json'
    });
  }

  function luminosity() {
    var val  = $(this).data('value');
    var uri  = '/api/luminosity';
    var data = JSON.stringify({data: val});

    $.ajax({
          url: uri,
          type: 'PUT',
          data: data,
          contentType: "application/json",
          dataType: 'json'
    });
  }

  function condigureColorPick() {
    window.myColorPicker = $('.color').colorPicker({
        buildCallback: function($elm) {
          $elm.prepend('<div class="go-bulb"> <input type="button" class="trigger-bulb btn btn-primary" value="Aplicar">  </div>');
          $('.trigger-bulb').on({click: bulb});
        },
        cssAddon:
            '.cp-xy-slider {width:200px; height:200px;}' +
            '.cp-xy-cursor {width:16px; height:16px; border-width:2px; margin:-8px}' +
            '.cp-z-slider {height:200px; width:40px;}' +
            '.cp-z-cursor {border-width:8px; margin-top:-8px;}' +
            '.cp-alpha {height:40px;}' +
            '.cp-alpha-cursor {border-width:8px; margin-left:-8px;}',

        renderCallback: function($elm, toggled) {
            var colors = this.color.colors;

            var color = '#' + colors.HEX;
            $($elm.context).attr('style', '');
            $('#bulb_target').val(color);
            $('#bulb_target').data('target', $elm.context.id);
        }
    });
  }
})(bender || (bender = {}));

bender.init();
