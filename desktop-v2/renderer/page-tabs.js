/* Extracted from renderer/index.html. Handles tab switching and small UI sync only. */
document.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();

      // ── Tab indicator animation ───────────────────────────
      function moveTabIndicator(tabEl) {
        const indicator = document.getElementById('tabs-indicator');
        if (!indicator || !tabEl) return;
        const header = tabEl.closest('.tabs-header');
        if (!header) return;
        const headerRect = header.getBoundingClientRect();
        const tabRect   = tabEl.getBoundingClientRect();
        indicator.style.width = tabRect.width + 'px';
        indicator.style.left  = (tabRect.left - headerRect.left) + 'px';
      }

      // ── Tab Switcher ──────────────────────────────────────
      const tabs = document.querySelectorAll('.tab-btn');
      const panels = {
        'tab-content-slides':   document.getElementById('tab-content-slides'),
        'tab-content-text':     document.getElementById('tab-content-text'),
        'tab-content-audio':    document.getElementById('tab-content-audio'),
        'tab-content-generate': document.getElementById('tab-content-generate'),
      };
      const panelDisplayMode = {
        'tab-content-slides':   'flex',
        'tab-content-text':     'block',
        'tab-content-audio':    'block',
        'tab-content-generate': 'flex',
      };

      const showTabPanel = (target) => {
        Object.entries(panels).forEach(([id, panel]) => {
          if (!panel) return;
          panel.style.display = id === target ? panelDisplayMode[id] : 'none';
        });
        if (target === 'tab-content-slides') {
          requestAnimationFrame(() => {
            const slidesList = document.getElementById('slides-list');
            if (slidesList) {
              slidesList.style.overflowY = 'auto';
              slidesList.style.minHeight = '0';
            }
          });
        }
      };

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          moveTabIndicator(tab);
          const target = tab.getAttribute('data-target');
          showTabPanel(target);
          if (target === 'tab-content-generate' && typeof updatePromptInspector === 'function') {
            updatePromptInspector();
          }
        });
      });

      // Position indicator on load (after layout is ready)
      requestAnimationFrame(() => {
        const activeTab = document.querySelector('.tab-btn.active');
        moveTabIndicator(activeTab);
      });

      // ── Effect checkboxes (piano keys) ───────────────────
      document.querySelectorAll('.effect-checkbox').forEach(chk => {
        chk.addEventListener('change', (e) => {
          const label = e.target.nextElementSibling;
          if (!label) return;
          if (e.target.checked) {
            label.style.color = 'var(--accent)';
            label.style.fontWeight = 'bold';
          } else {
            label.style.color = '';
            label.style.fontWeight = '';
          }
        });
        // Sync initial checked state
        if (chk.checked) {
          const label = chk.nextElementSibling;
          if (label) { label.style.color = 'var(--accent)'; label.style.fontWeight = 'bold'; }
        }
      });
    });
