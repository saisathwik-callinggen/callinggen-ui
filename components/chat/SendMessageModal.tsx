"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  mockCampaignsList,
  mockMaterialImages,
  mockMaterialTexts,
  mockMaterialDocs,
  mockContacts,
  MaterialImage,
  MaterialText,
  MaterialDoc,
} from "@/app/chat/_mockData";
import {
  Send,
  Image as ImageIcon,
  FileText,
  Paperclip,
  CheckCircle2,
  Users,
  X,
  ChevronDown,
  Check,
  UploadCloud,
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCampaignId?: string;
}

type SelectedMaterial = {
  id: string;
  type: "text" | "image" | "doc";
  title: string;
  preview?: string;
};

export default function SendMessageModal({
  isOpen,
  onClose,
  initialCampaignId,
}: SendMessageModalProps) {
  // Target Audience state
  const [audienceType, setAudienceType] = useState<"campaign" | "custom">("campaign");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(initialCampaignId || "all");
  const [customFileUploaded, setCustomFileUploaded] = useState(false);

  // Material selection state
  const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterial[]>([]);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [materialTab, setMaterialTab] = useState<"text" | "image" | "doc">("text");
  
  // Custom material creation state
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newMaterialText, setNewMaterialText] = useState("");
  const [saveToMaterialBase, setSaveToMaterialBase] = useState(true);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [interestFilter, setInterestFilter] = useState<string>("all");

  // Send & Confirmation state
  const [step, setStep] = useState<"compose" | "confirm" | "success">("compose");
  const [isSending, setIsSending] = useState(false);

  React.useEffect(() => {
    if (initialCampaignId) {
      setSelectedCampaignId(initialCampaignId);
    }
  }, [initialCampaignId]);

  // Reset state when opened/closed
  React.useEffect(() => {
    if (isOpen) {
      setStep("compose");
      setAudienceType("campaign");
      setSelectedMaterials([]);
      setCustomFileUploaded(false);
      setIsAddingMaterial(false);
      setIsCreatingNew(false);
    }
  }, [isOpen]);

  // Filter contacts based on campaign + category + interest filters
  const filteredContacts = useMemo(() => {
    if (audienceType === "custom") {
      // Mock custom contacts if uploaded
      if (customFileUploaded) {
        return mockContacts.slice(0, 15); // Return some mock contacts for the demo
      }
      return [];
    }

    return mockContacts.filter((contact) => {
      if (selectedCampaignId !== "all" && contact.campaignId !== selectedCampaignId) {
        return false;
      }
      if (categoryFilter !== "all" && contact.category !== categoryFilter) {
        return false;
      }
      if (interestFilter !== "all" && contact.interestTag !== interestFilter) {
        return false;
      }
      return true;
    });
  }, [audienceType, selectedCampaignId, categoryFilter, interestFilter, customFileUploaded]);

  const handleAddMaterial = (item: SelectedMaterial) => {
    if (!selectedMaterials.find(m => m.id === item.id)) {
      setSelectedMaterials([...selectedMaterials, item]);
    }
    setIsAddingMaterial(false);
  };

  const handleRemoveMaterial = (id: string) => {
    setSelectedMaterials(selectedMaterials.filter(m => m.id !== id));
  };

  const handleSaveNewMaterial = () => {
    if (!newMaterialText.trim()) return;
    const newItem: SelectedMaterial = {
      id: `custom-${Date.now()}`,
      type: materialTab,
      title: materialTab === 'text' ? "Custom Text Message" : "Custom Upload",
      preview: newMaterialText
    };
    setSelectedMaterials([...selectedMaterials, newItem]);
    setIsCreatingNew(false);
    setNewMaterialText("");
    setIsAddingMaterial(false);
  };

  const handleConfirmSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep("success");
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const isFormValid = filteredContacts.length > 0 && selectedMaterials.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] md:max-w-5xl p-0 overflow-hidden border border-white/20 bg-white/70 backdrop-blur-3xl dark:border-white/10 dark:bg-zinc-950/70 rounded-3xl sm:rounded-[2rem] shadow-2xl">
        {/* Glassmorphic Header */}
        <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border-b border-white/20 dark:border-white/10 p-5 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-[0_0_15px_rgba(124,58,237,0.3)] text-white">
              <Send className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-lg font-black text-zinc-900 dark:text-white leading-tight tracking-wide">
                Broadcast WhatsApp Message
              </DialogTitle>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                Configure your target audience and compose your message
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white p-2 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition relative z-10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "success" ? (
          <div className="p-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 animate-bounce shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Broadcast Dispatched Successfully!
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Your message has been queued for {filteredContacts.length} recipient{filteredContacts.length > 1 ? "s" : ""}.
            </p>
          </div>
        ) : step === "confirm" ? (
          <div className="flex flex-col h-[60vh] max-h-[600px]">
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-zinc-50/50 dark:bg-zinc-900/30">
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200/50 dark:border-amber-900/50">
                <AlertCircle className="h-6 w-6 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Please review before sending</h4>
                  <p className="text-xs opacity-90 mt-0.5">This action cannot be undone. Messages will be sent immediately via WhatsApp.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Users className="h-4 w-4 text-violet-500" />
                    Audience Summary
                  </h3>
                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Recipients</span>
                      <span className="text-2xl font-black text-violet-600 dark:text-violet-400">{filteredContacts.length}</span>
                    </div>
                    {audienceType === "campaign" ? (
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                        <p><strong>Campaign:</strong> {selectedCampaignId === "all" ? "Global Audience" : mockCampaignsList.find(c => c.id === selectedCampaignId)?.name}</p>
                        <p><strong>Filters:</strong> Category: {categoryFilter}, Interest: {interestFilter}</p>
                      </div>
                    ) : (
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        <p><strong>Source:</strong> Custom Excel/CSV Upload</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-violet-500" />
                    Message Payload
                  </h3>
                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm space-y-2 max-h-[200px] overflow-y-auto">
                    {selectedMaterials.map((m, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                        <div className="mt-0.5">
                          {m.type === 'text' ? <FileText className="h-4 w-4 text-blue-500" /> : 
                           m.type === 'image' ? <ImageIcon className="h-4 w-4 text-emerald-500" /> : 
                           <Paperclip className="h-4 w-4 text-amber-500" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{m.title}</p>
                          {m.preview && <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-2">{m.preview}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Footer */}
            <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl p-5 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setStep("compose")}
                className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition shadow-sm"
                disabled={isSending}
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleConfirmSend}
                disabled={isSending}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:opacity-90 transition disabled:opacity-50 hover:-translate-y-0.5"
              >
                {isSending ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></span>
                    Dispatching...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Confirm & Send Now
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[75vh] max-h-[800px]">
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Left Column: Configuration */}
              <div className="w-full md:w-[55%] flex flex-col border-b md:border-b-0 md:border-r border-zinc-200/50 dark:border-zinc-800/50 overflow-y-auto p-6 space-y-8 bg-zinc-50/20 dark:bg-zinc-950/20 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400">
                
                {/* Step 1: Target Audience */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-[10px] font-black text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">1</span>
                    <label className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Target Audience
                    </label>
                  </div>
                  
                  <div className="flex gap-2 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50">
                    <button
                      onClick={() => setAudienceType("campaign")}
                      className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${audienceType === "campaign" ? "bg-white dark:bg-zinc-800 text-violet-700 dark:text-violet-300 shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"}`}
                    >
                      Select Campaign
                    </button>
                    <button
                      onClick={() => setAudienceType("custom")}
                      className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${audienceType === "custom" ? "bg-white dark:bg-zinc-800 text-violet-700 dark:text-violet-300 shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"}`}
                    >
                      Upload Contacts
                    </button>
                  </div>

                  {audienceType === "campaign" ? (
                    <div className="space-y-3 pt-2">
                      <div className="relative">
                        <select
                          value={selectedCampaignId}
                          onChange={(e) => setSelectedCampaignId(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs font-semibold text-zinc-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 shadow-sm transition-all"
                        >
                          <option value="all">🌐 All Campaigns (Global Audience)</option>
                          {mockCampaignsList.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} ({c.status}) — {c.totalLeads} leads
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Category</span>
                          <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                          >
                            <option value="all">All Categories</option>
                            <option value="hot">🔥 Hot</option>
                            <option value="warm">☀️ Warm</option>
                            <option value="cold">❄️ Cold</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Interest</span>
                          <select
                            value={interestFilter}
                            onChange={(e) => setInterestFilter(e.target.value)}
                            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                          >
                            <option value="all">All Interests</option>
                            <option value="Interested">Interested</option>
                            <option value="Callback">Callback</option>
                            <option value="Not Interested">Not Interested</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <div className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${customFileUploaded ? 'border-emerald-500/50 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-950/20' : 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:bg-zinc-900'}`}>
                        {customFileUploaded ? (
                          <>
                            <CheckCircle2 className="h-10 w-10 text-emerald-500 mb-3" />
                            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Contacts Uploaded</p>
                            <p className="text-xs text-emerald-600/70 dark:text-emerald-500/70 mt-1">contacts_export.xlsx (15 rows)</p>
                            <button onClick={() => setCustomFileUploaded(false)} className="mt-4 text-xs font-semibold text-red-500 hover:text-red-600">Remove</button>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="h-10 w-10 text-zinc-400 mb-3" />
                            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Upload Excel or CSV</p>
                            <p className="text-xs text-zinc-500 text-center mt-1 max-w-[200px]">Drag and drop your file here, or click to browse.</p>
                            <button onClick={() => setCustomFileUploaded(true)} className="mt-4 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 text-xs font-bold">Browse Files</button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 2: Message Material */}
                <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-[10px] font-black text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">2</span>
                    <label className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Message Payload
                    </label>
                  </div>
                  <p className="text-xs text-zinc-500">Attach multiple materials (text, images, documents) to be sent sequentially.</p>

                  <div className="space-y-2">
                    {selectedMaterials.map((material, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 group">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            {material.type === 'text' ? <FileText className="h-4 w-4 text-blue-500" /> : 
                             material.type === 'image' ? <ImageIcon className="h-4 w-4 text-emerald-500" /> : 
                             <Paperclip className="h-4 w-4 text-amber-500" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{material.title}</p>
                            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">{material.type}</p>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveMaterial(material.id)} className="text-zinc-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    {!isAddingMaterial && (
                      <button
                        onClick={() => setIsAddingMaterial(true)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/50 py-3 text-xs font-bold text-violet-600 hover:bg-violet-50 hover:border-violet-300 transition dark:border-violet-900/30 dark:bg-violet-950/10 dark:text-violet-400"
                      >
                        <Plus className="h-4 w-4" />
                        Add Material
                      </button>
                    )}

                    {isAddingMaterial && (
                      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Select or Create Material</h4>
                          <button onClick={() => {setIsAddingMaterial(false); setIsCreatingNew(false)}} className="text-zinc-400 hover:text-zinc-700">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {!isCreatingNew ? (
                          <>
                            <div className="flex gap-1.5 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-950 mb-3">
                              <button onClick={() => setMaterialTab("text")} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${materialTab === "text" ? "bg-white shadow-sm text-zinc-900 dark:bg-zinc-800 dark:text-white" : "text-zinc-500"}`}>Text</button>
                              <button onClick={() => setMaterialTab("image")} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${materialTab === "image" ? "bg-white shadow-sm text-zinc-900 dark:bg-zinc-800 dark:text-white" : "text-zinc-500"}`}>Image</button>
                              <button onClick={() => setMaterialTab("doc")} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${materialTab === "doc" ? "bg-white shadow-sm text-zinc-900 dark:bg-zinc-800 dark:text-white" : "text-zinc-500"}`}>Doc</button>
                            </div>

                            <div className="max-h-48 overflow-y-auto space-y-2 mb-3">
                              {materialTab === "text" && mockMaterialTexts.map(t => (
                                <div key={t.id} onClick={() => handleAddMaterial({ id: t.id, type: 'text', title: t.title, preview: t.body })} className="p-2 rounded-lg border border-zinc-100 hover:border-violet-300 cursor-pointer transition dark:border-zinc-800 dark:hover:border-violet-700">
                                  <p className="text-xs font-bold">{t.title}</p>
                                  <p className="text-[10px] text-zinc-500 truncate">{t.body}</p>
                                </div>
                              ))}
                              {materialTab === "image" && mockMaterialImages.map(i => (
                                <div key={i.id} onClick={() => handleAddMaterial({ id: i.id, type: 'image', title: i.title })} className="flex items-center gap-3 p-2 rounded-lg border border-zinc-100 hover:border-violet-300 cursor-pointer transition dark:border-zinc-800 dark:hover:border-violet-700">
                                  <img src={i.imageUrl} className="h-8 w-12 object-cover rounded" />
                                  <p className="text-xs font-bold">{i.title}</p>
                                </div>
                              ))}
                              {materialTab === "doc" && mockMaterialDocs.map(d => (
                                <div key={d.id} onClick={() => handleAddMaterial({ id: d.id, type: 'doc', title: d.title })} className="p-2 rounded-lg border border-zinc-100 hover:border-violet-300 cursor-pointer transition dark:border-zinc-800 dark:hover:border-violet-700">
                                  <p className="text-xs font-bold">{d.title}</p>
                                  <p className="text-[10px] text-zinc-500">{d.fileName}</p>
                                </div>
                              ))}
                            </div>
                            
                            <button onClick={() => setIsCreatingNew(true)} className="w-full py-2 text-xs font-bold text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100 dark:bg-violet-900/20 dark:text-violet-400">
                              + Create / Upload New
                            </button>
                          </>
                        ) : (
                          <div className="space-y-3 animate-in slide-in-from-right-4">
                            <textarea
                              placeholder="Type your new message template here..."
                              rows={4}
                              value={newMaterialText}
                              onChange={(e) => setNewMaterialText(e.target.value)}
                              className="w-full rounded-xl border border-zinc-200 p-3 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                            />
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={saveToMaterialBase} onChange={(e) => setSaveToMaterialBase(e.target.checked)} className="rounded border-zinc-300 text-violet-600 focus:ring-violet-500" />
                              <span className="text-xs text-zinc-600 dark:text-zinc-400">Save to Material Base for future use</span>
                            </label>
                            <div className="flex gap-2">
                              <button onClick={() => setIsCreatingNew(false)} className="flex-1 py-2 text-xs font-bold text-zinc-600 bg-zinc-100 rounded-lg hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">Cancel</button>
                              <button onClick={handleSaveNewMaterial} className="flex-1 py-2 text-xs font-bold text-white bg-violet-600 rounded-lg hover:bg-violet-700">Add & Save</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Preview */}
              <div className="w-full md:w-[45%] flex flex-col bg-white/20 dark:bg-zinc-900/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-[10px] font-black text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">3</span>
                    <label className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Audience Preview
                    </label>
                  </div>
                  <span className="rounded-full bg-zinc-200/50 px-3 py-1 text-[10px] font-black text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-300/30 dark:border-zinc-700/30">
                    {filteredContacts.length} TARGETS
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto rounded-2xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 p-2 space-y-2 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {filteredContacts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-400">
                      <Users className="h-8 w-8 mb-2 opacity-50" />
                      <p className="text-xs font-medium">No recipients found</p>
                      <p className="text-[10px]">Adjust your filters or audience source</p>
                    </div>
                  ) : (
                    filteredContacts.map((c) => (
                      <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-white/70 backdrop-blur-sm dark:bg-zinc-900/70 shadow-sm border border-white/50 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={c.avatar} alt={c.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-white dark:ring-zinc-800 shadow-sm shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{c.name}</p>
                            <p className="text-[10px] font-mono text-zinc-500 truncate">{c.phone}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 pl-2">
                          <span className="block text-[9px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest truncate">{c.category}</span>
                          <span className="block text-[9px] text-zinc-500 mt-0.5 truncate">{c.interestTag}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl p-5 flex flex-col sm:flex-row items-center justify-between shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] gap-4 sm:gap-0">
              <div className="flex items-center gap-2 px-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">WhatsApp Connected</span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none rounded-xl px-5 py-2.5 text-sm font-bold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep("confirm")}
                  disabled={!isFormValid}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-6 py-2.5 text-sm font-bold text-white dark:text-zinc-900 shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Send
                  <Send className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
