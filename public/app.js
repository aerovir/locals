'use strict';

(async () => {
  const tbody = document.getElementById('locales-tbody');
  const counter = document.querySelector('.counter');
  const searchInput = document.getElementById('search-input');

  try {
    const res = await fetch('/api/locales');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const locales = await res.json();

    // --- Render all rows ---
    const rows = [];

    for (const loc of locales) {
      const tr = document.createElement('tr');

      const values = [
        loc.country,
        loc.flag,
        loc.language,
        loc.currency,
        loc.tld,
      ];

      for (const val of values) {
        const td = document.createElement('td');
        td.textContent = val;
        tr.appendChild(td);
      }

      // Store searchable text for filtering
      tr.dataset.search = [loc.code, loc.language, loc.country]
        .join(' ')
        .toLowerCase();

      rows.push(tr);
    }

    // Append all at once
    tbody.append(...rows);

    // --- Filter ---
    function filter(query) {
      const q = query.toLowerCase().trim();
      let visible = 0;

      for (const tr of rows) {
        const match = q === '' || tr.dataset.search.includes(q);
        tr.style.display = match ? '' : 'none';
        if (match) visible++;
      }

      counter.textContent = q === ''
        ? `${locales.length} locales`
        : `${visible} of ${locales.length} locales`;
    }

    // Initial render
    filter('');

    // Bind search
    searchInput.addEventListener('input', (e) => filter(e.target.value));
  } catch (err) {
    counter.textContent = 'Failed to load locales';
    console.error('Locale Reference: fetch error', err);
  }
})();
