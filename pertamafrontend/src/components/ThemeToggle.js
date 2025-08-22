import React from 'react';

const ThemeToggle = ({ setThemeMode }) => {
	const isDark = (localStorage.getItem('theme') || 'dark') === 'dark';
	const handleToggle = () => {
		setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	return (
		<button
			onClick={handleToggle}
			className="fixed right-5 top-5 z-50 inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-2 text-sm text-black shadow-sm hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5"
		>
			{isDark ? '☀️ Light' : '🌙 Dark'}
		</button>
	);
};

export default ThemeToggle;
