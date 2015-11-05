var bender;
(function (bender) {
  'use strict';

  function init() {
    register();
    condigureColorPick();

    var socket = io.connect('http://ederson.jelasticlw.com.br/');
    readSocketTemperature(socket);
    readSocketLuminosity(socket);
    readSocketFan(socket);
  }
  bender.init = init;

  function readSocketTemperature(socket) {
    socket.on('sensors/temperature', function (data) {
      $('#temperature').text(data.value + 'ºC');
    });
  }

  function readSocketLuminosity(socket) {
    socket.on('sensors/luminosity', function (data) {
      var val = (parseInt(data.value) / 1023) * 100;
      val = val.toFixed(0);
      $('#luminosity').text(val + ' %');
    });
  }

  function readSocketFan(socket) {
    socket.on('sensors/socket/1', function (data) {
      if (data.value == 'true') {
        $('.socket_1').addClass('verde');
        $('.socket_1').removeClass('vermelho');
      } else {
        $('.socket_1').addClass('vermelho');
        $('.socket_1').removeClass('verde');
      }
      $('#socket_1_state').data('state', data.value);
    });
  }

  function register() {
    $('.luminosity').on({click: luminosity});
    $('.off_all').on({click: offAll});
    $('.socket').on({click: toggleSocketState});
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

  function toggleSocketState() {
    var val       = $(this).data('state');
    var id        = $(this).data('socket');
    var sendValue = !(val == 'true');
    var uri       = '/api/sockets/' + id;
    var data      = JSON.stringify({ data: sendValue });

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
