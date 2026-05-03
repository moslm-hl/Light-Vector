export default function InsightCard({ text }: { text: string }) {
  return (
    <div className="bg-[#E1F5EE] text-[#0F6E56] rounded-[8px] px-4 py-3 border border-[#5DCAA5]/30 flex items-start gap-3 mt-4">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      <p className="text-[13px] leading-[1.6] font-medium">{text}</p>
    </div>
  )
}
