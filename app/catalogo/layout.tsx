import { ThemeProvider } from "next-themes";

export default async function MuebleriaLuxe({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </ThemeProvider>
  );
}
