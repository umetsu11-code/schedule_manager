// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import 'stylesheets/application'
import 'bootstrap/dist/css/bootstrap'
import 'bootstrap'
import $ from 'jquery';
global.$ = $;

// CSRFトークンの設定
$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

// Turbolinksがロードされたときに実行する
document.addEventListener('turbolinks:load', () => {
  console.log('Hello, Webpack with jQuery and Bootstrap!');

  $('.delete-link').on('click', function(event) {
    event.preventDefault();
    const eventId = $(this).data('id');
    $('#delete-modal').data('eventId', eventId).show();
  });

  $('#confirm-delete').on('click', function() {
    const eventId = $('#delete-modal').data('eventId');
    $.ajax({
      url: `/events/${eventId}`,
      type: 'DELETE',
      success: function() {
        window.location.href = '/events';
      },
      error: function() {
        alert('削除に失敗しました。');
      }
    });
  });

  $('#cancel-delete').on('click', function() {
    $('#delete-modal').hide();
  });
});
