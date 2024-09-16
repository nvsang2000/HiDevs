import Link from "next/link";

export default function FooterSection() {
  return (
    <div className="bg-slate-500">
      <footer className="bg-dark text-white py-4">
        <div className="container mx-auto flex justify-between px-4 text-center">
          <p className="text-sm">© 2024 Viblo. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              About
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              Contact
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              FAQs
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              RSS
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              Rules
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
