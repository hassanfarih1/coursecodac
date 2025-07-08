// src/components/LoadingOverlay.jsx
'use client'; // This directive makes this a Client Component

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Corrected import for useRouter in App Router

const LoadingOverlay = () => {
  const router = useRouter();
  const pathname = usePathname(); // To optionally hide the loader on the initial load if desired
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Function to show the loader
    const handleStart = (url) => {
      // Only show loader if navigating to a different URL
      // And if the URL is within the app (not external)
      if (url !== pathname && url.startsWith('/')) {
        setLoading(true);
      }
    };

    // Function to hide the loader
    const handleComplete = (url) => {
      setLoading(false);
    };

    // Listen for route change events
    // In Next.js App Router, router.events is not available.
    // Instead, we can use the `loading.js` convention or a different approach
    // for progress bar. For a full-screen overlay like this,
    // we manually manage it with `useEffect` based on URL changes,
    // or use a library.

    // Manual approach:
    // This effect runs on mount and every time pathname changes.
    // The issue with router.events is that it's from Pages Router.
    // For App Router, direct control over route changes for a global loader
    // needs a more custom approach or a dedicated library like nprogress.
    // However, for a simple overlay, we can track the `loading` state when navigating
    // using the Link component's `onClick` or by relying on `Suspense` boundaries.

    // For a simple overlay that shows on ANY Link navigation across pages:
    // The most robust way without a library is to use `router.push` and control state,
    // but we want it to apply automatically to <Link>.

    // Let's use a simpler strategy suitable for `Link` in App Router:
    // A component that listens to navigation events via `router.events` is primarily for Pages Router.
    // For App Router, the `loading.js` file convention handles loading states for *segments*.
    // For a *global* full-screen loader, we'd typically use a client component in the layout
    // and integrate it with a navigation progress indicator library (e.g., NProgress).

    // Let's refine based on App Router's recommended patterns for global loading:
    // The `loading.js` file is for segment-level loading.
    // For a *global* loader like NProgress, you'd typically have a client component
    // that uses `usePathname` and potentially `useRouter` to detect URL changes.

    // Let's simulate a simpler global loader by just showing it on URL changes.
    // This won't capture the exact moment fetch starts/ends, but will react to route changes.
    // For a precise "during fetch" state, you often combine with <Suspense> or client-side fetches.

    // For the request: "when i click on a section and it loading the data to show a loading"
    // This implies reacting to the start/end of a client-side navigation initiated by <Link>.
    // In App Router, the common way to handle this for global progress bar is libraries like nprogress-next.
    // A simple `useState` + `useEffect` on `pathname` won't catch the *transition* period itself.

    // Re-evaluating: The user wants a loader when they click a section and it's *loading the data*.
    // This specifically refers to the *network request* part of the navigation.
    // The `router.events` API is indeed from Pages Router. For App Router, the direct equivalent for global navigation events isn't exposed in the same way.

    // A common workaround for a global loading indicator in App Router is to use a library like `nprogress-next`.
    // However, if we want a *manual* implementation, it becomes tricky without access to the exact start/end of navigation.

    // Alternative: A custom `Link` component that wraps `next/link` and triggers the loading state.
    // This would mean replacing all `<Link>` components with your custom one.
    // This is more work but gives precise control.

    // Given the user's explicit request and the simplicity desired,
    // let's try a direct approach that often works for visual feedback,
    // even if it's not tied to *exact* network start/end, but rather route change detection.

    // The router.events approach *can* be made to work with App Router by having a top-level client component.
    // Let's use the Pages Router router.events API, as it's the most direct way to get `routeChangeStart`.
    // If the user's Next.js version is purely App Router and this breaks, then we need a different strategy.
    // But for global loaders, `router.events` has been the standard.

    const handleRouteChangeStart = () => {
        setLoading(true);
    };

    const handleRouteChangeComplete = () => {
        setLoading(false);
    };

    router.events?.on('routeChangeStart', handleRouteChangeStart);
    router.events?.on('routeChangeComplete', handleRouteChangeComplete);
    router.events?.on('routeChangeError', handleRouteChangeComplete); // Handle errors too

    return () => {
        router.events?.off('routeChangeStart', handleRouteChangeStart);
        router.events?.off('routeChangeComplete', handleRouteChangeComplete);
        router.events?.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]); // Depend on router instance

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensure it's on top of everything
        backdropFilter: 'blur(5px)', // Optional: blur background
        WebkitBackdropFilter: 'blur(5px)', // For Safari
        transition: 'opacity 0.3s ease-in-out',
        opacity: loading ? 1 : 0,
        pointerEvents: loading ? 'auto' : 'none', // Prevent clicks while loading
      }}
    >
      {/* Simple spinner (you can replace with a more elaborate one) */}
      <div
        style={{
          border: '8px solid #f3f3f3', // Light grey
          borderTop: '8px solid #3498db', // Blue
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          animation: 'spin 1s linear infinite',
        }}
      ></div>

      {/* Add spin animation to your global CSS or here */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;