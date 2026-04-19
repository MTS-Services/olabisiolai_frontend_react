import { useEffect, useMemo, useState } from "react";

import { DirectLeadsTable } from "@/components/sections/vendor/leads/DirectLeadsTable";
import { LeadDetailsModal } from "@/components/sections/vendor/leads/LeadDetailsModal";
import { LeadsTabs } from "@/components/sections/vendor/leads/LeadsChannelTabs";
import { LeadsHeader } from "@/components/sections/vendor/leads/LeadsHeader";
import { WhatsAppLeadsList } from "@/components/sections/vendor/leads/WhatsAppLeadsList";
import { WhatsAppChatInterface } from "@/components/sections/vendor/leads/WhatsAppChatView";
import {
  chatByLead,
  leads,
  type Lead,
  type LeadChannel,
} from "@/components/sections/vendor/leads/leadsData";

export default function VendorLeads() {
  const [channelFilter, setChannelFilter] = useState<LeadChannel>("whatsapp");
  const [selectedLeadId, setSelectedLeadId] = useState<string>(() => {
    const whatsappLead = leads.find((l) => l.channel === "whatsapp");
    return whatsappLead?.id ?? leads[0]?.id ?? "";
  });
  const [openLeadDetails, setOpenLeadDetails] = useState<Lead | null>(null);

  const directCount = useMemo(
    () => leads.filter((l) => l.channel === "direct").length,
    [],
  );
  const whatsappCount = useMemo(
    () => leads.filter((l) => l.channel === "whatsapp").length,
    [],
  );

  const filteredLeads = useMemo(
    () => leads.filter((lead) => lead.channel === channelFilter),
    [channelFilter],
  );

  const selectedLead =
    filteredLeads.find((lead) => lead.id === selectedLeadId) ??
    filteredLeads[0] ??
    null;
  const selectedConversation = selectedLead
    ? (chatByLead[selectedLead.id] ?? [])
    : [];
  const isDirectChannel = channelFilter === "direct";

  const lastVendorMessageIndex = useMemo(() => {
    let last = -1;
    selectedConversation.forEach((m, i) => {
      if (m.from === "vendor") last = i;
    });
    return last;
  }, [selectedConversation]);

  /** "New messages" rule: divider before third message when enough history */
  const newMessagesDividerAfterIndex =
    selectedConversation.length >= 4 ? 1 : -1;

  useEffect(() => {
    if (!filteredLeads.length) return;
    if (!filteredLeads.some((l) => l.id === selectedLeadId)) {
      setSelectedLeadId(filteredLeads[0].id);
    }
  }, [channelFilter, filteredLeads, selectedLeadId]);

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-5 md:space-y-6">
        <LeadsHeader />

        <LeadsTabs
          channelFilter={channelFilter}
          onChange={setChannelFilter}
          directCount={directCount}
          whatsappCount={whatsappCount}
        />

        {isDirectChannel ? (
          <DirectLeadsTable
            leads={filteredLeads}
            onOpenLeadDetails={setOpenLeadDetails}
          />
        ) : (
          <div className="grid min-h-[min(640px,calc(100dvh-220px))] lg:grid-cols-[minmax(260px,300px)_1fr]">
            <WhatsAppLeadsList
              leads={filteredLeads}
              selectedLeadId={selectedLeadId}
              onSelectLead={setSelectedLeadId}
            />
            <WhatsAppChatInterface
              selectedLead={selectedLead}
              selectedConversation={selectedConversation}
              lastVendorMessageIndex={lastVendorMessageIndex}
              newMessagesDividerAfterIndex={newMessagesDividerAfterIndex}
            />
          </div>
        )}

        <LeadDetailsModal
          openLead={openLeadDetails}
          onClose={() => setOpenLeadDetails(null)}
        />
      </div>
    </div>
  );
}
