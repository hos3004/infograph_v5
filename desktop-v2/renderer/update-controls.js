/* Extracted from renderer/index.html. Handles app/content update controls. */
(function() {
    if (typeof window.updateApi === 'undefined') return;

    const $ = id => document.getElementById(id);
    const statusEl = $('update-status');
    const progressWrap = $('update-progress-wrap');
    const progressBar = $('update-progress-bar');
    const btnCore = $('btn-check-core');
    const btnContent = $('btn-check-content');
    const btnInstall = $('btn-install-core');
    const btnApply = $('btn-apply-content');
    const btnRollback = $('btn-rollback-content');

    let busy = false;

    function setStatus(msg, color) {
      statusEl.textContent = msg;
      if (color) statusEl.style.color = color;
    }

    function showProgress(pct) {
      progressWrap.style.display = 'block';
      progressBar.style.width = pct + '%';
    }

    function hideProgress() {
      progressWrap.style.display = 'none';
      progressBar.style.width = '0%';
    }

    function setBusy(isBusy) {
      busy = isBusy;
      btnCore.disabled = isBusy;
      btnContent.disabled = isBusy;
      btnInstall.disabled = isBusy;
      btnApply.disabled = isBusy;
      btnRollback.disabled = isBusy;
    }

    function showCoreError(msg) {
      hideProgress();
      setStatus('❌ ' + (msg || 'خطأ'), 'var(--danger)');
      btnInstall.style.display = 'none';
      btnInstall.disabled = false;
    }

    // ── Core Update ──
    btnCore.addEventListener('click', async () => {
      if (busy) return;
      setBusy(true);
      setStatus('جاري فحص تحديث البرنامج...', '');
      try {
        await window.updateApi.checkCoreUpdate();
      } catch (e) {
        setStatus('❌ ' + e.message, 'var(--danger)');
      }
      setBusy(false);
    });

    let coreStatusCleanup = null;

    function setupCoreListener() {
      if (coreStatusCleanup) coreStatusCleanup();
      coreStatusCleanup = window.updateApi.onCoreUpdateStatus((status) => {
        switch (status.phase) {
          case 'checking-for-update':
            setStatus('جاري فحص التحديثات...');
            break;
          case 'update-available':
            setStatus('📦 تحديث البرنامج متوفر', 'var(--accent)');
            btnInstall.style.display = 'inline-block';
            btnInstall.onclick = async () => {
              if (busy) return;
              setBusy(true);
              setStatus('جاري تنزيل التحديث...');
              try {
                await window.updateApi.downloadCoreUpdate();
              } catch (e) {
                showCoreError(e.message);
              }
              setBusy(false);
            };
            break;
          case 'update-not-available':
            setStatus('البرنامج محدث', 'var(--success)');
            btnInstall.style.display = 'none';
            break;
          case 'download-progress':
            showProgress(status.progress.percent);
            setStatus('جاري التنزيل... ' + Math.round(status.progress.percent) + '%');
            break;
          case 'update-downloaded':
            hideProgress();
            setStatus('✅ تم تنزيل التحديث. اضغط تثبيت لإعادة التشغيل.', 'var(--success)');
            btnInstall.textContent = '🔄 تثبيت وإعادة تشغيل';
            btnInstall.style.display = 'inline-block';
            btnInstall.onclick = async () => {
              if (busy) return;
              setBusy(true);
              setStatus('جاري التثبيت...');
              try {
                await window.updateApi.installCoreUpdate();
              } catch (e) {
                showCoreError(e.message);
              }
              setBusy(false);
            };
            break;
          case 'error':
            showCoreError(status.error);
            break;
        }
      });
    }
    setupCoreListener();

    // ── Content Update ──
    btnContent.addEventListener('click', async () => {
      if (busy) return;
      setBusy(true);
      setStatus('جاري فحص تحديثات المحتوى...');
      try {
        const result = await window.updateApi.checkContentUpdate();
        if (result.error) {
          setStatus('❌ ' + result.error, 'var(--danger)');
          btnApply.style.display = 'none';
          btnRollback.style.display = 'none';
        } else if (result.upToDate) {
          setStatus('جميع ملفات المحتوى محدثة', 'var(--success)');
          btnApply.style.display = 'none';
          btnRollback.style.display = 'none';
        } else {
          const mb = (result.totalSize / 1024 / 1024).toFixed(1);
          setStatus('توجد ' + result.changedFiles.length + ' ملفات للتحديث (' + mb + ' MB)', 'var(--accent)');
          btnApply.style.display = 'inline-block';
          btnRollback.style.display = 'none';
          btnApply.onclick = async () => {
            if (busy) return;
            setBusy(true);
            setStatus('جاري التنزيل...');
            showProgress(0);
            const dlResult = await window.updateApi.downloadContentUpdate();
            if (dlResult.success) {
              setStatus('جاري تطبيق التحديثات...');
              const apResult = await window.updateApi.applyContentUpdate();
              hideProgress();
              if (apResult.success) {
                if (apResult.needsRestart) {
                  setStatus('✅ تم التطبيق. يرجى إعادة تشغيل التطبيق.', 'var(--success)');
                } else {
                  setStatus('✅ تم تطبيق تحديثات المحتوى', 'var(--success)');
                }
                btnApply.style.display = 'none';
                btnRollback.style.display = 'inline-block';
              } else {
                setStatus('❌ ' + (apResult.error || 'فشل التطبيق'), 'var(--danger)');
              }
            } else {
              hideProgress();
              setStatus('❌ ' + (dlResult.error || 'فشل التنزيل'), 'var(--danger)');
            }
            setBusy(false);
          };
        }
      } catch (e) {
        setStatus('❌ ' + e.message, 'var(--danger)');
      }
      setBusy(false);
    });

    btnRollback.addEventListener('click', async () => {
      if (busy) return;
      setBusy(true);
      setStatus('جاري التراجع...');
      try {
        const result = await window.updateApi.rollbackContentUpdate();
        if (result.success) {
          setStatus('✅ تم التراجع عن آخر تحديث', 'var(--text-mu)');
          btnRollback.style.display = 'none';
          btnApply.style.display = 'none';
        } else {
          setStatus('❌ ' + (result.error || 'فشل التراجع'), 'var(--danger)');
        }
      } catch (e) {
        setStatus('❌ ' + e.message, 'var(--danger)');
      }
      setBusy(false);
    });

    // Load initial status
    window.updateApi.getContentUpdateStatus().then(r => {
      if (r.success && r.status && r.status.installedFiles && r.status.installedFiles.length > 0) {
        btnRollback.style.display = 'inline-block';
        setStatus('آخر تحديث: ' + (r.status.lastAppliedUpdateId || 'مثبت'), 'var(--text-mu)');
      }
    }).catch(() => {});
  })();
