'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { FlowingWaveBackground } from '@/components/FlowingWaveBackground';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Globe } from 'lucide-react';

export default function TermsOfServicePage() {
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
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            Terms of Service
                        </h1>
                        <p className="text-gray-600">Last updated: February 2026</p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <CheckCircle className="w-5 h-5 text-purple-700" />
                                Acceptance of Terms
                            </h2>
                            <p>
                                By accessing or using Stayra, you agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use our service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Globe className="w-5 h-5 text-purple-700" />
                                Our Service
                            </h2>
                            <p>
                                Stayra is a hotel metasearch platform that allows you to compare hotel prices
                                across multiple online travel agencies (OTAs) including Booking.com, Agoda,
                                Expedia, MakeMyTrip, and others.
                            </p>
                            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                <p className="text-sm text-yellow-800">
                                    <strong>Important:</strong> Stayra does not process bookings directly.
                                    When you select a hotel offer, you will be redirected to the partner
                                    booking site to complete your reservation. Your booking is subject to
                                    the terms and conditions of that partner.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <CheckCircle className="w-5 h-5 text-purple-700" />
                                User Accounts
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You must provide accurate and complete information when creating an account</li>
                                <li>You are responsible for maintaining the security of your account credentials</li>
                                <li>You must notify us immediately of any unauthorized access to your account</li>
                                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <XCircle className="w-5 h-5 text-purple-700" />
                                Prohibited Activities
                            </h2>
                            <p>You agree not to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Use our service for any unlawful purpose</li>
                                <li>Scrape, crawl, or extract data from our site without permission</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Interfere with or disrupt our service</li>
                                <li>Impersonate other users or entities</li>
                                <li>Use automated tools to access our service excessively</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <AlertTriangle className="w-5 h-5 text-purple-700" />
                                Disclaimers
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Hotel prices and availability are provided by our partner sites and may change without notice</li>
                                <li>We do not guarantee the accuracy of pricing information displayed</li>
                                <li>We are not responsible for bookings made through partner sites</li>
                                <li>Our service is provided "as is" without warranties of any kind</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Scale className="w-5 h-5 text-purple-700" />
                                Limitation of Liability
                            </h2>
                            <p>
                                To the maximum extent permitted by law, Stayra shall not be liable for any
                                indirect, incidental, special, consequential, or punitive damages arising
                                from your use of our service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Changes to These Terms
                            </h2>
                            <p>
                                We may update these Terms of Service from time to time. We will notify you
                                of any changes by posting the new terms on this page and updating the
                                "Last updated" date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Contact Us
                            </h2>
                            <p>
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <p className="mt-4 font-semibold">
                                Email: legal@stayra.com
                            </p>
                        </section>

                        {/* Affiliate Disclosure */}
                        <section className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-yellow-50 rounded-2xl border border-purple-200">
                            <h2 className="text-lg font-bold text-purple-900 mb-3">
                                Affiliate Disclosure
                            </h2>
                            <p className="text-sm text-gray-700">
                                Stayra earns commission from our partner booking sites when you make a reservation
                                through our links. This does not affect the price you pay - partner sites may offer
                                the same or different prices on their own platforms. We strive to provide unbiased
                                comparisons regardless of commission rates.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
