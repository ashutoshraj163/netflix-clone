import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export function NotFound() {
    return (
        <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
            <div className="text-center max-w-lg animate-fade-in">
                <div className="text-[10rem] font-bold text-[#E50914] leading-none mb-4">
                    404
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Lost your way?
                </h1>

                <p className="text-gray-400 text-lg mb-8">
                    Sorry, we can't find that page. You'll find lots to explore on the home page.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Streamix Home
                    </Link>

                    <Link
                        to="/explore"
                        className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded transition-colors"
                    >
                        <Search className="w-5 h-5" />
                        Browse Content
                    </Link>
                </div>

                <div className="mt-12 text-gray-500 text-sm">
                    Error Code: <span className="font-mono">NSES-404</span>
                </div>
            </div>
        </div>
    );
}
