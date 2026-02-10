'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { FlowingWaveBackground } from '@/components/FlowingWaveBackground';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, Eye, Trash2, Users } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen relative">
            <FlowingWaveBackground />
            <Navbar />

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-900 to-purple-700 rounded-full mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600">Last updated: February 2026</p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Eye className="w-5 h-5 text-purple-700" />
                                Information We Collect
                            </h2>
                            <p>We collect information you provide directly to us, including:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
                                <li><strong>Search Data:</strong> Hotel searches, dates, and preferences to improve our service</li>
                                <li><strong>Usage Information:</strong> How you interact with our site to enhance user experience</li>
                                <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers for security</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Lock className="w-5 h-5 text-purple-700" />
                                How We Use Your Information
                            </h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Provide, maintain, and improve our hotel comparison services</li>
                                <li>Process your searches and display relevant hotel offers</li>
                                <li>Send you account-related communications</li>
                                <li>Detect and prevent fraud and abuse</li>
                                <li>Analyze usage patterns to improve our platform</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-purple-700" />
                                Information Sharing
                            </h2>
                            <p>We share information with third parties only in the following circumstances:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Affiliate Partners:</strong> When you click to book a hotel, you are redirected to our partner sites (Booking.com, Agoda, Expedia, etc.) who have their own privacy policies</li>
                                <li><strong>Service Providers:</strong> We work with trusted partners for analytics, email, and hosting</li>
                                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Trash2 className="w-5 h-5 text-purple-700" />
                                Your Rights
                            </h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Access, correct, or delete your personal information</li>
                                <li>Opt out of marketing communications</li>
                                <li>Request a copy of your data</li>
                                <li>Close your account at any time</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Mail className="w-5 h-5 text-purple-700" />
                                Contact Us
                            </h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <p className="mt-4 font-semibold">
                                Email: privacy@stayra.com
                            </p>
                        </section>

                        {/* Affiliate Disclosure */}
                        <section className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-yellow-50 rounded-2xl border border-purple-200">
                            <h2 className="text-lg font-bold text-purple-900 mb-3">
                                Affiliate Disclosure
                            </h2>
                            <p className="text-sm text-gray-700">
                                Stayra is a metasearch platform that compares hotel prices across multiple booking sites.
                                When you click on a hotel offer and make a booking through our partner sites,
                                we may earn a commission at no additional cost to you. This helps us keep our service
                                free for users while providing unbiased price comparisons.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
