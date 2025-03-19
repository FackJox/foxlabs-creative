export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black p-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="text-xl font-bold uppercase tracking-tighter">RAW/STUDIO</div>
        <div className="text-sm">© {new Date().getFullYear()} RAW/STUDIO. ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  )
}

