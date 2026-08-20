"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import CampaignForm from "@/components/call-manager/CampaignForm";
import LiveTracking from "@/components/call-manager/LiveTracking";
import ContactsTable from "@/components/call-manager/ContactsTable";
import { CampaignFormData, Contact, LiveTrackingStats, UploadSourceType } from "@/components/call-manager/types";

const dummyContacts: Contact[] = [
  { id: 1, name: "Ravi Kumar", phone: "+91 98765 43210", status: "completed", response: "Interested", datetime: "2023-10-01 10:30" },
  { id: 2, name: "Priya Shah", phone: "+91 87654 32109", status: "completed", response: "Callback", datetime: "2023-10-01 11:00" },
  { id: 3, name: "Anil Mehta", phone: "+91 76543 21098", status: "no-answer", response: "—", datetime: "2023-10-01 11:15" },
  { id: 4, name: "Sneha Patel", phone: "+91 65432 10987", status: "calling", response: "—", datetime: "2023-10-01 11:20" },
  { id: 5, name: "Karan Joshi", phone: "+91 54321 09876", status: "pending", response: "—", datetime: "2023-10-01 11:25" },
];

export default function CallManagerPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [formData, setFormData] = useState<CampaignFormData>({
    campaignTitle: "",
    agent: "",
    scheduleDate: new Date().toISOString().split("T")[0],
    scheduleTime: "09:00",
    script: "",
    uploadSource: "excel",
    googleSheetUrl: "",
    singleContactName: "",
    singleContactPhone: "",
    autoSendMessageEnabled: true,
    autoSendTrigger: "interested",
    autoSendMaterialType: "text",
    autoSendMaterialId: "txt-1",
    autoSendTargetCategory: "all",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  // File Upload State
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [liveStats, setLiveStats] = useState<LiveTrackingStats>({
    registry: 5,
    standby: 2,
    dialer: 1,
    analysis: 2,
    completed: 2,
    failed: 0,
  });

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const handleChange = (updates: Partial<CampaignFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear errors for fields being updated
    const newErrors = { ...errors };
    Object.keys(updates).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const handleFileUpload = (file: File) => {
    setFileUploaded(true);
    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + " KB");
    setContacts(dummyContacts);
    setErrors(prev => {
      const e = { ...prev };
      delete e.upload;
      return e;
    });
  };

  const handleGoogleSheetLoaded = (loadedContacts: Contact[], sheetId: string) => {
    setContacts(loadedContacts);
    setFileUploaded(true);
    setFileName(`Google Sheet (${sheetId.substring(0, 8)}...)`);
    setFileSize("");
    setErrors(prev => {
      const e = { ...prev };
      delete e.googleSheetUrl;
      delete e.upload;
      return e;
    });
  };

  const handleDeleteContact = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.campaignTitle.trim()) newErrors.campaignTitle = "Campaign Name is required.";
    if (!formData.agent) newErrors.agent = "Please select an AI Agent.";
    if (!formData.scheduleDate) newErrors.scheduleDate = "Schedule Date is required.";
    if (!formData.scheduleTime) newErrors.scheduleTime = "Schedule Time is required.";
    if (!formData.script.trim()) newErrors.script = "Agent Script is required.";

    if (formData.uploadSource === "google_sheet") {
      if (!formData.googleSheetUrl?.trim()) {
        newErrors.googleSheetUrl = "Google Sheet URL is required.";
      } else {
        const sheetRegex = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+/;
        if (!sheetRegex.test(formData.googleSheetUrl.trim())) {
          newErrors.googleSheetUrl = "Must be a valid Google Sheets URL (e.g., https://docs.google.com/spreadsheets/d/...).";
        }
      }
    } else if (formData.uploadSource === "single") {
      if (!formData.singleContactName?.trim()) newErrors.singleContactName = "Name is required.";
      if (!formData.singleContactPhone?.trim()) newErrors.singleContactPhone = "Phone number is required.";
    } else if (!fileUploaded) {
      newErrors.upload = "Please upload a contact list.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Dummy action for Launch
      if (formData.uploadSource === "google_sheet" || formData.uploadSource === "single") {
        setContacts(dummyContacts);
      }
      alert("Campaign Launched Successfully with Automated WhatsApp Messaging Rules!");
    }
  };

  return (
    <DashboardShell title="Call Manager">
      <div className="flex flex-col gap-6 p-1 sm:p-4">
        {/* Top Section: Two Columns */}
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* Left Column: Form */}
          <div className="h-full">
            <CampaignForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              errors={errors}
              onFileUpload={handleFileUpload}
              fileUploaded={fileUploaded}
              fileName={fileName}
              fileSize={fileSize}
              totalContacts={contacts.length}
              onGoogleSheetLoaded={handleGoogleSheetLoaded}
            />
          </div>

          {/* Right Column: Live Tracking */}
          <div className="h-full">
            <LiveTracking stats={liveStats} />
          </div>
        </div>

        {/* Bottom Section: Contacts Table */}
        <div className="mt-2">
          <ContactsTable contacts={contacts} onDeleteContact={handleDeleteContact} />
        </div>
      </div>
    </DashboardShell>
  );
}
