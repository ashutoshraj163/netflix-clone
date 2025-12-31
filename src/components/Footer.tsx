import { Link } from 'react-router-dom';

export function Footer() {
    const footerLinks = [
        { label: 'FAQ', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'Account', href: '/settings' },
        { label: 'Media Center', href: '#' },
        { label: 'Investor Relations', href: '#' },
        { label: 'Jobs', href: '#' },
        { label: 'Ways to Watch', href: '#' },
        { label: 'Terms of Use', href: '#' },
        { label: 'Privacy', href: '#' },
        { label: 'Cookie Preferences', href: '#' },
        { label: 'Corporate Information', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Speed Test', href: '#' },
        { label: 'Legal Notices', href: '#' },
        { label: 'Only on Streamix', href: '#' },
    ];

    const socialLinks = [
        { label: 'Facebook', icon: '📘', href: '#' },
        { label: 'Instagram', icon: '📷', href: '#' },
        { label: 'Twitter', icon: '🐦', href: '#' },
        { label: 'YouTube', icon: '📺', href: '#' },
    ];

    return (
        <footer className="bg-[#141414] py-12 px-4 md:px-12 mt-12 border-t border-gray-800">
            <div className="max-w-6xl mx-auto">
                {/* Social Links */}
                <div className="flex gap-4 mb-6">
                    {socialLinks.map(social => (
                        <a
                            key={social.label}
                            href={social.href}
                            className="text-2xl hover:opacity-80 transition-opacity"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Footer Links Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                    {footerLinks.map(link => (
                        link.href.startsWith('/') ? (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="text-gray-400 text-sm hover:underline hover:text-gray-300 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-gray-400 text-sm hover:underline hover:text-gray-300 transition-colors"
                            >
                                {link.label}
                            </a>
                        )
                    ))}
                </div>

                {/* Service Code */}
                <button className="text-gray-400 text-sm border border-gray-600 px-3 py-1 hover:text-white hover:border-white transition-colors mb-6">
                    Service Code
                </button>

                {/* Copyright */}
                <p className="text-gray-500 text-xs">
                    © 2024 Streamix, Inc. All rights reserved. This is a demo application.
                </p>
            </div>
        </footer>
    );
}
