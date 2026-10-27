/**
 * dewDrive — Apple-Grade Interaction & Framer Motion Engine
 * Kinetic Text Reveal, Parallax Liquid-Glass Glow, Live Backup Simulator,
 * FastCDC Visualizer, Storage Calculator 2.0, dewRewind Scrubber,
 * Benchmark Bar Animator, Terminal Tabs, ⌘K Command Palette, and macOS Toasts.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Apple-Style Dynamic Scroll Progress
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scroll-progress');
  
  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0 && scrollProgressBar) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();


  /* ==========================================================================
     2. Framer-Motion-Grade Kinetic Text Reveal Engine
     ========================================================================== */
  const textRevealElements = document.querySelectorAll('[data-animate="text-reveal"]');

  textRevealElements.forEach(el => {
    const text = el.innerText.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map((word, idx) => {
      const delay = idx * 55;
      return `<span class="reveal-wrap"><span class="reveal-word" style="transition-delay: ${delay}ms">${word}</span></span>`;
    }).join(' ');
  });

  // IntersectionObserver for elements with [data-animate]
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const entranceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Trigger word reveal if present
        const words = entry.target.querySelectorAll('.reveal-word');
        words.forEach(w => w.classList.add('revealed'));

        // If benchmark section, trigger bar animations
        if (entry.target.classList.contains('benchmark-section')) {
          animateBenchmarkBars();
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => entranceObserver.observe(el));


  /* ==========================================================================
     3. Apple Liquid Glass & Mouse Specular Highlight Tracking
     ========================================================================== */
  const glowCards = document.querySelectorAll('.apple-glow-card, .apple-tilt-card, .arch-card, .pricing-card, .pillar-card, .bench-card, .mac-window');

  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotX = -((y / rect.height) - 0.5) * 8;
      const rotY = ((x / rect.width) - 0.5) * 8;
      card.style.setProperty('--rot-x', `${rotX.toFixed(2)}deg`);
      card.style.setProperty('--rot-y', `${rotY.toFixed(2)}deg`);
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rot-x', '0deg');
      card.style.setProperty('--rot-y', '0deg');
    });
  });


  /* ==========================================================================
     4. Native macOS Toast Notification Engine
     ========================================================================== */
  let toastContainer = document.querySelector('.mac-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'mac-toast-container';
    document.body.appendChild(toastContainer);
  }

  function showMacToast(title, message, iconType = 'success') {
    const toast = document.createElement('div');
    toast.className = 'mac-toast';
    toast.innerHTML = `
      <div class="toast-icon ${iconType}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="toast-content">
        <div class="toast-content-title">${title}</div>
        <div class="toast-content-msg">${message}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }


  /* ==========================================================================
     5. Hero Live Backup Simulator Engine
     ========================================================================== */
  const btnSimulate = document.getElementById('btn-simulate-backup');
  const heroStatusPill = document.getElementById('hero-vault-status');
  const heroMetricStored = document.getElementById('hero-metric-stored');
  const heroMetricDedup = document.getElementById('hero-metric-dedup');
  const heroRecentList = document.querySelector('.snapshot-recent-list');

  let isSimulating = false;

  if (btnSimulate) {
    btnSimulate.addEventListener('click', (e) => {
      e.preventDefault();
      if (isSimulating) return;
      isSimulating = true;

      btnSimulate.classList.add('running');
      btnSimulate.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
        <span>Hashing NVMe (1.42 GB/s)...</span>
      `;

      if (heroStatusPill) {
        heroStatusPill.innerHTML = `<span class="pulse-warning"></span> Ingesting 14,210 files...`;
      }

      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step === 1) {
          if (btnSimulate) btnSimulate.querySelector('span').textContent = 'FastCDC Chunking & ZSTD...';
        } else if (step === 2) {
          if (btnSimulate) btnSimulate.querySelector('span').textContent = 'Argon2id Encrypting to S3...';
        } else if (step === 3) {
          clearInterval(interval);
          isSimulating = false;

          btnSimulate.classList.remove('running');
          btnSimulate.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Simulate Live Backup</span>
          `;

          if (heroStatusPill) {
            heroStatusPill.innerHTML = `<span class="pulse-emerald"></span> Verified just now (0 bit-rot)`;
          }

          if (heroMetricStored) heroMetricStored.textContent = '644.2 GB';
          if (heroMetricDedup) heroMetricDedup.textContent = '58.4%';

          // Prepend new snapshot row
          if (heroRecentList) {
            const newRow = document.createElement('div');
            newRow.className = 'snapshot-row';
            newRow.style.animation = 'fade-slide-down 0.4s ease';
            newRow.innerHTML = `
              <span class="s-id">#901c8fa</span>
              <span class="s-name">~/Developer, Photos.photoslibrary (Live Snapshot)</span>
              <span class="s-time">Just now</span>
              <span class="s-status success">Encrypted & Locked</span>
            `;
            heroRecentList.insertBefore(newRow, heroRecentList.firstChild);
          }

          showMacToast('Snapshot #901c8fa Complete', 'Client-side encrypted with AES-256-GCM. 1.8 GB deduplicated, S3 Object Lock active.');
        }
      }, 900);
    });
  }


  /* ==========================================================================
     6. Interactive FastCDC Engine Comparison Visualizer
     ========================================================================== */
  const engineTabBtns = document.querySelectorAll('.engine-tab-btn');
  const visStream = document.getElementById('vis-stream');
  const visMetaSub = document.getElementById('vis-meta-sub');
  const visBadge = document.getElementById('vis-badge');
  const visLegend = document.getElementById('vis-legend');

  const engineModes = {
    'whole-file': {
      meta: 'Target file: 50.0 GB 8K ProRes Video (2 MB color grade edit applied)',
      badgeClass: 'danger',
      badgeText: '50,000 MB re-uploaded (0% savings)',
      legendText: 'Traditional backup software has no chunk awareness: changing a 2MB metadata tag forces a full 50GB re-upload.',
      renderChunks: () => `
        <div class="vis-chunk modified" style="flex: 10;">Modified File (50 GB re-upload required)</div>
      `
    },
    'fixed-chunk': {
      meta: 'Target file: 50.0 GB 8K ProRes Video (4 MB fixed-size chunks)',
      badgeClass: 'warning',
      badgeText: '152 MB re-uploaded (Partial savings)',
      legendText: 'Fixed 4MB chunk boundaries shift when bytes are inserted at start: following chunks lose their cryptographic alignment.',
      renderChunks: () => `
        <div class="vis-chunk cached">4MB</div>
        <div class="vis-chunk cached">4MB</div>
        <div class="vis-chunk modified">Shift</div>
        <div class="vis-chunk modified">Shift</div>
        <div class="vis-chunk modified">Shift</div>
        <div class="vis-chunk modified">Shift</div>
        <div class="vis-chunk modified">Shift</div>
        <div class="vis-chunk modified">Shift</div>
      `
    },
    'fastcdc': {
      meta: 'Target file: 50.0 GB 8K ProRes Video (dewDrive FastCDC with Rabin Fingerprinting)',
      badgeClass: 'success',
      badgeText: '2.1 MB uploaded (99.6% saved)',
      legendText: 'FastCDC detects content-defined boundaries. Only the exact modified chunk is uploaded; remaining 49.98 GB referenced from cache.',
      renderChunks: () => `
        <div class="vis-chunk cached">Cached (4MB)</div>
        <div class="vis-chunk cached">Cached (8MB)</div>
        <div class="vis-chunk dew-fastcdc">Edited (2.1MB)</div>
        <div class="vis-chunk cached">Cached (4MB)</div>
        <div class="vis-chunk cached">Cached (6MB)</div>
        <div class="vis-chunk cached">Cached (8MB)</div>
        <div class="vis-chunk cached">Cached (4MB)</div>
        <div class="vis-chunk cached">Cached (4MB)</div>
      `
    }
  };

  engineTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      engineTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.engine;
      const data = engineModes[mode];
      if (!data) return;

      if (visMetaSub) visMetaSub.textContent = data.meta;
      if (visBadge) {
        visBadge.className = `vis-summary-badge ${data.badgeClass}`;
        visBadge.textContent = data.badgeText;
      }
      if (visLegend) visLegend.textContent = data.legendText;
      if (visStream) visStream.innerHTML = data.renderChunks();
    });
  });


  /* ==========================================================================
     7. Interactive Storage Economics & Savings Calculator 2.0
     ========================================================================== */
  const storageSlider = document.getElementById('storage-slider');
  const storageSizeLabel = document.getElementById('storage-size-label');
  const tradCostVal = document.getElementById('trad-cost-val');
  const dewCostVal = document.getElementById('dew-cost-val');
  const savingsTag = document.getElementById('savings-tag');
  const presetBtns = document.querySelectorAll('.calc-preset-btn');
  const providerBtns = document.querySelectorAll('.provider-pill-opt');

  let currentRatePerGB = 0.0059; // Wasabi default ($5.99/TB)
  let currentProviderName = 'Wasabi';

  const providerRates = {
    'wasabi': { rate: 0.0059, name: 'Wasabi' },
    'b2': { rate: 0.006, name: 'Backblaze B2' },
    'r2': { rate: 0.015, name: 'Cloudflare R2' },
    's3': { rate: 0.023, name: 'AWS S3 Standard' },
    'nas': { rate: 0.000, name: 'Local NAS ($0/mo)' }
  };

  function updateCalculator(gb) {
    const formattedGB = gb >= 1000 
      ? `${(gb / 1000).toFixed(gb % 1000 === 0 ? 0 : 1)} TB (${gb.toLocaleString()} GB)`
      : `${gb} GB`;

    if (storageSizeLabel) {
      storageSizeLabel.textContent = formattedGB;
    }

    // Traditional Proprietary Markup:
    let tradAnnual = 0;
    if (gb <= 500) tradAnnual = 120;
    else if (gb <= 2000) tradAnnual = 240;
    else if (gb <= 5000) tradAnnual = 480;
    else if (gb <= 10000) tradAnnual = 960;
    else tradAnnual = Math.round((gb / 1000) * 110);

    // dewDrive + Raw S3 with FastCDC 50% average deduplication:
    const storedGB = gb * 0.5;
    const rawMonthly = storedGB * currentRatePerGB;
    const dewAnnual = Math.max(12, Math.round(rawMonthly * 12));

    const annualSaved = Math.max(0, tradAnnual - dewAnnual);
    const percentSaved = Math.round((annualSaved / tradAnnual) * 100);
    const fiveYearSaved = annualSaved * 5;

    if (tradCostVal) tradCostVal.innerHTML = `$${tradAnnual}<span class="period">/year</span>`;
    if (dewCostVal) dewCostVal.innerHTML = `$${dewAnnual}<span class="period">/year</span>`;
    if (savingsTag) {
      savingsTag.innerHTML = `You save <strong>$${annualSaved} / year</strong> (${percentSaved}% savings) · 5-Year Savings: <strong>$${fiveYearSaved.toLocaleString()}</strong>`;
    }
  }

  if (storageSlider) {
    storageSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      presetBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.preset, 10) === val);
      });
      updateCalculator(val);
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const gb = parseInt(btn.dataset.preset, 10);
      if (storageSlider) storageSlider.value = gb;
      updateCalculator(gb);
    });
  });

  providerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      providerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.provider;
      if (providerRates[key]) {
        currentRatePerGB = providerRates[key].rate;
        currentProviderName = providerRates[key].name;
        if (storageSlider) updateCalculator(parseInt(storageSlider.value, 10));
      }
    });
  });

  if (storageSlider) {
    updateCalculator(parseInt(storageSlider.value, 10));
  }


  /* ==========================================================================
     8. Transparent Pricing Billing Switcher (Perpetual vs Team Fleet)
     ========================================================================== */
  const pricingSwitchBtn = document.getElementById('pricing-switch-btn');
  const togglePerpetual = document.getElementById('toggle-perpetual');
  const toggleTeam = document.getElementById('toggle-team');

  const pricePersonal = document.getElementById('price-personal');
  const periodPersonal = document.getElementById('period-personal');
  const notePersonal = document.getElementById('note-personal');

  const priceStudio = document.getElementById('price-studio');
  const periodStudio = document.getElementById('period-studio');
  const noteStudio = document.getElementById('note-studio');

  const priceTeam = document.getElementById('price-team');
  const periodTeam = document.getElementById('period-team');
  const noteTeam = document.getElementById('note-team');

  let isTeamMode = false;

  function setPricingMode(teamMode) {
    isTeamMode = teamMode;

    if (pricingSwitchBtn) pricingSwitchBtn.classList.toggle('active', isTeamMode);
    if (togglePerpetual) togglePerpetual.classList.toggle('active', !isTeamMode);
    if (toggleTeam) toggleTeam.classList.toggle('active', isTeamMode);

    if (isTeamMode) {
      if (pricePersonal) pricePersonal.textContent = '4';
      if (periodPersonal) periodPersonal.textContent = '/ device / mo';
      if (notePersonal) notePersonal.textContent = 'Billed annually · Single device MDM profile';

      if (priceStudio) priceStudio.textContent = '8';
      if (periodStudio) periodStudio.textContent = '/ device / mo';
      if (noteStudio) noteStudio.textContent = 'Billed annually · Includes 24/7 NVMe SMART telemetry';

      if (priceTeam) priceTeam.textContent = '14';
      if (periodTeam) periodTeam.textContent = '/ seat / mo';
      if (noteTeam) noteTeam.textContent = 'Billed annually · Minimum 5 seats · Dedicated support';
    } else {
      if (pricePersonal) pricePersonal.textContent = '49';
      if (periodPersonal) periodPersonal.textContent = '/ one-time';
      if (notePersonal) notePersonal.textContent = 'Perpetual license · 1 Mac · 1 year updates';

      if (priceStudio) priceStudio.textContent = '89';
      if (periodStudio) periodStudio.textContent = '/ one-time';
      if (noteStudio) noteStudio.textContent = 'Perpetual license · 3 Macs · Priority updates';

      if (priceTeam) priceTeam.textContent = '18';
      if (periodTeam) periodTeam.textContent = '/ seat / mo';
      if (noteTeam) noteTeam.textContent = 'Billed annually · Min 5 seats · Fleet dashboard';
    }
  }

  if (pricingSwitchBtn) {
    pricingSwitchBtn.addEventListener('click', () => setPricingMode(!isTeamMode));
  }
  if (togglePerpetual) togglePerpetual.addEventListener('click', () => setPricingMode(false));
  if (toggleTeam) toggleTeam.addEventListener('click', () => setPricingMode(true));


  /* ==========================================================================
     9. Sticky Narrative Chapter Scroller Observer
     ========================================================================== */
  const narrativeSteps = document.querySelectorAll('.narrative-step-card');
  const pipeNodes = document.querySelectorAll('.pipe-node');

  if (narrativeSteps.length > 0) {
    const narrativeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          narrativeSteps.forEach(s => s.classList.remove('active'));
          entry.target.classList.add('active');

          const stepIndex = entry.target.dataset.step;
          pipeNodes.forEach((node, idx) => {
            node.classList.toggle('highlight-pipe', idx.toString() === stepIndex);
          });
        }
      });
    }, { threshold: 0.6 });

    narrativeSteps.forEach(step => narrativeObserver.observe(step));
  }


  /* ==========================================================================
     10. Apple Silicon Performance Benchmark Bars Animation
     ========================================================================== */
  function animateBenchmarkBars() {
    const bars = document.querySelectorAll('.bench-bar-fill');
    bars.forEach(bar => {
      const targetWidth = bar.dataset.width || '100%';
      bar.style.width = targetWidth;
    });
  }


  /* ==========================================================================
     11. Interactive Developer CLI Terminal Tabs
     ========================================================================== */
  const cliTabs = document.querySelectorAll('.cli-tab-btn');
  const cliBody = document.getElementById('cli-body');

  const cliOutputs = {
    'status': `<span class="cmd-prompt">$</span> <span class="cmd-run">dew status --json</span>
<span class="cmd-out">{
  "daemon": "active",
  "engine": "Kopia-v0.15-arm64",
  "secure_enclave": "enabled (Argon2id)",
  "active_vaults": 3,
  "snapshots_total": 342,
  "last_backup": "4m ago (verified SHA-256)",
  "nvme_smart_health": "100% nominal (0 bad sectors)"
}</span>`,
    'snapshot': `<span class="cmd-prompt">$</span> <span class="cmd-run">dew snapshot create ~/Documents ~/Developer --encrypt=AES-256-GCM</span>
<span class="cmd-out">[INGEST] Scanning 18,410 APFS files via FSEvents...
[FASTCDC] Sliced into 2,419 semantic chunks (average 4.1 MB)
[DEDUP] 1,984 chunks recognized in local Rabin index (82.0% ratio)
[ENCRYPT] Derived Argon2id key in Secure Enclave. Uploading 435 new packfiles.
[SUCCESS] Snapshot #901c8fa committed with S3 Object Lock (Compliance mode).</span>`,
    'restore': `<span class="cmd-prompt">$</span> <span class="cmd-run">dew restore #8914ba2 ~/Developer/xcode-project --target=/tmp/Recovery</span>
<span class="cmd-out">[RESOLVE] Fetching packfile manifests from s3.wasabisys.com...
[DECRYPT] Decrypted 324 blocks locally in RAM.
[WRITE] Restored 4,112 files in 0.42 seconds (1.42 GB/s NVMe write speed).
[VERIFY] Zero collisions. Verified against cryptographic blake3 hash.</span>`,
    'verify': `<span class="cmd-prompt">$</span> <span class="cmd-run">dew scrub --deep-verify --detect-bitrot</span>
<span class="cmd-out">[SCRUB] Reading 642.1 GB across all connected S3 and Thunderbolt volumes...
[NVMe] Internal Apple Silicon NVMe wear: 4% TBW. Temp: 34°C.
[INTEGRITY] Checked 48,219 packfile hashes against BLAKE3 index.
[RESULT] 0 corrupted blocks. 0 bit-rot detected. All repositories 100% healthy.</span>`
  };

  cliTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      cliTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const action = tab.dataset.cmd;
      if (cliBody && cliOutputs[action]) {
        cliBody.innerHTML = cliOutputs[action];
      }
    });
  });


  /* ==========================================================================
     12. Feature Tabs (Showcase Section: Protect, Recover, Monitor)
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.feature-tab-btn');
  const panels = document.querySelectorAll('.feature-panel');

  function switchTab(tabId) {
    tabButtons.forEach(btn => {
      const isSelected = btn.dataset.tab === tabId;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    panels.forEach(panel => {
      const isMatch = panel.id === `panel-${tabId}`;
      panel.classList.toggle('active', isMatch);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });


  /* ==========================================================================
     13. dewRewind Point-in-time Snapshot Scrubber
     ========================================================================== */
  const rewindSlider = document.getElementById('rewind-slider');
  const scrubberTimestamp = document.getElementById('scrubber-timestamp');
  const rewindStatusTag = document.getElementById('rewind-status-tag');
  const rewindFileList = document.getElementById('rewind-file-list');
  const rewindTicks = document.querySelectorAll('.timeline-ticks .tick');

  const snapshotDatabase = [
    {
      timestamp: '14 Sep 2026, 09:15 AM',
      tag: 'Initial commit of Audio Core v1.0',
      files: [
        { name: 'SynthesizerEngine.swift', size: '24 KB', mod: 'Created' },
        { name: 'AudioUnitBridge.metal', size: '142 KB', mod: 'Added' },
        { name: 'Assets.car', size: '14.2 MB', mod: 'Original bundle' }
      ]
    },
    {
      timestamp: '15 Sep 2026, 04:30 PM',
      tag: 'Before accidental deletion of Figma exports',
      files: [
        { name: 'AppIcon-macOS.iconset', size: '18.4 MB', mod: 'Intact' },
        { name: 'UI-ThemeTokens.json', size: '8 KB', mod: 'Modified' },
        { name: 'Documentation.pdf', size: '4.1 MB', mod: 'Draft v1' }
      ]
    },
    {
      timestamp: '16 Sep 2026, 11:45 PM',
      tag: 'State before major design system refactor',
      files: [
        { name: 'DesignTokens.css', size: '48 KB', mod: 'Clean state' },
        { name: 'MainInterface.storyboard', size: '3.4 MB', mod: 'Pre-breakage' },
        { name: 'AppMetadata.plist', size: '12 KB', mod: 'Signed' }
      ]
    },
    {
      timestamp: '17 Sep 2026, 02:10 PM',
      tag: 'Automated snapshot prior to macOS Sequoia 15.1 update',
      files: [
        { name: 'KernelExtensions.plist', size: '19 KB', mod: 'Verified' },
        { name: 'DeveloperCertificates.p12', size: '4 KB', mod: 'Keychain backup' },
        { name: 'WorkspaceSettings.json', size: '64 KB', mod: 'Stable' }
      ]
    },
    {
      timestamp: 'Today, 10:45 AM',
      tag: 'Current active head snapshot (verified)',
      files: [
        { name: 'dewDrive.app/Contents', size: '42.8 MB', mod: 'Latest Universal Binary' },
        { name: 'ProjectNotes.markdown', size: '14 KB', mod: '2m ago' },
        { name: 'BackupIndex.blake3', size: '1.2 MB', mod: '100% matched' }
      ]
    }
  ];

  function renderRewindFiles(idx) {
    const data = snapshotDatabase[idx];
    if (!data) return;

    if (scrubberTimestamp) scrubberTimestamp.textContent = data.timestamp;
    if (rewindStatusTag) rewindStatusTag.textContent = data.tag;

    rewindTicks.forEach(tick => {
      tick.classList.toggle('active', parseInt(tick.dataset.val, 10) === idx);
    });

    if (rewindFileList) {
      rewindFileList.innerHTML = data.files.map(f => `
        <div class="rf-item">
          <div class="rf-item-left">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span class="rf-filename">${f.name}</span>
          </div>
          <div class="rf-item-right">
            <span class="rf-badge">${f.mod}</span>
            <span class="rf-filesize">${f.size}</span>
          </div>
        </div>
      `).join('');
    }
  }

  if (rewindSlider) {
    rewindSlider.addEventListener('input', (e) => {
      renderRewindFiles(parseInt(e.target.value, 10));
    });
    renderRewindFiles(parseInt(rewindSlider.value, 10));
  }


  /* ==========================================================================
     14. Accordion Logic (FAQ Section)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-question');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });


  /* ==========================================================================
     15. Command Palette (⌘K)
     ========================================================================== */
  const cmdKTrigger = document.getElementById('cmd-k-trigger');
  const cmdKModal = document.getElementById('cmd-k-modal');
  const cmdKInput = document.getElementById('cmd-k-input');
  const cmdKItems = document.querySelectorAll('.cmd-k-item');

  function openCmdK() {
    if (cmdKModal) {
      cmdKModal.classList.remove('hidden');
      if (cmdKInput) {
        cmdKInput.value = '';
        cmdKInput.focus();
      }
      filterCmdK('');
    }
  }

  function closeCmdK() {
    if (cmdKModal) cmdKModal.classList.add('hidden');
  }

  if (cmdKTrigger) cmdKTrigger.addEventListener('click', openCmdK);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdKModal && !cmdKModal.classList.contains('hidden')) {
        closeCmdK();
      } else {
        openCmdK();
      }
    } else if (e.key === 'Escape') {
      closeCmdK();
      closeDownloadModal();
      closeArticleModal();
    }
  });

  if (cmdKModal) {
    cmdKModal.addEventListener('click', (e) => {
      if (e.target === cmdKModal) closeCmdK();
    });
  }

  function filterCmdK(query) {
    const q = query.toLowerCase();
    cmdKItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  if (cmdKInput) {
    cmdKInput.addEventListener('input', (e) => filterCmdK(e.target.value));
  }

  cmdKItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      closeCmdK();

      if (action === 'details') {
        document.getElementById('details-and-pricing')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'pricing') {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'benchmarks') {
        document.getElementById('benchmarks')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'how-it-works') {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'features') {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'recover') {
        switchTab('recover');
        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'monitor') {
        switchTab('monitor');
        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'philosophy') {
        document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'faq') {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'download') {
        openDownloadModal();
      }
    });
  });


  /* ==========================================================================
     16. Download Modal
     ========================================================================== */
  const downloadModal = document.getElementById('download-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');
  const downloadTriggers = document.querySelectorAll('.download-trigger-btn');

  function openDownloadModal() {
    if (downloadModal) {
      downloadModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDownloadModal() {
    if (downloadModal) {
      downloadModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDownloadModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDownloadModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeDownloadModal);
  if (downloadModal) {
    downloadModal.addEventListener('click', (e) => {
      if (e.target === downloadModal) closeDownloadModal();
    });
  }


  /* ==========================================================================
     17. Article Reader Modal
     ========================================================================== */
  const articleModal = document.getElementById('article-modal');
  const artModalClose = document.getElementById('art-modal-close');
  const artModalTag = document.getElementById('art-modal-tag');
  const artModalTitle = document.getElementById('art-modal-title');
  const artModalMeta = document.getElementById('art-modal-meta');
  const artModalContent = document.getElementById('art-modal-content');
  const articleCards = document.querySelectorAll('.article-card');

  const articleDetails = {
    '1': {
      tag: 'Architecture',
      tagClass: 'architecture',
      title: 'Why Immutable Backups and Content-Defined Chunking Beat Ransomware',
      meta: '6 min read · By Dr. Henrik Lind · Security Research',
      content: `
        <p>Modern extortionware on macOS doesn't merely encrypt primary drives; it actively searches for connected Time Machine volumes, deletes local APFS snapshots, and exploits cloud sync engines to overwrite historical copies with corrupted ciphertext.</p>
        <h4>The Flaw of Traditional Whole-File Backups</h4>
        <p>Traditional tools upload whole files or basic block diffs. When ransomware touches a file header, standard software assumes the entire multi-gigabyte file changed and pushes encrypted garbage to the cloud, overwriting clean copies.</p>
        <h4>FastCDC: Cryptographic Semantic Boundaries</h4>
        <p>dewDrive implements FastCDC (Fast Content-Defined Chunking). Rather than cutting files at naive fixed byte intervals, our Rabin fingerprint rolling hash identifies natural boundaries inside binary streams.</p>
        <h4>Enforced S3 Object Lock</h4>
        <p>Combined with S3 Object Lock in Compliance Mode, snapshot packfiles are rendered physically immutable. Even an adversary with stolen root AWS credentials cannot alter or delete your snapshots until the retention window expires.</p>
      `
    },
    '2': {
      tag: 'Hardware RMM',
      tagClass: 'rmm',
      title: 'Detecting Silent SSD Degradation Before Catastrophic Drive Failure',
      meta: '8 min read · By Elena Rostova · Hardware Diagnostics',
      content: `
        <p>Unlike mechanical spinning hard drives that often exhibit audible clicks or thermal warnings before dying, modern NAND flash solid-state drives fail silently and instantaneously when endurance ceilings are breached.</p>
        <h4>The Threat of Silent Bit-Rot</h4>
        <p>Bit-rot occurs when electrical charges stored inside floating-gate or charge-trap flash cells leak over time. When reads are attempted months later, cosmic rays or charge degradation cause unrecoverable ECC errors without any prior warning.</p>
        <h4>24/7 Background Telemetry</h4>
        <p>dewDrive's lightweight native daemon constantly parses raw NVMe SMART telemetry logs on macOS:</p>
        <p>• <strong>Percentage Used:</strong> Estimates consumable life based on vendor-rated TBW.<br>
        • <strong>Available Spare Blocks:</strong> Detects when worn flash blocks are running out of factory reserve cells.<br>
        • <strong>Media and Data Integrity Errors:</strong> Counts uncorrectable ECC incidents in real time.</p>
      `
    },
    '3': {
      tag: 'Quickstart',
      tagClass: 'docs',
      title: 'Back up your first Mac in under two minutes',
      meta: '2 min read · Official dewDrive Documentation',
      content: `
        <p>Getting started with dewDrive requires zero complex cloud configurations. Here is the recommended zero-knowledge workflow:</p>
        <h4>Step 1: Download & Install</h4>
        <p>Mount the downloaded DMG file and drag dewDrive into your <code>/Applications</code> directory. Launch the app and grant Full Disk Access.</p>
        <h4>Step 2: Connect Storage Destination</h4>
        <p>Select your storage backend: attached Thunderbolt SSD, local NAS, Wasabi, Backblaze B2, AWS S3, or Cloudflare R2.</p>
        <h4>Step 3: Generate Master Key</h4>
        <p>dewDrive derives your encryption key locally using Argon2id inside the Secure Enclave.</p>
      `
    },
    '4': {
      tag: 'Company Story',
      tagClass: 'timeline',
      title: 'From 2009 to today: the story behind dewDrive',
      meta: '5 min read · By Marcus Vance · Founder',
      content: `
        <p>In 2009, when Time Machine was first introduced with Mac OS X Leopard, it was a marvel of UI design. But as our digital lives grew to multi-terabyte NVMe arrays, creative 8K video libraries, and cloud workflows, the limitations of fragile disk images became intolerable.</p>
        <h4>The Breaking Point</h4>
        <p>Who hasn't seen the dreaded macOS warning: <em>"Time Machine completed a verification of your backups. To improve reliability, Time Machine must create a new backup for you"</em>? Months or years of historical snapshots wiped out in a single prompt.</p>
        <h4>The dewDrive Manifesto</h4>
        <p>We built dewDrive on three immutable principles: Open standard formats (Restic/Kopia), hardware-aware SMART telemetry, and native Apple Silicon elegance.</p>
      `
    }
  };

  function openArticleModal(id) {
    const data = articleDetails[id];
    if (!data || !articleModal) return;

    if (artModalTag) {
      artModalTag.textContent = data.tag;
      artModalTag.className = `art-tag ${data.tagClass}`;
    }
    if (artModalTitle) artModalTitle.textContent = data.title;
    if (artModalMeta) artModalMeta.textContent = data.meta;
    if (artModalContent) artModalContent.innerHTML = data.content;

    articleModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeArticleModal() {
    if (articleModal) {
      articleModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  articleCards.forEach(card => {
    card.addEventListener('click', () => {
      openArticleModal(card.dataset.article);
    });
  });

  if (artModalClose) artModalClose.addEventListener('click', closeArticleModal);
  if (articleModal) {
    articleModal.addEventListener('click', (e) => {
      if (e.target === articleModal) closeArticleModal();
    });
  }

  const seeMoreBtn = document.getElementById('see-more-btn');
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openArticleModal('1');
    });
  }

  // Homebrew Cask Copy Pill
  const brewCopyBtn = document.getElementById('brew-copy-btn');
  if (brewCopyBtn) {
    brewCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('brew install --cask dewdrive').then(() => {
        showMacToast('Copied to Clipboard', 'brew install --cask dewdrive copied.');
      });
    });
  }

  /* ==========================================================================
     18. Apple Store Pricing Studio Configurator
     ========================================================================== */
  const studioTabs = document.querySelectorAll('.studio-model-tab');
  const studioFinalPrice = document.getElementById('studio-final-price');
  const studioFinalSub = document.getElementById('studio-final-sub');
  const studioCheckoutBtn = document.getElementById('studio-checkout-btn');
  const studioSpecsList = document.getElementById('studio-specs-list');

  const studioConfigs = {
    'personal': {
      price: '$49',
      sub: 'One-time perpetual payment · 1 Mac · No subscriptions ever',
      btnText: 'Buy Personal Mac ($49)',
      specs: [
        '<strong>1 Mac Perpetual Activation:</strong> Pay once, run and restore forever.',
        '<strong>Full Native macOS Swift App:</strong> FastCDC chunking engine & background daemon.',
        '<strong>Unlimited Storage Vaults:</strong> Connect local NVMe, NAS, or private S3.',
        '<strong>dewRewind Virtual Finder Explorer:</strong> 1-click snapshot restore without overwrite.',
        '<strong>30-Day Money-Back Guarantee:</strong> 100% risk-free digital sovereignty.'
      ]
    },
    'studio': {
      price: '$89',
      sub: 'One-time perpetual payment · 3 Macs · Priority Updates (Recommended)',
      btnText: 'Buy Studio Pro ($89)',
      specs: [
        '<strong>3 Mac Perpetual Activations:</strong> Studio desktop + 2 MacBooks covered.',
        '<strong>All Personal Mac Features Included:</strong> FastCDC, Restic & Kopia standards.',
        '<strong>24/7 Hardware NVMe SMART Sentry:</strong> Predictive SSD death & bad-block alerts.',
        '<strong>Thunderbolt & NAS Auto-Ingestion:</strong> Auto-snapshot immediately on drive plug.',
        '<strong>S3 Object Lock & Compliance Retention:</strong> Mathematical ransomware immunity.'
      ]
    },
    'fleet': {
      price: '$18',
      sub: 'Per seat / month · Billed annually · Centralized fleet management',
      btnText: 'Deploy Fleet License ($18/mo)',
      specs: [
        '<strong>Centralized Fleet Management Console:</strong> Real-time hardware health for all Macs.',
        '<strong>Automated MDM Deployment:</strong> Pre-configured profiles for Kandji, Jamf, Munki.',
        '<strong>Organization Vault Policies:</strong> Enforce client-side encryption across team.',
        '<strong>SOC2 & HIPAA Audit Exports:</strong> Immutable compliance snapshots.',
        '<strong>Dedicated Disaster Recovery Concierge:</strong> Direct Slack/Discord channel.'
      ]
    }
  };

  studioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      studioTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const model = tab.dataset.model;
      const config = studioConfigs[model];
      if (!config) return;

      if (studioFinalPrice) studioFinalPrice.textContent = config.price;
      if (studioFinalSub) studioFinalSub.textContent = config.sub;
      if (studioCheckoutBtn) studioCheckoutBtn.textContent = config.btnText;
      if (studioSpecsList) {
        studioSpecsList.innerHTML = config.specs.map(s => `
          <div class="studio-spec-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <div>${s}</div>
          </div>
        `).join('');
      }
    });
  });


  /* ==========================================================================
     19. Apple-Grade 3D Image Sequence Hero Engine (Ultra-Smooth, Clear, Calm)
     ========================================================================== */
  function initHeroSequenceScroller() {
    const heroTrack = document.getElementById('hero');
    const canvas = document.getElementById('hero-sequence-canvas');
    if (!heroTrack || !canvas) return;

    // Use alpha: false and desynchronized: true for peak GPU rendering throughput
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const introHeader = document.getElementById('hero-intro-header');
    const keynoteDeck = document.getElementById('hero-keynote-deck');
    const keynoteCards = keynoteDeck ? keynoteDeck.querySelectorAll('.keynote-card') : [];
    
    // HUD Elements
    const hudContainer = document.getElementById('hero-hud');
    const hudFrameCounter = document.getElementById('hero-frame-counter');
    const hudProgressBar = document.getElementById('hero-hud-progress');
    const hudPercent = document.getElementById('hero-hud-percent');
    const hudActName = document.getElementById('hero-hud-act-name');
    const hudPlayBtn = document.getElementById('hero-hud-play');
    const hudScrubWrap = document.getElementById('hero-scrub-wrap');
    const hudThumb = document.getElementById('hero-hud-thumb');
    const hudTicks = document.querySelectorAll('.hud-tick');

    const START_FRAME = 2; // Starts directly at Frame 2 (Photo 2 start state)
    const TOTAL_FRAMES = 300;
    const FRAME_NATURAL_W = 1920;
    const FRAME_NATURAL_H = 1080;

    // Direct 1-based indexing
    const frames = new Array(TOTAL_FRAMES + 1);
    const frameStatus = new Uint8Array(TOTAL_FRAMES + 1); // 0 = idle, 1 = loading, 2 = loaded & decoded
    
    let currentTarget = START_FRAME;
    let displayFrame = START_FRAME;
    let animRunning = false;
    let isPlaying = false;
    let playRafId = null;
    let lastPlayTime = 0;
    let isScrubbing = false;
    
    // Cached layout geometry to eliminate layout thrashing during scroll
    let canvasW = 0, canvasH = 0;
    let cropSx = 0, cropSy = 0, cropSw = FRAME_NATURAL_W, cropSh = FRAME_NATURAL_H;
    let cachedTrackH = 0;
    let cachedTrackTop = 0;

    function framePath(idx) {
      return 'public/images/herosection/ezgif-frame-' + String(idx).padStart(3, '0') + '.jpg';
    }

    // ── High-DPI Canvas Sizing & Precomputed Crop Math ──
    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.clientWidth || window.innerWidth;
      const cssH = canvas.clientHeight || window.innerHeight;
      if (cssW <= 0 || cssH <= 0) return;

      const pw = Math.round(cssW * dpr);
      const ph = Math.round(cssH * dpr);

      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      canvasW = pw;
      canvasH = ph;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const ir = FRAME_NATURAL_W / FRAME_NATURAL_H; // 1.7778
      const cr = (canvasW && canvasH) ? (canvasW / canvasH) : ir;

      if (cr > ir) {
        cropSw = FRAME_NATURAL_W;
        cropSh = FRAME_NATURAL_W / cr;
        cropSx = 0;
        cropSy = (FRAME_NATURAL_H - cropSh) * 0.5;
      } else {
        cropSh = FRAME_NATURAL_H;
        cropSw = FRAME_NATURAL_H * cr;
        cropSx = (FRAME_NATURAL_W - cropSw) * 0.5;
        cropSy = 0;
      }
    }

    // ── Ultra-Fast Subframe Cross-Fade Renderer ──
    function drawFrame(frameProgress) {
      if (canvasW <= 0 || canvasH <= 0 || !cropSw) {
        sizeCanvas();
        if (canvasW <= 0 || canvasH <= 0) return;
      }

      const baseF = Math.max(START_FRAME, Math.min(TOTAL_FRAMES, Math.floor(frameProgress)));
      const nextF = Math.min(TOTAL_FRAMES, baseF + 1);
      const fraction = frameProgress - Math.floor(frameProgress);

      const img1 = getBestImage(baseF);
      if (!img1 || !img1.complete || img1.naturalWidth === 0) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const sx = Math.max(0, Math.round(cropSx || 0));
      const sy = Math.max(0, Math.round(cropSy || 0));
      const sw = Math.round(cropSw || FRAME_NATURAL_W);
      const sh = Math.round(cropSh || FRAME_NATURAL_H);

      // Draw base keyframe at full opacity
      ctx.globalAlpha = 1.0;
      ctx.drawImage(img1, sx, sy, sw, sh, 0, 0, canvasW, canvasH);

      // Subframe temporal blending: cross-fade smoothly into next frame to eliminate stepping
      if (fraction > 0.04 && fraction < 0.96 && nextF !== baseF) {
        const img2 = getBestImage(nextF);
        if (img2 && img2 !== img1 && img2.complete && img2.naturalWidth > 0) {
          ctx.globalAlpha = fraction;
          ctx.drawImage(img2, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
          ctx.globalAlpha = 1.0;
        }
      }
    }

    // ── Expanding Nearest-Neighbor Fallback ──
    function getBestImage(idx) {
      idx = Math.max(START_FRAME, Math.min(TOTAL_FRAMES, idx));
      if (frameStatus[idx] === 2 && frames[idx]) return frames[idx];
      if (frames[idx] && frames[idx].complete && frames[idx].naturalWidth > 0) return frames[idx];

      // Scan bidirectional outward ripple
      for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
        const left = idx - delta;
        if (left >= START_FRAME && frames[left] && frames[left].complete && frames[left].naturalWidth > 0) {
          return frames[left];
        }
        const right = idx + delta;
        if (right <= TOTAL_FRAMES && frames[right] && frames[right].complete && frames[right].naturalWidth > 0) {
          return frames[right];
        }
      }
      return null;
    }

    // ── High-Performance Concurrent Frame Loading Pipeline ──
    const MAX_CONCURRENT = 10;
    let activeWorkers = 0;
    const downloadQueue = [];

    function enqueueFrame(idx, highPriority = false) {
      if (idx < START_FRAME || idx > TOTAL_FRAMES) return;
      if (frameStatus[idx] > 0) return;

      const existingIdx = downloadQueue.indexOf(idx);
      if (existingIdx > -1) {
        if (highPriority) {
          downloadQueue.splice(existingIdx, 1);
          downloadQueue.unshift(idx);
        }
        return;
      }

      if (highPriority) {
        downloadQueue.unshift(idx);
      } else {
        downloadQueue.push(idx);
      }
      pumpQueue();
    }

    function pumpQueue() {
      while (activeWorkers < MAX_CONCURRENT && downloadQueue.length > 0) {
        const idx = downloadQueue.shift();
        if (frameStatus[idx] === 0) {
          activeWorkers++;
          loadSingleFrame(idx, () => {
            activeWorkers--;
            pumpQueue();
          });
        }
      }
    }

    function loadSingleFrame(idx, onDone) {
      frameStatus[idx] = 1; // loading
      const img = new Image();
      img.src = framePath(idx);

      const finish = () => {
        if ('decode' in img) {
          img.decode().then(() => {
            frameStatus[idx] = 2; // decoded to GPU memory
            frames[idx] = img;
            const curBase = Math.floor(displayFrame);
            if (curBase === idx || curBase + 1 === idx) {
              drawFrame(displayFrame);
            }
            if (onDone) onDone();
          }).catch(() => {
            frameStatus[idx] = 2;
            frames[idx] = img;
            if (onDone) onDone();
          });
        } else {
          frameStatus[idx] = 2;
          frames[idx] = img;
          if (onDone) onDone();
        }
      };

      if (img.complete && img.naturalWidth > 0) {
        finish();
      } else {
        img.addEventListener('load', finish, { once: true });
        img.addEventListener('error', () => {
          frameStatus[idx] = 0; // retryable
          if (onDone) onDone();
        }, { once: true });
      }
      frames[idx] = img;
    }

    // Prioritize frames around current target scroll position
    function prioritizeWindow(centerFrame, radius = 25) {
      const minF = Math.max(START_FRAME, centerFrame - 8);
      const maxF = Math.min(TOTAL_FRAMES, centerFrame + radius);
      for (let f = minF; f <= maxF; f++) {
        enqueueFrame(f, true);
      }
    }

    // ── Start Up: Tiered Preloader ──
    for (let f = START_FRAME; f <= Math.min(TOTAL_FRAMES, START_FRAME + 35); f++) {
      enqueueFrame(f, true);
    }
    for (let f = START_FRAME + 40; f <= TOTAL_FRAMES; f += 5) {
      enqueueFrame(f, false);
    }
    for (let f = START_FRAME + 36; f <= TOTAL_FRAMES; f++) {
      if (f % 5 !== 0) {
        enqueueFrame(f, false);
      }
    }

    // Initial render
    sizeCanvas();
    loadSingleFrame(START_FRAME, () => {
      drawFrame(START_FRAME);
    });

    // ── HUD Text & Progress Update ──
    function updateHUD(frameNum, progressRatio) {
      if (hudFrameCounter) {
        hudFrameCounter.textContent = 'FRAME ' + String(frameNum).padStart(3, '0') + ' / ' + TOTAL_FRAMES;
      }
      const percentVal = Math.min(100, Math.max(0, (frameNum - START_FRAME) / (TOTAL_FRAMES - START_FRAME) * 100));
      if (hudProgressBar) {
        hudProgressBar.style.width = percentVal.toFixed(1) + '%';
      }
      if (hudThumb) {
        hudThumb.style.left = percentVal.toFixed(1) + '%';
      }
      if (hudPercent) {
        hudPercent.textContent = Math.round(percentVal) + '%';
      }
      if (hudActName) {
        if (progressRatio < 0.16) {
          hudActName.textContent = 'KEYNOTE OVERVIEW';
        } else if (progressRatio < 0.46) {
          hudActName.textContent = 'ACT 01 · FASTCDC PIPELINE';
        } else if (progressRatio < 0.72) {
          hudActName.textContent = 'ACT 02 · SECURE ENCLAVE';
        } else {
          hudActName.textContent = 'ACT 03 · SOVEREIGN MULTI-CLOUD';
        }
      }
    }

    // ── Ultra-Smooth Adaptive Inertial Lerp Physics Engine ──
    function startAnimLoop() {
      if (animRunning) return;
      animRunning = true;

      function tick() {
        try {
          const diff = currentTarget - displayFrame;
          const absDiff = Math.abs(diff);

          if (absDiff < 0.008) {
            displayFrame = currentTarget;
          } else {
            const adaptiveLerp = Math.min(0.28, 0.12 + (absDiff / 25) * 0.14);
            displayFrame += diff * adaptiveLerp;
          }

          drawFrame(displayFrame);
          updateHUD(Math.round(displayFrame), (displayFrame - START_FRAME) / (TOTAL_FRAMES - START_FRAME));

          if (Math.abs(currentTarget - displayFrame) > 0.008) {
            requestAnimationFrame(tick);
          } else {
            animRunning = false;
          }
        } catch (err) {
          animRunning = false;
          console.error('Sequence render error:', err);
        }
      }
      requestAnimationFrame(tick);
    }

    // ── Main Scroll Driver ──
    function onScroll() {
      if (isPlaying || isScrubbing) return;

      const rect = heroTrack.getBoundingClientRect();
      const trackH = heroTrack.offsetHeight - window.innerHeight;
      if (trackH <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / trackH));

      currentTarget = START_FRAME + progress * (TOTAL_FRAMES - START_FRAME);
      prioritizeWindow(Math.round(currentTarget), 30);
      startAnimLoop();

      // Intro Header: dissolve 0%–16%
      if (introHeader) {
        if (progress <= 0.16) {
          const r = progress / 0.16;
          const op = Math.max(0, 1 - r * 1.15);
          const ty = -r * 40;
          const sc = 1 - r * 0.04;
          introHeader.style.opacity = op.toFixed(3);
          introHeader.style.transform = `translate(-50%, calc(-50% + ${ty.toFixed(1)}px)) scale(${sc.toFixed(3)})`;
          introHeader.style.pointerEvents = r > 0.4 ? 'none' : 'auto';
        } else {
          introHeader.style.opacity = '0';
          introHeader.style.pointerEvents = 'none';
        }
      }

      // Keynote Cards: synced to narrative acts
      let activeStep = -1;
      if (progress >= 0.18 && progress < 0.46) activeStep = 1;
      else if (progress >= 0.46 && progress < 0.72) activeStep = 2;
      else if (progress >= 0.72 && progress <= 0.95) activeStep = 3;

      keynoteCards.forEach(function(card) {
        const step = parseInt(card.dataset.step, 10);
        if (step === activeStep) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }

    // ── Interactive Timeline Scrubber (Click & Drag) ──
    function seekToProgress(ratio) {
      ratio = Math.min(1, Math.max(0, ratio));
      const trackH = heroTrack.offsetHeight - window.innerHeight;
      const trackTop = heroTrack.offsetTop;
      const targetScrollY = trackTop + ratio * trackH;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'auto'
      });

      currentTarget = START_FRAME + ratio * (TOTAL_FRAMES - START_FRAME);
      prioritizeWindow(Math.round(currentTarget), 30);
    }

    if (hudScrubWrap) {
      function handleScrub(e) {
        const rect = hudScrubWrap.getBoundingClientRect();
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const ratio = (clientX - rect.left) / rect.width;
        seekToProgress(ratio);
      }

      hudScrubWrap.addEventListener('mousedown', (e) => {
        isScrubbing = true;
        if (hudContainer) hudContainer.classList.add('scrubbing');
        handleScrub(e);

        const onMouseMove = (ev) => {
          if (!isScrubbing) return;
          handleScrub(ev);
        };
        const onMouseUp = () => {
          isScrubbing = false;
          if (hudContainer) hudContainer.classList.remove('scrubbing');
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });

      // Touch scrubber for mobile/iPad
      hudScrubWrap.addEventListener('touchstart', (e) => {
        isScrubbing = true;
        if (hudContainer) hudContainer.classList.add('scrubbing');
        handleScrub(e);
      }, { passive: true });

      hudScrubWrap.addEventListener('touchmove', (e) => {
        if (isScrubbing) handleScrub(e);
      }, { passive: true });

      hudScrubWrap.addEventListener('touchend', () => {
        isScrubbing = false;
        if (hudContainer) hudContainer.classList.remove('scrubbing');
      });
    }

    // ── Act Tick Marks (Direct Jumps) ──
    hudTicks.forEach(tick => {
      tick.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetVal = parseFloat(tick.dataset.target);
        if (!isNaN(targetVal)) {
          seekToProgress(targetVal);
        }
      });
    });

    // ── Keynote Cards Click to Focus ──
    keynoteCards.forEach(card => {
      card.addEventListener('click', () => {
        const step = parseInt(card.dataset.step, 10);
        if (step === 1) seekToProgress(0.25);
        else if (step === 2) seekToProgress(0.55);
        else if (step === 3) seekToProgress(0.80);
      });
    });

    // ── Cinema Autoplay Mode (Silky Smooth Continuous Motion) ──
    function setPlayState(playing) {
      isPlaying = playing;
      if (hudPlayBtn) {
        const playIcon = hudPlayBtn.querySelector('.play-icon');
        const pauseIcon = hudPlayBtn.querySelector('.pause-icon');
        if (playing) {
          playIcon.classList.add('hidden');
          pauseIcon.classList.remove('hidden');
          hudPlayBtn.title = 'Pause Sequence';
        } else {
          playIcon.classList.remove('hidden');
          pauseIcon.classList.add('hidden');
          hudPlayBtn.title = 'Play Sequence';
        }
      }
    }

    function playLoop(now) {
      if (!isPlaying) return;
      if (!lastPlayTime) lastPlayTime = now;
      const delta = now - lastPlayTime;

      // 30 fps smooth continuous advance (~33ms)
      if (delta >= 33) {
        lastPlayTime = now;
        let nextFrame = currentTarget + 1;
        if (nextFrame > TOTAL_FRAMES) {
          nextFrame = START_FRAME;
        }
        const ratio = (nextFrame - START_FRAME) / (TOTAL_FRAMES - START_FRAME);
        seekToProgress(ratio);
      }
      playRafId = requestAnimationFrame(playLoop);
    }

    if (hudPlayBtn) {
      hudPlayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isPlaying) {
          setPlayState(false);
          cancelAnimationFrame(playRafId);
        } else {
          setPlayState(true);
          lastPlayTime = 0;
          playRafId = requestAnimationFrame(playLoop);
        }
      });
    }

    // Pause autoplay on manual wheel or touch scroll
    window.addEventListener('wheel', () => {
      if (isPlaying) {
        setPlayState(false);
        cancelAnimationFrame(playRafId);
      }
    }, { passive: true });

    // ── Scroll Listener with RAF Debouncing ──
    let scrollTicking = false;
    window.addEventListener('scroll', function() {
      if (!scrollTicking) {
        requestAnimationFrame(function() {
          onScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', function() {
      sizeCanvas();
      drawFrame(displayFrame);
    }, { passive: true });

    // Initial trigger
    onScroll();
  }

  initHeroSequenceScroller();

});

