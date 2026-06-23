'use strict';

(async () => {
  const tbody = document.getElementById('locales-tbody');
  const counter = document.querySelector('.counter');

  try {
    const res = await fetch('/api/locales');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const locales = await res.json();

    // Update counter
    counter.textContent = `${locales.length} locales`;

    // Build table rows
    const fragment = document.createDocumentFragment();

    for (const loc of locales) {
      const tr = document.createElement('tr');

      const cells = [
        loc.country,
        loc.flag,
        loc.language,
        loc.currency,
        loc.tld,
      ];

      for (const val of cells) {
        const td = document.createElement('td');
        td.textContent = val;
        tr.appendChild(td);
      }

      fragment.appendChild(tr);
    }

    tbody.appendChild(fragment);
  } catch (err) {
    counter.textContent = 'Failed to load locales';
    console.error('Locale Reference: fetch error', err);
  }
})();
