const themeSwitcher = () => {
  const toggles = Array.from(document.querySelectorAll('input[name="theme-control"]'));
  const root = document.documentElement;
  const storage = localStorage.getItem('data-theme');
  const property = 'data-theme';
  const prefers = (mode) => window.matchMedia(`(prefers-color-scheme: ${mode})`)

  const setTheme = (prop, value) => {
    root.setAttribute(prop, value);
    localStorage.setItem(prop, value);
    setToggles(value);
  }

  const setToggles = (mode) => {
    toggles.forEach(toggle => {
      if ( toggle.dataset.mode === mode ) {
        toggles.forEach(toggle => toggle.parentNode.classList.remove('active'));
        toggle.parentNode.classList.add('active');
        toggle.checked = true;
      }
    })
  }

  const checkTheme = (prop, mode) => {
    if ( storage === mode ) {
      setTheme(prop, mode);
    }
  }

  if ( prefers('dark').matches && !storage ) {
    console.log(prefers('dark').matches, storage)
    setTheme(property, 'dark');
    setToggles('dark')
  } else if ( !prefers('dark').matches && !storage ) {
    console.log(prefers('dark').matches, storage)
    setTheme(property, 'light');
  }

  checkTheme(property, 'dark');
  checkTheme(property, 'light');
  checkTheme(property, 'contrast');

  toggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const targ = e.target;
      const propValue = targ.dataset.mode;
      
      setTheme(property, propValue);
    })
  })

  prefers('dark').addEventListener('change', () => {
    if ( prefers('dark').matches ) {
      setTheme(property, 'dark');
    } else {
      setTheme(property, 'light');
    }
  })
}

export default themeSwitcher