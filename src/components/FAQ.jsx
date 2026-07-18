"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "What sizes are available?",
    answer: "Our jerseys are available in standard sizing: S, M, L, XL, and XXL. We recommend checking our detailed Size Guide to find your perfect fit before ordering.",
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping typically takes 3 to 5 business days for domestic orders. International shipping can take 7 to 14 business days depending on customs and local courier speeds. Free shipping is applied to all domestic orders!",
  },
  {
    question: "Are these jerseys replica or authentic player edition?",
    answer: "We offer both! The 'Official' badges indicate standard replica jerseys (designed for comfortable fan wear), while our special premium editions match the exact lightweight, body-fitting player specs.",
  },
  {
    question: "Can I customize the jersey with a name and number?",
    answer: "Yes! Many of our jerseys offer personalization options. You can add your favorite player's name and number, or choose a custom name and number during checkout.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="my-8 scroll-mt-24">
      <div className="text-[2.2rem] font-bold my-10 text-primary border-l-[8px] border-secondary pl-5 flex items-center">
        <i className="fas fa-question-circle text-secondary mr-3"></i>
        FAQ
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-cardBg rounded-custom shadow-custom overflow-hidden transition-all duration-300 border border-customGray-medium/20"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-primary hover:text-accent transition-colors duration-200 focus:outline-none"
              >
                <span className="flex items-center gap-3">
                  <span className="text-secondary">⚽</span>
                  {item.question}
                </span>
                <i
                  className={`fas fa-chevron-down text-sm text-customGray-dark/50 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-accent" : ""
                  }`}
                ></i>
              </button>

              {/* Answer Content */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 border-t border-customGray-medium/20" : "max-h-0"
                }`}
              >
                <p className="p-6 text-customGray-dark leading-relaxed text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
