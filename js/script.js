(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setNav(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) setNav(false);
  });

  // Highlight the current section in the nav
  var links = nav.querySelectorAll('a');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { observer.observe(s); });
  }

  // Project filters
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.project-card');
  var emptyNote = document.getElementById('emptyNote');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      var shown = 0;
      cards.forEach(function (card) {
        var match = f === 'all' || card.getAttribute('data-category').split(' ').indexOf(f) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });
      emptyNote.hidden = shown !== 0;
    });
  });

  // Contact form
  var form = document.getElementById('contactForm');
  var statusEl = document.getElementById('formStatus');
  var sendBtn = document.getElementById('sendBtn');
  var nextInput = document.getElementById('nextUrl');
  var endpoint = 'https://formsubmit.co/ajax/eliyabujilima9@gmail.com';

  // FormSubmit needs a full address for the redirect used when JavaScript is off
  if (location.protocol.indexOf('http') === 0) {
    nextInput.value = new URL('thank-you.html', location.href).href;
  }

  function setError(id, msg) {
    var input = document.getElementById(id);
    var err = document.getElementById(id + 'Error');
    err.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  function validate() {
    var v = function (id) { return document.getElementById(id).value.trim(); };
    var ok = true;
    ok = setError('name', v('name') ? '' : 'Enter your full name.') && ok;
    var email = v('email');
    var emailMsg = !email ? 'Enter your email address.' :
      (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? '' : 'Enter a valid email address, for example name@example.com.');
    ok = setError('email', emailMsg) && ok;
    ok = setError('subject', v('subject') ? '' : 'Enter a subject.') && ok;
    ok = setError('message', v('message') ? '' : 'Write a message.') && ok;
    return ok;
  }

  function showStatus(type, text) {
    statusEl.className = 'form-status ' + (type ? 'is-' + type : '');
    statusEl.textContent = text;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    showStatus('', '');

    if (!validate()) {
      var firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
      return;
    }

    // Honeypot filled: almost certainly a bot, stop quietly
    if (form.elements['_honey'].value) return;

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok, data: data }; });
      })
      .then(function (r) {
        // Only report success when FormSubmit confirms it
        if (r.ok && (r.data.success === true || r.data.success === 'true')) {
          window.location.href = 'thank-you.html';
        } else {
          throw new Error((r.data && r.data.message) || 'Not confirmed');
        }
      })
      .catch(function () {
        showStatus('error', 'Your message was not sent. Check your connection and try again, or email eliyabujilima9@gmail.com directly.');
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send message';
      });
  });
})();
