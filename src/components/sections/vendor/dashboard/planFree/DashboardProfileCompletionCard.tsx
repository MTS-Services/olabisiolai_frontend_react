import { Check, Circle, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef, useState } from "react";

export function DashboardProfileCompletionCard() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Card>
        <div className="space-y-4 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground font-manrope sm:text-xl">Profile Completion</h2>
            <h2 className="text-lg font-bold text-brand-red font-manrope sm:text-xl">75%</h2>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-blue-100/70">
            <div className="h-full w-[75%] rounded-full bg-brand-red transition-all duration-300" />
          </div>
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="flex items-center gap-1.5 text-sm font-normal text-foreground font-inter sm:text-base">
              <Check className="size-3 rounded-full bg-success text-success-foreground sm:size-4" />
              Business Info
            </p>
            <p className="flex items-center gap-1.5 text-sm font-normal text-foreground font-inter sm:text-base">
              <Check className="size-3 rounded-full bg-success text-success-foreground sm:size-4" />
              Verified ID
            </p>
            <p className="flex items-center gap-1.5 text-sm font-normal text-foreground font-inter sm:text-base">
              <Check className="size-3 rounded-full bg-success text-success-foreground sm:size-4" />
              Bank Linked
            </p>
            <p className="flex items-center gap-1.5 text-sm font-normal text-foreground font-inter sm:text-base">
              <Circle className="size-2.5 text-muted-foreground sm:size-3.5" />
              Profile Photo
            </p>
          </div>
          <Button
            variant="secondary"
            className="w-full bg-blue-100 py-2.5 text-sm font-semibold text-foreground font-inter hover:bg-blue-100/80 sm:py-3 sm:text-base"
            onClick={() => setShowUploadModal(true)}
          >
            Complete Next Step
          </Button>
        </div>
      </Card>

      {/* Profile Photo Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <Card className="w-full max-w-md bg-card rounded-xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-base font-semibold text-foreground font-manrope">Profile Photo</h2>
              <button
                type="button"
                className="rounded-full border p-1 text-muted-foreground hover:bg-muted transition-colors"
                onClick={() => setShowUploadModal(false)}
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              <p className="text-xs font-semibold tracking-wide text-foreground uppercase font-inter">
                Business Logo
              </p>

              {/* Upload Area */}
              <div
                className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 py-10 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex items-center justify-center rounded-full bg-muted p-3">
                  <Upload className="size-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-blue-500 font-inter">Click to upload images</p>
                <p className="text-xs text-muted-foreground font-inter">Upload images (JPG, PNG, WebP)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {selectedFile && (
                <p className="text-xs text-muted-foreground font-inter truncate">
                  Selected: {selectedFile.name}
                </p>
              )}

              {/* Upload Button */}
              <Button
                className="w-full bg-blue-500 py-2.5 text-sm font-semibold text-white font-inter hover:bg-blue-600 sm:py-3 sm:text-base"
                onClick={() => setShowUploadModal(false)}
              >
                Upload
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}