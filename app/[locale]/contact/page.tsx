"use client";

import React from "react";
import { ContactHeader } from "@/components/menu/contact/ContactHeader";
import { ContactInfo } from "@/components/menu/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 pb-32">
      <ContactHeader />
      <ContactInfo />
    </div>
  );
}
