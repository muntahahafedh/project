//src/components/ApplyForm
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function ApplyForm({ onSubmit, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onSubmit();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 border-b border-[#F5F5F5]">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-[#212121]">Apply for Job</h1>
      </div>

      {/* Form Body */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="max-w-md mx-auto space-y-5">
          {/* Name */}
          <div>
            <Label htmlFor="apply-name">Full Name</Label>
            <Input
              id="apply-name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="apply-email">Email</Label>
            <Input
              id="apply-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="apply-phone">Phone Number</Label>
            <Input
              id="apply-phone"
              type="tel"
              placeholder="+968 XXXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {/* Skills */}
          <div>
            <Label htmlFor="apply-skills">Skills & Experience</Label>
            <Textarea
              id="apply-skills"
              placeholder="Tell us about your relevant skills and experience..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1.5 min-h-[120px]"
            />
          </div>

          {/* Upload */}
          <div>
            <Label>Upload Resume</Label>
            <div className="mt-1.5 border-2 border-dashed border-[#009688]/30 rounded-lg p-8 text-center hover:border-[#009688] transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-[#009688] mx-auto mb-3" />
              <p className="text-[#212121] mb-1">Click to upload resume</p>
              <p className="text-[#212121]/60">PDF, DOC, or DOCX (Max 5MB)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-6 border-t border-[#F5F5F5]">
        <Button
          onClick={handleSubmit}
          className="w-full bg-[#009688] hover:bg-[#00796B] text-white"
          disabled={!name || !email || !phone}
        >
          Submit Application
        </Button>
      </div>

      {/* Success Message */}
      <AlertDialog open={showSuccess}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#009688]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#009688]" />
              </div>
            </div>

            <AlertDialogTitle className="text-center">
              Application Sent Successfully!
            </AlertDialogTitle>

            <AlertDialogDescription className="text-center">
              We've received your application and will review it shortly. Good
              luck!
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
