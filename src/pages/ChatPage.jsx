import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import { Send, Users, Sparkles, MessageSquare, Trophy } from 'lucide-react';

const ChatPage = () => {
  const { team, currentUser, addToast } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'Aarav Mehta',
      avatar: 'AM',
      role: 'Team Lead',
      text: 'Welcome to Team Nova everyone! We are focusing on digital accessibility and student utilities for TechNova Challenge.',
      time: '10:15 AM',
      isMe: false
    },
    {
      id: 'msg-2',
      sender: 'Riya Shah',
      avatar: 'RS',
      role: 'Backend Developer',
      text: 'Working on our core architecture doc right now. Thinking of Node.js + Express with real-time socket connections.',
      time: '10:20 AM',
      isMe: false
    },
    {
      id: 'msg-3',
      sender: 'Kabir Joshi',
      avatar: 'KJ',
      role: 'Research & Strategy',
      text: 'I just finished reviewing the judge rubrics. We need strong UI/UX accessibility and verifiable live metrics.',
      time: '10:35 AM',
      isMe: false
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentUser.name,
      avatar: currentUser.avatar || 'ME',
      role: currentUser.role || 'Member',
      text: inputMessage.trim(),
      time: 'Just now',
      isMe: true
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    addToast({
      type: 'info',
      title: 'Message Sent',
      message: 'Your message has been posted to the team channel.'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center font-black text-sm">
            TN
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#0F172A]">{team.name} Channel</h1>
            <p className="text-xs text-[#2563EB] font-semibold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              {team.hackathonName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Users className="w-4 h-4 text-[#2563EB]" />
          <span>{team.members.length} Members active</span>
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Messages Feed */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}
            >
              <Avatar name={msg.sender} initials={msg.avatar} size="sm" />
              <div className={`max-w-md ${msg.isMe ? 'items-end text-right' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#0F172A]">{msg.sender}</span>
                  <span className="text-[10px] text-[#64748B]">{msg.role}</span>
                  <span className="text-[10px] text-[#94A3B8]">· {msg.time}</span>
                </div>
                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.isMe
                      ? 'bg-[#2563EB] text-white rounded-tr-none'
                      : 'bg-slate-100 text-[#0F172A] rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message to your team..."
            className="flex-1 text-xs sm:text-sm rounded-xl border border-slate-200 px-4 py-2.5 bg-white text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          <Button type="submit" variant="primary" size="md" icon={Send}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
