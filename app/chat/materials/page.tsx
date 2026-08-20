"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import {
  mockMaterialImages,
  mockMaterialTexts,
  mockMaterialDocs,
  MaterialImage,
  MaterialText,
  MaterialDoc,
} from "@/app/chat/_mockData";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Paperclip,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  FolderOpen,
  FileCode,
  Check,
} from "lucide-react";

export default function MaterialBasePage() {
  const [activeTab, setActiveTab] = useState<"text" | "image" | "doc">("text");

  // Local state for materials
  const [textList, setTextList] = useState<MaterialText[]>(mockMaterialTexts);
  const [imageList, setImageList] = useState<MaterialImage[]>(mockMaterialImages);
  const [docList, setDocList] = useState<MaterialDoc[]>(mockMaterialDocs);

  // Form states for new Text Material
  const [newTextTitle, setNewTextTitle] = useState("");
  const [newTextBody, setNewTextBody] = useState("");

  // Form states for new Image Material
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageDesc, setNewImageDesc] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  // Form states for new Doc Material
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocFileName, setNewDocFileName] = useState("");

  // Success Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add Text Material
  const handleAddText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTextTitle.trim() || !newTextBody.trim()) return;

    const newItem: MaterialText = {
      id: `txt-${Date.now()}`,
      title: newTextTitle.trim(),
      body: newTextBody.trim(),
    };

    setTextList([newItem, ...textList]);
    setNewTextTitle("");
    setNewTextBody("");
    showToast(`Saved "${newItem.title}" to Text Materials library!`);
  };

  // Add Image Material
  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageTitle.trim()) return;

    const newItem: MaterialImage = {
      id: `img-${Date.now()}`,
      title: newImageTitle.trim(),
      description: newImageDesc.trim() || "Uploaded promo asset",
      imageUrl:
        newImageUrl.trim() ||
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60",
      size: "1.5 MB",
    };

    setImageList([newItem, ...imageList]);
    setNewImageTitle("");
    setNewImageDesc("");
    setNewImageUrl("");
    showToast(`Saved "${newItem.title}" to Image Materials library!`);
  };

  // Add Document Material
  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    const newItem: MaterialDoc = {
      id: `doc-${Date.now()}`,
      title: newDocTitle.trim(),
      fileName: newDocFileName.trim() || `${newDocTitle.toLowerCase().replace(/\s+/g, "_")}.pdf`,
      fileSize: "2.5 MB",
      fileType: "PDF Document",
    };

    setDocList([newItem, ...docList]);
    setNewDocTitle("");
    setNewDocFileName("");
    showToast(`Saved "${newItem.title}" to Document Materials library!`);
  };

  // Delete handlers
  const handleDeleteText = (id: string) => {
    setTextList(textList.filter((item) => item.id !== id));
  };
  const handleDeleteImage = (id: string) => {
    setImageList(imageList.filter((item) => item.id !== id));
  };
  const handleDeleteDoc = (id: string) => {
    setDocList(docList.filter((item) => item.id !== id));
  };

  return (
    <DashboardShell title="Material Base">
      <div className="flex flex-col gap-6 p-1 sm:p-4 max-w-6xl mx-auto">
        {/* Top Header Row with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white shadow-xs"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Material Base Library
                </h1>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Create and store reusable text templates, promo images, and PDF documents for WhatsApp campaigns.
              </p>
            </div>
          </div>

          <Link
            href="/chat"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:opacity-90 transition shrink-0"
          >
            Go to Chats & Send Message
          </Link>
        </div>

        {/* Success Toast Banner */}
        {toastMessage && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500 text-white p-3 text-xs font-bold shadow-lg animate-in fade-in-0 duration-200">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex gap-2 rounded-2xl bg-zinc-200/70 p-1.5 dark:bg-zinc-900">
          <button
            onClick={() => setActiveTab("text")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
              activeTab === "text"
                ? "bg-white text-violet-700 shadow-md dark:bg-zinc-800 dark:text-violet-300"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <FileText className="h-4 w-4" />
            Text Templates ({textList.length})
          </button>
          <button
            onClick={() => setActiveTab("image")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
              activeTab === "image"
                ? "bg-white text-violet-700 shadow-md dark:bg-zinc-800 dark:text-violet-300"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            Image Materials ({imageList.length})
          </button>
          <button
            onClick={() => setActiveTab("doc")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
              activeTab === "doc"
                ? "bg-white text-violet-700 shadow-md dark:bg-zinc-800 dark:text-violet-300"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Paperclip className="h-4 w-4" />
            Document Attachments ({docList.length})
          </button>
        </div>

        {/* ── TAB 1: TEXT MESSAGES ── */}
        {activeTab === "text" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
            {/* Form Column */}
            <form
              onSubmit={handleAddText}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 h-fit"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <Plus className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Add New Text Template
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Material Name / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festival Promo Discount"
                  value={newTextTitle}
                  onChange={(e) => setNewTextTitle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Message Body Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi {contact_name}, check out our special offer..."
                  value={newTextBody}
                  onChange={(e) => setNewTextBody(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                  Supported variables: <code>{"{contact_name}"}</code>, <code>{"{company}"}</code>
                </span>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:opacity-90 transition mt-2"
              >
                <Plus className="h-4 w-4" />
                Save Text Material
              </button>
            </form>

            {/* List Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Stored Text Templates ({textList.length})
              </h3>

              <div className="space-y-3">
                {textList.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-violet-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-700"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                          <FileText className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                          {item.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleDeleteText(item.id)}
                        className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-lg transition"
                        title="Delete material"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: IMAGES ── */}
        {activeTab === "image" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
            {/* Form Column */}
            <form
              onSubmit={handleAddImage}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 h-fit"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <Plus className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Add New Image Material
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Material Name / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Promotional Flyer"
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Description / Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. High resolution flyer with 20% discount code"
                  value={newImageDesc}
                  onChange={(e) => setNewImageDesc(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Image URL / Select File
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:opacity-90 transition mt-2"
              >
                <Plus className="h-4 w-4" />
                Save Image Material
              </button>
            </form>

            {/* List Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Stored Image Materials ({imageList.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {imageList.map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-violet-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-700 flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition transform hover:scale-105"
                      />
                      <button
                        onClick={() => handleDeleteImage(item.id)}
                        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-600 transition"
                        title="Delete image"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                      <span className="mt-2 block text-[9px] font-semibold text-violet-600 dark:text-violet-400">
                        Size: {item.size}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: DOCUMENTS / PDFS ── */}
        {activeTab === "doc" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
            {/* Form Column */}
            <form
              onSubmit={handleAddDoc}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 h-fit"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <Plus className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Add New Document Material
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Material Name / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Product Catalog 2024"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Document File Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. CallingGen_Catalog_v2.pdf"
                  value={newDocFileName}
                  onChange={(e) => setNewDocFileName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:opacity-90 transition mt-2"
              >
                <Plus className="h-4 w-4" />
                Save Document Material
              </button>
            </form>

            {/* List Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Stored Document Materials ({docList.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {docList.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-violet-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-700 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
                        <FileCode className="h-5 w-5" />
                      </div>
                      <button
                        onClick={() => handleDeleteDoc(item.id)}
                        className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-lg transition"
                        title="Delete document"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {item.fileName}
                      </p>
                      <span className="mt-1 block text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                        {item.fileSize} • {item.fileType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
