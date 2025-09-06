"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RotateCcw, CheckCircle, User, AlertCircle } from "lucide-react"

interface SelfieCaptureProps {
  onCapture: (selfie: File) => void
  onBack: () => void
}

export function SelfieCapture({ onCapture, onBack }: SelfieCaptureProps) {
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelfiePreview(e.target?.result as string)
        setSelfieFile(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const retakeSelfie = () => {
    setSelfiePreview(null)
    setSelfieFile(null)
  }

  const handleContinue = () => {
    if (selfieFile) {
      onCapture(selfieFile)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Take a Selfie</h3>
            <p className="text-sm text-muted-foreground">
              We'll use this to verify your identity matches your document
            </p>
          </div>
        </div>

        {/* Selfie Capture Area */}
        <div className="relative">
          {selfiePreview ? (
            <div className="relative">
              <div className="aspect-[3/4] max-w-sm mx-auto">
                <img
                  src={selfiePreview || "/placeholder.svg"}
                  alt="Selfie preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute top-4 right-4">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 w-10 p-0 bg-background/80 backdrop-blur-sm rounded-full"
                  onClick={retakeSelfie}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-2 bg-primary/90 text-white px-3 py-2 rounded-full text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Photo captured</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] max-w-sm mx-auto border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 space-y-4 hover:border-primary/50 hover:bg-accent/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium">Take your selfie</p>
                <p className="text-sm text-muted-foreground">Make sure your face is clearly visible</p>
              </div>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="bg-background/50 backdrop-blur-sm"
              >
                <Camera className="w-4 h-4 mr-2" />
                Open Camera
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileSelect(file)
            }}
          />
        </div>

        {/* Selfie Guidelines */}
        <div className="p-4 bg-accent/50 rounded-lg border">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Selfie Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Look directly at the camera</li>
                <li>• Remove glasses, hats, or face coverings</li>
                <li>• Ensure good lighting on your face</li>
                <li>• Keep a neutral expression</li>
                <li>• Make sure your entire face is visible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selfieFile}
          className="flex-1 gradient-bg text-white hover:opacity-90 transition-opacity"
        >
          Verify Identity
        </Button>
      </div>
    </div>
  )
}
