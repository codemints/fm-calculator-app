const themeSwitcher = () => {
  const toggles = Array.from(document.querySelectorAll('input[name="theme-control"]'));
  const root = document.documentElement;
  const storage = localStorage.getItem('data-theme');
  const property = 'data-theme';
  const prefers = (mode) => window.matchMedia(`(prefers-color-scheme: ${mode})`)

  console.log(storage);

  const setTheme = (prop, value) => {
    root.setAttribute(prop, value);
    localStorage.setItem(prop, value);
  }

  const checkTheme = (prop, mode) => {
    if ( storage === mode ) {
      setTheme(prop, mode);
      toggles.forEach(toggle => {
        if ( toggle.dataset.mode === mode ) {
          toggle.checked = true;
          toggle.parentNode.classList.add('active');
        }
      })
    }
  }

  if ( prefers('dark' && !storage ) ) {
    setTheme(property, 'dark');
  } else if ( !prefers('dark' && !storage )) {
    setTheme
  }

  checkTheme(property, 'dark');
  checkTheme(property, 'light');
  checkTheme(property, 'contrast');

  toggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const targ = e.target;
      const par = targ.parentNode;
      const propValue = targ.dataset.mode;
      
      setTheme(property, propValue);

      toggles.forEach(toggle => toggle.parentNode.classList.remove('active'));

      par.classList.add('active');

    })
  })

  prefers('dark').addEventListener('change', () => {
    if ( prefers('dark').matches ) {
      setTheme(property, 'dark');
      toggles.forEach(toggle => {
        if ( toggle.dataset.mode === 'dark') {
          toggles.forEach(toggle => toggle.parentNode.classList.remove('active'));
          toggle.parentNode.classList.add('active');
          toggle.checked = true;
        }
      })
    } else {
      setTheme(property, 'light');
      toggles.forEach(toggle => {
        if ( toggle.dataset.mode === 'light') {
          toggles.forEach(toggle => toggle.parentNode.classList.remove('active'));
          toggle.parentNode.classList.add('active');
          toggle.checked = true;
        }
      })
    }
  })
}

export default themeSwitcher