import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Play, Download, Monitor, Gift, Check, Sparkles, Zap, Shield } from 'lucide-react';

export function Index() {
    const [email, setEmail] = useState('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const features = [
        {
            icon: Monitor,
            title: 'Watch everywhere',
            description: 'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
        },
        {
            icon: Download,
            title: 'Download your shows',
            description: 'Save your favorites easily and always have something to watch offline.',
        },
        {
            icon: Gift,
            title: 'Create profiles for kids',
            description: 'Send kids on adventures with their favorite characters in a space made just for them.',
        },
    ];

    const extraFeatures = [
        {
            icon: Zap,
            title: 'Lightning fast streaming',
            description: 'Experience buffer-free viewing with our advanced CDN technology.',
        },
        {
            icon: Shield,
            title: 'Secure & private',
            description: 'Your viewing history and personal data are always protected.',
        },
        {
            icon: Sparkles,
            title: 'Personalized for you',
            description: 'AI-powered recommendations that learn your taste over time.',
        },
    ];

    const faqs = [
        {
            question: 'What is Streamix?',
            answer: 'Streamix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
        },
        {
            question: 'How much does Streamix cost?',
            answer: 'Watch Streamix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $22.99 a month. No extra costs, no contracts.',
        },
        {
            question: 'Where can I watch?',
            answer: 'Watch anywhere, anytime. Sign in with your Streamix account to watch instantly on the web at streamix.com from your personal computer or on any internet-connected device.',
        },
        {
            question: 'How do I cancel?',
            answer: 'Streamix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
        },
        {
            question: 'What can I watch on Streamix?',
            answer: 'Streamix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Streamix originals, and more. Watch as much as you want, anytime you want.',
        },
        {
            question: 'Is Streamix good for kids?',
            answer: 'The Streamix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.',
        },
    ];

    const plans = [
        {
            name: 'Standard with ads',
            price: '$6.99',
            features: ['Great video quality in 1080p', 'Watch on your laptop and TV', 'Download on 2 devices'],
            popular: false
        },
        {
            name: 'Standard',
            price: '$15.49',
            features: ['Great video quality in 1080p', 'Watch on your laptop and TV', 'Download on 2 devices', 'Ad-free'],
            popular: false
        },
        {
            name: 'Premium',
            price: '$22.99',
            features: ['Best video quality in 4K + HDR', 'Watch on your laptop and TV', 'Download on 6 devices', 'Ad-free', 'Spatial audio'],
            popular: true
        },
    ];

    return (
        <div className="min-h-screen bg-black overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh">
                {/* Floating Orbs */}
                <div className="orb orb-red w-[500px] h-[500px] -top-64 -left-64" style={{ animationDelay: '0s' }} />
                <div className="orb orb-purple w-[400px] h-[400px] top-1/3 -right-48" style={{ animationDelay: '2s' }} />
                <div className="orb orb-blue w-[350px] h-[350px] bottom-0 left-1/3" style={{ animationDelay: '4s' }} />
                <div className="orb orb-red w-[300px] h-[300px] bottom-1/4 right-1/4" style={{ animationDelay: '6s' }} />

                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* Header */}
                <header className="absolute top-0 left-0 right-0 z-20 px-4 md:px-12 py-6 flex items-center justify-between">
                    <Link to="/" className="text-[#E50914] text-3xl md:text-4xl font-bold tracking-tighter glow-text">
                        STREAMIX
                    </Link>
                    <Link
                        to="/login"
                        className="btn-gradient btn-shimmer text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all"
                    >
                        Sign In
                    </Link>
                </header>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-gray-300 mb-8">
                        <Sparkles className="w-4 h-4 text-[#E50914]" />
                        <span>Now streaming in 4K HDR</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight glow-text">
                        Unlimited movies,<br />
                        <span className="bg-gradient-to-r from-[#E50914] via-[#ff4d58] to-[#E50914] bg-clip-text text-transparent">
                            TV shows, and more
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-3 font-light">
                        Starts at <span className="text-white font-semibold">$6.99</span>. Cancel anytime.
                    </p>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                        Ready to watch? Enter your email to create or restart your membership.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                        <div className="relative flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full glass-input px-5 py-4 rounded-xl text-white placeholder:text-gray-500 focus:outline-none text-base"
                                aria-label="Email address"
                            />
                        </div>
                        <Link
                            to={`/signup?email=${encodeURIComponent(email)}`}
                            className="flex items-center justify-center gap-2 btn-gradient btn-shimmer text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg"
                        >
                            Get Started
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </form>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-8 h-12 glass-card rounded-full flex justify-center">
                        <div className="w-1.5 h-3 bg-gradient-to-b from-[#E50914] to-transparent rounded-full mt-2" />
                    </div>
                </div>
            </section>

            {/* Trending Now Preview */}
            <section className="py-20 px-4 md:px-12 relative gradient-mesh-subtle">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Trending <span className="text-[#E50914]">Now</span>
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto">
                            See what everyone's watching right now
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop', title: 'Cosmic Journey' },
                            { img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=450&fit=crop', title: 'Dark Castle' },
                            { img: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=450&fit=crop', title: 'Neon Dreams' },
                            { img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=450&fit=crop', title: 'Planet Earth' },
                        ].map((item, i) => (
                            <div key={i} className="relative group cursor-pointer card-lift">
                                <div className="relative overflow-hidden rounded-xl">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center glow-red">
                                            <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <p className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3 badge-popular text-white text-xs font-bold px-3 py-1 rounded-md">
                                    TOP {i + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4 md:px-12 relative">
                <div className="divider-gradient mb-20" />
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why choose <span className="text-[#E50914]">Streamix</span>?
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto">
                            Experience entertainment like never before
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="glass-card glass-card-hover rounded-2xl p-8 text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E50914]/20 to-transparent flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="w-8 h-8 text-[#E50914] icon-glow" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {extraFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="glass-card glass-card-hover rounded-2xl p-8 text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="w-8 h-8 text-purple-400 icon-glow" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section className="py-20 px-4 md:px-12 gradient-mesh-subtle relative">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Choose your <span className="text-[#E50914]">plan</span>
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto">
                            Flexible plans for every viewer. Switch or cancel anytime.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative glass-card rounded-2xl p-8 transition-all duration-300 ${plan.popular
                                        ? 'glow-border scale-105 md:scale-110'
                                        : 'hover:border-white/20'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="badge-popular text-white text-xs font-bold px-4 py-1.5 rounded-full">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-4xl font-bold text-white mb-6">
                                    {plan.price}
                                    <span className="text-base font-normal text-gray-400">/mo</span>
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <div className="w-5 h-5 rounded-full bg-[#E50914]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-[#E50914]" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/signup"
                                    className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${plan.popular
                                            ? 'btn-gradient btn-shimmer text-white'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 md:px-12">
                <div className="divider-gradient mb-20" />
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Frequently Asked <span className="text-[#E50914]">Questions</span>
                        </h2>
                        <p className="text-gray-400">
                            Got questions? We've got answers.
                        </p>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'glow-border' : ''
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 text-left text-white hover:bg-white/5 transition-colors"
                                    aria-expanded={openFaq === index}
                                >
                                    <span className="text-lg font-medium pr-4">{faq.question}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-[#E50914]' : ''
                                            }`}
                                    />
                                </button>
                                {openFaq === index && (
                                    <div className="accordion-content px-5 pb-5 text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 md:px-12 gradient-mesh-subtle relative">
                <div className="orb orb-red w-[400px] h-[400px] -bottom-48 left-1/2 -translate-x-1/2" />
                <div className="max-w-2xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to start watching?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Enter your email to create or restart your membership.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 glass-input px-5 py-4 rounded-xl text-white placeholder:text-gray-500 focus:outline-none text-base"
                            aria-label="Email address"
                        />
                        <Link
                            to="/signup"
                            className="flex items-center justify-center gap-2 btn-gradient btn-shimmer text-white font-semibold px-8 py-4 rounded-xl transition-all"
                        >
                            Get Started
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-4 md:px-12">
                <div className="divider-gradient mb-12" />
                <div className="max-w-6xl mx-auto">
                    <Link to="/" className="text-[#E50914] text-2xl font-bold tracking-tighter inline-block mb-8">
                        STREAMIX
                    </Link>
                    <p className="text-gray-500 mb-8">Questions? Call 1-800-STREAMIX</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 mb-8">
                        {[
                            'FAQ', 'Help Center', 'Account', 'Media Center',
                            'Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use',
                            'Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us'
                        ].map((link, i) => (
                            <a
                                key={i}
                                href="#"
                                className="text-gray-500 hover:text-white text-sm transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                    <p className="text-gray-600 text-sm">
                        © 2026 Streamix, Inc. This is a demo application.
                    </p>
                </div>
            </footer>
        </div>
    );
}
