"use client";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { DraggableItem } from "@/components/draggable-item";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/scrapebooks/")({
  component: ScrapebooksPage,
});
interface PageItem {
  id: string;
  type: "text" | "image" | "audio";
  content: string;
  x: number;
  y: number;
}

interface Page {
  items: PageItem[];
}

interface Scrapbook {
  id: string;
  title: string;
  pages: Page[];
}

const variants = {
  initial: { rotateY: 0, scale: 1 },
  open: { rotateY: 180, scale: 1.05 },
  exit: { rotateY: 0, scale: 1 },
};

export default function ScrapebooksPage() {
  const [books, setBooks] = useState<Scrapbook[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [openBook, setOpenBook] = useState<Scrapbook | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [newText, setNewText] = useState("");
  const [pageInput, setPageInput] = useState(1);

  const addBook = () => {
    if (!newTitle.trim()) return;
    const newBook: Scrapbook = {
      id: uuidv4(),
      title: newTitle.trim(),
      pages: [{ items: [] }],
    };
    setBooks([...books, newBook]);
    setNewTitle("");
  };

  const updateBook = (updated: Scrapbook) => {
    setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setOpenBook(updated);
  };

  const addTextToPage = () => {
    if (!openBook || !newText.trim()) return;
    const updated = { ...openBook };
    const newItem: PageItem = {
      id: uuidv4(),
      type: "text",
      content: newText,
      x: 50,
      y: 50,
    };
    updated.pages[currentPageIndex].items.push(newItem);
    updateBook(updated);
    setNewText("");
  };

  const addFileToPage = (file: File) => {
    if (!openBook) return;
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("image") ? "image" : "audio";
    const newItem: PageItem = {
      id: uuidv4(),
      type,
      content: url,
      x: 50,
      y: 50,
    };
    const updated = { ...openBook };
    updated.pages[currentPageIndex].items.push(newItem);
    updateBook(updated);
  };

  const handleDrag = (id: string, x: number, y: number) => {
    if (!openBook) return;
    const updated = { ...openBook };
    const item = updated.pages[currentPageIndex].items.find((i) => i.id === id);
    if (item) {
      item.x = x;
      item.y = y;
      updateBook(updated);
    }
  };

  return (
    <div className="p-6 ">
      {openBook ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{openBook.title}</h2>
            <Button variant="secondary" onClick={() => setOpenBook(null)}>
              Close Book
            </Button>
          </div>
          <div className="relative w-full h-[600px] bg-[#fdfaf3] border shadow-inner overflow-hidden">
            {openBook.pages[currentPageIndex].items.map((item) => (
              <DraggableItem
                key={item.id}
                item={item}
                onStop={(x, y) => handleDrag(item.id, x, y)}
              />
            ))}
          </div>

          <Input
            placeholder="Add text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={addTextToPage}>Add Text</Button>
            <div className="flex items-center gap-2 border p-2 rounded bg-white">
              <input
                type="file"
                accept="image/*,audio/*"
                onChange={(e) =>
                  e.target.files && addFileToPage(e.target.files[0])
                }
              />
            </div>
            <Button
              onClick={() => setCurrentPageIndex((p) => Math.max(p - 1, 0))}
            >
              Previous
            </Button>

            <Input
              type="number"
              className="w-16"
              value={pageInput}
              onChange={(e) => setPageInput(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const page = Math.max(
                    1,
                    Math.min(openBook.pages.length, pageInput),
                  );
                  setCurrentPageIndex(page - 1);
                }
              }}
            />
            <Button
              onClick={() => {
                const updated = { ...openBook };
                if (currentPageIndex + 1 >= updated.pages.length) {
                  updated.pages.push({ items: [] });
                  updateBook(updated);
                }
                setCurrentPageIndex((p) => p + 1);
              }}
            >
              Next
            </Button>

            <Button variant="secondary" onClick={() => setOpenBook(null)}>
              Close Book
            </Button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Page {currentPageIndex + 1}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">My Scrapebooks</h1>
            <p className="text-muted-foreground text-sm">
              A digital space for your memories ✨
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="New book title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button onClick={addBook}>Add Book</Button>
          </div>
          <div className="flex flex-wrap gap-4 py-2">
            {books.map((book) => (
              <Card
                key={book.id}
                className="w-48 h-68 cursor-pointer hover:rotate-1 hover:scale-105 transition-transform duration-200"
                onClick={() => {
                  setOpenBook(book);
                  setCurrentPageIndex(0);
                  setPageInput(1);
                }}
              >
                <motion.div
                  className="relative w-full h-full"
                  variants={variants}
                  initial="initial"
                  animate="open"
                  exit="exit"
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                />

                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
