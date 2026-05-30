import type { VoiceTone } from "../../../../types/article";
import { Button } from "../../../ui/button";
import CustomTextarea from "../../../ui/forms/custom-textarea";
import CustomLabel from "../../../ui/forms/custom-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/forms/custom-select";
import SparklesIcon from "../../../ui/icons/sparkles-icon";
import AiHeroBackground from "./ai-hero-background";
import { LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AiHeroArea({
  titleId,
  promptId,
  toneLabelId,
  promptValue,
  onPromptChange,
  toneValue,
  onToneChange,
  onGenerate,
  isLocked = false,
}: {
  titleId: string;
  promptId: string;
  toneLabelId: string;
  promptValue: string;
  onPromptChange: (value: string) => void;
  toneValue: VoiceTone;
  onToneChange: (value: VoiceTone) => void;
  onGenerate: () => void;
  isLocked?: boolean;
}) {
  const navigate = useNavigate();
  const promptHelpId = `${promptId}-help`;
  const promptLength = promptValue.trim().length;
  const canGenerate = promptLength >= 10;

  return (
    <section aria-labelledby={titleId} className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-px shadow-2xl">
        <AiHeroBackground />

        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-3xl space-y-8">
            <div
              className={`space-y-4 text-center transition-all duration-500 ${isLocked ? "opacity-50 blur-[1px]" : ""}`}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-accent">
                <SparklesIcon className="h-3.5 w-3.5" />
                AI Content Assistant
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Draft your article <span className="text-accent">with AI</span>
              </h2>
              <p className="mx-auto max-w-[48ch] text-balance text-sm leading-relaxed text-muted-foreground">
                Describe your idea and let the AI generate a polished first
                draft - tailored to your tone and audience.
              </p>
            </div>

            <div className="group relative">
              {isLocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl border border-accent/20 bg-background/20 backdrop-blur-md">
                  <div className="flex max-w-sm flex-col items-center space-y-4 rounded-2xl border border-border bg-background/80 p-6 text-center shadow-xl animate-in fade-in zoom-in duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <LockIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold">Premium AI Feature</h3>
                      <p className="text-sm text-muted-foreground">
                        Unlock AI to generate high-quality first drafts in
                        seconds.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-accent hover:brightness-110"
                      onClick={() => navigate("/dashboard/billing")}
                    >
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
              )}

              <div className="absolute -inset-px rounded-xl bg-accent/0 blur-sm transition-all duration-500 group-focus-within:bg-accent/10" />

              <div
                className={`relative rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm transition-all duration-300 group-focus-within:border-accent/30 group-focus-within:bg-background/60 ${isLocked ? "pointer-events-none select-none opacity-50 blur-sm grayscale" : ""}`}
              >
                <div className="p-4">
                  <CustomLabel htmlFor={promptId} className="sr-only">
                    AI prompt
                  </CustomLabel>
                  <CustomTextarea
                    id={promptId}
                    value={promptValue}
                    onChange={(e) => onPromptChange(e.target.value)}
                    placeholder="What do you want to write about? e.g. A comparison between headless CMS platforms for growing SaaS teams..."
                    className="min-h-[130px] w-full resize-none border-none bg-transparent p-0 text-base leading-relaxed shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0"
                    aria-describedby={promptHelpId}
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-border/25 bg-card/30 px-4 py-3 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex flex-wrap items-end gap-4">
                    <div className="space-y-1.5">
                      <CustomLabel
                        id={toneLabelId}
                        className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50"
                      >
                        Tone of voice
                      </CustomLabel>
                      <Select
                        value={toneValue}
                        onValueChange={(value: VoiceTone) => onToneChange(value)}
                      >
                        <SelectTrigger
                          className="h-9 min-w-[165px] border-border/30 bg-background/50 text-xs hover:bg-background/70"
                          aria-labelledby={toneLabelId}
                        >
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                        <SelectContent className="border-border bg-popover">
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="authoritative">Authoritative</SelectItem>
                          <SelectItem value="empathetic">Empathetic</SelectItem>
                          <SelectItem value="humorous">Humorous</SelectItem>
                          <SelectItem value="educational">Educational</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="hidden h-8 w-px bg-border/30 sm:block" />

                    <div className="space-y-1">
                      <p
                        id={promptHelpId}
                        className="text-[11px] italic text-muted-foreground/60"
                      >
                        Tip: include target audience and key points.
                      </p>
                      <p className="text-[11px] text-muted-foreground/60">
                        {promptLength}/10+ characters
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={onGenerate}
                    disabled={!canGenerate}
                    className="group relative h-10 overflow-hidden bg-accent px-6 font-semibold text-accent-foreground transition-all hover:scale-[1.02] active:scale-95 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
                    <SparklesIcon className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                    Generate Draft
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
