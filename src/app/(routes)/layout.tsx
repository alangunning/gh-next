import "./globals.css";

// components
import { TailwindIndicator } from "~/app/(components)/tailwind-indicator";

// utils
import { Inter } from "next/font/google";

// types
import type { Metadata } from "next";
import { THEME_COOKIE_KEY } from "~/lib/constants";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Github Issue Management App",
  description: "This is an issue management app",
};

export const runtime = "edge";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* 
          Script used to avoid FOUC and apply the theme of application
          depending on the user's theme preference, before React Finishes 
          hydrating
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function () {
                  function getCookieValue(cookieName) {
                    // Split all cookies into an array
                    var cookies = document.cookie.split(';');
                  
                    // Loop through the cookies
                    for (var i = 0; i < cookies.length; i++) {
                      var cookie = cookies[i].trim();
                  
                      // Check if the cookie starts with the given name
                      if (cookie.indexOf(cookieName + '=') === 0) {
                        // Extract and return the cookie value
                        return cookie.substring(cookieName.length + 1);
                      }
                    }
                  
                    // Return null if the cookie is not found
                    return null;
                  }

                  function setTheme(newTheme) {
                    if (newTheme === 'DARK') {
                      document.documentElement.dataset.theme = 'dark';
                    } else if (newTheme === 'LIGHT') {
                      delete document.documentElement.dataset.theme;
                    }
                  }

                  var initialTheme = getCookieValue('${THEME_COOKIE_KEY}');
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                  if (!initialTheme) {
                    initialTheme = darkQuery.matches ? 'DARK' : 'LIGHT';
                  }
                  setTheme(initialTheme);

                  darkQuery.addEventListener('change', function (e) {
                    preferredTheme = getCookieValue('${THEME_COOKIE_KEY}');
                    if (!preferredTheme) {
                      setTheme(e.matches ? 'DARK' : 'LIGHT');
                    }
                  });
                })();
              `,
          }}
        />

        {children}
        {process.env.NODE_ENV !== "production" && <TailwindIndicator />}
      </body>
    </html>
  );
}
