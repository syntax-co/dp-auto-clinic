"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  Phone,
  MapPin,
  Clock,
  Star,
  Car,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import TopBar from "@/components/navbar/top-bar";
import PageHeader from "@/components/navbar/header";
import { useState } from "react";
import { useEffect } from "react";

export default function LandingPage() {

  const[mapUrl,setMapUrl] = useState('')

  // use in a click handler
  const getUniversalMapsUrl = () => {
    const addr = encodeURIComponent("1230 Lee St, Des Plaines, IL 60016");
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setMapUrl(isiOS
      ? `https://maps.apple.com/?daddr=${addr}`                         // iOS → Apple Maps
      : `https://www.google.com/maps/dir/?api=1&destination=${addr}` ) // others → Google Maps
  };


  useEffect(() => {
    getUniversalMapsUrl()
  }, []);


  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      
      <TopBar />

      {/* Header */}
      <PageHeader />

      {/* Hero */}
      <section
        className="relative flex items-center border-b bg-center bg-no-repeat bg-cover
                  min-h-[60vh] sm:min-h-[65vh] md:h-[70vh]"
        style={{
          backgroundImage: "url('/images/tire-change.jpg')",
        }}
      >
        {/* overlay: a bit stronger on mobile for readability */}
        <div className="absolute inset-0 bg-black/50 sm:bg-black/40" />

        <div
          className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12
                    md:grid-cols-2 md:gap-16 md:py-16"
        >
          {/* Text block */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge className="mb-3 w-fit text-[#eaeff5]">Family-Owned • Since 2009</Badge>

            <h1
              className="mb-3 text-3xl font-bold tracking-tight text-[#eaeff5]
                        sm:text-4xl md:text-5xl leading-[200%]"
            >
              <span>
                Honest, Expert Auto Care in{" "}
              </span>
              <span
                className="rounded-md bg-primary px-3 py-1 
                          sm:px-4 text-[#eaeff5]"
              >
                Des Plaines
              </span>
            </h1>

            <p className="my-6 text-md text-white/90 sm:text-base md:mb-8">
              From routine maintenance to complex repairs—done right the first time.
              Transparent pricing, fast turnaround, and ASE-certified technicians.
            </p>

            {/* Buttons: full-width on mobile */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto text-[#eaeff5]">
                <a href="/booking" className="inline-flex items-center gap-2 ">
                  Book an Appointment <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href="#services">View Services</a>
              </Button>
            </div>

            {/* Stars + caption */}
            <div className="mt-5 flex items-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="text-muted-foreground/90">4.9/5 from 350+ local reviews</span>
            </div>
          </motion.div>

          {/* Services card: becomes translucent panel on mobile, sits below text */}
          <motion.div
            className="md:mt-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="overflow-hidden border-white/10 bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" /> Popular Services
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Oil & Filter Change", desc: "Full-synthetic options. 25-pt inspection." },
                  { title: "Brakes & Rotors", desc: "Pads, rotors, fluid flush, ABS diagnostics." },
                  { title: "Tires & Alignment", desc: "Mount/balance, TPMS, 4-wheel alignment." },
                  { title: "Heating & A/C", desc: "Recharge, leak test, compressor replacement." },
                  { title: "Check Engine Light", desc: "Computer diagnostics & drivability." },
                  { title: "Batteries & Starters", desc: "No-start diagnostics and replacement." },
                ].map((s) => (
                  <div key={s.title} className="rounded-xl border p-4">
                    <div className="font-medium">{s.title}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>



      {/* Trust Bar */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-3
        ">
          {[
            { label: "ASE‑Certified Techs" },
            // { label: "OEM‑Grade Parts" },
            { label: "Warranty on Repairs" },
            { label: "Same‑Day Service" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-center rounded-xl border bg-background px-4 py-3 text-sm font-medium">
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Full‑Service Auto Repair</h2>
          <p className="mt-3 text-muted-foreground">Maintenance and repairs for domestic & foreign vehicles—backed by transparent estimates and clear timelines.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Diagnostics", desc: "Advanced OBD‑II & electrical troubleshooting with dealer‑level tools." },
            { title: "Suspension", desc: "Shocks/struts, control arms, wheel bearings, ride‑quality fixes." },
            { title: "Engine Services", desc: "Timing belts, water pumps, gaskets, tune‑ups, fuel systems." },
            { title: "Transmission", desc: "Fluid service, clutches, minor repairs, partner rebuilds." },
            { title: "Fleet Care", desc: "Priority scheduling and maintenance plans for small fleets." },
            { title: "Pre‑Purchase Inspections", desc: "Know before you buy—multi‑point inspection with report." },
          ].map((s) => (
            <Card key={s.title}>
              <CardHeader>
                <CardTitle className="text-lg">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-7xl px-4 py-16 my-24">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-3xl font-bold tracking-tight">What Neighbors Say</h3>
          <p className="mt-3 text-muted-foreground">Real feedback from long‑time customers.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "They diagnosed my check engine light in an hour and had me back on the road the same day. Upfront and fair pricing.",
              name: "Marisol R.",
            },
            {
              quote:
                "Super professional—sent photos of the worn brakes and explained everything. Car feels brand new.",
              name: "Dmitri K.",
            },
            {
              quote:
                "I trust them with our small fleet. Scheduling is easy and the turnaround is fast.",
              name: "Ayla P.",
            },
          ].map((r) => (
            <Card key={r.name}>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">“{r.quote}”</p>
                <div className="mt-4 font-medium">{r.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 mb-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold tracking-tight">Get a Fast Quote</h3>
            <p className="mt-3 text-muted-foreground">Share a few details and we’ll text you an estimate.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! We\'ll text you a quote shortly.");
              }}
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <Input placeholder="Name" aria-label="Name" required />
              <Input type="tel" placeholder="Phone" aria-label="Phone" required />
              <Input className="sm:col-span-2" placeholder="Vehicle (e.g., 2018 Honda Civic)" aria-label="Vehicle" />
              <Textarea className="sm:col-span-2
              resize-none" placeholder="What do you need help with?" aria-label="Message" />
              <Button type="submit" className="sm:col-span-2">Send</Button>
            </form>
          </div>

          <div className="rounded-2xl border p-6">
            <h4 className="text-lg font-semibold">Shop Info</h4>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <a
                href={mapUrl}
                >
                  1230 Lee St, Des Plaines, IL 60016
                </a>
              </div>
              <a href="tel:+18475551234" className="flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" /> (847) 555‑1234</a>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Mon–Sat 8:00a–6:00p</div>
            </div>

            <div className="mt-6">
              <h5 className="text-sm font-semibold">Quick Links</h5>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-foreground">Services</a></li>
                <li><a href="#booking" className="hover:text-foreground">Book Service</a></li>
                <li><a href="#reviews" className="hover:text-foreground">Reviews</a></li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Des Plaines Auto Clinic. All rights reserved.</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#">Privacy</a>
            <span>•</span>
            <a className="hover:text-foreground" href="#">Terms</a>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 ">
          <Button asChild variant="outline" className="
          w-[45%]
          md:w-[45%]
          lg:w-full
          xl:w-full
          ">
            <a href="tel:+18475551234" className="inline-flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> Call</a>
          </Button>
          <Button asChild className=" text-[#eaeff5]
          ml-auto
          md:ml-auto
          lg:ml-none
          xl:ml-none

          w-[45%]
          md:w-[45%]
          lg:w-full
          xl:w-full
          ">
            <a href="/booking" className="inline-flex items-center justify-center gap-2"><CalendarCheck className="h-4 w-4" /> Book</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
