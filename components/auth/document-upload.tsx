"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, Camera, FileText, X, CheckCircle, AlertTriangle } from "lucide-react"

interface DocumentUploadProps {
  documentType: "nid" | "passport" | "driving-license"
  requiresBack: boolean
  onUploadComplete: (documents: { front?: File; back?: File }) => void
  onBack: () => void
}

export function DocumentUpload({ documentType, requiresBack, onUploadComplete, onBack }: DocumentUploadProps) {
  const [frontImage, setFrontImage] = useState<File | null>(null)
  const [backImage, setBackImage] = useState<File | null>(null)
  const [frontPreview, setFrontPreview] = useState<string | null>(null)
  const [backPreview, setBackPreview] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<"front" | "back" | null>(null)

  const frontInputRef = useRef<HTMLInputElement>(null)
  const backInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File, side: "front" | "back") => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const preview = e.target?.result as string
        if (side === "front") {
          setFrontImage(file)
          setFrontPreview(preview)
        } else {
          setBackImage(file)
          setBackPreview(preview)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent, side: "front" | "back") => {
    e.preventDefault()
    setDragOver(null)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0], side)
    }
  }

  const handleDragOver = (e: React.DragEvent, side: "front" | "back") => {
    e.preventDefault()
    setDragOver(side)
  }

  const handleDragLeave = () => {
    setDragOver(null)
  }

  const removeImage = (side: "front" | "back") => {
    if (side === "front") {
      setFrontImage(null)
      setFrontPreview(null)
    } else {
      setBackImage(null)
      setBackPreview(null)
    }
  }

  const canProceed = frontImage && (!requiresBack || backImage)

  const handleContinue = () => {
    if (canProceed) {
      const documents: { front?: File; back?: File } = {}
      if (frontImage) documents.front = frontImage
      if (backImage) documents.back = backImage
      onUploadComplete(documents)
    }
  }

  const UploadArea = ({
    side,
    preview,
    image,
  }: { side: "front" | "back"; preview: string | null; image: File | null }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium">
        {side === "front" ? "Front Side" : "Back Side"}
        {side === "front" && <span className="text-destructive ml-1">*</span>}
      </Label>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragOver === side
            ? "border-primary bg-primary/5"
            : image
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
        }`}
        onDrop={(e) => handleDrop(e, side)}
        onDragOver={(e) => handleDragOver(e, side)}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview || "/placeholder.svg"}
              alt={`${documentType} ${side}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                onClick={() => removeImage(side)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="absolute bottom-2 left-2">
              <div className="flex items-center space-x-1 bg-primary/90 text-white px-2 py-1 rounded text-xs">
                <CheckCircle className="w-3 h-3" />
                <span>Uploaded</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="font-medium">
                Upload {side} side of your {documentType.replace("-", " ")}
              </p>
              <p className="text-sm text-muted-foreground">Drag and drop or click to browse</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => (side === "front" ? frontInputRef.current?.click() : backInputRef.current?.click())}
              >
                <FileText className="w-4 h-4 mr-2" />
                Browse Files
              </Button>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        )}

        <input
          ref={side === "front" ? frontInputRef : backInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileSelect(file, side)
          }}
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Upload className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Upload Document Photos</h3>
            <p className="text-sm text-muted-foreground">Take clear photos of your {documentType.replace("-", " ")}</p>
          </div>
        </div>

        {/* Upload Areas */}
        <div className="grid gap-6">
          <UploadArea side="front" preview={frontPreview} image={frontImage} />
          {requiresBack && <UploadArea side="back" preview={backPreview} image={backImage} />}
        </div>

        {/* Tips */}
        <div className="p-4 bg-accent/50 rounded-lg border">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Photo Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure good lighting and avoid shadows</li>
                <li>• Keep the document flat and fully visible</li>
                <li>• Make sure all text is clear and readable</li>
                <li>• Avoid glare and reflections</li>
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
          disabled={!canProceed}
          className="flex-1 gradient-bg text-white hover:opacity-90 transition-opacity"
        >
          Continue to Selfie
        </Button>
      </div>
    </div>
  )
}
