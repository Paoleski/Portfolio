opwindow.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("contact-form");
    var button = document.getElementById("submit-btn");
    var status = document.getElementById("status");

    console.log(form, button, status);

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      if (status.classList.contains('error')) {
          status.classList.remove('error');
      }
      button.style = "display: none ";
      status.classList.add('success');
      status.innerHTML = "<p>Thanks for the contact!</p>";
    }

    function error() {
      if (status.classList.contains('success')) {
        status.classList.remove('success');
      }
      status.classList.add('error');
      status.innerHTML = "<p>Oops! There was a problem.</p>";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }