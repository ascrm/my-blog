"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@/components/ui/avatar";

const phrases = [
  "于寂静处听惊雷 / Listening to the thunder in silence.",
  "代码、设计与生活的平衡 / Balance of code, design and life.",
  "正在记录成长的瞬间 / Capturing moments of growth.",
  "大道至简，衍化至繁 / Simplicity is complexity resolved.",
];

export default function Home() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: number;
    const current = phrases[phraseIndex];

    if (!isDeleting && subIndex <= current.length) {
      timeout = window.setTimeout(() => {
        setText(current.slice(0, subIndex));
        setSubIndex((s) => s + 1);
      }, 80);
    } else if (isDeleting && subIndex >= 0) {
      timeout = window.setTimeout(() => {
        setText(current.slice(0, subIndex));
        setSubIndex((s) => s - 1);
      }, 40);
    }

    if (subIndex === current.length + 1 && !isDeleting) {
      timeout = window.setTimeout(() => setIsDeleting(true), 4000);
    } else if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setPhraseIndex((p) => (p + 1) % phrases.length);
    }

    return () => window.clearTimeout(timeout);
  }, [subIndex, isDeleting, phraseIndex]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <style>{`
        @keyframes revealUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes blink { from, to { opacity: 1; } 50% { opacity: 0; } }
        .reveal { animation: revealUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .avatar-wrapper::before { content: ''; position: absolute; inset: 0; border: 0.5px solid rgba(0,0,0,0.06); border-radius: 9999px; animation: rotate 15s linear infinite; }
        .cursor { display:inline-block; width:12px; height:2px; background-color: currentColor; margin-left:6px; vertical-align:baseline; animation: blink 1.2s step-end infinite; }
        .bg-dots { position:absolute; inset:0; background-image: radial-gradient(#dcdcdc 0.8px, transparent 0.8px); background-size:50px 50px; z-index:-1; opacity:0.18; }
      `}</style>

      <div className="bg-dots" />

      <main className="reveal -mt-8 flex flex-col items-center text-center px-8">
        <div className="avatar-wrapper relative p-2 mb-10">
          <Avatar src="/images/avatar.jpg" alt="avatar" size={96} ring={2} />
        </div>

        <div className="mb-10">
          <span className="text-[11px] tracking-[0.7em] font-semibold text-gray-400 uppercase block mb-5">
            Hello, Friend.
          </span>
          <h1 className="font-sora text-6xl font-semibold text-slate-900 dark:text-slate-50">
            I’m ascrm.
          </h1>
        </div>

        <div className="mb-16 min-h-[1.5em] max-w-xl">
          <p className="text-[14px] text-gray-500 dark:text-gray-400 font-light tracking-wide italic">
            “ <span>{text}</span>
            <span className="cursor" />
            ”
          </p>
        </div>

        <div className="flex gap-10 mb-15">
          <a href="https://github.com" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-transform transform hover:-translate-y-1" title="GitHub" target="_blank" rel="noreferrer">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.5v-1.9c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6.8 2 .2.1-.7.5-1.3.9-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.7.8 1.2 1.8 1.2 3.1 0 4.5-2.8 5.5-5.5 5.8.5.4.9 1.1.9 2.2v3.2c0 .3.2.6.8.5A12 12 0 0012 .5z"/></svg>
          </a>
          <a href="https://x.com" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-transform transform hover:-translate-y-1" title="X" target="_blank" rel="noreferrer">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.5 3c-2.5 0-4.5 2.28-4.5 5.08 0 .4.05.8.16 1.17A12.94 12.94 0 013 4s-4 9 5 13a13 13 0 01-7 2c9 5 20 0 20-11.5V4z"/></svg>
          </a>
          <a href="https://t.me" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-transform transform hover:-translate-y-1" title="Telegram" target="_blank" rel="noreferrer">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 2.3L2.6 9.1c-.9.3-.9 1.2-.2 1.5l4.7 1.6 1.7 5.4c.3.9 1 1 1.5.3l2.2-2.8 4.6 3.3c.8.6 1.6.2 1.8-.9L23 4.1c.2-1.2-.8-1.8-1.4-1.8z"/></svg>
          </a>
          <a href="mailto:your-email@example.com" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-transform transform hover:-translate-y-1" title="Email">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
        </div>

        <a
          href="/home"
          className="btn-enter text-[14px] tracking-widest font-semibold text-slate-900 dark:text-slate-50 mt-2 group inline-block relative pb-1"
        >
          <span className="relative z-10">Enter Space / 点击进入</span>
          <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-slate-900 dark:bg-slate-50 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
        </a>
      </main>
    </div>
  );
}
