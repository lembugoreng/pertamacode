<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Pertama Blog</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="min-h-screen bg-white text-black antialiased dark:bg-black dark:text-white">
        <div class="mx-auto max-w-5xl px-6 py-10">
            <header class="mb-10 flex items-center justify-between">
                <a href="/" class="text-lg font-semibold">Pertama</a>
                <button id="theme-toggle" class="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5">
                    <span class="inline dark:hidden">🌙 Dark</span>
                    <span class="hidden dark:inline">☀️ Light</span>
                </button>
            </header>

            <main>
                <section class="mb-12 text-center">
                    <h1 class="text-4xl font-extrabold tracking-tight">A minimalist Laravel blog</h1>
                    <p class="mt-3 text-black/70 dark:text-white/70">Clean, fast, and modern with TailwindCSS.</p>
                    <div class="mt-6 flex justify-center gap-3">
                        @if (Route::has('login'))
                            @auth
                                <a href="{{ url('/dashboard') }}" class="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">Dashboard</a>
                            @else
                                <a href="{{ route('login') }}" class="rounded-md border border-black/20 px-4 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5">Log in</a>
                                @if (Route::has('register'))
                                    <a href="{{ route('register') }}" class="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">Register</a>
                                @endif
                            @endauth
                        @endif
                    </div>
                </section>

                <section class="grid gap-6 md:grid-cols-2">
                    <article class="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                        <h2 class="text-xl font-semibold">Write posts</h2>
                        <p class="mt-2 text-sm text-black/70 dark:text-white/70">Create and publish articles with a distraction-free interface.</p>
                        <a href="#" class="mt-4 inline-block rounded-md border border-black/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5">Learn more</a>
                    </article>
                    <article class="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                        <h2 class="text-xl font-semibold">Stay updated</h2>
                        <p class="mt-2 text-sm text-black/70 dark:text-white/70">Subscribe to receive the latest posts in your inbox.</p>
                        <a href="#" class="mt-4 inline-block rounded-md border border-black/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5">Learn more</a>
                    </article>
                </section>
            </main>

            <footer class="mt-16 text-center text-sm text-black/70 dark:text-white/70">
                Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})
            </footer>
        </div>

        <script>
            const btn = document.getElementById('theme-toggle');
            btn?.addEventListener('click', () => {
                const root = document.documentElement;
                const isDark = root.classList.toggle('dark');
                try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch {}
            });
        </script>
    </body>
</html>
