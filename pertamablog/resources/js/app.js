import './bootstrap';
import '../css/app.css';

// Persist dark mode class on html element
(function initDarkMode() {
	try {
		const saved = localStorage.getItem('theme');
		if (saved === 'dark') document.documentElement.classList.add('dark');
	} catch {}
})();
