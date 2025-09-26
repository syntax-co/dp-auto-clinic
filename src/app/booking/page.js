"use client";

import { useMemo, useState } from "react";
import { addMinutes, format } from "date-fns";
import { Calendar as CalendarIcon, Car, Clock, MapPin, Phone, Wrench, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import TopBar from "@/components/navbar/top-bar";
import PageHeader from "@/components/navbar/header";
import Link from "next/link";

/**
 * Booking Page (JavaScript) for Des Plaines Auto Clinic
 * Save as: app/booking/page.jsx
 *
 * Requires shadcn components:
 *   npx shadcn@latest add button card input textarea popover calendar select label radio-group
 * And date-fns:
 *   npm i date-fns
 */

const SERVICES = [
  { id: "oil", name: "Oil & Filter Change", minutes: 45, price: 69 },
  { id: "brakes", name: "Brake Inspection / Service", minutes: 90, price: 149 },
  { id: "alignment", name: "Tire Rotation & Alignment Check", minutes: 60, price: 99 },
  { id: "ac", name: "A/C Recharge & Leak Test", minutes: 90, price: 159 },
  { id: "diagnostics", name: "Computer Diagnostics (CEL)", minutes: 60, price: 129 },
  { id: "battery", name: "Battery / Starter Check", minutes: 45, price: 59 },
];

const SHOP = {
  openHour: 8, // 8:00 AM
  closeHour: 18, // 6:00 PM
  slotInterval: 30, // minutes
  address: "1230 Lee St, Des Plaines, IL 60016",
  phone: "(847) 555-1234",
};

export default function BookingPage() {
  const [serviceId, setServiceId] = useState("oil");
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("");
  const [fname, setFname] = useState("");
  const [phone, setPhoneState] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [notes, setNotes] = useState("");
  const [contactMethod, setContactMethod] = useState("text");
  const [submitted, setSubmitted] = useState(false);

  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId) || SERVICES[0], [serviceId]);

  const timeSlots = useMemo(() => {
    if (!date) return [];
    const start = new Date(date);
    start.setHours(SHOP.openHour, 0, 0, 0);
    const end = new Date(date);
    end.setHours(SHOP.closeHour, 0, 0, 0);

    const slots = [];
    let cursor = start;
    while (cursor < end) {
      const label = format(cursor, "h:mm a");
      const isLunch = format(cursor, "H:mm") === "12:00"; // example block
      if (!isLunch) slots.push(label);
      cursor = addMinutes(cursor, SHOP.slotInterval);
    }
    return slots;
  }, [date]);

  const estimate = useMemo(() => service.price, [service]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!date || !time || !fname || !phone) {
      alert("Please complete the required fields (name, phone, date and time).");
      return;
    }
    setSubmitted(true);
    // POST to your API here if needed
    // await fetch("/api/booking", { method: "POST", body: JSON.stringify({...}) })
  }

  if (submitted) {
    return (
      <div className="w-screen h-screen 
      flex flex-col"
      >
        <PageHeader />

        <div className="mx-auto max-w-3xl px-4 py-16 flex-1
        flex items-center">
          <Card className="border-primary/30">
            <CardContent className="py-10 text-center">
              <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h1 className="text-2xl font-semibold">Request Received</h1>
              <p className="mt-2 text-muted-foreground">
                {`Thanks ${fname}! We'll confirm your ${service.name.toLowerCase()} on ${date ? format(date, "EEE, MMM d") : "your date"} at ${time}.`}
                {` Expect a ${contactMethod === "text" ? "text message" : contactMethod} shortly.`}
              </p>
              <div className="mt-6 grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> {SHOP.phone}</div>
                <div className="flex items-center justify-center gap-2"><MapPin className="h-4 w-4" /> {SHOP.address}</div>
              </div>
              <Button className="mt-8 cursor-pointer" 
              onClick={() => setSubmitted(false)}>Book Again</Button>
              <Button className='mt-8 ml-4 cursor-pointer'>
                <Link className="" 
                href='/'
                >Done</Link>
              </Button>

            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      <PageHeader />

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_380px]">
        {/* Left: Form */}
        <section>
          <h1 className="text-3xl font-bold tracking-tight">Book an Appointment</h1>
          <p className="mt-2 text-muted-foreground">Choose a service, pick a time, and tell us about your vehicle. We'll confirm ASAP.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="service">Select service</Label>
                  <Select value={serviceId} onValueChange={(v) => setServiceId(v)}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name} · ~{s.minutes} min · ${s.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                          type="button"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "EEE, MMM d, yyyy") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid gap-2">
                    <Label>Time</Label>
                    {date ? (
                      timeSlots.length ? (
                        <Select value={time} onValueChange={(v) => setTime(v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                <Clock className="mr-2 h-3.5 w-3.5 inline" /> {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="text-sm text-muted-foreground">No slots available for this date.</div>
                      )
                    ) : (
                      <div className="text-sm text-muted-foreground">Select a date to see available times.</div>
                    )}
                  </div>

                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vehicle</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="vehicle">Make & model</Label>
                  <Input id="vehicle" placeholder="e.g., 2018 Honda Civic" value={vehicle} onChange={(e) => setVehicle(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="miles">Mileage (optional)</Label>
                  <Input id="miles" placeholder="e.g., 72,350" />
                </div>
                <div className="sm:col-span-2 grid gap-2">
                  <Label htmlFor="concern">Describe the issue or request (optional)</Label>
                  <Textarea id="concern" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us anything helpful (sounds, leaks, dash lights)…" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={fname} onChange={(e) => setFname(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhoneState(e.target.value)} required />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="sm:col-span-2">
                  <Label>Preferred contact method</Label>
                  <RadioGroup
                    className="mt-2 grid grid-cols-3 gap-2"
                    value={contactMethod}
                    onValueChange={setContactMethod}
                  >
                    <div className="flex items-center gap-2 rounded-md border p-3">
                      <RadioGroupItem id="text" value="text" />
                      <Label htmlFor="text" className="cursor-pointer">Text</Label>
                    </div>
                    <div className="flex items-center gap-2 rounded-md border p-3">
                      <RadioGroupItem id="call" value="call" />
                      <Label htmlFor="call" className="cursor-pointer">Call</Label>
                    </div>
                    <div className="flex items-center gap-2 rounded-md border p-3">
                      <RadioGroupItem id="emailpref" value="email" />
                      <Label htmlFor="emailpref" className="cursor-pointer">Email</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full">Request Appointment</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </section>

        {/* Right: Summary */}
        <aside className="space-y-4
        flex-col
        hidden
        md:hidden
        lg:flex
        xl:flex
        
        ">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Car className="h-4 w-4" /> {vehicle || "Vehicle not set"}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Wrench className="h-4 w-4" /> {service.name} (~{service.minutes} min)</div>
              <div className="flex items-center gap-2 text-muted-foreground"><CalendarIcon className="h-4 w-4" /> {date ? format(date, "EEE, MMM d, yyyy") : "No date"} {time && `• ${time}`}</div>
              <div className="pt-2 text-sm">Estimated total</div>
              <div className="text-2xl font-semibold">${estimate}</div>
              <p className="text-xs text-muted-foreground">Estimate shown before tax/fees. Final pricing confirmed after inspection.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shop Info</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {SHOP.address}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {SHOP.phone}</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Mon–Sat: 8:00a–6:00p</div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
