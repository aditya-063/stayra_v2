'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, FileText, Mail, Github, Heart } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-white/80 backdrop-blur-md border-t border-purple-100 z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-yellow-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-900">
                                Stayra
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 mb-4">
                            The intelligent hotel metasearch engine. We compare prices from top booking sites to find you the best deal.
                        </p>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/help" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-sm text-gray-600 hover:text-purple-700 transition-colors flex items-center gap-2">
                                    <Shield className="w-3 h-3" />
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-gray-600 hover:text-purple-700 transition-colors flex items-center gap-2">
                                    <FileText className="w-3 h-3" />
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookie" className="text-sm text-gray-600 hover:text-purple-700 transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Affiliate Disclosure</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Stayra is an independent metasearch platform. We may earn a commission when you click on links to our partner sites and make a booking. This does not affect the price you pay.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        &copy; {currentYear} Stayra. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-700 transition-colors">
                            <Github className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="mailto:support@stayra.com" className="text-gray-400 hover:text-purple-700 transition-colors">
                            <Mail className="w-5 h-5" />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
