export default async function AuthdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <main>{children}</main>
    </div>
  );
}
