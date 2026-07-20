import { Mic, Search, Send, UploadCloud } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { PageHeader } from "@/components/shared/page-header";
import { aiModules } from "@/data/mock";

export function AiCenterPage() {
  const [selected, setSelected] = useState(aiModules[0]);
  const { notify } = useToast();

  return (
    <>
      <PageHeader
        eyebrow="AI Center"
        title="Dental intelligence workspace"
        description="AI assistant, symptom checking, treatment recommendations, scheduling, cost estimates, smile analysis, oral health scoring, FAQ search, voice assistant, and emergency guidance."
      />

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          {aiModules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.title}
                type="button"
                onClick={() => setSelected(module)}
                className={`premium-panel flex items-start gap-3 p-4 text-left transition hover:-translate-y-0.5 ${
                  selected.title === module.title ? "ring-2 ring-primary" : ""
                }`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <strong className="block">{module.title}</strong>
                  <small className="mt-1 block leading-5 text-muted-foreground">{module.result}</small>
                </span>
              </button>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-2xl font-black">{selected.title}</CardTitle>
                <CardDescription>{selected.detail}</CardDescription>
              </div>
              <Badge variant="teal">Demo AI</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="workspace">
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="workspace">Workspace</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>

              <TabsContent value="workspace" className="space-y-4">
                {selected.title === "AI Dental Assistant" ? <ChatModule /> : null}
                {selected.title === "AI Symptom Checker" ? <SymptomModule /> : null}
                {selected.title === "AI Treatment Recommendation" ? <RecommendationModule /> : null}
                {selected.title === "AI Appointment Scheduler" ? <SchedulerModule /> : null}
                {selected.title === "AI Cost Estimator" ? <CostModule /> : null}
                {selected.title === "AI Smile Analysis" ? <SmileModule /> : null}
                {selected.title === "Oral Health Score" ? <OralScoreModule /> : null}
                {selected.title === "AI FAQ Search" ? <FaqSearchModule /> : null}
                {selected.title === "AI Voice Assistant" ? <VoiceModule /> : null}
                {selected.title === "Emergency AI Guidance" ? <EmergencyModule /> : null}
                <Button
                  onClick={() => notify({ title: "AI output generated", description: selected.result })}
                >
                  <Send className="h-4 w-4" />
                  Generate Demo Result
                </Button>
              </TabsContent>

              <TabsContent value="history" className="grid gap-3">
                {["Patient education", "Reception workflow", "Treatment planning"].map((item) => (
                  <div className="rounded-xl border bg-muted/35 p-4" key={item}>
                    <p className="font-bold">{item}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{selected.detail}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="output">
                <div className="rounded-xl border bg-gradient-to-br from-sky-500/10 to-teal-500/10 p-5">
                  <p className="text-sm font-bold uppercase tracking-wider text-primary">Suggested answer</p>
                  <h3 className="mt-3 text-2xl font-black">{selected.result}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{selected.detail}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ChatModule() {
  return (
    <div className="grid gap-3">
      <div className="rounded-xl border bg-muted/35 p-4">
        <p className="font-bold">AI Chat</p>
        <p className="text-sm text-muted-foreground">Patient asks: Why is my tooth sensitive after whitening?</p>
      </div>
      <Textarea placeholder="Ask the AI dental assistant..." />
    </div>
  );
}

function SymptomModule() {
  return (
    <div className="grid gap-3">
      <Textarea placeholder="Enter symptoms: pain type, duration, swelling, sensitivity..." defaultValue="Cold sensitivity, night pain, pain while chewing" />
      <Info label="Suggested Dental Conditions" value="Pulpitis, cracked tooth, gum recession" />
    </div>
  );
}

function RecommendationModule() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Info label="Recommended Treatment" value="Diagnostic X-ray and root canal consultation" />
      <Info label="Priority Level" value="High" />
    </div>
  );
}

function SchedulerModule() {
  return (
    <div className="grid gap-3">
      <Info label="Suggested Time Slots" value="10:30 AM, 5:30 PM, 7:00 PM" />
      <Info label="Doctor Availability" value="Dr. Lisha and Dr. Arjun available for endodontic consults" />
    </div>
  );
}

function CostModule() {
  return <Info label="Estimated Treatment Cost" value="Rs. 6,500 - Rs. 15,000 depending on crown and X-ray requirements" />;
}

function SmileModule() {
  return (
    <div className="grid gap-3">
      <Button variant="outline"><UploadCloud className="h-4 w-4" /> Upload Image</Button>
      <Info label="AI Analysis" value="Mild staining, good alignment, improve shade symmetry" />
      <Info label="Smile Score" value="82/100" />
    </div>
  );
}

function OralScoreModule() {
  return (
    <div className="grid gap-3">
      <Info label="Health Score" value="76/100" />
      <Info label="Improvement Suggestions" value="Professional scaling, flossing routine, sensitivity toothpaste" />
    </div>
  );
}

function FaqSearchModule() {
  return (
    <div className="grid gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search FAQs..." defaultValue="Is whitening safe?" />
      </div>
      <Info label="Suggested Answers" value="Whitening is safe when performed under dental supervision after an oral health check." />
    </div>
  );
}

function VoiceModule() {
  return (
    <div className="grid gap-3">
      <Button variant="outline"><Mic className="h-4 w-4" /> Start Voice Command</Button>
      <Info label="Voice Commands" value="Schedule cleaning, find patient, create invoice" />
      <Info label="Voice Responses" value="Appointment draft prepared for tomorrow evening." />
    </div>
  );
}

function EmergencyModule() {
  return (
    <div className="grid gap-3">
      <Textarea defaultValue="Facial swelling with severe tooth pain" />
      <Info label="Emergency Advice" value="Use cold compress, avoid heat, do not self-medicate antibiotics." />
      <Info label="Recommended Immediate Action" value="Urgent dental review today." />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-muted/35 p-4">
      <p className="text-xs font-black uppercase tracking-wider text-primary">{label}</p>
      <p className="mt-2 font-bold leading-6">{value}</p>
    </div>
  );
}
